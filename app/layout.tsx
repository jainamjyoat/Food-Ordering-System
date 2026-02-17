import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScrolling from "./components/SmoothScrolling";
import { CartProvider } from "./context/CartContext"; // Import the provider

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
      <body className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-[#181112] dark:text-white font-sans">
        <CartProvider>
          <SmoothScrolling />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}