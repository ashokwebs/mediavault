import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediaVault — Cloudinary AI Asset Optimization & Transformation Pipeline",
  description: "Next-gen digital asset intelligence and performance optimization powered by Cloudinary AI APIs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#090C15] text-slate-100 antialiased selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
