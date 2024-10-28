import type { Metadata } from "next";
import "./globals.css";
import { Ubuntu } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
const ubuntu = Ubuntu({
  weight: ["400", "500", "700"], // Specify weights you need
  subsets: ["latin"],
  variable: "--font-ubuntu", // Create a CSS variable
});

export const metadata: Metadata = {
  title: "Multi Step Form",
  description: "Created by cyber-m",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png" />
      <title>Frontend Mentor | Multi-step form</title>
      <body className={`${ubuntu.variable} antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
