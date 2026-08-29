"use client";

import React, { useState } from "react";
import {
  Award,
  CheckCircle2,
  Printer,
  Download,
  Share2,
  QrCode,
  ShieldCheck,
  Building2,
  Calendar,
  Lock,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { GatcCalibrationCertificate } from "@/types/gatc";

interface GatcCertificateModalProps {
  certificate: GatcCalibrationCertificate | null;
  onClose: () => void;
  onSyncToPassport: (certId: string) => void;
}

export const GatcCertificateModal: React.FC<GatcCertificateModalProps> = ({
  certificate,
  onClose,
  onSyncToPassport,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  if (!certificate) return null;

  const handleCopyHash = () => {
    navigator.clipboard?.writeText(certificate.cryptographicSignature);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSyncClick = () => {
    setIsSyncing(true);
    setTimeout(() => {
      onSyncToPassport(certificate.certificateId);
      setIsSyncing(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Modal Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" />
              <span>Back</span>
            </button>
            <div className="h-4 w-px bg-slate-700 hidden sm:block" />
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-md text-white shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">NABL Calibration Certificate</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                  ISO/IEC 17025
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Ref: {certificate.certificateId} • ULR: {certificate.ulrNumber}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Certificate Body (Clean Government Certificate Printable Layout) */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto bg-slate-50/50">
          {/* Official Letterhead Header */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Government of India • Ministry of Consumer Affairs, Food & Public Distribution
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              GOVERNMENT APPROVED TEST CENTER (GATC)
            </h2>
            <p className="text-xs text-slate-600 max-w-xl mx-auto">
              National Precision Metrology Calibration Center • Department of Legal Metrology<br />
              NABL Accreditation Certificate No: CC-2981 (Discipline: Mechanical / Fluid-Flow Metrology)
            </p>

            <div className="inline-block bg-slate-900 text-white font-mono px-4 py-1.5 rounded-xl text-xs font-bold">
              CERTIFICATE OF CALIBRATION & VERIFICATION
            </div>
          </div>

          {/* Core Equipment Details Grid */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              1. Instrument & Customer Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-[11px] text-slate-400 block">Instrument Description</span>
                <span className="font-semibold text-slate-900">{certificate.equipmentDescription}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Serial Number / Asset ID</span>
                <span className="font-mono font-bold text-slate-900">{certificate.serialNumber}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Customer / Registered Owner</span>
                <span className="font-semibold text-slate-900">{certificate.customerName}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Customer Installation Address</span>
                <span className="text-slate-700">{certificate.customerAddress}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Date of Calibration</span>
                <span className="font-semibold text-slate-900">{certificate.calibratedOn}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Recommended Re-Verification Date</span>
                <span className="font-bold text-emerald-700">{certificate.validUntil}</span>
              </div>
            </div>
          </div>

          {/* Traceability & Standards */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              2. Metrological Traceability & Environmental Conditions
            </h4>
            <div className="space-y-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-700 block mb-0.5">Traceability Chain:</span>
                <p className="text-slate-600 font-mono text-[11px]">{certificate.traceabilityChain}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-700 block mb-0.5">Lab Environment:</span>
                <p className="text-slate-600">{certificate.environmentalConditions}</p>
              </div>
            </div>
          </div>

          {/* Cryptographic Proof & QR Stamping */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-left w-full sm:w-auto">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verdict: {certificate.overallVerdict.replace(/_/g, " ")}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">
                  SHA-256 Digital Verification Signature
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-600 bg-slate-100 p-2 rounded-lg break-all max-w-sm">
                    {certificate.cryptographicSignature}
                  </span>
                  <button
                    onClick={handleCopyHash}
                    className="px-2 py-1.5 text-[10px] rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold"
                  >
                    {isCopied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 pt-1">
                Approved Signatory: <strong>{certificate.signatoryName}</strong> ({certificate.signatoryDesignation})
              </div>
            </div>

            {/* QR Mock badge */}
            <div className="p-3 bg-slate-900 text-white rounded-2xl flex flex-col items-center justify-center shrink-0 border border-slate-800 text-center">
              <QrCode className="w-20 h-20 text-amber-400 mb-1" />
              <span className="text-[9px] font-mono text-slate-400">Scan to Verify Passport</span>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" />
              <span>Back</span>
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Print</span>
            </button>

            <button
              onClick={() => alert("Downloading Cryptographically Signed PDF Report...")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Download PDF</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {certificate.passportSyncStatus === "SYNCED" ? (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Synced to Central Passport
              </span>
            ) : (
              <button
                onClick={handleSyncClick}
                disabled={isSyncing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black shadow-md transition"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
                <span>{isSyncing ? "Syncing to Passport..." : "Sync to National Passport"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
