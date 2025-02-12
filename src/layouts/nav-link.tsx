"use client";
import {
  useMantineTheme,
  useMantineColorScheme,
  Tooltip,
  UnstyledButton,
  Loader,
} from "@mantine/core";
import { IconHome2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  path: string;
  loading?: boolean;
  onClick?: () => void;
}

export function NavbarLink({
  icon: Icon,
  label,
  active,
  path,
  loading,
  onClick,
}: NavbarLinkProps) {
  const router = useRouter();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const handleClick = () => {
    router.push(path);
    onClick?.();
  };

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={handleClick}
        disabled={loading}
        style={{
          width: 50,
          height: 50,
          borderRadius: theme.radius.md,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color:
            colorScheme === "dark"
              ? theme.colors.blue[4]
              : theme.colors.blue[6],
          backgroundColor: active
            ? colorScheme === "dark"
              ? "rgba(51, 154, 240, 0.1)"
              : "var(--mantine-color-blue-light)"
            : "transparent",
        }}
        styles={() => ({
          root: {
            "&:hover": {
              backgroundColor: active
                ? colorScheme === "dark"
                  ? "rgba(51, 154, 240, 0.1)"
                  : "var(--mantine-color-blue-light)"
                : colorScheme === "dark"
                ? "rgba(51, 154, 240, 0.05)"
                : "var(--mantine-color-gray-0)",
            },
          },
        })}
      >
        {loading ? (
          <Loader size="sm" type="dots" />
        ) : (
          <Icon
            size={20}
            stroke={1.5}
            style={{
              color: active
                ? colorScheme === "dark"
                  ? theme.colors.blue[4]
                  : theme.colors.blue[6]
                : colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
            }}
          />
        )}
      </UnstyledButton>
    </Tooltip>
  );
}
