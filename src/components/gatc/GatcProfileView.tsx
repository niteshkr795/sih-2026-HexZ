"use client";

import React from "react";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Thermometer,
  Droplets,
  Gauge,
  Phone,
  Mail,
  MapPin,
  Scale,
  FileCheck2,
  Printer,
  Sparkles,
  Lock,
} from "lucide-react";
import { LabTelemetry } from "@/types/gatc";

interface GatcProfileViewProps {
  telemetry: LabTelemetry;
}

export const GatcProfileView: React.FC<GatcProfileViewProps> = ({ telemetry }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-[#1E293B] to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 p-1 shadow-lg flex items-center justify-center text-white">
              <Award className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  National Precision Metrology Calibration Center
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Govt Approved Test Center (GATC)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Notified under Rule 29 of Legal Metrology (General) Rules, 2011
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span>Accreditation: <strong>NABL ISO/IEC 17025:2017 (CC-2981)</strong></span>
                <span>•</span>
                <span>Code: <strong>GATC-DL-NORTH-01</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-white/10 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Laboratory Profile</span>
          </button>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Accreditation, Scope & Cleanroom Standards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statutory Recognition & NABL Accreditation */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Accreditation & Government Notification
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
                NABL Recognized
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block">NABL Certificate Number</span>
                <span className="font-mono font-bold text-slate-900 block text-sm">
                  CC-2981 (Discipline: Mechanical)
                </span>
                <span className="text-[11px] text-slate-500">
                  Valid from 01 Sep 2024 to 31 Aug 2027.
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block">Central Government Gazette Order</span>
                <span className="font-mono font-bold text-slate-900 block text-sm">
                  S.O. 1942(E) • DoCA/LM/GATC/2024
                </span>
                <span className="text-[11px] text-slate-500">
                  Notified in The Gazette of India Extraordinary.
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block">Approved Signatory & Lab Director</span>
                <span className="font-bold text-slate-900 block text-sm">
                  Dr. Ananya Bose, Ph.D. (Metrology)
                </span>
                <span className="text-[11px] text-slate-500">
                  Authorized for ISO 17025 Calibration Reports.
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 block">Cryptographic Signing HSM Key</span>
                <span className="font-mono font-bold text-slate-900 block text-sm">
                  GATC-SIGN-KEY-ECDSA-2026
                </span>
                <span className="text-[11px] text-slate-500">
                  Directly linked to National Digital Passport Authority.
                </span>
              </div>
            </div>
          </div>

          {/* Cleanroom Environment & Primary Comparators */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Cleanroom Telemetry & Laboratory Infrastructure
                </h3>
              </div>
              <span className="text-xs text-slate-500">ISO Class 7 Cleanroom</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-rose-50/50 rounded-2xl border border-rose-100">
                <Thermometer className="w-5 h-5 text-rose-500 mx-auto mb-1" />
                <span className="text-[10px] text-slate-500 block">Cleanroom Temp</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{telemetry.cleanroomTempC}°C</span>
                <span className="text-[9px] text-emerald-700 font-medium block">Nominal: 20.0 ±0.5°C</span>
              </div>
              <div className="p-3 bg-cyan-50/50 rounded-2xl border border-cyan-100">
                <Droplets className="w-5 h-5 text-cyan-500 mx-auto mb-1" />
                <span className="text-[10px] text-slate-500 block">Relative Humidity</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{telemetry.relativeHumidity}%</span>
                <span className="text-[9px] text-emerald-700 font-medium block">Target: 45% - 55%</span>
              </div>
              <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-100">
                <Gauge className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <span className="text-[10px] text-slate-500 block">Atm Pressure</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{telemetry.barometricPressureHpa} hPa</span>
                <span className="text-[9px] text-emerald-700 font-medium block">Live Barometer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Lab Card & Contact */}
        <div className="space-y-6">
          {/* Official GATC Certificate Badge Card */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl border border-slate-800 text-center space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[10px] uppercase tracking-widest font-mono text-amber-400">
              <span>National Lab Registry</span>
              <span>ISO/IEC 17025</span>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-700 mx-auto flex items-center justify-center text-white shadow-md">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-black text-base text-white">GATC Precision Lab #01</h3>
              <p className="text-xs text-amber-300 font-semibold mt-0.5">Government Approved Test Centre</p>
              <p className="text-[10px] text-slate-400 font-mono mt-1">Ref: NABL-CC-2981-2026</p>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 text-left space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Calibration Scope:</span>
                <span className="font-bold text-slate-200">Mass & Dimension</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Traceability:</span>
                <span className="font-mono font-bold text-emerald-400">CSIR-NPL E2 Reference</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sync Pipeline:</span>
                <span className="font-mono font-bold text-indigo-300">National DigiPass Hub</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>NABL ISO 17025 Accredited & Active</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-100 pb-2">
              Laboratory Location & Contact
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Lab Facility Address</span>
                  <span className="font-medium text-slate-800">
                    Advanced Metrology Complex, Block C, Okhla Phase-III, New Delhi - 110020
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Laboratory Email</span>
                  <span className="font-medium text-slate-800">lab.director@gatc-calibrations.gov.in</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Sample Helpdesk</span>
                  <span className="font-medium text-slate-800">+91 11 4055 8820</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

