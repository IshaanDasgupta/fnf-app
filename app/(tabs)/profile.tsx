import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import ProfileBasicSection from "@/src/components/profile/ProfileBasicSection";
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

export default function ProfileScreen() {
  const router = useRouter();

  const logout = useAuthStore((state) => state.logout);
  const clearLocation = useLocationStore((state) => state.clearLocation);

  const { data: user, isLoading, isError } = useProfile();

  const handleEditProfile = () => {
    router.push(navigation.settings.profileBasicEdit);
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
          <ProfileBasicSection
            title="About"
            values={{
              name: user.name,
              age: user.age.toString(),
              gender: user.gender,
            }}
            onEdit={handleEditProfile}
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
