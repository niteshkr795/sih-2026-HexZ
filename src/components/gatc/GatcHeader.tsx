"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
  ClipboardList,
  SlidersHorizontal,
  Building2,
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
    { id: "testing_queue", label: "Sample Queue", icon: ClipboardList, badge: "2 Active" },
    { id: "calibration_bench", label: "Test Bench", icon: SlidersHorizontal, badge: "Bench 01" },
    { id: "certificates", label: "Certificates", icon: Award, badge: "2 Issued" },
    { id: "standards_equipment", label: "Standards", icon: Scale, badge: "4 Assets" },
    { id: "lab_analytics", label: "Telemetry", icon: Activity },
    { id: "lab_profile", label: "Lab Profile", icon: Building2 },
  ];

  return (
    <>
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between transition-all shadow-2xs">
        {/* Left: Mobile Logo & Lab Title */}
        <div className="flex items-center gap-3">
          <div className="md:hidden flex items-center gap-2">
            {onBackToHome ? (
              <button
                onClick={onBackToHome}
                className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 shrink-0"
              >
                <Image src="/logo.jpg" alt="DigiPass" fill className="object-contain" />
              </button>
            ) : (
              <Link href="/" className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                <Image src="/logo.jpg" alt="DigiPass" fill className="object-contain" />
              </Link>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-extrabold text-base sm:text-lg text-slate-950 tracking-tight">
                GATC Precision Testing & Calibration Lab
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                ISO/IEC 17025 Accredited
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono hidden sm:block">
              Code: GATC-NABL-CAL-8841 • National Metrology Calibration Center
            </p>
          </div>
        </div>

        {/* Right: Cleanroom Telemetry, Sync & Profile Tag */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Real-Time Cleanroom Telemetry Chip */}
          <div className="hidden xl:flex items-center space-x-3 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Thermometer className="w-3.5 h-3.5 text-rose-500" />
              <span>Temp: <strong className="text-slate-900 font-mono">{telemetry.cleanroomTempC}°C</strong></span>
            </div>
            <div className="w-px h-3.5 bg-slate-200" />
            <div className="flex items-center gap-1.5 text-slate-600">
              <Droplets className="w-3.5 h-3.5 text-cyan-500" />
              <span>Humidity: <strong className="text-slate-900 font-mono">{telemetry.relativeHumidity}%</strong></span>
            </div>
            <div className="w-px h-3.5 bg-slate-200" />
            <div className="flex items-center gap-1.5 text-slate-600">
              <Gauge className="w-3.5 h-3.5 text-amber-500" />
              <span>Pressure: <strong className="text-slate-900 font-mono">{telemetry.barometricPressureHpa} hPa</strong></span>
            </div>
          </div>

          {/* Sync Button */}
          <button
            onClick={onRefreshSync}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition shadow-2xs"
            title="Sync with Central Legal Metrology Passport"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-blue-600" : "text-blue-600"}`} />
            <span className="hidden sm:inline">{isSyncing ? "Syncing..." : "Passport Sync"}</span>
          </button>

          {/* Profile Tag */}
          <div className="hidden lg:flex items-center space-x-2.5 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shadow-xs">
              AB
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">Dr. Ananya Bose</div>
              <div className="text-[10px] text-slate-500">Chief Metrologist</div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Tabs (visible only on small screens < md) */}
      <div className="md:hidden flex items-center overflow-x-auto bg-white border-b border-slate-200 px-4 py-2 gap-1.5 scrollbar-none text-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold transition-all ${
                isActive
                  ? "bg-amber-500 text-slate-950 shadow-2xs font-bold"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? "bg-slate-950/20 text-slate-950" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};
