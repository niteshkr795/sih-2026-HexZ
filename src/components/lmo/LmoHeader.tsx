"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Shield, 
  MapPin, 
  Wifi, 
  Clock, 
  Award,
  BellRing,
  ClipboardList,
  ScanSearch,
  FileCheck2,
  BarChart3,
  UserCheck,
} from "lucide-react";
import { OfficerProfile } from "@/types/lmo";
import { LmoTabType } from "@/components/lmo/LmoNavTabs";

interface LmoHeaderProps {
  officer: OfficerProfile;
  activeTab: LmoTabType;
  onTabChange: (tab: LmoTabType) => void;
  onBackToHome?: () => void;
  pendingCount: number;
}

export const LmoHeader: React.FC<LmoHeaderProps> = ({
  officer,
  activeTab,
  onTabChange,
  onBackToHome,
  pendingCount,
}) => {
  const tabs: { id: LmoTabType; label: string; icon: any; badge?: string | null }[] = [
    { id: "queue", label: "Queue", icon: ClipboardList, badge: pendingCount > 0 ? `${pendingCount}` : null },
    { id: "wizard", label: "Field Wizard", icon: ScanSearch },
    { id: "ledger", label: "Cert Ledger", icon: FileCheck2 },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "profile", label: "Profile", icon: UserCheck },
  ];

  return (
    <>
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between transition-all shadow-2xs">
        {/* Left: Mobile Brand & Officer Name */}
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
                {officer.name}
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {officer.syncStatus === "ONLINE_SYNCED" ? "TLS Online" : "Cached"}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono hidden sm:block">
              {officer.designation} • ID: {officer.id} • {officer.zone}, {officer.state}
            </p>
          </div>
        </div>

        {/* Right: Quick KPI, Shift & Alerts */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="hidden xl:flex items-center space-x-3 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center gap-1 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono">Shift: 09:00-18:00</span>
            </div>
            <div className="w-px h-3.5 bg-slate-200" />
            <div className="flex items-center gap-1 text-emerald-700 font-medium">
              <Wifi className="w-3.5 h-3.5 text-emerald-600" /> 4G Active
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-slate-600">
              Compliance: <strong className="text-emerald-700 font-mono">{officer.complianceRate}%</strong>
            </span>
          </div>

          <div className="relative">
            <button 
              title="Pending tasks" 
              onClick={() => onTabChange("queue")}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <BellRing className="w-4 h-4 text-blue-600" />
            </button>
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-[10px] font-bold flex items-center justify-center text-white">
                {pendingCount}
              </span>
            )}
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
                  ? "bg-blue-600 text-white shadow-2xs font-bold"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
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
