// import React from "react";
// import { Pressable, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeInRight,
//   FadeOutLeft,
//   LinearTransition,
// } from "react-native-reanimated";

// import { ThemedText } from "@/components/themed-ui/ThemedText";
// import { useColors } from "@/hooks/useColors";
// import { spacing } from "@/theme/spacing";
// import { radius } from "@/theme/radius";

// interface Props {
//   focused: boolean;
//   label: string;
//   activeIcon: keyof typeof Ionicons.glyphMap;
//   inactiveIcon: keyof typeof Ionicons.glyphMap;
//   onPress(): void;
// }

// const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// const BUTTON_HEIGHT = 48;
// const ICON_SIZE = 20;

// export default function BottomTabItem({
//   focused,
//   label,
//   activeIcon,
//   inactiveIcon,
//   onPress,
// }: Props) {
//   const colors = useColors();

//   return (
//     <AnimatedPressable
//       onPress={onPress}
//       layout={LinearTransition.springify().damping(18).stiffness(220)}
//       style={[
//         styles.container,
//         focused && styles.activeContainer,
//         {
//           backgroundColor: focused ? colors.black : "transparent",
//         },
//       ]}
//     >
//       <Ionicons
//         name={focused ? activeIcon : inactiveIcon}
//         size={ICON_SIZE}
//         color={focused ? colors.white : colors.text.secondary}
//       />

//       {focused && (
//         <Animated.View
//           layout={LinearTransition.springify()}
//           style={{
//             overflow: "hidden",
//             marginLeft: focused ? spacing.sm : 0,
//             width: focused ? "auto" : 0,
//             opacity: focused ? 1 : 0,
//           }}
//         >
//           <ThemedText variant="tab" color="white">
//             {label}
//           </ThemedText>
//         </Animated.View>
//       )}
//     </AnimatedPressable>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     height: BUTTON_HEIGHT,

//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",

//     borderRadius: radius.phone,

//     paddingHorizontal: spacing.lg,
//   },

//   activeContainer: {
//     justifyContent: "flex-start",
//   },

//   label: {
//     marginLeft: spacing.sm,
//   },
// });

import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  LinearTransition,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { ThemedText } from "@/components/themed-ui/ThemedText";
import { useColors } from "@/hooks/useColors";
import { spacing } from "@/theme/spacing";
import { radius } from "@/theme/radius";

interface Props {
  focused: boolean;
  label: string;
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
  onPress(): void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ICON_SIZE = 20;
const BUTTON_HEIGHT = 48;

export default function BottomTabItem({
  focused,
  label,
  activeIcon,
  inactiveIcon,
  onPress,
}: Props) {
  const colors = useColors();

  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    if (focused) {
      progress.value = withSpring(1, {
        damping: 100,
        stiffness: 600,
      });
    } else {
      // Instant collapse
      progress.value = 0;
    }
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    paddingHorizontal: interpolate(
      progress.value,
      [0, 1],
      [spacing.md, spacing.lg],
    ),

    columnGap: interpolate(progress.value, [0, 1], [0, spacing.sm]),

    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ["rgba(0,0,0,0)", colors.black],
    ),
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      layout={LinearTransition.springify().damping(18).stiffness(220)}
      style={[
        styles.container,
        focused && styles.activeContainer,
        animatedStyle,
      ]}
    >
      <Ionicons
        name={focused ? activeIcon : inactiveIcon}
        size={ICON_SIZE}
        color={focused ? colors.white : colors.text.secondary}
      />

      {focused && (
        <Animated.View
          entering={FadeInRight.duration(180)}
          exiting={FadeOutLeft.duration(120)}
          layout={LinearTransition.springify()}
        >
          <ThemedText variant="tab" color="white">
            {label}
          </ThemedText>
        </Animated.View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: BUTTON_HEIGHT,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: radius.phone,

    overflow: "hidden",
  },

  activeContainer: {
    justifyContent: "flex-start",
  },
});
