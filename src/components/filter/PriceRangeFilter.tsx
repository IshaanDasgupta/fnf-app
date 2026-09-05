import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedTextInput } from "@/src/components/themed-ui/ThemedTextInput";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { radius } from "@/src/theme/radius";
import { sizes } from "@/src/theme/size";
import { PRICE_PRESETS, PricePreset } from "@/src/types/filter";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

export interface PriceRangeFilterProps {
  minRent?: number;
  maxRent?: number;
  onChange: (min?: number, max?: number) => void;
}

export function PriceRangeFilter({
  minRent,
  maxRent,
  onChange,
}: PriceRangeFilterProps) {
  const isPresetActive = (preset: PricePreset) => {
    return preset.min === minRent && preset.max === maxRent;
  };

  const handlePresetSelect = (preset: PricePreset) => {
    if (isPresetActive(preset)) {
      onChange(undefined, undefined);
    } else {
      onChange(preset.min, preset.max);
    }
  };

  const handleMinChange = (text: string) => {
    const clean = text.replace(/[^0-9]/g, "");
    onChange(clean ? Number(clean) : undefined, maxRent);
  };

  const handleMaxChange = (text: string) => {
    const clean = text.replace(/[^0-9]/g, "");
    onChange(minRent, clean ? Number(clean) : undefined);
  };

  const hasActivePrice = minRent !== undefined || maxRent !== undefined;

  const formattedRange = React.useMemo(() => {
    if (minRent !== undefined && maxRent !== undefined) {
      return `₹${minRent.toLocaleString("en-IN")} – ₹${maxRent.toLocaleString("en-IN")}`;
    }
    if (minRent !== undefined) {
      return `From ₹${minRent.toLocaleString("en-IN")}`;
    }
    if (maxRent !== undefined) {
      return `Up to ₹${maxRent.toLocaleString("en-IN")}`;
    }
    return "Any Budget";
  }, [minRent, maxRent]);

  // Calculate visual percentage range for the bar (0 to 60,000)
  const MAX_LIMIT = 60000;
  const leftPercent = minRent
    ? Math.min(100, Math.max(0, (minRent / MAX_LIMIT) * 100))
    : 0;
  const rightPercent = maxRent
    ? Math.min(100, Math.max(0, (maxRent / MAX_LIMIT) * 100))
    : 100;
  const widthPercent = Math.max(8, rightPercent - leftPercent);

  return (
    <ThemedView style={styles.container}>
      {/* Active Range Summary Banner */}
      <ThemedView
        variant="secondary"
        borderRadius="card"
        style={styles.summaryBar}
      >
        <ThemedView style={styles.summaryLeft}>
          <ThemedView>
            <ThemedText variant="caption" color="foreground.secondary">
              Selected Budget
            </ThemedText>
            <ThemedText variant="title" style={styles.formattedText}>
              {formattedRange}
              <ThemedText variant="caption" color="foreground.secondary">
                {" "}
                / month
              </ThemedText>
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {hasActivePrice && (
          <Pressable
            onPress={() => onChange(undefined, undefined)}
            hitSlop={10}
            style={styles.clearBadge}
          >
            <Ionicons name="close-circle" size={18} color="#98A0AE" />
          </Pressable>
        )}
      </ThemedView>

      {/* Visual Budget Progress Track */}
      <ThemedView style={styles.trackContainer}>
        <ThemedView style={styles.trackBackground}>
          <ThemedView
            style={[
              styles.trackActiveFill,
              {
                left: `${leftPercent}%`,
                width: `${widthPercent}%`,
              },
            ]}
          />
        </ThemedView>
        <ThemedView style={styles.trackLabels}>
          <ThemedText variant="caption" color="foreground.tertiary">
            ₹0
          </ThemedText>
          <ThemedText variant="caption" color="foreground.tertiary">
            ₹30K
          </ThemedText>
          <ThemedText variant="caption" color="foreground.tertiary">
            ₹60K+
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Preset Chips */}
      <ThemedView style={styles.presetsRow}>
        {PRICE_PRESETS.map((preset) => {
          const selected = isPresetActive(preset);
          return (
            <Pressable
              key={preset.id}
              onPress={() => handlePresetSelect(preset)}
              style={[styles.presetChipPressable, { width: "23%" }]}
            >
              <ThemedView
                variant={selected ? "accent-primary" : "secondary"}
                borderRadius="button"
                style={[
                  styles.presetChip,
                  selected && styles.presetChipSelected,
                ]}
              >
                <ThemedText
                  variant="caption"
                  color={selected ? "foreground.black" : "foreground.primary"}
                  style={styles.presetText}
                  numberOfLines={1}
                >
                  {preset.label}
                </ThemedText>
              </ThemedView>
            </Pressable>
          );
        })}
      </ThemedView>

      {/* Custom Min / Max Inputs */}
      <ThemedView style={styles.inputsRow}>
        <ThemedView style={styles.inputWrapper}>
          <ThemedTextInput
            variant="secondary"
            label="MINIMUM"
            labelVariant="caption"
            placeholder="0"
            keyboardType="number-pad"
            value={minRent !== undefined ? String(minRent) : ""}
            onChangeText={handleMinChange}
            leftIcon={
              <ThemedText
                variant="subTitle"
                color="foreground.secondary"
                style={styles.currencySymbol}
              >
                ₹
              </ThemedText>
            }
            paddingHorizontal="md"
            paddingVertical="sm"
          />
        </ThemedView>

        <ThemedView style={styles.dashContainer}>
          <ThemedText variant="title" color="foreground.tertiary">
            –
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.inputWrapper}>
          <ThemedTextInput
            variant="secondary"
            label="MAXIMUM"
            labelVariant="caption"
            placeholder="No max"
            keyboardType="number-pad"
            value={maxRent !== undefined ? String(maxRent) : ""}
            onChangeText={handleMaxChange}
            leftIcon={
              <ThemedText
                variant="subTitle"
                color="foreground.secondary"
                style={styles.currencySymbol}
              >
                ₹
              </ThemedText>
            }
            paddingHorizontal="md"
            paddingVertical="sm"
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: sizes.md,
  },
  summaryBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: sizes.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },
  summaryLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.md,
  },
  summaryIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(77, 164, 232, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  formattedText: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 1,
  },
  clearBadge: {
    padding: sizes.xs,
  },
  trackContainer: {
    gap: sizes.xs,
    paddingHorizontal: sizes.xs,
  },
  trackBackground: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    position: "relative",
    overflow: "hidden",
  },
  trackActiveFill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: "#4DA4E8",
    borderRadius: 3,
  },
  trackLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  presetsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: sizes.xs,
  },
  presetChipPressable: {},
  presetChip: {
    paddingVertical: sizes.sm,
    paddingHorizontal: sizes.xs,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },
  presetChipSelected: {
    borderWidth: 1.5,
    borderColor: "#161B24",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  presetText: {
    fontWeight: "700",
    fontSize: 11,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.sm,
  },
  inputWrapper: {
    flex: 1,
  },
  currencySymbol: {
    fontWeight: "700",
  },
  dashContainer: {
    paddingTop: sizes.md,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PriceRangeFilter;
