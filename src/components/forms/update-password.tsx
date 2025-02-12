"use client";
import {
  Paper,
  Title,
  PasswordInput,
  Button,
  Alert,
  Stack,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { updatePassword } from "@/lib/actions/auth";

export type UpdatePasswordFormProps = {
  error?: string;
  message?: string;
};

export default function UpdatePasswordForm({
  message,
  error,
}: UpdatePasswordFormProps) {
  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = async ({ password }: { password: string }) => {
    try {
      await updatePassword({ password });
    } catch (error) {
      console.error("Error updating password:", error);
      form.setErrors({ password: "Failed to update password" });
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder w={400}>
      <Title order={2} ta="center" mb="lg">
        Update Password
      </Title>

      {message && (
        <Alert icon={<IconAlertCircle size="1rem" />} color="blue" mb="md">
          {message}
        </Alert>
      )}
      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} color="red" mb="md">
          {error}
        </Alert>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <PasswordInput
            required
            label="New Password"
            placeholder="Enter your new password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            required
            label="Confirm Password"
            placeholder="Confirm your new password"
            {...form.getInputProps("confirmPassword")}
          />
          <Button fullWidth type="submit" loading={form.submitting}>
            Update Password
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
