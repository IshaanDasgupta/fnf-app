import { spacing } from "@/theme/spacing";

export interface SpacerProps {
  size?: keyof typeof spacing | number;
  horizontal?: boolean;
}
