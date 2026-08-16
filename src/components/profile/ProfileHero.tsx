import React from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { radius } from "@/src/theme/radius";
import { sizes } from "@/src/theme/size";

type ProfileHeroProps = {
  name: string;
  age?: number;
  gender?: "male" | "female";
};

export default function ProfileHero({ name, age, gender }: ProfileHeroProps) {
  const firstName = name.split(" ")[0];

  return (
    <ThemedView
      variant="primary"
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

      <ThemedText variant="display" style={styles.profileName}>
        {name}
        {age ? `, ${age}` : ""}
      </ThemedText>

      {gender && (
        <ThemedText variant="body" color="foreground.secondary">
          {gender === "male" ? "Male" : "Female"}
        </ThemedText>
      )}
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
    marginTop: sizes.md,
    textAlign: "center",
  },

  editButton: {
    marginTop: sizes.lg,
  },
});
