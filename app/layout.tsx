import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "StepUP | Premium Sneaker & Footwear Store",
    template: "%s | StepUP",
  },
  description: "Step into your style with StepUP. Discover our exclusive collection of premium sneakers, designed for comfort, performance, and everyday elegance.",
  keywords: ["sneakers", "shoes", "fashion", "footwear", "stepup", "premium shoes", "sneaker store"],
  authors: [{ name: "StepUP Team" }],
  creator: "StepUP",
  metadataBase: new URL("https://stepup-sneakers.vercel.app"), // Placeholder URL
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stepup-sneakers.vercel.app",
    title: "StepUP | Premium Sneaker & Footwear Store",
    description: "Step into your style with StepUP. Exclusive collection of premium sneakers.",
    siteName: "StepUP",
    images: [
      {
        url: "/og-image.png", // User should add this later
        width: 1200,
        height: 630,
        alt: "StepUP Sneaker Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StepUP | Premium Sneaker & Footwear Store",
    description: "Exclusive collection of premium sneakers.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import SmoothScroll from "@/components/layout/smooth-scroll";
import ShellLayout from "@/components/layout/shell";
import { FlyingCart } from "@/components/ui/flying-cart";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white" suppressHydrationWarning>
        <SmoothScroll>
          <ShellLayout>
            {children}
            <FlyingCart />
          </ShellLayout>
        </SmoothScroll>
      </body>
    </html>
  );
}
