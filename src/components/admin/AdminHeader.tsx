"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldAlert,
  Building2,
  Users,
  Scale,
  FileCheck2,
  Globe2,
  LayoutDashboard,
  Bell,
  ArrowLeft,
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

  const tabs: { id: AdminTab; label: string; icon: any; badge?: string }[] = [
    { id: "command_center", label: "Command Center", icon: LayoutDashboard },
    { id: "inspector_allocator", label: "Zones & Allocator", icon: Users, badge: "5 Zones" },
    { id: "enforcement_seizures", label: "Enforcement", icon: ShieldAlert, badge: `${tamperAlertCount}` },
    { id: "standards_taxonomy", label: "Statutory Standards", icon: Scale, badge: "4" },
    { id: "audit_ledger", label: "Audit Ledger", icon: FileCheck2, badge: "Live" },
    { id: "directorate_profile", label: "Profile", icon: Building2 },
  ];

  return (
    <>
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between transition-all shadow-2xs">
        {/* Left: Mobile Brand & Portal Title */}
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
                National Metrology Command Directorate
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                Apex Authority
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono hidden sm:block">
              Ministry of Consumer Affairs, Food & Public Distribution • Legal Metrology Division
            </p>
          </div>
        </div>

        {/* Right: Jurisdiction State Selector & Profile Info */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Jurisdiction Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700">
            <Globe2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="font-semibold text-slate-500 hidden sm:inline">Jurisdiction:</span>
            <select
              value={selectedState}
              onChange={(e) => onStateChange(e.target.value as JurisdictionState)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer pr-1 text-xs"
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s === "ALL_INDIA" ? "🇮🇳 All India (National)" : s}
                </option>
              ))}
            </select>
          </div>

          {/* Profile Tag */}
          <div className="hidden lg:flex items-center space-x-2.5 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              CA
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">Shri R. K. Singhal</div>
              <div className="text-[10px] text-slate-500">Joint Director (Metrology)</div>
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
                  ? "bg-indigo-600 text-white shadow-2xs"
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
