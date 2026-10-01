import { FilterValues } from "@/src/api/listing";
import FilterBottomBar from "@/src/components/filter/FilterBottomBar";
import FilterHeader from "@/src/components/filter/FilterHeader";
import FilterSection from "@/src/components/filter/FilterSection";
import FilterTileGrid from "@/src/components/filter/FilterTileGrid";
import PriceRangeFilter from "@/src/components/filter/PriceRangeFilter";
import ToggleFilterCard from "@/src/components/filter/ToggleFilterCard";
import VisualGridCard from "@/src/components/filter/VisualGridCard";
import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/src/components/themed-ui/ThemedScrollView";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import {
  BHK_VISUAL_OPTIONS,
  FURNISHING_VISUAL_OPTIONS,
  GENDER_VISUAL_OPTIONS,
  OCCUPANCY_VISUAL_OPTIONS,
  POPULAR_ADDONS,
  POPULAR_AMENITIES,
  POPULAR_HOUSE_RULES,
  POPULAR_SERVICES,
  RENTAL_TYPE_VISUAL_OPTIONS,
} from "@/src/constants/filter-options";
import { FilterNavConfig } from "@/src/constants/filters";
import { countActiveFilters, useFilterStore } from "@/src/stores/filter";
import {
  countActiveMapFilters,
  useMapFilterStore,
} from "@/src/stores/map-filters";
import { sizes } from "@/src/theme/size";
import { DEFAULT_FILTER_VALUES } from "@/src/types/filter";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

export default function FiltersScreen() {
  const router = useRouter();
  const { source } = useLocalSearchParams<{
    source: "home" | "map" | "search";
  }>();

  const homeFilters = useFilterStore((state) => state.appliedFilters);
  const setHomeFilters = useFilterStore((state) => state.setAppliedFilters);

  const mapFilters = useMapFilterStore((state) => state.appliedMapFilters);
  const setMapFilters = useMapFilterStore(
    (state) => state.setAppliedMapFilters,
  );

  const isMap = source === "map";

  const appliedFilters = isMap ? mapFilters : homeFilters;
  const setAppliedFilters = isMap ? setMapFilters : setHomeFilters;

  const [draftFilters, setDraftFilters] = useState<FilterValues>({
    ...appliedFilters,
  });

  const activeCount = isMap
    ? countActiveMapFilters(draftFilters)
    : countActiveFilters(draftFilters);

  const toggleArrayItem = <T extends string | number>(
    key: keyof Pick<
      FilterValues,
      | "bhk"
      | "capacity"
      | "rentalType"
      | "furnishedStatus"
      | "amenities"
      | "addOns"
      | "houseRules"
      | "services"
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

    if (FilterNavConfig[source]) {
      router.replace(FilterNavConfig[source]);
    } else {
      router.back();
    }
  };

  const handleClear = () => {
    setDraftFilters({ ...DEFAULT_FILTER_VALUES });
  };

  return (
    <ThemedSafeArea variant="primary" edges={["top"]} padding="lg">
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
          {/* Budget / Rent */}
          <FilterSection
            iconName="wallet-outline"
            iconTintBg="rgba(77, 164, 232, 0.12)"
            iconTintColor="#4DA4E8"
            title="Monthly Budget"
            subtitle="Set your comfortable price range"
            badge={
              draftFilters.rentMin !== undefined ||
              draftFilters.rentMax !== undefined
                ? 1
                : undefined
            }
          >
            <PriceRangeFilter
              minRent={draftFilters.rentMin}
              maxRent={draftFilters.rentMax}
              onChange={(min, max) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  rentMin: min,
                  rentMax: max,
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

          {/* Rental Type */}
          <FilterSection
            iconName="bed-outline"
            iconTintBg="rgba(232, 236, 255, 0.7)"
            iconTintColor="#4338CA"
            title="Rental Type"
            subtitle="Choose room or hall rental"
            badge={draftFilters.rentalType.length}
          >
            <VisualGridCard
              items={RENTAL_TYPE_VISUAL_OPTIONS}
              selected={draftFilters.rentalType}
              columns={2}
              onToggle={(id) => toggleArrayItem("rentalType", id)}
            />
          </FilterSection>

          {/* Occupancy */}
          <FilterSection
            iconName="people-outline"
            iconTintBg="rgba(255, 229, 214, 0.7)"
            iconTintColor="#C2410C"
            title="Occupancy Type"
            subtitle="Choose private room or sharing"
            badge={draftFilters.capacity.length}
          >
            <VisualGridCard
              items={OCCUPANCY_VISUAL_OPTIONS}
              selected={draftFilters.capacity}
              columns={3}
              onToggle={(id) => toggleArrayItem("capacity", id)}
            />
          </FilterSection>

          {/* Furnishing Status */}
          <FilterSection
            iconName="bed-outline"
            iconTintBg="rgba(232, 236, 255, 0.7)"
            iconTintColor="#4338CA"
            title="Furnishing Status"
            subtitle="Level of furnishings in the house"
            badge={draftFilters.furnishedStatus.length}
          >
            <VisualGridCard
              items={FURNISHING_VISUAL_OPTIONS}
              selected={draftFilters.furnishedStatus}
              columns={3}
              onToggle={(id) => toggleArrayItem("furnishedStatus", id)}
            />
          </FilterSection>

          {/* Gender Preference */}
          <FilterSection
            iconName="person-outline"
            iconTintBg="rgba(255, 243, 213, 0.7)"
            iconTintColor="#B45309"
            title="Gender Preference"
            subtitle="Roommate & flatmate preference"
            badge={draftFilters.gender !== undefined ? 1 : undefined}
          >
            <VisualGridCard
              items={GENDER_VISUAL_OPTIONS}
              selected={draftFilters.gender ? [draftFilters.gender] : []}
              columns={2}
              onToggle={(id) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  gender: prev.gender === id ? undefined : id,
                }))
              }
            />
          </FilterSection>

          {/* Availability toggles */}
          <ToggleFilterCard
            title="Available Immediately"
            subtitle="Only show listings ready for instant possession"
            iconName="flash"
            active={!!draftFilters.availableImmediately}
            onToggle={() =>
              setDraftFilters((prev) => ({
                ...prev,
                availableImmediately: !prev.availableImmediately,
              }))
            }
          />

          <ToggleFilterCard
            title="Attached Washroom"
            subtitle="Only show listings with a private washroom"
            iconName="water-outline"
            active={draftFilters.attachedWashroom === true}
            onToggle={() =>
              setDraftFilters((prev) => ({
                ...prev,
                attachedWashroom:
                  prev.attachedWashroom === true ? undefined : true,
              }))
            }
          />

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

          {/* Services */}
          <FilterSection
            iconName="construct-outline"
            iconTintBg="rgba(232, 236, 255, 0.7)"
            iconTintColor="#4338CA"
            title="Services"
            subtitle="Cook, maid, laundry & more"
            badge={draftFilters.services.length}
          >
            <FilterTileGrid
              items={POPULAR_SERVICES}
              selected={draftFilters.services}
              columns={2}
              onToggle={(id) => toggleArrayItem("services", id)}
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
  },
  statusStripContainer: {
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
});
