"use client";

import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  Scale, 
  MapPin, 
  DollarSign, 
  ShieldCheck, 
  Activity,
  Layers
} from "lucide-react";
import { OfficerProfile } from "@/types/lmo";

interface TerritoryAnalyticsViewProps {
  officer: OfficerProfile;
}

export const TerritoryAnalyticsView: React.FC<TerritoryAnalyticsViewProps> = ({
  officer,
}) => {
  const categoryStats = [
    { label: "Commercial Counter & Platform Scales", count: 482, percent: 56, color: "bg-blue-600" },
    { label: "Petroleum & Diesel Fuel Dispensers", count: 184, percent: 21, color: "bg-emerald-600" },
    { label: "High Precision Bullion & Gold Balances", count: 112, percent: 13, color: "bg-amber-500" },
    { label: "Heavy APMC Weighbridges (60T+)", count: 86, percent: 10, color: "bg-purple-600" },
  ];

  const zonePerformance = [
    { zone: "Okhla Industrial Phase I-III", total: 248, compliance: 99.2, status: "Excellent" },
    { zone: "Azadpur APMC Wholesale Mandi", total: 310, compliance: 96.8, status: "Good" },
    { zone: "South Extension & Lajpat Nagar", total: 182, compliance: 99.5, status: "Excellent" },
    { zone: "Malviya Nagar & Saket Retail", total: 124, compliance: 97.5, status: "Good" },
  ];

  const renewalTimeline = [
    { period: "Next 15 Days", count: 42, urgency: "text-red-600 bg-red-50 border-red-200" },
    { period: "Next 30 Days", count: 89, urgency: "text-amber-600 bg-amber-50 border-amber-200" },
    { period: "Next 60 Days", count: 164, urgency: "text-blue-600 bg-blue-50 border-blue-200" },
    { period: "Next 90 Days", count: 290, urgency: "text-slate-600 bg-slate-50 border-slate-200" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              National Legal Metrology Telemetry • Department of Consumer Affairs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Territory Compliance & Enforcement Analytics
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time monitoring of commercial weighing compliance, periodic re-verification velocity, 
              stamping fee treasury deposits, and defect seizure rates in {officer.zone}.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[200px] flex flex-col items-center justify-center">
            <span className="text-xs text-slate-300">Overall Territory Rating</span>
            <span className="text-3xl font-black text-emerald-400 font-mono my-0.5">
              GRADE A+
            </span>
            <span className="text-[11px] text-slate-400">98.4% Metrological Accuracy</span>
          </div>
        </div>
      </div>

      {/* 4 Primary KPI Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-500 font-semibold">Total Verified Passports</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums tracking-tight block">864</span>
          <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +14.2% vs previous quarter
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-500 font-semibold">Compliance Pass Rate</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-emerald-600 font-mono tabular-nums tracking-tight block">98.4%</span>
          <span className="text-[11px] text-slate-500 font-normal block mt-1">
            1.6% Seizure / Non-compliance
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-500 font-semibold">Stamping Treasury Revenue</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-purple-700 font-mono tabular-nums tracking-tight block">₹4,82,500</span>
          <span className="text-[11px] text-slate-500 font-normal block mt-1">
            Auto-reconciled via BharatKosh
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-500 font-semibold">Average Audit Duration</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-amber-600 font-mono tabular-nums tracking-tight block">12.4 min</span>
          <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> 3.2x faster than manual ledger
          </span>
        </div>
      </div>

      {/* Detailed Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Equipment Taxonomy Distribution */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              Verified Instrument Distribution
            </h3>
            <span className="text-xs text-slate-400 font-mono">864 Instruments</span>
          </div>

          <div className="space-y-4 text-xs">
            {categoryStats.map((cat, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between items-center font-semibold text-slate-800">
                  <span>{cat.label}</span>
                  <span className="font-mono text-slate-900 font-bold">
                    {cat.count} ({cat.percent}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cat.color}`}
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-600 flex items-start gap-3">
            <Layers className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>
              All registered instruments possess an active cryptographic DigiPass token and are tracked for annual re-verification.
            </span>
          </div>
        </div>

        {/* Right Column: Zone-wise Compliance Performance */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Sector Compliance Breakdown
            </h3>
            <span className="text-xs text-slate-400 font-mono">District Sub-Zones</span>
          </div>

          <div className="space-y-3 text-xs">
            {zonePerformance.map((z, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div>
                  <span className="font-bold text-slate-900 block text-sm">{z.zone}</span>
                  <span className="text-slate-500 text-[11px]">
                    {z.total} Instruments Audited • Status: {z.status}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-emerald-600 font-mono block">
                    {z.compliance}%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Compliant
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Re-Verification Predictive Pipeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            <h3 className="font-extrabold text-slate-900 text-base">
              Predictive Re-Verification & Expiry Forecast
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Automated SMS & WhatsApp notices dispatched 30 days prior
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {renewalTimeline.map((item, i) => (
            <div key={i} className={`p-4 rounded-2xl border ${item.urgency} space-y-1`}>
              <span className="font-bold text-xs uppercase tracking-wider block">
                {item.period}
              </span>
              <span className="text-3xl font-black font-mono block">
                {item.count}
              </span>
              <span className="text-[11px] block opacity-80">
                Instruments Due for Mandatory Stamping
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
