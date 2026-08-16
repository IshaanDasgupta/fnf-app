import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { StyleSheet } from "react-native";
import { z } from "zod";

import { upsertBasic } from "@/src/api/user";
import EditableProfileSection, {
  EditableField,
} from "@/src/components/profile/EditableProfileScreen";
import ProfileHero from "@/src/components/profile/ProfileHero";
import { SavedListing } from "@/src/components/profile/SavedListingCard";
import SavedListingsSection from "@/src/components/profile/SavedListingsSection";
import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/src/components/themed-ui/ThemedScrollView";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useProfile } from "@/src/hooks/react-query/useProfile";
import { navigation } from "@/src/lib/navigation";
import { useAuthStore } from "@/src/stores/auth";
import { useLocationStore } from "@/src/stores/location";
import { useRouter } from "expo-router";

const ProfileSchema = z.object({
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

type ProfileForm = z.infer<typeof ProfileSchema>;

const profileFields: EditableField<ProfileForm>[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Your name",
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "Age",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: [
      {
        label: "Male",
        value: "male",
      },
      {
        label: "Female",
        value: "female",
      },
    ],
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const clearLocation = useLocationStore((state) => state.clearLocation);

  const { data: user, isLoading, isError } = useProfile();

  const handleSave = async (data: ProfileForm) => {
    try {
      await upsertBasic({
        name: data.name,
        age: Number(data.age),
        gender: data.gender,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    logout();
    clearLocation();
    router.replace(navigation.login);
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
        variant="secondary"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        paddingBottom="8xl"
      >
        <ProfileHero name={user.name} age={user.age} gender={user.gender} />

        <ThemedView paddingHorizontal="lg" marginTop="xl">
          <EditableProfileSection
            title="About"
            values={{
              name: user.name,
              age: user.age.toString(),
              gender: user.gender,
            }}
            fields={profileFields}
            resolver={zodResolver(ProfileSchema)}
            onSave={handleSave}
          />
        </ThemedView>

        <ThemedView padding="lg" marginTop="xl" style={styles.bottomSection}>
          <SavedListingsSection
            listings={user.favorite_listings as SavedListing[]}
          />

          <ThemedView style={styles.logoutContainer} paddingTop="xl">
            <ThemedButton
              label="Log out"
              variant="logout"
              onPress={handleLogout}
            />
          </ThemedView>
        </ThemedView>
      </ThemedScrollView>
    </ThemedSafeArea>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },

  bottomSection: {
    flex: 1,
  },

  logoutContainer: {
    marginTop: "auto",
  },

  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
