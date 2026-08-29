"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Search,
  AlertTriangle,
  Scale,
  FileText,
  CheckCircle2,
  ExternalLink,
  Gavel,
  IndianRupee,
} from "lucide-react";
import { EnforcementViolationRecord } from "@/types/admin";

interface AdminEnforcementViewProps {
  cases: EnforcementViolationRecord[];
}

export const AdminEnforcementView: React.FC<AdminEnforcementViewProps> = ({ cases }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCase, setSelectedCase] = useState<EnforcementViolationRecord | null>(null);

  const filtered = cases.filter((c) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.caseNumber.toLowerCase().includes(q) ||
        c.businessName.toLowerCase().includes(q) ||
        c.instrumentId.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.violationType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            Statutory Enforcement & Seizure Logbook (Section 15 & 27)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Metrological Violations & Confiscation Orders
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Record of non-compliant commercial instruments, broken tamper seals, short-delivery fuel dispensers, and compounding penalty collections.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[150px]">
          <span className="text-xs text-slate-300 font-medium block">Total Confiscations</span>
          <span className="text-3xl font-black text-rose-400 font-mono my-0.5">{cases.length} Active</span>
          <span className="text-[10px] text-slate-400 block">Section 15 Custody</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Case Memo Number, Business Name, Instrument ID, or Violation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900 transition"
          />
        </div>
      </div>

      {/* Table of Enforcement Cases */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Case Memo No.</th>
                <th className="px-5 py-3.5">Business & Trade</th>
                <th className="px-5 py-3.5">Violation Type & Legal Section</th>
                <th className="px-5 py-3.5">Seizure Date</th>
                <th className="px-5 py-3.5">Compounding Fine</th>
                <th className="px-5 py-3.5">Custody Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-800">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-rose-50/20 transition">
                  <td className="px-5 py-4">
                    <div className="font-mono font-bold text-rose-950">{c.caseNumber}</div>
                    <div className="text-[11px] text-slate-400 font-mono">ID: {c.instrumentId}</div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900">{c.businessName}</div>
                    <div className="text-[11px] text-slate-500">{c.tradeType} • {c.location}</div>
                  </td>

                  <td className="px-5 py-4 max-w-xs">
                    <div className="font-medium text-slate-900">{c.violationType.replace(/_/g, " ")}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{c.legalSection}</div>
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-700">
                    {c.seizureDate}
                  </td>

                  <td className="px-5 py-4 font-mono font-bold text-slate-900">
                    ₹{c.compoundingPenaltyInr.toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        c.seizureStatus === "SEIZED_UNDER_CUSTODY"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      {c.seizureStatus.replace(/_/g, " ")}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedCase(c)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
                    >
                      Case File
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-rose-400 uppercase tracking-wider">
                  Enforcement Dossier
                </span>
                <h3 className="text-xl font-bold text-white">{selectedCase.caseNumber}</h3>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs sm:text-sm">
              <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 space-y-2">
                <div className="font-bold text-rose-950 text-sm">
                  {selectedCase.violationType.replace(/_/g, " ")}
                </div>
                <div className="text-xs text-rose-800">
                  Statutory Rule: <strong>{selectedCase.legalSection}</strong>
                </div>
                <div className="text-xs text-slate-700">
                  Investigating Inspector: <strong>{selectedCase.investigatingOfficer}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px]">Business Name</span>
                  <span className="font-semibold text-slate-900">{selectedCase.businessName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Location</span>
                  <span className="font-semibold text-slate-900">{selectedCase.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Instrument Serial</span>
                  <span className="font-mono font-bold text-slate-900">{selectedCase.instrumentId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Evidence Exhibits</span>
                  <span className="font-bold text-indigo-600">{selectedCase.evidenceCount} Geotagged Photos</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  alert(`Summons & Compounding Demand Notice generated for ${selectedCase.caseNumber}`);
                  setSelectedCase(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm"
              >
                Issue Compounding Summons
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
