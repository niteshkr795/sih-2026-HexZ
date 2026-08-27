import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LMO Enforcement Suite — National Legal Metrology Portal (SIH 26036)",
  description: "Official Field Verification & Inspection Dashboard for Legal Metrology Officers.",
};

export default function LmoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white">
      {children}
    </div>
  );
}
