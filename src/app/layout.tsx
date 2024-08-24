import type { Metadata } from "next";
import "./globals.scss";

import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { RecipientProvider } from "@/context/RecipientProvider";
 
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
      <RecipientProvider>
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
      </RecipientProvider>
    </AuthProvider>
  );
}
