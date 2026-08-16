import { useMemo } from "react";
import Supercluster from "supercluster";
import { Region } from "react-native-maps";

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

type ClusterFeature = GeoJSON.Feature<
  GeoJSON.Point,
  Supercluster.ClusterProperties
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
      maxZoom: 20,
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
  }, [index, bounds, zoom]);

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
