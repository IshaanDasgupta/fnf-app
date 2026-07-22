export interface HouseRule {
  id: string;

  icon: React.ReactNode;

  label: string;
}

export interface HouseRulesSectionProps {
  rules: HouseRule[];
}

export interface HouseRuleItemProps {
  icon: React.ReactNode;

  label: string;
}
