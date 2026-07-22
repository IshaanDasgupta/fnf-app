# React Native Design System Guidelines

We are building a reusable React Native design system for an Expo Router application.

## General Principles

- Use TypeScript for everything.
- Components must be reusable and contain **no business logic**.
- Export strongly typed props.
- Components should be composable rather than configurable with dozens of props.
- Every component should include sensible defaults.
- Keep files under **250 lines**.
- If a component becomes large, split it into subcomponents.

---

## Theme System

The application supports **Light Mode** and **Dark Mode**.

### Colors

- **Never** import `lightColors`, `darkColors`, or `colors` directly inside components.
- Always use:

```ts
const colors = useColors();
```
