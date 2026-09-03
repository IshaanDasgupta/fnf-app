import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="profile-basic-edit"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
