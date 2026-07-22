# Design System Components

This document is intentionally self-contained. An external agent should be able to build screens with these components without inspecting the rest of the project, as long as the host app exposes the minimal theme contract described below.

---

# 1. Required Integration Contract

These components assume the host app provides the following:

- a `useColors()` hook that returns the current theme colors
- a `useTheme()` hook or equivalent theme context
- theme token modules for `spacing`, `radius`, `typography`, and `shadows`
- a `SafeAreaProvider` wrapping the root application tree

## Minimal host contract

```ts
// hooks/useColors.ts
import { useTheme } from "./useTheme";

export function useColors() {
  return useTheme().colors;
}
```

```tsx
// App root
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <YourApp />
    </SafeAreaProvider>
  );
}
```

## Required theme tokens

### Semantic color keys

Use these as values for `color`, `backgroundColor`, `borderColor`, and similar props:

- `primary`
- `primaryPressed`
- `text`
- `textSecondary`
- `textMuted`
- `white`
- `black`
- `background`
- `backgroundSecondary`
- `card`
- `surface`
- `border`
- `borderLight`
- `success`
- `warning`
- `error`
- `overlay`
- `glass`

### Spacing keys

Use these for `padding`, `margin`, and related layout props:

- `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`

### Radius keys

Use these for `borderRadius` and related props:

- `xs`, `sm`, `md`, `lg`, `xl`, `card`, `input`, `button`, `phone`, `device`

### Typography variants

Use these for `ThemedText`:

- `display`, `h1`, `h2`, `h3`, `title`, `body`, `bodySmall`, `caption`, `overline`

---

# 2. Component Reference

## ThemedButton

### Purpose

A reusable button for primary actions, secondary actions, outlined actions, and low-emphasis actions.

### Import

```ts
import { ThemedButton } from "@/components/themed-ui/ThemedButton";
```

### Props

| prop      | type                                             | default   | description                                          |
| --------- | ------------------------------------------------ | --------- | ---------------------------------------------------- |
| variant   | "primary" \| "secondary" \| "outline" \| "ghost" | "primary" | Visual style of the button.                          |
| loading   | boolean                                          | false     | Shows an ActivityIndicator and disables interaction. |
| disabled  | boolean                                          | false     | Disables interaction and applies disabled styling.   |
| fullWidth | boolean                                          | false     | Expands to full width.                               |
| leftIcon  | React.ReactNode                                  | undefined | Optional leading icon.                               |
| rightIcon | React.ReactNode                                  | undefined | Optional trailing icon.                              |
| children  | React.ReactNode                                  | required  | Label content.                                       |
| style     | Pressable style                                  | undefined | Style override.                                      |

### Variants

- `primary`: strong CTA.
- `secondary`: supporting action.
- `outline`: neutral action with border.
- `ghost`: low-emphasis action.

### States

- default
- pressed
- loading
- disabled

### Usage

```tsx
<ThemedButton variant="primary" onPress={handleContinue} fullWidth>
  Continue
</ThemedButton>
```

```tsx
<ThemedButton variant="outline" loading>
  Saving
</ThemedButton>
```

### Composition

Use inside row layouts, card containers, or form sections. Compose with `ThemedView` and `ThemedText`.

### Accessibility

Provide a meaningful label or visible text. The component automatically uses button semantics and respects loading/disabled states.

### Do

- Use it for actions instead of a raw `Pressable`.
- Keep labels short and explicit.

### Don't

- Put business logic in the component.
- Hardcode colors.

---

## ThemedIconButton

### Purpose

A compact icon-only action button for toolbar actions, toggles, and compact controls.

### Import

```ts
import { ThemedIconButton } from "@/components/themed-ui/ThemedIconButton";
```

### Props

| prop               | type                                             | default   | description                                                              |
| ------------------ | ------------------------------------------------ | --------- | ------------------------------------------------------------------------ |
| variant            | "primary" \| "secondary" \| "outline" \| "ghost" | "primary" | Visual style.                                                            |
| size               | "xs" \| "sm" \| "md" \| "lg" \| "xl"             | "md"      | Button size.                                                             |
| icon               | React.ReactNode                                  | required  | Icon content. Prefer a component that supports `color` and `size` props. |
| loading            | boolean                                          | false     | Shows a spinner and disables interaction.                                |
| disabled           | boolean                                          | false     | Disables interaction.                                                    |
| selected           | boolean                                          | false     | Applies selected styling.                                                |
| fullWidth          | boolean                                          | false     | Expands to available width if used in a row.                             |
| accessibilityLabel | string                                           | undefined | Required for icon-only controls.                                         |
| accessibilityHint  | string                                           | undefined | Optional assistive hint.                                                 |

### Variants

- `primary`
- `secondary`
- `outline`
- `ghost`

### Sizes

- `xs`, `sm`, `md`, `lg`, `xl`

### States

- default
- pressed
- loading
- disabled
- selected

### Usage

```tsx
<ThemedIconButton
  variant="ghost"
  size="md"
  icon={<Ionicons name="heart" />}
  accessibilityLabel="Favorite"
/>
```

