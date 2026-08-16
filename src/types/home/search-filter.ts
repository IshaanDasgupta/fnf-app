export interface SearchFilterProps {
  value: string;

  placeholder?: string;

  onChangeText(text: string): void;

  onFilterPress(): void;
}
