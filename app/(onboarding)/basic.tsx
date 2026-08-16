import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { upsertBasic } from "@/src/api/user";
import CitySelectionInput from "@/src/components/shared/CitySelectionInput";
import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedChip } from "@/src/components/themed-ui/ThemedChip";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/src/components/themed-ui/ThemedScrollView";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedTextInput } from "@/src/components/themed-ui/ThemedTextInput";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

import { navigation } from "@/src/lib/navigation";
import { useAuthStore } from "@/src/stores/auth";
import { sizes } from "@/src/theme/size";

import { CITIES } from "@/src/constants/api-constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const BasicOnboardingFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  age: z
    .string()
    .min(1, "Age is required")
    .refine((value) => /^\d+$/.test(value), "Age must be a number")
    .refine((value) => Number(value) >= 18, "You must be at least 18"),

  gender: z.enum(["male", "female"], {
    message: "Please select your gender",
  }),

  city: z.enum(CITIES, {
    message:
      "Please select your city to continue, don't worry you can change it anytime later",
  }),
});

export type BasicOnboardingFormInput = z.input<
  typeof BasicOnboardingFormSchema
>;

export default function BasicOnboardingScreen() {
  const router = useRouter();

  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);

  const [loading, setLoading] = useState(false);
  const [cityError, setCityError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicOnboardingFormInput>({
    resolver: zodResolver(BasicOnboardingFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      age: "",
      gender: undefined,
      city: undefined,
    },
  });

  const handleContinue = async (data: BasicOnboardingFormInput) => {
    setLoading(true);

    try {
      const updatedUser = await upsertBasic({
        name: data.name,
        age: Number(data.age),
        gender: data.gender,
      });

      completeOnboarding(updatedUser.data);
      router.replace(navigation.tabs.home);
    } finally {
      setLoading(false);
    }
  };

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
            First, the basics.
          </ThemedText>

          <ThemedText variant="body" color="foreground.secondary">
            Only your first name and age are shown to others.
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

          <ThemedView>
            <ThemedText variant="h3" style={styles.sectionLabel}>
              City
            </ThemedText>

            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, value } }) => (
                <CitySelectionInput onSelect={onChange} />
              )}
            />

            {errors.city && (
              <ThemedText
                variant="caption"
                color="accent.red"
                style={styles.error}
              >
                {errors.city.message}
              </ThemedText>
            )}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <ThemedButton
            label="Continue"
            labelVariant="h2"
            loading={loading}
            onPress={handleSubmit(handleContinue)}
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
  },
});
