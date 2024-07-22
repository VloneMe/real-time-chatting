import type { Metadata } from "next";
import "./globals.scss";

import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
// import SessionWrapper from "../context/SessionWraper";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Real Time Chat",
  description: "A real time chatting application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <SessionWrapper>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {children}
        </body>
      </html>
    // {/* </SessionWrapper> */}
  );
}
