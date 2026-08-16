import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { City } from "@/src/constants/api-constants";
import { useLocationStore } from "@/src/stores/location";
import { radius } from "@/src/theme/radius";
import { sizes } from "@/src/theme/size";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

const CITIES: {
  id: City;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    id: "mumbai",
    label: "Mumbai",
    icon: "business-outline",
  },
  {
    id: "pune",
    label: "Pune",
    icon: "school-outline",
  },
  {
    id: "bangalore",
    label: "Bangalore",
    icon: "leaf-outline",
  },
  {
    id: "hyderabad",
    label: "Hyderabad",
    icon: "home-outline",
  },
];

interface CitySelectionInputProps {
  onSelect?: (city: City) => void;
}

export default function CitySelectionInput({
  onSelect,
}: CitySelectionInputProps) {
  const city = useLocationStore((state) => state.city);
  const setCity = useLocationStore((state) => state.setCity);

  const handleSelect = (selectedCity: City) => {
    setCity(selectedCity);
    onSelect && onSelect(selectedCity);
  };

  return (
    <ThemedView variant="secondary" style={styles.container}>
      {CITIES.map((item) => {
        const selected = city === item.id;

        return (
          <Pressable
            key={item.id}
            onPress={() => handleSelect(item.id)}
            style={styles.item}
          >
            <ThemedIconButton
              variant={selected ? "accentPrimary" : "primary"}
              size="lg"
              radius="card"
              icon={<Ionicons name={item.icon} />}
              onPress={() => handleSelect(item.id)}
            />

            <ThemedText
              variant="caption"
              color={selected ? "foreground.primary" : "foreground.secondary"}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              style={styles.label}
            >
              {item.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: radius.card,
    paddingVertical: sizes.lg,
  },

  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 0,
  },

  label: {
    marginTop: sizes.xs,
    textAlign: "center",
  },
});