```tsx
<ThemedIconButton variant="outline" size="lg" icon={<Icon />} selected />
```

### Composition

Use with icon components such as Ionicons or MaterialCommunityIcons. Pair with `ThemedView` for layout grouping.

### Accessibility

Always provide `accessibilityLabel` for icon-only buttons.

### Do

- Keep icon-only controls explicit.
- Prefer it for compact actions.

### Don't

- Render icon buttons without labels.
- Use it for long text actions.

---

## ThemedText

### Purpose

A theme-aware typography primitive for headings, labels, body copy, and captions.

### Import

```ts
import { ThemedText } from "@/components/themed-ui/ThemedText";
```

### Props

| prop     | type                                                 | default   | description                    |
| -------- | ---------------------------------------------------- | --------- | ------------------------------ |
| variant  | keyof typography                                     | "body"    | Typography preset.             |
| color    | semantic theme color key                             | "text"    | Text color.                    |
| align    | "auto" \| "left" \| "right" \| "center" \| "justify" | "left"    | Text alignment.                |
| weight   | font weight string                                   | undefined | Optional font weight override. |
| children | React.ReactNode                                      | required  | The text content.              |

### Variants

- `display`, `h1`, `h2`, `h3`, `title`, `body`, `bodySmall`, `caption`, `overline`

### States

- default

### Usage

```tsx
<ThemedText variant="title" color="text">
  Section Title
</ThemedText>
```

```tsx
<ThemedText variant="bodySmall" color="textSecondary">
  Supporting copy
</ThemedText>
```

### Composition

Use inside `ThemedView`, `ThemedScrollView`, `ThemedSafeArea`, and button-like containers.

### Accessibility

Use the correct hierarchy and keep contrast readable.

### Do

- Reuse `ThemedText` instead of plain `Text`.
- Match content hierarchy to the UI role.

### Don't

- Hardcode font sizes or colors.
- Use arbitrary text styles for semantic headings.

---

## ThemedView

### Purpose

A theme-aware layout wrapper for containers, rows, cards, and content sections.

### Import

```ts
import { ThemedView } from "@/components/themed-ui/ThemedView";
```

### Props

| prop            | type                                                             | default   | description                   |
| --------------- | ---------------------------------------------------------------- | --------- | ----------------------------- |
| variant         | "default" \| "surface" \| "card" \| "secondary" \| "transparent" | "default" | Surface variant.              |
| backgroundColor | semantic theme color key                                         | undefined | Overrides the background.     |
| borderColor     | semantic theme color key                                         | undefined | Overrides the border color.   |
| borderRadius    | keyof radius \| number                                           | undefined | Border radius token or value. |
| padding         | keyof spacing \| number                                          | undefined | Padding token or value.       |
| margin          | keyof spacing \| number                                          | undefined | Margin token or value.        |
| flex            | number \| "auto"                                                 | undefined | Flex value.                   |
| justifyContent  | flex alignment                                                   | undefined | Main-axis alignment.          |
| alignItems      | flex alignment                                                   | undefined | Cross-axis alignment.         |

### Variants

- `default`: base screen surface.
- `surface`: elevated surface.
- `card`: card container.
- `secondary`: secondary background.
- `transparent`: transparent container.

### States

- default
- visual variant state

### Usage

```tsx
<ThemedView variant="card" padding="lg">
  <ThemedText variant="title">Card</ThemedText>
</ThemedView>
```

```tsx
<ThemedView variant="secondary" flex={1} />
```

### Composition

Use as the default container for cards, rows, and sections. Compose with text, buttons, and icon buttons.

### Accessibility

Maintain sufficient contrast between content and background.

### Do

- Prefer semantic variants over custom background props.
- Use spacing tokens for layout.

### Don't

- Create ad-hoc wrappers with hardcoded colors.
- Put view-specific logic in this component.

---

## ThemedScrollView

### Purpose

A theme-aware scroll container for long screens, forms, and content that exceeds the viewport.

### Import

```ts
import { ThemedScrollView } from "@/components/themed-ui/ThemedScrollView";
```

### Props

| prop            | type                                                             | default   | description               |
| --------------- | ---------------------------------------------------------------- | --------- | ------------------------- |
| variant         | "default" \| "surface" \| "card" \| "secondary" \| "transparent" | "default" | Surface variant.          |
| backgroundColor | semantic theme color key                                         | undefined | Overrides the background. |
| padding         | keyof spacing \| number                                          | undefined | Content padding.          |
| children        | React.ReactNode                                                  | undefined | Scroll content.           |

### Variants

- `default`
- `surface`
- `card`
- `secondary`
- `transparent`

### States

- default

### Usage

```tsx
<ThemedScrollView variant="default" padding="lg">
  <ThemedView variant="card" padding="md" />
</ThemedScrollView>
```

### Composition

Use inside `ThemedSafeArea` for full-screen content. Combine with `ThemedView` and `ThemedText`.

### Accessibility

Keep scroll behavior predictable and avoid nesting multiple scroll containers unless necessary.

