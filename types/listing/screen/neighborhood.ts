export interface NearbyPlace {
  id: string;

  title: string;

  subtitle: string;
}

export interface NeighborhoodSectionProps {
  image: string;

  nearby: NearbyPlace[];
}

export interface NearbyChipProps {
  title: string;

  value: string;
}
