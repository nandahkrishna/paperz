"use client";
import {
  Text,
  Paper,
  Title,
  TextInput,
  Button,
  Alert,
  Stack,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { resetPassword } from "@/lib/actions/auth";
import { useForm } from "@mantine/form";

export type ResetPasswordFormProps = {
  error?: string;
  message?: string;
};

export default function ResetPasswordForm({
  message,
  error,
}: ResetPasswordFormProps) {
  const form = useForm({
    initialValues: {
      email: "",
    },
  });

  const handleSubmit = async ({ email }: { email: string }) => {
    try {
      await resetPassword({ email });
    } finally {
      form.reset();
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      <Title order={2} ta="center" mb="lg">
        Reset Password
      </Title>

      <Text size="sm" mb="lg" c="dimmed">
        Enter your email address and we&apos;ll send you a link to reset your
        password.
      </Text>

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
          <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <Button fullWidth type="submit" loading={form.submitting}>
            Send Reset Link
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
