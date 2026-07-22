export interface Amenity {
  id: string;

  icon: React.ReactNode;

  label: string;
}

export interface AmenitiesSectionProps {
  amenities: Amenity[];
}

export interface AmenityCardProps {
  icon: React.ReactNode;

  label: string;
}
