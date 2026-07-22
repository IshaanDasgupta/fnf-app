import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { ThemedButton } from "@/components/themed-ui/ThemedButton";
import { ThemedSafeArea } from "@/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/components/themed-ui/ThemedScrollView";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import { spacing } from "@/theme/spacing";
import { PhoneNumberInput } from "@/components/login/PhoneNumberInput";
import { OTPInput } from "@/components/login/OTPInput";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/auth";
import { navigation } from "@/lib/navigation";

type Step = "phone" | "otp";

export default function PhoneLoginScreen() {
  const [step, setStep] = useState<Step>("phone");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const resetOnboarding = useAuthStore((state) => state.resetOnboarding);

  const handleVerify = () => {
    login({ id: "demo-user", name: "Demo User", email: "demo@example.com" });
    resetOnboarding();
    router.replace(navigation.onboarding.step1);
  };

  return (
    <ThemedSafeArea>
      <ThemedScrollView padding="lg">
        <ThemedView flexDirection="row" alignItems="center" gap="sm">
          <ThemedView variant="secondary" padding="sm" borderRadius="md">
            <Ionicons name="home" size={20} color="white" />
          </ThemedView>

          <ThemedText variant="h3">FlatMate</ThemedText>
        </ThemedView>

        <ThemedView margin="2xl" gap="sm">
          <ThemedText variant="display" align="center">
            {step === "phone"
              ? "What's your\nphone number?"
              : "Enter the\nverification code"}
          </ThemedText>

          <ThemedText variant="body" color="text.secondary" align="center">
            {step === "phone"
              ? "We'll send you a one-time verification code."
              : `We've sent a 6 digit code to ${phone}`}
          </ThemedText>
        </ThemedView>

        <ThemedView margin="xl">
          {step === "phone" ? (
            <PhoneNumberInput value={phone} onChangeText={setPhone} />
          ) : (
            <OTPInput value={otp} onChange={setOtp} />
          )}
        </ThemedView>

        <ThemedButton
          fullWidth
          disabled={step === "phone" ? phone.length < 10 : otp.length < 6}
          onPress={() => {
            if (step === "phone") {
              setStep("otp");
              return;
            }
            handleVerify();
          }}
        >
          {step === "phone" ? "Continue" : "Verify"}
        </ThemedButton>
      </ThemedScrollView>
    </ThemedSafeArea>
  );
}
