"use client";

import React from "react";
import {
  BarChart3,
  TrendingUp,
  Activity,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Thermometer,
  Droplets,
  Gauge,
} from "lucide-react";
import { LabTelemetry } from "@/types/gatc";

interface GatcAnalyticsViewProps {
  telemetry: LabTelemetry;
}

export const GatcAnalyticsView: React.FC<GatcAnalyticsViewProps> = ({ telemetry }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5" />
            NABL ISO/IEC 17025 Continuous Quality Assurance
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Lab Operational Analytics & Telemetry
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Real-time environmental monitoring logs, calibration turnaround SLAs, test sample pass/rejection ratios, and equipment utilization metrics.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-1">
          <span className="text-xs font-semibold text-slate-500">Monthly Calibrations Completed</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums tracking-tight">148</span>
            <span className="text-xs text-emerald-600 font-semibold">+18% YoY</span>
          </div>
          <span className="text-[11px] text-slate-500 font-normal mt-1 block">Target: 130 tests/month</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-1">
          <span className="text-xs font-semibold text-slate-500">First-Pass Conformity Rate</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-600 font-mono tabular-nums tracking-tight">96.4%</span>
            <span className="text-xs text-slate-500 font-mono font-medium">(143 / 148)</span>
          </div>
          <span className="text-[11px] text-slate-500 font-normal mt-1 block">5 failed MPE tolerance</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-1">
          <span className="text-xs font-semibold text-slate-500">Average Turnaround Time</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-bold text-blue-700 font-mono tabular-nums tracking-tight">1.8 Days</span>
            <span className="text-xs text-emerald-600 font-semibold">-0.4d SLA</span>
          </div>
          <span className="text-[11px] text-slate-500 font-normal mt-1 block">Statutory SLA limit: 3.0 days</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-1">
          <span className="text-xs font-semibold text-slate-500">Central Passport Sync Ratio</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-bold text-amber-600 font-mono tabular-nums tracking-tight">100%</span>
            <span className="text-xs text-emerald-600 font-semibold">Live Synced</span>
          </div>
          <span className="text-[11px] text-slate-500 font-normal mt-1 block">0 pending out-of-sync logs</span>
        </div>
      </div>

      {/* Environmental Cleanroom Telemetry Logs */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-amber-600" />
            24-Hour Environmental Cleanroom Stability Telemetry
          </h3>
          <span className="text-xs text-slate-500">{telemetry.lastSensorReadingTime}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 block mb-1">Temperature Variance</span>
            <span className="text-xl font-bold font-mono text-slate-900">{telemetry.cleanroomTempC}°C ±0.3°C</span>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">✓ Within ISO 17025 ±0.5°C envelope</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 block mb-1">Relative Humidity Envelope</span>
            <span className="text-xl font-bold font-mono text-slate-900">{telemetry.relativeHumidity}% ±2%</span>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">✓ Within 40% - 60% range</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 block mb-1">Ambient Air Density</span>
            <span className="text-xl font-bold font-mono text-slate-900">{telemetry.airDensityKgM3} kg/m³</span>
            <div className="text-[11px] text-slate-600 mt-1">Air buoyancy correction active</div>
          </div>
        </div>
      </div>
    </div>
  );
};
