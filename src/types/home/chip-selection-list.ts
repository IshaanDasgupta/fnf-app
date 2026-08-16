export interface ChipItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ChipSelectionListProps {
  items: ChipItem[];

  selectedChipsIds: string[];

  onSelect(id: string): void;
}
