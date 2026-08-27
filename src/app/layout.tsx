import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DigiPass — Digital Instrument Passport & Smart Field Verification Ecosystem",
  description: "National Legal Metrology Portal for Weighing & Measuring Instruments Verification, Digital Passports, and QR Certifications (SIH 26036).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
