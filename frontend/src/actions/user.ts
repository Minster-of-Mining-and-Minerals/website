"use server";

import { signIn, signOut, auth } from "@/auth";
import { AuthError } from "next-auth";
import { AUTH_LOGIN } from "@/constants/authRoutes";

export const login = async (email: string, password: string) => {
  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    // This is the key change - use the exact same pattern as the working curl command
    await signIn("credentials", {
      email,
      password,
      redirect: false, // Keep redirect false to handle it manually
    });

    // If we get here, signIn succeeded
    return { success: true };
  } catch (error: any) {
    // Check if it's a redirect error from Auth.js (normal behavior)
    if (error?.message === "NEXT_REDIRECT") {
        return { success: true };
    }

    if (error instanceof AuthError) {
      console.error("Auth error occurred:", error.type, error.message);

      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        case "CallbackRouteError":
          return { error: "Invalid email or password." };
        default:
          return { error: "Authentication failed. Please check your credentials." };
      }
    }

    // For non-AuthError errors
    console.error("Server Action Login Error:", error.message || error);
    return { error: "Internal server error occurred during login." };
  }
};

export const logout = async () => {
  await signOut({ redirectTo: AUTH_LOGIN });
};

export const getSession = async () => {
  return await auth();
};

export const getCurrentUser = async () => {
  const session = await auth();
  return session?.user ?? null;
};