"use client";

import React from "react";
import {
  Scale,
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Building2,
  Users,
  IndianRupee,
  Activity,
  ArrowUpRight,
  Clock,
  Layers,
  MapPin,
} from "lucide-react";
import {
  JurisdictionState,
  NationalTelemetryKPIs,
  ZoneWorkloadMetric,
  EnforcementViolationRecord,
} from "@/types/admin";

interface AdminCommandCenterViewProps {
  selectedState: JurisdictionState;
  telemetry: NationalTelemetryKPIs;
  zones: ZoneWorkloadMetric[];
  recentViolations: EnforcementViolationRecord[];
  onNavigateTab: (tab: any) => void;
}

export const AdminCommandCenterView: React.FC<AdminCommandCenterViewProps> = ({
  selectedState,
  telemetry,
  zones,
  recentViolations,
  onNavigateTab,
}) => {
  const formatInrCr = (amount: number) => {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5" />
            National Metrology Compliance Command & Telemetry Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {selectedState === "ALL_INDIA" ? "National Metrology Overview" : `${selectedState} State Directorate`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Real-time regulatory compliance telemetry, inspector allocation balancing, stamping fee collection, and enforcement tracking under Legal Metrology Act, 2009.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[160px]">
          <span className="text-xs text-slate-300 font-medium block">National Compliance</span>
          <span className="text-3xl font-black text-emerald-400 font-mono my-0.5">
            {telemetry.activeCompliantRate}%
          </span>
          <span className="text-[11px] text-slate-400 block">SLA Target: 92.0%</span>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Registered */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500 flex items-center justify-between">
            Registered Instruments
            <Scale className="w-4 h-4 text-indigo-600" />
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 font-mono">
              {telemetry.totalRegisteredInstruments.toLocaleString()}
            </span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +12.4% YoY Growth
          </span>
        </div>

        {/* Stamping Fee Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500 flex items-center justify-between">
            Stamping Fee Collected
            <IndianRupee className="w-4 h-4 text-emerald-600" />
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-emerald-700 font-mono">
              {formatInrCr(telemetry.annualStampingFeeCollectedInr)}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Direct treasury transfer</span>
        </div>

        {/* Pending Inspections */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500 flex items-center justify-between">
            Pending Inspections
            <Clock className="w-4 h-4 text-amber-600" />
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-amber-600 font-mono">
              {telemetry.activeInspectionsPending}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Assigned across zones</span>
        </div>

        {/* Enforcement Seizures */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500 flex items-center justify-between">
            Seizures & Penalties
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-rose-600 font-mono">
              {telemetry.totalSeizuresAndViolations}
            </span>
          </div>
          <span className="text-[11px] text-rose-600 font-medium">Sec 15/27 Enforcement</span>
        </div>

        {/* GATC Lab Calibrations */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500 flex items-center justify-between">
            GATC Calibrations
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-blue-700 font-mono">
              {telemetry.gatcCalibrationVolume.toLocaleString()}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">NABL Lab Certified</span>
        </div>
      </div>

      {/* 2 Column Layout: Zone Workload Balancer & Live Enforcement Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Zone Workload Balancer (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                Regional Jurisdiction & Inspector Workload Balancer
              </h3>
              <p className="text-xs text-slate-500">
                Monitors caseload per zone to prevent inspection backlog and rebalance inspector assignments.
              </p>
            </div>

            <button
              onClick={() => onNavigateTab("inspector_allocator")}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              Manage Allocation →
            </button>
          </div>

          <div className="space-y-3">
            {zones.map((z) => (
              <div
                key={z.zoneId}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-100/70 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">{z.zoneId}</span>
                    <span className="text-xs font-bold text-slate-700">• {z.zoneName}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-3">
                    <span>Lead: <strong>{z.leadOfficer}</strong></span>
                    <span>Officers: <strong>{z.totalOfficers}</strong></span>
                    <span>Active Cases: <strong className="text-indigo-600">{z.activeAssignedCases}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900 font-mono">{z.complianceRate}%</div>
                    <div className="text-[10px] text-slate-400">Compliance Rate</div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                      z.status === "OVERLOADED"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {z.status === "OVERLOADED" ? "Overloaded" : "Optimal"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Enforcement & Seizure Alerts (1 col) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                Live Seizure & Tamper Alerts
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">
                Active Cases
              </span>
            </div>

            <div className="space-y-3">
              {recentViolations.slice(0, 3).map((v) => (
                <div
                  key={v.id}
                  className="p-3.5 rounded-2xl bg-rose-50/40 border border-rose-200/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-rose-900">{v.caseNumber}</span>
                    <span className="text-[10px] text-rose-700 font-semibold">{v.seizureDate}</span>
                  </div>

                  <div className="font-bold text-slate-900 text-xs">{v.businessName}</div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    {v.violationType.replace(/_/g, " ")} • {v.location}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-500 font-mono">ID: {v.instrumentId}</span>
                    <span className="font-bold text-rose-700">₹{v.compoundingPenaltyInr.toLocaleString()} fine</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab("enforcement_seizures")}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition mt-2"
          >
            View All Enforcement Cases & Notices →
          </button>
        </div>
      </div>
    </div>
  );
};
