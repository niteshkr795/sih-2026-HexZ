"use client";

import React, { useState } from "react";
import {
  Award,
  Search,
  CheckCircle2,
  FileText,
  ExternalLink,
  QrCode,
  Lock,
  RefreshCw,
  Eye,
  Download,
} from "lucide-react";
import { GatcCalibrationCertificate } from "@/types/gatc";

interface GatcCertificatesViewProps {
  certificates: GatcCalibrationCertificate[];
  onOpenCertificateModal: (cert: GatcCalibrationCertificate) => void;
  onSyncAll: () => void;
  isSyncing: boolean;
}

export const GatcCertificatesView: React.FC<GatcCertificatesViewProps> = ({
  certificates,
  onOpenCertificateModal,
  onSyncAll,
  isSyncing,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = certificates.filter((c) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.certificateId.toLowerCase().includes(q) ||
        c.ulrNumber.toLowerCase().includes(q) ||
        c.customerName.toLowerCase().includes(q) ||
        c.equipmentDescription.toLowerCase().includes(q) ||
        c.serialNumber.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            NABL Validated Digital Metrology Ledger
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Issued Calibration Certificates
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            All issued calibration certificates are secured with SHA-256 cryptographic signatures, NABL ULR tracking, and synchronized in real time to the National Legal Metrology Central Passport.
          </p>
        </div>

        <button
          onClick={onSyncAll}
          disabled={isSyncing}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-md transition"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
          <span>{isSyncing ? "Syncing All to Central Passport..." : "Sync All Active Certificates"}</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Certificate Ref, ULR Number, Equipment, or Customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900 transition"
          />
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Certificate Ref & ULR</th>
                <th className="px-5 py-3.5">Equipment / Accuracy Class</th>
                <th className="px-5 py-3.5">Customer & Location</th>
                <th className="px-5 py-3.5">Calibrated Date</th>
                <th className="px-5 py-3.5">Validity</th>
                <th className="px-5 py-3.5">Passport Sync</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                    No calibration certificates found.
                  </td>
                </tr>
              ) : (
                filtered.map((cert) => (
                  <tr key={cert.certificateId} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-4">
                      <div className="font-mono font-bold text-slate-900">{cert.certificateId}</div>
                      <div className="text-[11px] text-amber-700 font-mono font-semibold">{cert.ulrNumber}</div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900 max-w-xs">{cert.equipmentDescription}</div>
                      <div className="text-[11px] text-slate-500 font-mono">SN: {cert.serialNumber} • {cert.accuracyClass}</div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-900">{cert.customerName}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-xs">{cert.customerAddress}</div>
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-800">
                      {cert.calibratedOn}
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-bold text-emerald-700">{cert.validUntil}</span>
                    </td>

                    <td className="px-5 py-4">
                      {cert.passportSyncStatus === "SYNCED" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          SYNCED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-bold text-[11px] border border-amber-200">
                          PENDING
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => onOpenCertificateModal(cert)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>View Certificate</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
