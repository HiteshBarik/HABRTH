import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main
          className="min-h-screen px-4 py-12 text-white"
          style={{
            backgroundImage:
              "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 30%), linear-gradient(180deg, #050505 0%, #000 100%)",
          }}
        >
          <ReduxProvider>{children}</ReduxProvider>
        </main>
      </body>
    </html>
  );
}
