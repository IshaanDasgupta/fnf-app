import FilterBottomBar from "@/src/components/filter/FilterBottomBar";
import FilterHeader from "@/src/components/filter/FilterHeader";
import FilterSection from "@/src/components/filter/FilterSection";
import FilterTileGrid from "@/src/components/filter/FilterTileGrid";
import PriceRangeFilter from "@/src/components/filter/PriceRangeFilter";
import VisualGridCard from "@/src/components/filter/VisualGridCard";
import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/src/components/themed-ui/ThemedScrollView";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import {
  BHK_VISUAL_OPTIONS,
  FURNISHING_VISUAL_OPTIONS,
  GENDER_VISUAL_OPTIONS,
  OCCUPANCY_VISUAL_OPTIONS,
  POPULAR_ADDONS,
  POPULAR_AMENITIES,
  POPULAR_HOUSE_RULES,
} from "@/src/constants/filter-options";
import { navigation } from "@/src/lib/navigation";
import { countActiveFilters, useFilterStore } from "@/src/stores/filter";
import { radius } from "@/src/theme/radius";
import { sizes } from "@/src/theme/size";
import { DEFAULT_FILTER_VALUES, FilterValues } from "@/src/types/filter";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

export default function FiltersScreen() {
  const router = useRouter();
  const appliedFilters = useFilterStore((state) => state.appliedFilters);
  const setAppliedFilters = useFilterStore((state) => state.setAppliedFilters);

  const [draftFilters, setDraftFilters] = useState<FilterValues>({
    ...appliedFilters,
  });

  const activeCount = countActiveFilters(draftFilters);

  const toggleArrayItem = <T extends string>(
    key: keyof Pick<
      FilterValues,
      "bhk" | "occupancy" | "furnishing" | "amenities" | "addOns" | "houseRules"
    >,
    item: T,
  ) => {
    setDraftFilters((prev) => {
      const current = prev[key] as T[];
      const exists = current.includes(item);
      const updated = exists
        ? current.filter((x) => x !== item)
        : [...current, item];
      return { ...prev, [key]: updated };
    });
  };

  const handleApply = () => {
    setAppliedFilters(draftFilters);
    router.replace(navigation.search);
  };

  const handleClear = () => {
    setDraftFilters({ ...DEFAULT_FILTER_VALUES });
  };

  return (
    <ThemedSafeArea variant="primary" edges={["top"]}>
      <ThemedView style={styles.container}>
        <FilterHeader
          title="Filters"
          onBack={() => router.back()}
          onReset={handleClear}
          canReset={activeCount > 0}
          activeCount={activeCount}
        />

        <ThemedScrollView
          variant="primary"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Active Filters Live Status Strip */}
          {activeCount > 0 && (
            <ThemedView style={styles.statusStripContainer}>
              <ThemedView
                variant="tertiary"
                borderRadius="card"
                style={styles.statusStrip}
              >
                <ThemedView style={styles.statusStripLeft}>
                  <ThemedView style={styles.pulseDot} />
                  <ThemedText variant="subTitle" color="foreground.primary">
                    {activeCount} {activeCount === 1 ? "Filter" : "Filters"}{" "}
                    Applied
                  </ThemedText>
                </ThemedView>

                <Pressable onPress={handleClear} hitSlop={8}>
                  <ThemedText variant="caption" color="accent.primary">
                    Reset all
                  </ThemedText>
                </Pressable>
              </ThemedView>
            </ThemedView>
          )}

          {/* Budget / Rent */}
          <FilterSection
            iconName="wallet-outline"
            iconTintBg="rgba(77, 164, 232, 0.12)"
            iconTintColor="#4DA4E8"
            title="Monthly Budget"
            subtitle="Set your comfortable price range"
            badge={
              draftFilters.minRent !== undefined ||
              draftFilters.maxRent !== undefined
                ? 1
                : undefined
            }
          >
            <PriceRangeFilter
              minRent={draftFilters.minRent}
              maxRent={draftFilters.maxRent}
              onChange={(min, max) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  minRent: min,
                  maxRent: max,
                }))
              }
            />
          </FilterSection>

          {/* BHK Type */}
          <FilterSection
            iconName="business-outline"
            iconTintBg="rgba(221, 245, 229, 0.7)"
            iconTintColor="#15803D"
            title="Property Size (BHK)"
            subtitle="Choose preferred apartment layouts"
            badge={draftFilters.bhk.length}
          >
            <VisualGridCard
              items={BHK_VISUAL_OPTIONS}
              selected={draftFilters.bhk}
              columns={4}
              onToggle={(id) => toggleArrayItem("bhk", id)}
            />
          </FilterSection>

          {/* Occupancy */}
          <FilterSection
            iconName="people-outline"
            iconTintBg="rgba(255, 229, 214, 0.7)"
            iconTintColor="#C2410C"
            title="Occupancy Type"
            subtitle="Choose private room or sharing"
            badge={draftFilters.occupancy.length}
          >
            <VisualGridCard
              items={OCCUPANCY_VISUAL_OPTIONS}
              selected={draftFilters.occupancy}
              columns={3}
              onToggle={(id) => toggleArrayItem("occupancy", id)}
            />
          </FilterSection>

          {/* Furnishing Status */}
          <FilterSection
            iconName="bed-outline"
            iconTintBg="rgba(232, 236, 255, 0.7)"
            iconTintColor="#4338CA"
            title="Furnishing Status"
            subtitle="Level of furnishings in the house"
            badge={draftFilters.furnishing.length}
          >
            <VisualGridCard
              items={FURNISHING_VISUAL_OPTIONS}
              selected={draftFilters.furnishing}
              columns={3}
              onToggle={(id) => toggleArrayItem("furnishing", id)}
            />
          </FilterSection>

          {/* Gender Preference */}
          <FilterSection
            iconName="person-outline"
            iconTintBg="rgba(255, 243, 213, 0.7)"
            iconTintColor="#B45309"
            title="Gender Preference"
            subtitle="Roommate & flatmate preference"
            badge={draftFilters.gender !== "all" ? 1 : undefined}
          >
            <VisualGridCard
              items={GENDER_VISUAL_OPTIONS}
              selected={[draftFilters.gender]}
              columns={3}
              onToggle={(id) =>
                setDraftFilters((prev) => ({ ...prev, gender: id }))
              }
            />
          </FilterSection>

          {/* Availability - Feature Card */}
          <ThemedView style={styles.availabilitySection}>
            <Pressable
              onPress={() =>
                setDraftFilters((prev) => ({
                  ...prev,
                  availableImmediately: !prev.availableImmediately,
                }))
              }
            >
              <ThemedView
                variant="tertiary"
                borderRadius="card"
                style={[
                  styles.availabilityCard,
                  draftFilters.availableImmediately &&
                    styles.availabilityCardActive,
                ]}
              >
                <ThemedView
                  style={[
                    styles.availabilityIconCircle,
                    {
                      backgroundColor: draftFilters.availableImmediately
                        ? "#4DA4E8"
                        : "rgba(77, 164, 232, 0.15)",
                    },
                  ]}
                >
                  <Ionicons
                    name="flash"
                    size={22}
                    color={
                      draftFilters.availableImmediately ? "#161B24" : "#4DA4E8"
                    }
                  />
                </ThemedView>

                <ThemedView style={styles.availabilityTexts}>
                  <ThemedView style={styles.hotBadgeRow}>
                    <ThemedText
                      variant="title"
                      style={styles.availabilityTitle}
                    >
                      Available Immediately
                    </ThemedText>
                    <ThemedView style={styles.hotBadge}>
                      <ThemedText style={styles.hotBadgeText}>
                        ⚡ FAST MOVE-IN
                      </ThemedText>
                    </ThemedView>
                  </ThemedView>
                  <ThemedText
                    variant="caption"
                    color="foreground.secondary"
                    style={styles.availabilitySubtitle}
                  >
                    Only show listings ready for instant possession
                  </ThemedText>
                </ThemedView>

                <ThemedView
                  style={[
                    styles.switchToggle,
                    draftFilters.availableImmediately
                      ? styles.switchToggleOn
                      : styles.switchToggleOff,
                  ]}
                >
                  <ThemedView
                    style={[
                      styles.switchThumb,
                      draftFilters.availableImmediately
                        ? styles.switchThumbOn
                        : styles.switchThumbOff,
                    ]}
                  />
                </ThemedView>
              </ThemedView>
            </Pressable>
          </ThemedView>

          {/* Key Amenities */}
          <FilterSection
            iconName="sparkles-outline"
            iconTintBg="rgba(221, 245, 229, 0.7)"
            iconTintColor="#15803D"
            title="Society Amenities"
            subtitle="Building facilities & perks"
            badge={draftFilters.amenities.length}
          >
            <FilterTileGrid
              items={POPULAR_AMENITIES}
              selected={draftFilters.amenities}
              columns={2}
              onToggle={(id) => toggleArrayItem("amenities", id)}
            />
          </FilterSection>

          {/* Add-ons & Inclusions */}
          <FilterSection
            iconName="apps-outline"
            iconTintBg="rgba(232, 236, 255, 0.7)"
            iconTintColor="#4338CA"
            title="Inclusions & Add-ons"
            subtitle="Appliances, staff & utilities"
            badge={draftFilters.addOns.length}
          >
            <FilterTileGrid
              items={POPULAR_ADDONS}
              selected={draftFilters.addOns}
              columns={2}
              onToggle={(id) => toggleArrayItem("addOns", id)}
            />
          </FilterSection>

          {/* House Rules */}
          <FilterSection
            iconName="shield-checkmark-outline"
            iconTintBg="rgba(255, 229, 214, 0.7)"
            iconTintColor="#C2410C"
            title="House Rules & Vibe"
            subtitle="Community rules & lifestyle preferences"
            badge={draftFilters.houseRules.length}
          >
            <FilterTileGrid
              items={POPULAR_HOUSE_RULES}
              selected={draftFilters.houseRules}
              columns={2}
              onToggle={(id) => toggleArrayItem("houseRules", id)}
            />
          </FilterSection>

          <Spacer size="6xl" />
        </ThemedScrollView>

        <FilterBottomBar
          onClear={handleClear}
          onApply={handleApply}
          activeCount={activeCount}
        />
      </ThemedView>
    </ThemedSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: sizes.sm,
    gap: sizes.sm,
    paddingBottom: sizes["6xl"],
  },
  statusStripContainer: {
    paddingHorizontal: sizes.lg,
    marginBottom: sizes.xs,
  },
  statusStrip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: sizes.md,
    paddingVertical: sizes.sm,
    borderWidth: 1,
    borderColor: "rgba(77, 164, 232, 0.3)",
    backgroundColor: "rgba(77, 164, 232, 0.08)",
  },
  statusStripLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.sm,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4DA4E8",
  },
  availabilitySection: {
    paddingHorizontal: sizes.lg,
    marginVertical: sizes.xs,
  },
  availabilityCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: sizes.lg,
    gap: sizes.md,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },
  availabilityCardActive: {
    borderColor: "rgba(77, 164, 232, 0.6)",
    backgroundColor: "rgba(77, 164, 232, 0.06)",
  },
  availabilityIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  availabilityTexts: {
    flex: 1,
  },
  hotBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.xs,
    flexWrap: "wrap",
  },
  availabilityTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  hotBadge: {
    backgroundColor: "rgba(255, 138, 0, 0.15)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  hotBadgeText: {
    color: "#E65100",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  availabilitySubtitle: {
    marginTop: 2,
    fontSize: 11,
  },
  switchToggle: {
    width: 46,
    height: 26,
    borderRadius: 13,
    padding: 2,
    justifyContent: "center",
  },
  switchToggleOff: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  switchToggleOn: {
    backgroundColor: "#4DA4E8",
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  switchThumbOff: {
    alignSelf: "flex-start",
  },
  switchThumbOn: {
    alignSelf: "flex-end",
  },
});
