import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { z } from "zod";

import { upsertBasic } from "@/src/api/user";
import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedChip } from "@/src/components/themed-ui/ThemedChip";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/src/components/themed-ui/ThemedScrollView";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedTextInput } from "@/src/components/themed-ui/ThemedTextInput";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import {
  PROFILE_QUERY_KEY,
  useProfile,
} from "@/src/hooks/react-query/useProfile";
import { sizes } from "@/src/theme/size";
import { useQueryClient } from "@tanstack/react-query";

export const ProfileBasicEditSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  age: z
    .string()
    .min(1, "Age is required")
    .refine((value) => /^\d+$/.test(value), "Age must be a number")
    .refine((value) => Number(value) >= 18, "You must be at least 18"),

  gender: z.enum(["male", "female"], {
    message: "Please select your gender",
  }),
});

export type ProfileBasicEditFormInput = z.input<typeof ProfileBasicEditSchema>;

export default function ProfileBasicEditScreen() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data: user, isLoading, isError } = useProfile();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileBasicEditFormInput>({
    resolver: zodResolver(ProfileBasicEditSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      age: "",
      gender: undefined,
    },
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    reset({
      name: user.name,
      age: user.age.toString(),
      gender: user.gender,
    });
  }, [user, reset]);

  const handleSave = async (data: ProfileBasicEditFormInput) => {
    setLoading(true);

    try {
      await upsertBasic({
        name: data.name,
        age: Number(data.age),
        gender: data.gender,
      });

      await queryClient.invalidateQueries({
        queryKey: PROFILE_QUERY_KEY,
      });

      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <ThemedSafeArea>
        <ThemedView style={styles.loading}>
          <ThemedText variant="body">Loading profile...</ThemedText>
        </ThemedView>
      </ThemedSafeArea>
    );
  }

  if (isError || !user) {
    return (
      <ThemedSafeArea>
        <ThemedView style={styles.loading}>
          <ThemedText variant="body">Unable to load profile.</ThemedText>
        </ThemedView>
      </ThemedSafeArea>
    );
  }

  return (
    <ThemedSafeArea>
      <ThemedScrollView
        padding="lg"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView marginBottom="xl">
          <ThemedText
            variant="caption"
            color="accent.primary"
            style={styles.eyebrow}
          >
            ABOUT YOU
          </ThemedText>

          <ThemedText variant="display" style={{ marginBottom: sizes.sm }}>
            Edit your basics.
          </ThemedText>

          <ThemedText variant="body" color="foreground.secondary">
            Update your name, age, or gender.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.form}>
          {/* Name */}
          <ThemedView>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <ThemedTextInput
                  variant="secondary"
                  label="Name"
                  labelVariant="h3"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Your name"
                  textVariant="h1"
                  autoCapitalize="words"
                  paddingHorizontal="md"
                  paddingVertical="md"
                />
              )}
            />

            {errors.name && (
              <ThemedText
                variant="caption"
                color="accent.red"
                style={styles.error}
              >
                {errors.name.message}
              </ThemedText>
            )}
          </ThemedView>

          {/* Age */}
          <ThemedView>
            <Controller
              control={control}
              name="age"
              render={({ field: { onChange, value } }) => (
                <ThemedTextInput
                  variant="secondary"
                  label="Age"
                  labelVariant="h3"
                  value={value}
                  onChangeText={onChange}
                  placeholder="XX"
                  textVariant="h1"
                  keyboardType="number-pad"
                  maxLength={2}
                  paddingHorizontal="md"
                  paddingVertical="md"
                />
              )}
            />

            {errors.age && (
              <ThemedText
                variant="caption"
                color="accent.red"
                style={styles.error}
              >
                {errors.age.message}
              </ThemedText>
            )}
          </ThemedView>

          {/* Gender */}
          <ThemedView>
            <ThemedText variant="h3" style={styles.sectionLabel}>
              Gender
            </ThemedText>

            <ThemedView style={styles.genderContainer} gap="lg">
              <ThemedView style={styles.genderOption}>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { onChange, value } }) => (
                    <ThemedChip
                      variant="secondary"
                      selectedVariant="accent-primary"
                      selected={value === "male"}
                      label="Male"
                      labelVariant="h1"
                      onPress={() => onChange("male")}
                      style={styles.genderChip}
                      borderRadius="card"
                      controlled
                    />
                  )}
                />
              </ThemedView>

              <ThemedView style={styles.genderOption}>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { onChange, value } }) => (
                    <ThemedChip
                      variant="secondary"
                      selectedVariant="accent-primary"
                      selected={value === "female"}
                      label="Female"
                      labelVariant="h1"
                      onPress={() => onChange("female")}
                      style={styles.genderChip}
                      borderRadius="card"
                      controlled
                    />
                  )}
                />
              </ThemedView>
            </ThemedView>

            {errors.gender && (
              <ThemedText
                variant="caption"
                color="accent.red"
                style={styles.error}
              >
                {errors.gender.message}
              </ThemedText>
            )}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <ThemedButton
            variant="accent-secondary"
            label="Back"
            labelVariant="h2"
            onPress={handleBack}
            style={styles.backButton}
          />

          <ThemedButton
            label="Save changes"
            labelVariant="h2"
            loading={loading}
            onPress={handleSubmit(handleSave)}
            style={styles.saveButton}
          />
        </ThemedView>
      </ThemedScrollView>
    </ThemedSafeArea>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },

  form: {
    gap: sizes.xl,
  },

  eyebrow: {
    fontWeight: "700",
    letterSpacing: 1.4,
  },

  sectionLabel: {
    marginBottom: sizes.md,
  },

  genderContainer: {
    flexDirection: "row",
  },

  genderOption: {
    flex: 1,
  },

  genderChip: {
    width: "100%",
    paddingVertical: sizes.xl,
  },

  error: {
    marginTop: sizes.sm,
  },

  buttonContainer: {
    marginTop: "auto",
    flexDirection: "row",
    gap: sizes.md,
  },

  backButton: {
    flex: 1,
  },

  saveButton: {
    flex: 2,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
