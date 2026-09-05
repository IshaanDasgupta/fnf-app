import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import { sendOTP, verifyOTP } from "@/src/api/auth";
import { OTPInput } from "@/src/components/login/OTPInput";
import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/src/components/themed-ui/ThemedScrollView";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { navigation } from "@/src/lib/navigation";
import { useAuthStore } from "@/src/stores/auth";
import Toast from "react-native-toast-message";

const RESEND_COOLDOWN = 30;

export default function OTPScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const { phone } = useLocalSearchParams<{
    phone: string;
  }>();

  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN);

  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleVerify = async () => {
    if (!phone) return;

    setIsVerifying(true);

    try {
      const { user, accessToken, refreshToken, refreshExpiresAt } =
        await verifyOTP(`+91${phone}`, otp);

      login(user, accessToken, refreshToken, refreshExpiresAt);

      if (user.basicOnboardingCompleted) {
        router.replace(navigation.tabs.home);
      } else {
        router.replace(navigation.onboarding.basic);
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Invalid or expired code",
        text2: "Please check the code or generate a new OTP.",
      });

      console.log(err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!phone || isResending || resendCooldown > 0) return;

    setIsResending(true);

    try {
      await sendOTP(`+91${phone}`);

      setOtp("");
      setResendCooldown(RESEND_COOLDOWN);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Couldn't resend OTP",
        text2: "Please wait a moment and try again.",
      });

      console.log(err);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <ThemedSafeArea>
      <ThemedScrollView padding="lg" contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          gap="sm"
        >
          <ThemedView variant="accent-primary" borderRadius="md" padding="sm">
            <Ionicons name="home" size={20} color={colors.foreground.white} />
          </ThemedView>

          <ThemedText variant="h3">FlatMate</ThemedText>
        </ThemedView>

        <ThemedView margin="2xl" gap="sm" style={{ alignItems: "center" }}>
          <ThemedText variant="display" style={{ textAlign: "center" }}>
            Enter the{"\n"}verification code
          </ThemedText>

          <ThemedText
            variant="body"
            color="foreground.secondary"
            style={{ textAlign: "center" }}
          >
            We've sent a 6 digit code to +91 {phone}
          </ThemedText>
        </ThemedView>

        <ThemedView marginVertical="xl">
          <OTPInput value={otp} onChange={setOtp} />
        </ThemedView>

        <ThemedView
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isResending ? (
            <ThemedText variant="body" color="foreground.secondary">
              Sending a new code...
            </ThemedText>
          ) : (
            <>
              <ThemedText variant="body" color="foreground.secondary">
                Didn't receive the code?{" "}
              </ThemedText>

              {resendCooldown > 0 ? (
                <ThemedText variant="body" color="foreground.secondary">
                  Resend in {resendCooldown}s
                </ThemedText>
              ) : (
                <ThemedText
                  variant="body"
                  color="accent.primary"
                  onPress={handleResend}
                >
                  Resend OTP
                </ThemedText>
              )}
            </>
          )}
        </ThemedView>

        <ThemedView style={{ marginTop: "auto" }}>
          <ThemedButton
            disabled={otp.length < 6}
            onPress={handleVerify}
            label="Verify"
            labelVariant="h2"
            loading={isVerifying}
          />
        </ThemedView>
      </ThemedScrollView>
    </ThemedSafeArea>
  );
}
