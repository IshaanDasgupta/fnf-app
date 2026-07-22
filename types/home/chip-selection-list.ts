export interface ChipItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ChipSelectionListProps {
  items: ChipItem[];

  selectedId?: string;

  onSelect(id: string): void;
}
