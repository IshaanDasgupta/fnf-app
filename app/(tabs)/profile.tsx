import React from "react";
import { StyleSheet } from "react-native";

import ProfileHero from "@/src/components/profile/ProfileHero";
import SavedListingsSection from "@/src/components/profile/SavedListingsSection";
import { LoadingErrorScreen } from "@/src/components/shared/LoadingErrorScreen";
import { LoadingScreen } from "@/src/components/shared/LoadingScreen";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/src/components/themed-ui/ThemedScrollView";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useProfile } from "@/src/hooks/react-query/useProfile";
import Toast from "react-native-toast-message";

export default function ProfileScreen() {
  const { data: user, isLoading, isError, refetch, isFetching } = useProfile();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError || !user) {
    return (
      <LoadingErrorScreen
        title="Couldn't load your profile"
        message={`We couldn’t connect to our servers.\n Please check your internet connection and try again.`}
        onRetry={async () => {
          const result = await refetch();

          if (result.isError || !result.data) {
            Toast.show({
              type: "error",
              text1: "Couldn't load your profile",
              text2: "Please try again in a moment.",
            });
          }
        }}
        retryLoading={isFetching}
      />
    );
  }

  return (
    <ThemedSafeArea variant="tertiary">
      <ThemedScrollView
        variant="primary"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        paddingBottom="8xl"
      >
        <ProfileHero name={user.name} age={user.age} gender={user.gender} />

        <ThemedView padding="lg" marginTop="xl" style={styles.bottomSection}>
          <SavedListingsSection listings={user.favorite_listings} />
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
});
