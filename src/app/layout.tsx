import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Favicon from "/public/easy-wallet.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Easy Wallet",
  description: "Just an Easy Wallet",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark mx-auto flex w-full max-w-[540px] flex-col items-center antialiased`}
      >
        <Header />
        <main className="mt-[59px] w-full px-4 pb-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
