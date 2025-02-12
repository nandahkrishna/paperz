"use client";
import {
  useMantineColorScheme,
  useComputedColorScheme,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const theme = useMantineTheme();

  return (
    <UnstyledButton
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      aria-label="Toggle color scheme"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {computedColorScheme === "light" ? (
        <IconMoon
          size={20}
          stroke={1.5}
          style={{
            color: theme.colors.gray[7],
          }}
        />
      ) : (
        <IconSun
          size={20}
          stroke={1.5}
          style={{
            color: theme.colors.dark[0],
          }}
        />
      )}
    </UnstyledButton>
  );
}
