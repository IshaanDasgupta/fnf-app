import { useRouter } from "expo-router";
import React, { useState } from "react";

import { sendOTP } from "@/src/api/auth";
import { PhoneNumberInput } from "@/src/components/login/PhoneNumberInput";
import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/src/components/themed-ui/ThemedScrollView";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { navigation } from "@/src/lib/navigation";
import Toast from "react-native-toast-message";
import { z } from "zod";

const phoneSchema = z.object({
  phone: z
    .string()
    .regex(/^\d{10}$/, "Please enter a valid 10-digit phone number."),
});

export default function PhoneNumberScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [phoneError, setPhoneError] = useState<string>();

  const handleContinue = async () => {
    const result = phoneSchema.safeParse({ phone });
    if (!result.success) {
      setPhoneError(result.error.issues[0].message);
      return;
    }

    setPhoneError(undefined);
    setIsSendingOTP(true);

    try {
      await sendOTP(`+91${phone}`);

      router.push({
        pathname: navigation.auth.otp,
        params: { phone },
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Couldn't send OTP",
        text2: "Please check your phone number and try again.",
      });
      console.log(err);
    } finally {
      setIsSendingOTP(false);
    }
  };

  return (
    <ThemedSafeArea>
      <ThemedScrollView padding="lg" contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView margin="2xl" gap="sm" style={{ alignItems: "center" }}>
          <ThemedText variant="display" style={{ textAlign: "center" }}>
            What's your{"\n"}phone number?
          </ThemedText>

          <ThemedText variant="body" color="foreground.secondary">
            We'll send you a one-time verification code.
          </ThemedText>
        </ThemedView>

        <ThemedView marginVertical="xl">
          <PhoneNumberInput
            value={phone}
            onChangeText={(value) => {
              setPhone(value);
              setPhoneError(undefined);
            }}
          />

          {phoneError && (
            <ThemedText
              variant="caption"
              color="accent.red"
              style={{ marginTop: 4 }}
            >
              {phoneError}
            </ThemedText>
          )}
        </ThemedView>

        <ThemedView style={{ marginTop: "auto" }}>
          <ThemedButton
            onPress={handleContinue}
            label="Continue"
            labelVariant="h3"
            loading={isSendingOTP}
          />
        </ThemedView>
      </ThemedScrollView>
    </ThemedSafeArea>
  );
}
