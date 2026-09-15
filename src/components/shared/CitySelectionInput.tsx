import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { City } from "@/src/constants/api-constants";
import { CITIES_CONFIG } from "@/src/constants/cities";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { useLocationStore } from "@/src/stores/location";
import { radius } from "@/src/theme/radius";
import { sizes } from "@/src/theme/size";
import { Pressable, StyleSheet } from "react-native";

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
    onSelect?.(selectedCity);
  };

  return (
    <ThemedView style={styles.container}>
      {CITIES_CONFIG.map((item) => (
        <CityItem
          key={item.id}
          item={item}
          selected={city === item.id}
          onPress={() => handleSelect(item.id)}
        />
      ))}
    </ThemedView>
  );
}

function CityItem({
  item,
  selected,
  onPress,
}: {
  item: (typeof CITIES_CONFIG)[number];
  selected: boolean;
  onPress: () => void;
}) {
  const { colors } = useTheme();

  const CityIcon = item.icon;

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <ThemedView
        variant={selected ? "accent-primary" : "tertiary"}
        borderRadius="button"
        style={styles.iconContainer}
      >
        <CityIcon
          width={42}
          height={42}
          style={{
            transform: [{ scale: item.iconScale }],
          }}
          color={
            selected ? colors.foreground.white : colors.foreground.secondary
          }
        />
      </ThemedView>

      <ThemedText
        variant="bodySmall"
        color={selected ? "accent.primary" : "foreground.secondary"}
        numberOfLines={1}
        style={styles.label}
      >
        {item.label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: sizes.md,
    borderRadius: radius.card,
  },

  item: {
    flex: 1,
    alignItems: "center",
  },

  iconContainer: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    marginTop: sizes.xs,
    textAlign: "center",
  },
});
