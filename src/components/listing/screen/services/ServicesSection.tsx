import { Ionicons } from "@expo/vector-icons";
import React from "react";

import ServiceCard from "@/src/components/listing/screen/services/ServiceCard";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { ListingResponse } from "@/src/api/listing";
import { ServiceType } from "@/src/constants/api-constants";

interface ServicesSectionProps {
  services: ListingResponse["services"];
}

const serviceIcons: Record<ServiceType, keyof typeof Ionicons.glyphMap> = {
  cook: "restaurant-outline",
  maid: "person-outline",
  housekeeping: "sparkles-outline",
  laundry: "shirt-outline",
  other: "information-circle-outline",
};

function formatLabel(type: ServiceType) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <ThemedView gap="lg">
      <ThemedText variant="h2">Services</ThemedText>

      <ThemedView style={{ flexDirection: "row", flexWrap: "wrap" }} gap="md">
        {services.map((service, index) => (
          <ServiceCard
            key={`${service.type}-${index}`}
            icon={
              <Ionicons
                name={serviceIcons[service.type] ?? "checkmark-circle-outline"}
                size={18}
              />
            }
            label={
              service.type === "other" ? "Other" : formatLabel(service.type)
            }
            desc={service.desc}
            price={service.price}
            included={service.included}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}
