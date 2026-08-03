import { sizes } from "@/theme/size";

export interface SpacerProps {
  size?: keyof typeof sizes | number;
  horizontal?: boolean;
}
