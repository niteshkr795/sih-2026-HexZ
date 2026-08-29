"use client";

import React from "react";
import {
  ShieldAlert,
  Building2,
  Users,
  Layers,
  Scale,
  FileCheck2,
  ArrowLeft,
  Globe2,
  Bell,
  SlidersHorizontal,
} from "lucide-react";
import { JurisdictionState, AdminTab } from "@/types/admin";

interface AdminHeaderProps {
  selectedState: JurisdictionState;
  onStateChange: (state: JurisdictionState) => void;
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onBackToHome?: () => void;
  tamperAlertCount: number;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  selectedState,
  onStateChange,
  activeTab,
  onTabChange,
  onBackToHome,
  tamperAlertCount,
}) => {
  const states: JurisdictionState[] = [
    "ALL_INDIA",
    "Delhi NCT",
    "Maharashtra",
    "Karnataka",
    "Gujarat",
    "Tamil Nadu",
    "Uttar Pradesh",
  ];

  const tabs: { id: AdminTab; label: string; badge?: string }[] = [
    { id: "command_center", label: "National Command Center" },
    { id: "inspector_allocator", label: "Inspector Allocation & Zones", badge: "5 Zones" },
    { id: "enforcement_seizures", label: "Enforcement & Seizure Notices", badge: `${tamperAlertCount} Alerts` },
    { id: "standards_taxonomy", label: "Statutory Standards & Fees", badge: "4 Schedules" },
    { id: "audit_ledger", label: "Cryptographic Audit Ledger", badge: "Live" },
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Role */}
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
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-md shadow-indigo-900/30 text-white border border-indigo-400/30">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm tracking-tight text-white uppercase">
                    Directorate Administrator
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                    Central Authority
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  Ministry of Consumer Affairs, Food & Public Distribution • Legal Metrology Division
                </p>
              </div>
            </div>
          </div>

          {/* Jurisdiction State Switcher */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <Globe2 className="w-4 h-4 text-indigo-400" />
              <span className="text-xs text-slate-300 font-medium hidden sm:inline">Jurisdiction:</span>
              <select
                value={selectedState}
                onChange={(e) => onStateChange(e.target.value as JurisdictionState)}
                className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
              >
                {states.map((s) => (
                  <option key={s} value={s} className="bg-slate-900 text-white">
                    {s === "ALL_INDIA" ? "🇮🇳 All India (National Overview)" : s}
                  </option>
                ))}
              </select>
            </div>

            {/* Profile */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 border border-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                CA
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-semibold text-white leading-tight">Shri R. K. Singhal</div>
                <div className="text-[10px] text-slate-400">Joint Director (Metrology)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
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
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-extrabold ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
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
