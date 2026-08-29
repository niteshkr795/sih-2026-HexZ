"use client";

import React from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Building2,
  Users,
  Layers,
  Scale,
  FileCheck2,
  Globe2,
  CheckCircle2,
  Lock,
  Phone,
  Mail,
  Printer,
  BadgeCheck,
} from "lucide-react";
import { JurisdictionState } from "@/types/admin";

interface AdminProfileViewProps {
  selectedState: JurisdictionState;
}

export const AdminProfileView: React.FC<AdminProfileViewProps> = ({ selectedState }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 p-1 shadow-lg flex items-center justify-center text-white font-black text-2xl">
              <Building2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  Dr. Rajeshwari Iyer, IAS
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  Director of Legal Metrology
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Department of Consumer Affairs • Ministry of Consumer Affairs, Food & Public Distribution
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span>Authority ID: <strong>DIR-LM-GOI-001</strong></span>
                <span>•</span>
                <span>Active Scope: <strong>{selectedState === "ALL_INDIA" ? "National Apex (All States/UTs)" : selectedState}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-white/10 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Directorate Dossier</span>
          </button>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Statutory Powers, Master Rule Keys & Security Scope */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statutory Mandate & Apex Powers */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-700" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Apex Regulatory Powers & Legal Mandate
                </h3>
              </div>
              <span className="text-xs font-mono text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full font-bold border border-indigo-200">
                National Jurisdiction
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block">Statutory Designation Order</span>
                <span className="font-bold text-slate-900 block text-sm">
                  Section 11, Legal Metrology Act, 2009
                </span>
                <span className="text-[11px] text-slate-500">
                  Apex Director appointed by the Central Government.
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block">Enforcement Oversight</span>
                <span className="font-mono font-bold text-slate-900 block text-sm">
                  Section 15, 18, 27 & 36 Inspection Powers
                </span>
                <span className="text-[11px] text-slate-500">
                  National confiscation, compounding, and prosecution authority.
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block">Fee Schedule Rule Master Key</span>
                <span className="font-mono font-bold text-indigo-700 block text-sm">
                  RULE-2011-TARIFF-SCHEDULE-IV
                </span>
                <span className="text-[11px] text-slate-500">
                  Authority to configure state-wise compounding and verification fee rules.
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block">Digital Metrology Root Signer</span>
                <span className="font-mono font-bold text-emerald-700 block text-sm">
                  ROOT-CA-LM-INDIA-2026
                </span>
                <span className="text-[11px] text-slate-500">
                  FIPS 140-3 Hardware Root of Trust for DigiPass passports.
                </span>
              </div>
            </div>
          </div>

          {/* Regional Delegations & Active Zones */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Federated State Controllers & RRSL Laboratories
                </h3>
              </div>
              <span className="text-xs text-slate-500">5 Regional Reference Labs</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-bold">RRSL Ahmedabad</span>
                <span className="font-semibold text-slate-800 text-xs block mt-0.5">Western Region Hub</span>
                <span className="text-[10px] text-emerald-700 font-medium">Standards Synchronized</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-bold">RRSL Bengaluru</span>
                <span className="font-semibold text-slate-800 text-xs block mt-0.5">Southern Region Hub</span>
                <span className="text-[10px] text-emerald-700 font-medium">Standards Synchronized</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-bold">RRSL Faridabad</span>
                <span className="font-semibold text-slate-800 text-xs block mt-0.5">Northern Region Hub</span>
                <span className="text-[10px] text-emerald-700 font-medium">Standards Synchronized</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Directorate Security & Secretariat */}
        <div className="space-y-6">
          {/* Directorate Credentials Badge */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl border border-slate-800 text-center space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[10px] uppercase tracking-widest font-mono text-indigo-400">
              <span>National Directorate</span>
              <span>Apex Security Clearance</span>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-700 mx-auto flex items-center justify-center text-white shadow-md">
              <Building2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-black text-base text-white">Directorate Command Head</h3>
              <p className="text-xs text-indigo-300 font-semibold mt-0.5">Director of Legal Metrology, GoI</p>
              <p className="text-[10px] text-slate-400 font-mono mt-1">Ref: DOCA-IAS-DIR-2026</p>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 text-left space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Access Tier:</span>
                <span className="font-bold text-slate-200">Level-1 Root Admin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Smartcard 2FA:</span>
                <span className="font-mono font-bold text-emerald-400">Gov PIV FIDO2 Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ledger Root Key:</span>
                <span className="font-mono font-bold text-indigo-300">Active (SHA-256)</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Session Authenticated via National Metrology HSM</span>
            </div>
          </div>

          {/* Department Secretariat Office Contact */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-100 pb-2">
              Ministry Secretariat & Contact
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Ministry Headquarters</span>
                  <span className="font-medium text-slate-800">
                    Krishi Bhawan, Dr. Rajendra Prasad Road, New Delhi - 110001
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Directorate Secretariat</span>
                  <span className="font-medium text-slate-800">dir-legalmetrology@nic.in</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Control Room Direct Line</span>
                  <span className="font-medium text-slate-800">+91 11 2338 9840</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

