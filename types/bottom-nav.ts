export interface BottomNavItem {
  id: string;

  label: string;

  icon: React.ReactNode;
}

export interface BottomNavProps {
  items: BottomNavItem[];

  activeId: string;

  onChange(id: string): void;
}
