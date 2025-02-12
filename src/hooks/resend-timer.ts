// hooks/useResendTimer.ts
"use client";
import { useState, useEffect } from 'react';

export function useResendTimer(initialDelay: number = 60) {
  const [canResend, setCanResend] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);

  const startTimer = () => {
    setCanResend(false);
    setRemainingTime(initialDelay);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime((time) => {
          if (time <= 1) {
            setCanResend(true);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [remainingTime]);

  return {
    canResend,
    remainingTime,
    startTimer,
  };
}