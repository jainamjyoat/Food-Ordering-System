import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | FoodDelivery",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Admin layout intentionally excludes global Navbar/Footer via root layout conditionals.
  // Sub-layouts should NOT include <html> or <body> tags in the Next.js app router.
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark text-[#181112] dark:text-white font-sans">
      {children}
    </div>
  );
}
