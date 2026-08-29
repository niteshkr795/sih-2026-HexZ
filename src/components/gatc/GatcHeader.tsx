"use client";

import React from "react";
import {
  Scale,
  Award,
  Thermometer,
  Droplets,
  Gauge,
  Activity,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { LabTelemetry } from "@/types/gatc";

interface GatcHeaderProps {
  telemetry: LabTelemetry;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBackToHome?: () => void;
  isSyncing: boolean;
  onRefreshSync: () => void;
}

export const GatcHeader: React.FC<GatcHeaderProps> = ({
  telemetry,
  activeTab,
  onTabChange,
  onBackToHome,
  isSyncing,
  onRefreshSync,
}) => {
  const tabs = [
    { id: "testing_queue", label: "Lab Sample Queue", badge: "2 Active" },
    { id: "calibration_bench", label: "Precision Test Bench", badge: "Bench 01" },
    { id: "certificates", label: "Calibration Certificates", badge: "2 Issued" },
    { id: "standards_equipment", label: "Working Reference Standards", badge: "4 Assets" },
    { id: "lab_analytics", label: "Lab Telemetry & Analytics" },
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm">
      {/* Top Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portal Identity */}
          <div className="flex items-center space-x-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition border border-slate-700"
                title="Return to DigiPass Portal Switcher"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Portals</span>
              </button>
            )}

            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-md shadow-amber-900/30 text-white border border-amber-400/30">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm tracking-tight text-white uppercase">
                    GATC Testing Lab
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    NABL ISO/IEC 17025
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  Code: GATC-NABL-CAL-8841 • National Metrology Precision Center
                </p>
              </div>
            </div>
          </div>

          {/* Real-Time Cleanroom Telemetry Chip */}
          <div className="hidden lg:flex items-center space-x-4 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Thermometer className="w-4 h-4 text-rose-400" />
              <span>Temp: <strong className="text-white font-mono">{telemetry.cleanroomTempC}°C</strong></span>
            </div>
            <div className="w-px h-3.5 bg-slate-700" />
            <div className="flex items-center gap-1.5 text-slate-300">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span>Humidity: <strong className="text-white font-mono">{telemetry.relativeHumidity}%</strong></span>
            </div>
            <div className="w-px h-3.5 bg-slate-700" />
            <div className="flex items-center gap-1.5 text-slate-300">
              <Gauge className="w-4 h-4 text-amber-400" />
              <span>Pressure: <strong className="text-white font-mono">{telemetry.barometricPressureHpa} hPa</strong></span>
            </div>
          </div>

          {/* Sync & User Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onRefreshSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold border border-blue-500/30 transition"
              title="Sync with Central Legal Metrology Passport"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-blue-400" : ""}`} />
              <span className="hidden sm:inline">{isSyncing ? "Syncing..." : "Passport Sync"}</span>
            </button>

            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold text-xs">
                AB
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-semibold text-white leading-tight">Dr. Ananya Bose</div>
                <div className="text-[10px] text-slate-400">Chief Metrologist</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-slate-900/95 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 overflow-x-auto py-2 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-extrabold ${
                      isActive ? "bg-slate-950/20 text-slate-950" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
