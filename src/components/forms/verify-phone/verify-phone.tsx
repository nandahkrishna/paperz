"use client";
import { useState } from "react";
import { PinInput, Stack, Paper, Title, Text, Button } from "@mantine/core";

export function VerifyPhoneForm({
  message,
  phone,
  onSendCode,
  onVerifyPhone,
  canResend,
  remainingTime,
  startTimer,
}: {
  message: string;
  phone: string;
  onSendCode: (formData: FormData) => Promise<void>;
  onVerifyPhone: (formData: FormData) => Promise<void>;
  canResend: boolean;
  remainingTime: number;
  startTimer: () => void;
}) {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const formData = new FormData(e.currentTarget);
      await onVerifyPhone(formData);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setIsResending(true);
    try {
      const formData = new FormData();
      formData.append("phone", phone);
      await onSendCode(formData);
      startTimer(); // Start the countdown after successful resend
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      <Title order={2} ta="center" mb="lg">
        Verify your phone
      </Title>
      <form onSubmit={handleVerify}>
        {message && (
          <Text c="red" ta="center" mb="sm">
            {message}
          </Text>
        )}
        <Stack>
          <Text size="sm" c="dimmed" ta="center">
            We have sent a verification code to {phone}
          </Text>
          <Stack gap="xs" align="center">
            <Text size="sm" fw={500}>
              Verification Code
            </Text>
            <PinInput
              length={6}
              type="number"
              placeholder=""
              aria-label="Verification code"
              value={code}
              onChange={setCode}
            />
            {code && code.length !== 6 && (
              <Text size="sm" c="red">
                Please enter all 6 digits
              </Text>
            )}
          </Stack>
          <input type="hidden" name="phone" value={phone} />
          <input type="hidden" name="token" value={code} />
          <Button
            type="submit"
            loading={isVerifying}
            disabled={code.length !== 6}
            fullWidth
            radius="md"
          >
            Verify code
          </Button>
          <Button
            variant="light"
            loading={isResending}
            onClick={handleResend}
            disabled={!canResend}
            fullWidth
            radius="md"
          >
            {canResend ? "Resend code" : `Resend code (${remainingTime}s)`}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
