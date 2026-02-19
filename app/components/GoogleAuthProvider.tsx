"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode, useEffect, useState } from "react";

export function GoogleAuthProvider({ children }: { children: ReactNode }) {
  const [clientId, setClientId] = useState<string>("");

  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const response = await fetch("/api/config/google");
        const data = await response.json();
        if (data.clientId) {
          setClientId(data.clientId);
        }
      } catch (error) {
        console.error("Failed to fetch Google Client ID:", error);
      }
    };

    fetchClientId();
  }, []);

  // Use a fallback empty string if clientId is not loaded yet
  // The GoogleOAuthProvider will work with empty string and update when clientId is fetched
  return (
    <GoogleOAuthProvider clientId={clientId || "placeholder"}>
      {children}
    </GoogleOAuthProvider>
  );
}
