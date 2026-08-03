import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

import { ThemedButton } from "@/components/themed-ui/ThemedButton";
import { ThemedSafeArea } from "@/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/components/themed-ui/ThemedScrollView";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import { OTPInput } from "@/components/login/OTPInput";
import { PhoneNumberInput } from "@/components/login/PhoneNumberInput";
import { ENDPOINTS } from "@/constants/endpoints";
import { useTheme } from "@/hooks/useTheme";
import { navigation } from "@/lib/navigation";
import { useAuthStore } from "@/stores/auth";
import axiosClient from "@/utils/axios-client";
import { useRouter } from "expo-router";

type Step = "phone" | "otp";

export default function PhoneLoginScreen() {
  const { colors } = useTheme();
  const [step, setStep] = useState<Step>("phone");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const sendOtp = async () => {
    setLoading(true);

    try {
      await axiosClient.post(ENDPOINTS.AUTH.SEND_OTP, {
        phone: `+91${phone}`,
      });
      setStep("otp");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);

    try {
      const response = await axiosClient.post(ENDPOINTS.AUTH.VERIFY_OTP, {
        phone: `+91${phone}`,
        otp,
      });

      const {
        user,
        basicOnboardingCompleted,
        accessToken,
        refreshToken,
        expiresAt,
      } = response.data;

      login(
        user,
        basicOnboardingCompleted,
        accessToken,
        refreshToken,
        expiresAt,
      );

      basicOnboardingCompleted
        ? router.replace(navigation.tabs.home)
        : router.replace(navigation.onboarding.step1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedSafeArea>
      <ThemedScrollView padding="lg">
        <ThemedView
          style={{ flexDirection: "row", alignItems: "center" }}
          gap="sm"
        >
          <ThemedView variant="accent-primary" borderRadius="md" padding="sm">
            <Ionicons name="home" size={20} color={colors.foreground.white} />
          </ThemedView>

          <ThemedText variant="h3">FlatMate</ThemedText>
        </ThemedView>

        <ThemedView margin="2xl" gap="sm">
          <ThemedText variant="display" style={{ textAlign: "center" }}>
            {step === "phone"
              ? "What's your\nphone number?"
              : "Enter the\nverification code"}
          </ThemedText>

          <ThemedText
            variant="body"
            color="foreground.secondary"
            style={{ textAlign: "center" }}
          >
            {step === "phone"
              ? "We'll send you a one-time verification code."
              : `We've sent a 6 digit code to ${phone}`}
          </ThemedText>
        </ThemedView>

        <ThemedView marginVertical="xl">
          {step === "phone" ? (
            <PhoneNumberInput value={phone} onChangeText={setPhone} />
          ) : (
            <OTPInput value={otp} onChange={setOtp} />
          )}
        </ThemedView>

        <ThemedButton
          disabled={step === "phone" ? phone.length < 10 : otp.length < 6}
          onPress={() => {
            if (step === "phone") {
              sendOtp();
              return;
            }
            handleVerify();
          }}
          label={step === "phone" ? "Continue" : "Verify"}
          labelVariant="h2"
          loading={loading}
        />
      </ThemedScrollView>
    </ThemedSafeArea>
  );
}
