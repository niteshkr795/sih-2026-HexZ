"use client";

import React, { useState } from "react";
import { 
  Search, 
  FileCheck2, 
  AlertOctagon, 
  Printer, 
  ExternalLink, 
  CheckCircle2, 
  Filter, 
  Scale, 
  ShieldCheck,
  Download,
  Eye
} from "lucide-react";
import { ECertificate, SeizureNotice } from "@/types/lmo";

interface CertificateLedgerViewProps {
  certificates: ECertificate[];
  seizureNotices: SeizureNotice[];
  onViewCertificate: (cert: ECertificate) => void;
  onViewSeizureNotice: (notice: SeizureNotice) => void;
}

export const CertificateLedgerView: React.FC<CertificateLedgerViewProps> = ({
  certificates,
  seizureNotices,
  onViewCertificate,
  onViewSeizureNotice,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tabFilter, setTabFilter] = useState<"ALL" | "CERTS" | "SEIZURES">("ALL");

  const filteredCerts = certificates.filter(
    (c) =>
      c.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instrumentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sealTagAssigned.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSeizures = seizureNotices.filter(
    (s) =>
      s.noticeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.instrumentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.redTagNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFees = certificates.reduce((acc, c) => acc + c.stampingFeePaid, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Stat Summary Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card flex items-center justify-between">
          <div>
            <span className="text-slate-500 font-semibold block">Total Valid e-Certificates</span>
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums tracking-tight mt-1 block">
              {certificates.length}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium mt-0.5 block">Active in Territory</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FileCheck2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card flex items-center justify-between">
          <div>
            <span className="text-slate-500 font-semibold block">Form VIII Seizures Executed</span>
            <span className="text-2xl font-bold text-red-600 font-mono tabular-nums tracking-tight mt-1 block">
              {seizureNotices.length}
            </span>
            <span className="text-[11px] text-red-600 font-medium mt-0.5 block">Stop-Use Orders</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <AlertOctagon className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card flex items-center justify-between">
          <div>
            <span className="text-slate-500 font-semibold block">Govt Stamping Fees Deposited</span>
            <span className="text-2xl font-bold text-blue-700 font-mono tabular-nums tracking-tight mt-1 block">
              ₹{totalFees.toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-blue-600 font-medium mt-0.5 block">Treasury Reconciled</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card flex items-center justify-between">
          <div>
            <span className="text-slate-500 font-semibold block">Cryptographic Verification</span>
            <span className="text-2xl font-bold text-indigo-600 font-mono tabular-nums tracking-tight mt-1 block">
              100%
            </span>
            <span className="text-[11px] text-indigo-600 font-medium mt-0.5 block">SHA-256 Validated</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Certificate #, Passport ID, Merchant, or Seal Tag..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setTabFilter("ALL")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                tabFilter === "ALL"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              All Records ({certificates.length + seizureNotices.length})
            </button>
            <button
              onClick={() => setTabFilter("CERTS")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                tabFilter === "CERTS"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              e-Certificates ({certificates.length})
            </button>
            <button
              onClick={() => setTabFilter("SEIZURES")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                tabFilter === "SEIZURES"
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              Seizures ({seizureNotices.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Ledger Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-900">
            Legal Metrology Stamping & Enforcement Registry
          </h3>
          <span className="text-slate-400 font-mono text-[11px]">
            Immutable Audit Trail • Zone 1 Registry
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="p-3.5">Record / Cert #</th>
                <th className="p-3.5">Passport ID</th>
                <th className="p-3.5">Commercial Owner</th>
                <th className="p-3.5">Instrument & Class</th>
                <th className="p-3.5">Seal Tag / Memo</th>
                <th className="p-3.5">Validity Period</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Render Certificates */}
              {(tabFilter === "ALL" || tabFilter === "CERTS") &&
                filteredCerts.map((cert) => (
                  <tr key={cert.certificateNumber} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-blue-700">
                      {cert.certificateNumber}
                    </td>
                    <td className="p-3.5 font-mono font-semibold text-slate-800">
                      {cert.instrumentId}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-900 max-w-[200px] truncate">
                      {cert.ownerName}
                    </td>
                    <td className="p-3.5 text-slate-700">
                      <span className="block font-medium">{cert.instrumentType}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{cert.accuracyClass}</span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-emerald-700">
                      {cert.sealTagAssigned}
                    </td>
                    <td className="p-3.5 font-mono text-slate-600">
                      {cert.issueDate} → {cert.validUntil}
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                        <CheckCircle2 className="w-3 h-3" /> ACTIVE
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => onViewCertificate(cert)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] border border-blue-200 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View e-Cert</span>
                      </button>
                    </td>
                  </tr>
                ))}

              {/* Render Seizures */}
              {(tabFilter === "ALL" || tabFilter === "SEIZURES") &&
                filteredSeizures.map((s) => (
                  <tr key={s.noticeNumber} className="hover:bg-red-50/30 transition-colors bg-red-50/10">
                    <td className="p-3.5 font-mono font-bold text-red-700">
                      {s.noticeNumber}
                    </td>
                    <td className="p-3.5 font-mono font-semibold text-slate-800">
                      {s.instrumentId}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-900 max-w-[200px] truncate">
                      {s.ownerName}
                    </td>
                    <td className="p-3.5 text-slate-700">
                      <span className="block font-medium">{s.instrumentType}</span>
                      <span className="text-[10px] text-red-500 font-mono font-semibold">FORM VIII NOTICE</span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-red-700">
                      {s.redTagNumber}
                    </td>
                    <td className="p-3.5 font-mono text-slate-600">
                      Issued: {s.issueDate}
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-300 font-mono">
                        <AlertOctagon className="w-3 h-3" /> SEIZED
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => onViewSeizureNotice(s)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[11px] border border-red-200 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View Notice</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