### Do

- Use it for long content.
- Pair it with `ThemedSafeArea` at the screen root.

### Don't

- Use it for short, simple screens when a plain layout container is enough.
- Nest scroll views unnecessarily.

---

## ThemedSafeArea

### Purpose

A theme-aware safe-area wrapper for the outer shell of a screen.

### Import

```ts
import { ThemedSafeArea } from "@/components/themed-ui/ThemedSafeArea";
```

### Props

| prop            | type                                                             | default   | description               |
| --------------- | ---------------------------------------------------------------- | --------- | ------------------------- |
| variant         | "default" \| "surface" \| "card" \| "secondary" \| "transparent" | "default" | Surface variant.          |
| backgroundColor | semantic theme color key                                         | undefined | Overrides the background. |
| children        | React.ReactNode                                                  | undefined | Screen content.           |

### Variants

- `default`
- `surface`
- `card`
- `secondary`
- `transparent`

### States

- default

### Usage

```tsx
<ThemedSafeArea variant="default">
  <ThemedScrollView padding="lg">
    <ThemedView variant="card" padding="md" />
  </ThemedScrollView>
</ThemedSafeArea>
```

### Composition

Use as the outermost wrapper for a screen. Combine with `ThemedScrollView`, `ThemedView`, `ThemedText`, `ThemedButton`, and `ThemedIconButton`.

### Accessibility

Preserve readable content insets and do not hide important UI behind safe areas.

### Do

- Use it at the root of screens.
- Keep the background consistent with the app theme.

### Don't

- Replace it with a plain `View`.
- Add screen-specific business logic to it.

---

# 3. Design System Principles

- Prefer composition over configuration.
- Reuse existing components before introducing new ones.
- Prefer semantic props over visual props.
- Keep components generic and presentational.
- Keep reusable components free of business logic and navigation concerns.
- Use theme tokens instead of hardcoded values.
- Never import `lightColors`, `darkColors`, or `colors` directly in reusable components.

---

# 4. Theme Guidelines

- Use `useColors()` in every reusable component that needs theme-aware visual values.
- Prefer semantic colors such as `background`, `surface`, `card`, `text`, `textSecondary`, `border`, `primary`, and `success`/`warning`/`error`.
- Use `typography` for text hierarchy.
- Use `spacing` for layout gaps and padding.
- Use `radius` for rounded surfaces and controls.
- Use `shadows` for depth.
- Keep theme-dependent values inside the component via `useColors()` rather than hardcoding them.

---

# 5. Component Selection Guide

Use the following mapping when building UI:

- Use `ThemedView` instead of a plain `View` for content containers and section layouts.
- Use `ThemedText` instead of a plain `Text` for all typography.
- Use `ThemedButton` for text actions.
- Use `ThemedIconButton` for icon-only actions.
- Use `ThemedSafeArea` as the outer screen wrapper.
- Use `ThemedScrollView` for content that may overflow the viewport.

Typical composition pattern:

```tsx
<ThemedSafeArea variant="default">
  <ThemedScrollView variant="default" padding="lg">
    <ThemedView variant="card" padding="md">
      <ThemedText variant="title">Section Title</ThemedText>
      <ThemedButton variant="primary">Continue</ThemedButton>
    </ThemedView>
  </ThemedScrollView>
</ThemedSafeArea>
```

---

# 6. Composition Guidelines

Build larger components by nesting from the outside in:

1. `ThemedSafeArea` for screen shell
2. `ThemedScrollView` for scrolling body
3. `ThemedView` for section or card containers
4. `ThemedText`, `ThemedButton`, and `ThemedIconButton` for content and actions

Keep the hierarchy shallow and composable. Put screen-specific logic in the parent screen component, not in the reusable primitives.

---

# 7. Reuse Rules

- Always reuse an existing component before creating a new one.
- Never recreate a card, button, label, or container if a themed component exists.
- Never duplicate typography tokens, spacing values, or colors.
- Never hardcode colors, radii, shadows, or text styles.
- Never bypass the design system for layout or surface styling.
- Prefer extending existing components over copying them.
- Keep reusable components presentational and composable.

---

# 8. Component Inventory

| Name             | Purpose                        | Variants                                                       | Typical Usage                |
| ---------------- | ------------------------------ | -------------------------------------------------------------- | ---------------------------- |
| ThemedButton     | Text action button             | primary, secondary, outline, ghost                             | CTAs, inline actions         |
| ThemedIconButton | Icon-only action button        | primary, secondary, outline, ghost                             | Toolbar actions, toggles     |
| ThemedText       | Themed typography              | display, h1, h2, h3, title, body, bodySmall, caption, overline | Headings, labels, paragraphs |
| ThemedView       | Themed layout container        | default, surface, card, secondary, transparent                 | Cards, rows, sections        |
| ThemedScrollView | Themed scroll container        | default, surface, card, secondary, transparent                 | Long screens, forms, lists   |
| ThemedSafeArea   | Safe-area-aware screen wrapper | default, surface, card, secondary, transparent                 | Root screen shell            |
