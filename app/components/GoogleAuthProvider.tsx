"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode, useEffect, useState } from "react";

export function GoogleAuthProvider({ children }: { children: ReactNode }) {
  const [clientId, setClientId] = useState<string>("");

  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const response = await fetch("/api/config/google", { cache: "no-store" });
        const ct = response.headers.get("content-type") || "";
        if (!response.ok || !ct.includes("application/json")) {
          // Avoid parsing non-JSON (e.g., HTML or server actions output)
          throw new Error(`Unexpected response for /api/config/google: status ${response.status}, content-type ${ct}`);
        }
        const data = await response.json();
        if (data && typeof data === "object" && (data as any).clientId) {
          setClientId((data as any).clientId as string);
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
