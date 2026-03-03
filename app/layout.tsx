import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "TideGlass · South Shore & Cape Cod Forecast",
  description: "Dialed fishing intel for Massachusetts' South Shore and Cape Cod, powered by Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-950 antialiased text-white`}
      >
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.25),_rgba(2,6,23,1)_60%)]">
          {children}
        </div>
      </body>
    </html>
  );
}
