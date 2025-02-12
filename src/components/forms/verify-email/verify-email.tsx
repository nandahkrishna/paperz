"use client";
import { Text, Paper, Stack, Title, Button } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import { useState, useEffect } from "react";

export type VerifyEmailFormProps = {
  email: string;
  onSendVerification: (email: string) => Promise<void>;
};

export default function VerifyEmailForm({
  email,
  onSendVerification,
}: VerifyEmailFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await onSendVerification(email);
      setShowSuccess(true);
      setCountdown(60); // Start 60-second countdown
      // Reset success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("Error resending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      <Stack align="center" gap="lg">
        <IconMail size={50} />
        <Title order={2} ta="center">
          Check your email
        </Title>

        <Stack gap="sm">
          <Text size="sm" c="dimmed" ta="center">
            We have sent a verification link to {email}
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            Click the link in the email to verify your account.
          </Text>
          {showSuccess && (
            <Text size="sm" c="green" ta="center">
              Verification email has been resent
            </Text>
          )}
        </Stack>

        <Button
          variant="light"
          onClick={handleResend}
          loading={isLoading}
          disabled={isLoading || countdown > 0}
        >
          {countdown > 0
            ? `Resend available in ${countdown}s`
            : "Resend verification email"}
        </Button>
      </Stack>
    </Paper>
  );
}
