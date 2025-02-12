"use server";
import { config } from "@/config/const";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export interface EmailAuthFormData {
  email: string;
  password: string;
}

export interface SignupEmailFormData extends EmailAuthFormData {
  first_name?: string;
  last_name?: string;
}

export async function loginWithEmail({ email, password }: EmailAuthFormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/login?message=" + error.message);
  }

  return redirect("/dashboard");
}

export async function signupWithEmail({
  email,
  password,
  first_name,
  last_name,
}: SignupEmailFormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return redirect(`${config.loginUrl}?message=` + error.message);
  }

  return redirect("/verify/email?email=" + encodeURIComponent(email));
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
}

export async function resendVerificationEmail({ email }: { email: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/verify?message=" + error.message);
  }

  return redirect("/verify/email?email=" + encodeURIComponent(email));
}

// Optional: Add email verification handling if needed
export async function handleEmailVerification(token: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: "email",
  });

  if (error) {
    return redirect("/verify/email?message=" + error.message);
  }

  return redirect("/dashboard");
}

export async function resetPassword({ email }: { email: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset?next=/update-password`,
  });

  if (error) {
    return redirect("/reset-password?message=" + error.message);
  }

  redirect(
    "/reset-password?message=Check your email for a password reset link."
  );
}

export async function updatePassword({ password }: { password: string }) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return redirect("/update-password?message=" + error.message);
  }

  return redirect("/dashboard");
}
