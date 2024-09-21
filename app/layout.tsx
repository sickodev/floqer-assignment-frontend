import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import ChatRoom from "@/components/shared/chat-room";
import JotaiProvider from "@/components/providers/jotai-provider";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Floqer Assignment",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased h-screen bg-black`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <JotaiProvider>
            <main className="h-full relative">
              <div className="absolute top-0 h-full w-full bg-gradient-to-b from-pink-900/30 to-black -z-10 filter blur-xl" />
              {children}
              <div className=" bottom-0 right-0 m-3 fixed">
                <ChatRoom />
              </div>
            </main>
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
