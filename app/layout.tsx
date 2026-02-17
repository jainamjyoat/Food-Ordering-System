import type { Metadata } from "next";
import "./globals.css";
import SmoothScrolling from "./components/SmoothScrolling"; // Adjust path if needed

export const metadata: Metadata = {
  title: "FoodDelivery",
  description: "Delicious food to your door",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Fonts and Icons loaded here to avoid CSS import errors */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <SmoothScrolling />
        {children}
      </body>
    </html>
  );
}