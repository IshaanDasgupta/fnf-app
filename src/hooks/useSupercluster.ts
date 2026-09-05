import { SUPERCLUSTER_MAX_ZOOM } from "@/src/constants/map-constants";
import { useMemo } from "react";
import { Region } from "react-native-maps";
import Supercluster from "supercluster";

export interface ClusterProperty {
  id: string;
  latitude: number;
  longitude: number;
  price: number;
}

type PropertyFeature = GeoJSON.Feature<
  GeoJSON.Point,
  {
    cluster: false;
    property: ClusterProperty;
  }
>;

export type MapMarker =
  | {
      type: "property";
      property: ClusterProperty;
    }
  | {
      type: "cluster";
      id: number;
      count: number;
      latitude: number;
      longitude: number;
    };

interface UseSuperclusterProps {
  properties: ClusterProperty[];
  region: Region;
}

/**
 * Approximate distance between two coordinates in meters.
 */
function distanceInMeters(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number,
): number {
  const R = 6_371_000;

  const lat1 = (latitude1 * Math.PI) / 180;
  const lat2 = (latitude2 * Math.PI) / 180;

  const deltaLat = ((latitude2 - latitude1) * Math.PI) / 180;
  const deltaLng = ((longitude2 - longitude1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Convert meters to latitude/longitude offsets.
 */
function offsetCoordinate(
  latitude: number,
  longitude: number,
  distanceMeters: number,
  angleRadians: number,
) {
  const earthRadius = 6_371_000;

  const latitudeOffset =
    (distanceMeters * Math.cos(angleRadians) * 180) / (Math.PI * earthRadius);

  const longitudeOffset =
    (distanceMeters * Math.sin(angleRadians) * 180) /
    (Math.PI * earthRadius * Math.cos((latitude * Math.PI) / 180));

  return {
    latitude: latitude + latitudeOffset,
    longitude: longitude + longitudeOffset,
  };
}

/**
 * Find properties that have effectively the same location.
 *
 * We use a small distance instead of exact coordinate equality because
 * geocoding can produce slightly different coordinates for the same building.
 */
function groupOverlappingProperties(
  properties: ClusterProperty[],
  groupingDistanceMeters = 5,
): ClusterProperty[][] {
  const groups: ClusterProperty[][] = [];

  for (const property of properties) {
    let group = groups.find((existingGroup) =>
      existingGroup.some(
        (existing) =>
          distanceInMeters(
            property.latitude,
            property.longitude,
            existing.latitude,
            existing.longitude,
          ) <= groupingDistanceMeters,
      ),
    );

    if (!group) {
      group = [];
      groups.push(group);
    }

    group.push(property);
  }

  return groups;
}

/**
 * Spread properties that share a location while avoiding other
 * nearby listings.
 */
function spreadOverlappingProperties(
  properties: ClusterProperty[],
): ClusterProperty[] {
  const groups = groupOverlappingProperties(properties);

  // These are display-only coordinates.
  const result: ClusterProperty[] = [];

  // Minimum distance between displayed markers.
  const MIN_MARKER_DISTANCE_METERS = 25;

  // How far we initially spread markers.
  const INITIAL_RADIUS_METERS = 20;

  // Number of positions we try around the center.
  const ANGLE_COUNT = 16;

  for (const group of groups) {
    // Nothing to spread.
    if (group.length === 1) {
      result.push(group[0]);
      continue;
    }

    const center = group[0];

    for (let index = 0; index < group.length; index++) {
      const property = group[index];

      let radius = INITIAL_RADIUS_METERS;
      let position: {
        latitude: number;
        longitude: number;
      } | null = null;

      while (!position) {
        for (let angleIndex = 0; angleIndex < ANGLE_COUNT; angleIndex++) {
          // Rotate the starting angle for each listing.
          const angle =
            ((index * (360 / group.length) + angleIndex * (360 / ANGLE_COUNT)) *
              Math.PI) /
            180;

          const candidate = offsetCoordinate(
            center.latitude,
            center.longitude,
            radius,
            angle,
          );

          const collision = result.some(
            (existing) =>
              distanceInMeters(
                candidate.latitude,
                candidate.longitude,
                existing.latitude,
                existing.longitude,
              ) < MIN_MARKER_DISTANCE_METERS,
          );

          if (!collision) {
            position = candidate;
            break;
          }
        }

        // Couldn't find a free position.
        // Increase the radius and try again.
        if (!position) {
          radius *= 1.5;
        }
      }

      result.push({
        ...property,
        latitude: position.latitude,
        longitude: position.longitude,
      });
    }
  }

  return result;
}

export function useSupercluster({ properties, region }: UseSuperclusterProps) {
  const points = useMemo<PropertyFeature[]>(() => {
    return properties.map((property) => ({
      type: "Feature",
      properties: {
        cluster: false,
        property,
      },
      geometry: {
        type: "Point",
        coordinates: [property.longitude, property.latitude],
      },
    }));
  }, [properties]);

  const index = useMemo(() => {
    const cluster = new Supercluster({
      radius: 60,
      maxZoom: SUPERCLUSTER_MAX_ZOOM,
    });

    cluster.load(points);

    return cluster;
  }, [points]);

  const bounds = useMemo(
    () =>
      [
        region.longitude - region.longitudeDelta / 2,
        region.latitude - region.latitudeDelta / 2,
        region.longitude + region.longitudeDelta / 2,
        region.latitude + region.latitudeDelta / 2,
      ] as [number, number, number, number],
    [region],
  );

  const zoom = useMemo(() => {
    return Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
  }, [region.longitudeDelta]);

  const markers = useMemo<MapMarker[]>(() => {
    /**
     * At high zoom levels, don't use Supercluster.
     *
     * Instead, render individual properties and spread listings
     * that occupy the same location.
     */
    if (zoom > SUPERCLUSTER_MAX_ZOOM) {
      const spreadProperties = spreadOverlappingProperties(properties);

      return spreadProperties.map((property) => ({
        type: "property",
        property,
      }));
    }

    const clusters = index.getClusters(bounds, zoom);

    return clusters.map((cluster) => {
      const [longitude, latitude] = cluster.geometry.coordinates;

      if (cluster.properties.cluster) {
        return {
          type: "cluster",
          id: cluster.properties.cluster_id,
          count: cluster.properties.point_count,
          latitude,
          longitude,
        };
      }

      return {
        type: "property",
        property: (cluster.properties as PropertyFeature["properties"])
          .property,
      };
    });
  }, [index, bounds, zoom, properties]);

  return {
    markers,

    getLeaves(clusterId: number) {
      return index
        .getLeaves(clusterId, Infinity)
        .map(
          (leaf) => (leaf.properties as PropertyFeature["properties"]).property,
        );
    },

    getExpansionZoom(clusterId: number) {
      return index.getClusterExpansionZoom(clusterId);
    },
  };
}
