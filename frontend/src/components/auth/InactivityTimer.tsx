"use client";

import { useEffect, useRef, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { AUTH_LOGIN } from "@/constants/authRoutes";

// Set inactivity limit (10 minutes)
const INACTIVITY_TIMEOUT = 10 * 60 * 1000; 

export default function InactivityTimer() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Define clearSession to handle the actual logout
  const handleSignOut = useCallback(async () => {
    console.log("Inactivity timeout reached, signing out...");
    // Redirect to login after signing out
    await signOut({ redirect: true, callbackUrl: AUTH_LOGIN });
  }, []);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Only set timer if user is authenticated
    if (status === "authenticated") {
      timeoutRef.current = setTimeout(handleSignOut, INACTIVITY_TIMEOUT);
    }
  }, [status, handleSignOut]);

  useEffect(() => {
    // We only want to track activity when the user is logged in
    if (status === "authenticated") {
      // Set initial timer
      resetTimer();

      // Listen for these common interaction events
      const events = [
        "mousedown", 
        "mousemove", 
        "keydown", 
        "scroll", 
        "touchstart",
        "click"
      ];

      const handleEvent = () => resetTimer();

      events.forEach((event) => {
        window.addEventListener(event, handleEvent);
      });

      // Cleanup logic
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        events.forEach((event) => {
          window.removeEventListener(event, handleEvent);
        });
      };
    }
  }, [status, resetTimer, pathname]); // reset on pathname change too

  return null; // This component doesn't render any UI
}
