import React from "react";
import { StyleSheet } from "react-native";

import SeparatedText from "@/src/components/shared/SeperatedText";
import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { navigation } from "@/src/lib/navigation";
import { useAuthStore } from "@/src/stores/auth";
import { useLocationStore } from "@/src/stores/location";
import { radius } from "@/src/theme/radius";
import { sizes } from "@/src/theme/size";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type ProfileHeroProps = {
  name: string;
  age?: number;
  gender?: "male" | "female";
};

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export default function ProfileHero({ name, age, gender }: ProfileHeroProps) {
  const router = useRouter();

  const logout = useAuthStore((state) => state.logout);
  const clearLocation = useLocationStore((state) => state.clearLocation);

  const firstName = name.split(" ")[0];

  const details = [
    age ? `${age} yrs` : undefined,
    gender ? capitalize(gender) : undefined,
  ].filter((item): item is string => Boolean(item));

  const handleEditProfile = () => {
    router.push(navigation.settings.profileBasicEdit);
  };

  const handleLogout = () => {
    logout();
    clearLocation();
    router.replace(navigation.auth.login);
  };

  return (
    <ThemedView
      variant="tertiary"
      padding="lg"
      paddingVertical="4xl"
      style={styles.hero}
    >
      <ThemedView style={styles.avatarWrapper}>
        <ThemedView
          variant="inverse"
          style={styles.avatar}
          padding="lg"
          borderRadius="button"
        >
          <ThemedText variant="display" color="foreground.inverse">
            {firstName.charAt(0).toUpperCase()}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <Spacer size="xl" />

      <ThemedText variant="display" style={styles.profileName}>
        {name}
      </ThemedText>

      <Spacer size="xs" />

      <SeparatedText
        items={details}
        color="foreground.secondary"
        variant="body"
      />

      <Spacer size="xl" />
      <ThemedView style={{ flexDirection: "row" }} gap="lg">
        <ThemedButton
          variant="secondary"
          leftIcon={<Feather name="edit-2" size={16} />}
          label="Edit Profile"
          labelVariant="title"
          gap="md"
          style={{ paddingHorizontal: sizes["2xl"] }}
          onPress={handleEditProfile}
        />

        <ThemedButton
          variant="secondary"
          leftIcon={<MaterialIcons name="logout" size={16} />}
          label="Log out"
          labelVariant="title"
          gap="md"
          style={{ paddingHorizontal: sizes["2xl"] }}
          onPress={handleLogout}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    borderBottomLeftRadius: radius.card,
    borderBottomRightRadius: radius.card,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  cameraButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: sizes.sm,
    borderRadius: sizes.xl,
    borderWidth: StyleSheet.hairlineWidth,
  },

  profileName: {
    textAlign: "center",
  },
});
