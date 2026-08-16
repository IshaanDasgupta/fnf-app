export interface CompatibilityItem {
  label: string;

  value: string;
}

export interface CompatibilityCardProps {
  score: number;

  items: CompatibilityItem[];
}
