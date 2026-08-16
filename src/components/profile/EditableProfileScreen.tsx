import React, { useState } from "react";
import {
  Control,
  Controller,
  DefaultValues,
  FieldErrors,
  FieldValues,
  Path,
  Resolver,
  useForm,
} from "react-hook-form";
import { Pressable, StyleSheet } from "react-native";

import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedChip } from "@/src/components/themed-ui/ThemedChip";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedTextInput } from "@/src/components/themed-ui/ThemedTextInput";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { sizes } from "@/src/theme/size";

type SelectOption = {
  label: string;
  value: string;
};

export type EditableField<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type: "text" | "number" | "select";

  placeholder?: string;

  options?: SelectOption[];

  displayValue?: (value: unknown) => string;
};

type EditableProfileSectionProps<T extends FieldValues> = {
  title: string;

  values: T;

  fields: EditableField<T>[];

  resolver?: Resolver<T>;

  loading?: boolean;

  onSave: (values: T) => void | Promise<void>;
};

export default function EditableProfileSection<T extends FieldValues>({
  title,
  values,
  fields,
  resolver,
  loading = false,
  onSave,
}: EditableProfileSectionProps<T>) {
  const { colors } = useTheme();

  const [editing, setEditing] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<T>({
    resolver,
    defaultValues: values as DefaultValues<T>,
    mode: "onChange",
  });

  const handleEdit = () => {
    reset(values as DefaultValues<T>);
    setEditing(true);
  };

  const handleCancel = () => {
    reset(values as DefaultValues<T>);
    setEditing(false);
  };

  const handleSave = async (data: T) => {
    await onSave(data);
    setEditing(false);
  };

  return (
    <ThemedView>
      {/* Section header */}
      <ThemedView marginBottom="md" style={styles.header}>
        <ThemedText variant="h2">{title}</ThemedText>

        {!editing && (
          <Pressable onPress={handleEdit}>
            <ThemedText variant="body" color="accent.primary">
              Edit
            </ThemedText>
          </Pressable>
        )}
      </ThemedView>

      {editing ? (
        <ThemedView
          borderRadius="card"
          padding="md"
          gap="lg"
          style={[
            styles.card,
            {
              borderColor: colors.border.secondary,
            },
          ]}
        >
          {fields.map((field) => (
            <EditableFieldInput
              key={String(field.name)}
              field={field}
              control={control}
              error={errors[field.name]}
            />
          ))}

          <ThemedView style={{ flexDirection: "row" }} gap="md" marginTop="sm">
            <ThemedButton
              label="Cancel"
              labelVariant="h3"
              variant="secondary"
              onPress={handleCancel}
              style={styles.actionButton}
            />

            <ThemedButton
              label="Save changes"
              labelVariant="h3"
              loading={loading}
              onPress={handleSubmit(handleSave)}
              style={styles.actionButton}
            />
          </ThemedView>
        </ThemedView>
      ) : (
        <ThemedView
          variant="tertiary"
          borderRadius="card"
          style={[
            styles.card,
            {
              borderColor: colors.border.secondary,
            },
          ]}
        >
          {fields.map((field, index) => (
            <ProfileField
              key={String(field.name)}
              label={field.label}
              value={getDisplayValue(field, values[field.name])}
              isLast={index === fields.length - 1}
            />
          ))}
        </ThemedView>
      )}
    </ThemedView>
  );
}

function EditableFieldInput<T extends FieldValues>({
  field,
  control,
  error,
}: {
  field: EditableField<T>;
  control: Control<T>;
  error?: FieldErrors<T>[Path<T>];
}) {
  if (field.type === "select") {
    return (
      <ThemedView>
        <ThemedText variant="h3" style={{ marginBottom: sizes.md }}>
          {field.label}
        </ThemedText>

        <Controller
          control={control}
          name={field.name}
          render={({ field: controllerField }) => (
            <ThemedView style={{ flexDirection: "row" }} gap="md">
              {field.options?.map((option) => (
                <ThemedChip
                  key={option.value}
                  label={option.label}
                  labelVariant="h3"
                  variant="secondary"
                  selectedVariant="accent-primary"
                  selected={controllerField.value === option.value}
                  onPress={() => controllerField.onChange(option.value)}
                  style={styles.selectOption}
                  borderRadius="card"
                />
              ))}
            </ThemedView>
          )}
        />

        <FieldError error={error} />
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <Controller
        control={control}
        name={field.name}
        render={({ field: controllerField }) => (
          <ThemedTextInput
            variant="secondary"
            label={field.label}
            labelVariant="h3"
            value={String(controllerField.value ?? "")}
            onChangeText={controllerField.onChange}
            placeholder={field.placeholder}
            autoCapitalize={field.type === "text" ? "words" : "none"}
            keyboardType={field.type === "number" ? "number-pad" : "default"}
            paddingHorizontal="md"
            paddingVertical="md"
          />
        )}
      />

      <FieldError error={error} />
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

function FieldError({ error }: { error: any }) {
  if (!error?.message) {
    return null;
  }

  return (
    <ThemedText variant="caption" color="accent.red" style={styles.error}>
      {String(error.message)}
    </ThemedText>
  );
}

function getDisplayValue<T extends FieldValues>(
  field: EditableField<T>,
  value: unknown,
) {
  if (value === undefined || value === null || value === "") {
    return "—";
  }

  if (field.displayValue) {
    return field.displayValue(value);
  }

  if (field.type === "select") {
    const option = field.options?.find((option) => option.value === value);

    return option?.label ?? String(value);
  }

  return String(value);
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

  selectOption: {
    flex: 1,
  },

  actionButton: {
    flex: 1,
  },

  error: {
    marginTop: sizes.sm,
  },
});
