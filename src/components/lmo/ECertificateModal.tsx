"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  ShieldCheck, 
  Download, 
  Printer, 
  QrCode, 
  CheckCircle2, 
  Share2, 
  X,
  Lock,
  Award,
  Calendar,
  Building2,
  Scale
} from "lucide-react";
import { ECertificate } from "@/types/lmo";

interface ECertificateModalProps {
  certificate: ECertificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ECertificateModal: React.FC<ECertificateModalProps> = ({
  certificate,
  isOpen,
  onClose,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen || !certificate) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `https://metrology.gov.in/verify?cert=${certificate.certificateNumber}&token=${certificate.qrToken}`
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden text-slate-900 relative">
        {/* Modal Top Actions Toolbar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">
              Official Legal Metrology Digital Certificate
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{isCopied ? "Link Copied!" : "Share QR"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Certificate</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Official Certificate Body */}
        <div id="printable-certificate" className="p-8 sm:p-12 bg-gradient-to-b from-amber-50/20 via-white to-amber-50/10">
          {/* Certificate Border Frame */}
          <div className="border-4 border-double border-slate-800 rounded-2xl p-6 sm:p-8 relative bg-white shadow-sm">
            {/* Watermark Emblem */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Scale className="w-96 h-96 text-slate-900" />
            </div>

            {/* Header: Emblem & Legal Metrology Title */}
            <div className="text-center pb-6 border-b-2 border-slate-900 relative">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <Image
                  src="/logo.jpg"
                  alt="Emblem of India"
                  fill
                  className="object-contain"
                />
              </div>

              <span className="text-[11px] font-bold tracking-[0.2em] text-slate-600 uppercase block">
                Government of India • Ministry of Consumer Affairs, Food & Public Distribution
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight mt-1">
                Department of Legal Metrology
              </h2>
              <p className="text-xs font-bold text-blue-900 uppercase tracking-widest mt-0.5">
                Certificate of Verification & Stamping (Form VI — Rule 14)
              </p>
              <p className="text-[10px] text-slate-500 font-mono mt-1">
                Issued under the Legal Metrology Act, 2009 & Legal Metrology (General) Rules, 2011
              </p>
            </div>

            {/* Certificate Header Details Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-b border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 font-medium block">Certificate No:</span>
                <span className="font-mono font-black text-slate-900 text-sm">
                  {certificate.certificateNumber}
                </span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Digital Passport ID:</span>
                <span className="font-mono font-bold text-blue-700">
                  {certificate.instrumentId}
                </span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Security Seal Tag:</span>
                <span className="font-mono font-bold text-emerald-700">
                  {certificate.sealTagAssigned}
                </span>
              </div>
            </div>

            {/* Certificate Core Statement */}
            <div className="py-5 space-y-3 text-xs leading-relaxed text-slate-800">
              <p>
                This is to certify that the weighing / measuring instrument described below, belonging to{" "}
                <strong className="text-slate-950 underline">{certificate.ownerName}</strong>, situated at{" "}
                <span className="font-medium text-slate-900">{certificate.businessAddress}</span>, has been verified 
                and stamped in accordance with the specifications prescribed under the Legal Metrology Act, 2009.
              </p>

              {/* Instrument Table */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs my-3 space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Instrument Type</span>
                    <span className="font-bold text-slate-900">{certificate.instrumentType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Serial Number</span>
                    <span className="font-mono font-bold text-slate-900">{certificate.serialNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Accuracy Class</span>
                    <span className="font-bold text-blue-900">{certificate.accuracyClass}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Max Capacity / (e)</span>
                    <span className="font-bold text-slate-900">{certificate.maxCapacity} ({certificate.verificationScaleInterval})</span>
                  </div>
                </div>
              </div>

              {/* Validity Window Highlight */}
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-950 block">
                      Certified Legal for Commercial Trade & Stamped
                    </span>
                    <span className="text-[11px] text-emerald-800">
                      Stamping Fee Deposited: ₹{certificate.stampingFeePaid}.00 (Govt Receipt Generated)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">Valid Period:</span>
                  <span className="font-mono font-black text-emerald-800">
                    {certificate.issueDate} → {certificate.validUntil}
                  </span>
                </div>
              </div>
            </div>

            {/* Cryptographic Verification Block & Signatures */}
            <div className="pt-6 border-t-2 border-slate-900 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* QR Code & SHA-256 */}
              <div className="sm:col-span-4 flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="w-16 h-16 bg-white border border-slate-300 rounded-lg p-1 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <QrCode className="w-14 h-14 text-slate-900" />
                </div>
                <div className="text-[10px] space-y-0.5">
                  <span className="font-bold text-slate-900 block">Cryptographic QR</span>
                  <span className="text-slate-500 block">Scan to verify authenticity</span>
                  <span className="font-mono text-slate-400 block truncate max-w-[120px]">
                    SHA: {certificate.sha256VerificationHash.substring(0, 12)}...
                  </span>
                </div>
              </div>

              {/* Officer Signature & Authority */}
              <div className="sm:col-span-8 text-right space-y-1">
                <div className="inline-block text-center border-b border-dashed border-slate-400 pb-1 px-4">
                  <span className="font-mono text-xs font-bold text-blue-950 block italic">
                    Digitally Signed by {certificate.officerName}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    ID: {certificate.officerId} • Zone: {certificate.zone}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">
                  Inspector of Legal Metrology / Authorized Officer
                </p>
                <p className="text-[9px] text-slate-400">
                  National Legal Metrology Digital Trust Authority • SIH 26036
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Close CTA */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            This digital certificate is legally admissible under Section 65B of the Indian Evidence Act.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
          >
            Done / Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
