import type { Metadata } from "next";
import "../globals.scss";

import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
import { AuthProvider } from "@/context/AuthContext";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Real Time Chatting App",
  description: "A real time chatting application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased bg-gray-400",
            fontSans.variable
          )}
        >
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
