import React from "react";
import { Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useTheme } from "@/src/hooks/theme/useTheme";

type ProfileBasicSectionProps = {
  title: string;
  values: {
    name: string;
    age: string;
    gender: string;
  };
  onEdit: () => void;
};

const fields = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "age",
    label: "Age",
  },
  {
    key: "gender",
    label: "Gender",
  },
] as const;

export default function ProfileBasicSection({
  title,
  values,
  onEdit,
}: ProfileBasicSectionProps) {
  return (
    <ThemedView>
      <ThemedView marginBottom="md" style={styles.header}>
        <ThemedText variant="h2">{title}</ThemedText>

        <Pressable onPress={onEdit}>
          <ThemedText variant="body" color="accent.primary">
            Edit
          </ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView variant="tertiary" borderRadius="card" style={styles.card}>
        {fields.map((field, index) => (
          <ProfileField
            key={field.key}
            label={field.label}
            value={getDisplayValue(field.key, values[field.key])}
            isLast={index === fields.length - 1}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}

function ProfileField({
  label,
  value,
  isLast,
}: {
  label: string;
  value: string;
  isLast: boolean;
}) {
  const { colors } = useTheme();

  return (
    <ThemedView
      padding="md"
      style={[
        styles.profileField,
        !isLast && {
          borderBottomColor: colors.border.secondary,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
      ]}
    >
      <ThemedText variant="body" color="foreground.secondary">
        {label}
      </ThemedText>

      <ThemedText variant="body" style={styles.fieldValue}>
        {value}
      </ThemedText>
    </ThemedView>
  );
}

function getDisplayValue(
  key: keyof (typeof fields)[number]["key"],
  value: string,
) {
  if (!value) {
    return "—";
  }

  if (key === "gender") {
    return value === "male" ? "Male" : "Female";
  }

  return value;
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  card: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },

  profileField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  fieldValue: {
    textAlign: "right",
  },
});
