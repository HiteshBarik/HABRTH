import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HABRTH",
  description:
    "Habbit Earth - A habit tracking app built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col text-white">
        <div
          className="min-h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 30%), linear-gradient(180deg, #050505 0%, #000 100%)",
          }}
        >
          <TooltipProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </TooltipProvider>
        </div>
      </body>
    </html>
  );
}
