import { sizes } from "@/src/theme/size";

export interface SpacerProps {
  size?: keyof typeof sizes | number;
  horizontal?: boolean;
}
