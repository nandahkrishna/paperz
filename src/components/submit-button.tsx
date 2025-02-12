// app/components/submit-button.tsx
"use client";

import { Button, ButtonProps } from "@mantine/core";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  formAction,
  children,
  variant = "filled",
  disabled = false,
  ...props
}: {
  formAction: (data: FormData) => Promise<void>;
  children: React.ReactNode;
  variant?: "filled" | "light";
  disabled?: boolean;
  props?: ButtonProps;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      loading={pending}
      type="submit"
      formAction={formAction}
      fullWidth
      radius="md"
      variant={variant}
      disabled={disabled || pending}
      {...props}
    >
      {children}
    </Button>
  );
}
