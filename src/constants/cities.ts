import BangaloreIcon from "@/assets/icons/cities/bangalore.svg";
import HyderabadIcon from "@/assets/icons/cities/hyderabad.svg";
import MumbaiIcon from "@/assets/icons/cities/mumbai.svg";
import PuneIcon from "@/assets/icons/cities/pune.svg";
import { City } from "@/src/constants/api-constants";

export const CITIES_CONFIG: {
  id: City;
  label: string;
  icon: React.FC<React.ComponentProps<typeof MumbaiIcon>>;
  iconScale: number;
}[] = [
  {
    id: "mumbai",
    label: "Mumbai",
    icon: MumbaiIcon,
    iconScale: 1.3,
  },
  {
    id: "pune",
    label: "Pune",
    icon: PuneIcon,
    iconScale: 0.9,
  },
  {
    id: "bangalore",
    label: "Bangalore",
    icon: BangaloreIcon,
    iconScale: 1.2,
  },
  {
    id: "hyderabad",
    label: "Hyderabad",
    icon: HyderabadIcon,
    iconScale: 1.2,
  },
];
