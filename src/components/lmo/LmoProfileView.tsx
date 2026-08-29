"use client";

import React from "react";
import {
  ShieldCheck,
  Award,
  MapPin,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  UserCheck,
  Scale,
  FileCheck2,
  AlertTriangle,
  Building2,
  QrCode,
  Printer,
  BadgeCheck,
} from "lucide-react";
import { OfficerProfile } from "@/types/lmo";

interface LmoProfileViewProps {
  officer: OfficerProfile;
}

export const LmoProfileView: React.FC<LmoProfileViewProps> = ({ officer }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-[#003366] via-slate-900 to-[#0A2540] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg flex items-center justify-center text-slate-950 font-black text-2xl">
              SM
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">{officer.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Active Legal Metrology Officer
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {officer.designation} • Cadre: State Legal Metrology Service
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span>Badge ID: <strong>{officer.badgeNumber}</strong></span>
                <span>•</span>
                <span>Jurisdiction: <strong>{officer.zone}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-white/10 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official ID Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Credentials & Jurisdiction */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statutory Authority & Gazette Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#003366]" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Statutory Appointment & Powers
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
                Gazetted Officer
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block">Enabling Statute</span>
                <span className="font-bold text-slate-900 block text-sm">
                  Section 13, Legal Metrology Act, 2009
                </span>
                <span className="text-[11px] text-slate-500">
                  Authorized for inspection, testing, stamping, and seizure.
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block">Gazette Notification No.</span>
                <span className="font-mono font-bold text-slate-900 block text-sm">
                  DL-LM-GAZ-2021-8841-B
                </span>
                <span className="text-[11px] text-slate-500">
                  Notified by Government of NCT of Delhi.
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block">Assigned Territory & Sub-Division</span>
                <span className="font-bold text-slate-900 block text-sm">
                  {officer.zone} • Sub-Div IV
                </span>
                <span className="text-[11px] text-slate-500">
                  Covering 14 commercial wards and 3 industrial hubs.
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block">Digital Verification Seal Master ID</span>
                <span className="font-mono font-bold text-[#003366] block text-sm">
                  SEAL-DL-019-CRYPT-2026
                </span>
                <span className="text-[11px] text-slate-500">
                  Cryptographic ECDSA P-256 signing key active.
                </span>
              </div>
            </div>
          </div>

          {/* Working Standard Equipment in Officer's Custody */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Calibrated Reference Standards in Custody
                </h3>
              </div>
              <span className="text-xs text-slate-500">Traceable to CSIR-NPL</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    M1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Standard Test Weights Box (1 mg to 20 kg)</h4>
                    <p className="text-[11px] text-slate-500 font-mono">Set ID: STD-DL-M1-2024-0081 • OIML R111-1</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-700 block">Valid to: 15 Mar 2027</span>
                  <span className="text-[10px] text-slate-400">RRSL Verified</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                    Vol
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Conical Volume Measure Kit (5L, 10L, 20L)</h4>
                    <p className="text-[11px] text-slate-500 font-mono">Set ID: VOL-DL-2023-4410 • Brass Standard</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-700 block">Valid to: 20 Aug 2027</span>
                  <span className="text-[10px] text-slate-400">State Lab Calibrated</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Official ID Badge Card */}
        <div className="space-y-6">
          {/* Official Inspector Digital ID Card */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl border border-slate-800 text-center space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[10px] uppercase tracking-widest font-mono text-amber-400">
              <span>Govt of NCT of Delhi</span>
              <span>LMO Official ID</span>
            </div>

            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-700 mx-auto flex items-center justify-center font-black text-2xl text-slate-950 shadow-inner">
              SM
            </div>

            <div>
              <h3 className="font-black text-lg text-white">{officer.name}</h3>
              <p className="text-xs text-amber-300 font-semibold">{officer.designation}</p>
              <p className="text-[11px] text-slate-400 font-mono mt-1">Badge: {officer.badgeNumber}</p>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 text-left space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Zone:</span>
                <span className="font-bold text-slate-200">{officer.zone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ID Validity:</span>
                <span className="font-mono font-bold text-emerald-400">31 Dec 2028</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Security Clearance:</span>
                <span className="font-mono font-bold text-indigo-300">Level-3 Field Officer</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Digitally Verified by Controller of Legal Metrology</span>
            </div>
          </div>

          {/* Official Departmental Contact Details */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-100 pb-2">
              Official Contact & Office
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Office Address</span>
                  <span className="font-medium text-slate-800">
                    Legal Metrology Department, Room 204, Vikas Bhawan, I.P. Estate, New Delhi - 110002
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Official Email</span>
                  <span className="font-medium text-slate-800">{officer.email || "suresh.meena.lmo@delhi.gov.in"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Govt Helpline / Ext</span>
                  <span className="font-medium text-slate-800">+91 11 2337 9102 (Ext 19)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

