"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  Scale,
  FileCheck2,
  Building2,
  ShieldCheck,
  ArrowRight,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { AdminHeader } from "./AdminHeader";
import { AdminCommandCenterView } from "./AdminCommandCenterView";
import { AdminInspectorAllocatorView } from "./AdminInspectorAllocatorView";
import { AdminEnforcementView } from "./AdminEnforcementView";
import { AdminStandardsTaxonomyView } from "./AdminStandardsTaxonomyView";
import { AdminAuditLedgerView } from "./AdminAuditLedgerView";
import { AdminProfileView } from "./AdminProfileView";
import {
  MOCK_NATIONAL_TELEMETRY,
  MOCK_ZONE_WORKLOADS,
  MOCK_LMO_ROSTER,
  MOCK_ENFORCEMENT_CASES,
  MOCK_STATUTORY_RULES,
  MOCK_AUDIT_LEDGER,
} from "@/data/mockAdminData";
import {
  JurisdictionState,
  AdminTab,
  LmoOfficerRoster,
  StatutoryStandardRule,
} from "@/types/admin";

export function AdminDashboardView({ onBackToHome }: { onBackToHome?: () => void }) {
  const [selectedState, setSelectedState] = useState<JurisdictionState>("ALL_INDIA");
  const [activeTab, setActiveTab] = useState<AdminTab>("command_center");
  const [officers, setOfficers] = useState<LmoOfficerRoster[]>(MOCK_LMO_ROSTER);
  const [rules, setRules] = useState<StatutoryStandardRule[]>(MOCK_STATUTORY_RULES);

  const currentTelemetry =
    MOCK_NATIONAL_TELEMETRY[selectedState] || MOCK_NATIONAL_TELEMETRY["ALL_INDIA"];

  const filteredZones =
    selectedState === "ALL_INDIA"
      ? MOCK_ZONE_WORKLOADS
      : MOCK_ZONE_WORKLOADS.filter((z) => z.state === selectedState);

  const filteredViolations =
    selectedState === "ALL_INDIA"
      ? MOCK_ENFORCEMENT_CASES
      : MOCK_ENFORCEMENT_CASES.filter((v) => v.state === selectedState);

  const handleReallocateCaseload = (officerId: string, delta: number) => {
    setOfficers(
      officers.map((o) =>
        o.id === officerId
          ? { ...o, activeCaseload: Math.max(0, o.activeCaseload + delta) }
          : o
      )
    );
  };

  const handleUpdateRuleFee = (ruleId: string, newFee: number) => {
    setRules(
      rules.map((r) => (r.id === ruleId ? { ...r, statutoryFeeInr: newFee } : r))
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F9FAFB] text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">
      {/* ========================================================================= */}
      {/* DESKTOP SIDEBAR NAVIGATION                                               */}
      {/* ========================================================================= */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0 z-40 p-4 gap-2 flex-shrink-0 select-none">
        {/* Top Logo & App Identity */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          {onBackToHome ? (
            <button onClick={onBackToHome} className="flex items-center gap-2.5 group text-left">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-xs border border-slate-200 bg-white p-0.5 flex-shrink-0">
                <Image src="/logo.jpg" alt="DigiPass" fill className="object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl font-mono text-slate-950 tracking-tight">
                    Digi<span className="text-indigo-600">Pass</span>
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Central Directorate
                </span>
              </div>
            </button>
          ) : (
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-xs border border-slate-200 bg-white p-0.5 flex-shrink-0">
                <Image src="/logo.jpg" alt="DigiPass" fill className="object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl font-mono text-slate-950 tracking-tight">
                    Digi<span className="text-indigo-600">Pass</span>
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Central Directorate
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Directorate Administrator Card (Clickable to open profile) */}
        <div
          onClick={() => setActiveTab("directorate_profile")}
          className="bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-2xl p-3.5 mt-2 flex flex-col gap-2 shadow-2xs cursor-pointer transition-all group"
          title="Click to view Directorate Profile & Statutory Powers"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 border border-indigo-500 flex items-center justify-center text-white font-bold text-xs shrink-0 group-hover:scale-105 transition-transform shadow-xs">
              CA
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-xs text-slate-900 truncate group-hover:text-indigo-600 transition-colors" title="Shri R. K. Singhal">
                Shri R. K. Singhal
              </h4>
              <p className="text-[10px] text-slate-500 font-mono truncate">
                Joint Director (Metrology)
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
            <span className="text-slate-500 font-medium truncate max-w-[110px]">DoCA New Delhi</span>
            <span className="inline-flex items-center gap-1 font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200 text-[10px] shrink-0">
              <Building2 className="w-3 h-3 text-indigo-600" /> Apex Authority
            </span>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto mt-2 text-xs font-medium pr-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
            Main Operations
          </span>

          <button
            onClick={() => setActiveTab("command_center")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "command_center"
                ? "bg-indigo-600 text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>National Command Center</span>
          </button>

          <button
            onClick={() => setActiveTab("inspector_allocator")}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "inspector_allocator"
                ? "bg-indigo-600 text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-3">
              <Users className="w-4 h-4" />
              <span>Inspector Allocation & Zones</span>
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === "inspector_allocator" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              5 Zones
            </span>
          </button>

          <button
            onClick={() => setActiveTab("enforcement_seizures")}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "enforcement_seizures"
                ? "bg-indigo-600 text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-3">
              <ShieldAlert className="w-4 h-4" />
              <span>Enforcement & Seizure</span>
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === "enforcement_seizures" ? "bg-rose-500 text-white" : "bg-rose-100 text-rose-700"
              }`}
            >
              {currentTelemetry.nationalTamperingAlerts} Alerts
            </span>
          </button>

          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1">
            Statutory & Audit
          </span>

          <button
            onClick={() => setActiveTab("standards_taxonomy")}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "standards_taxonomy"
                ? "bg-indigo-600 text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-3">
              <Scale className="w-4 h-4" />
              <span>Statutory Standards & Fees</span>
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === "standards_taxonomy" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              4 Schedules
            </span>
          </button>

          <button
            onClick={() => setActiveTab("audit_ledger")}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "audit_ledger"
                ? "bg-indigo-600 text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-3">
              <FileCheck2 className="w-4 h-4" />
              <span>Cryptographic Audit Ledger</span>
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === "audit_ledger" ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-800"
              }`}
            >
              Live
            </span>
          </button>

          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1">
            Authority & Support
          </span>

          <button
            onClick={() => setActiveTab("directorate_profile")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "directorate_profile"
                ? "bg-indigo-600 text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Directorate Profile</span>
          </button>
        </nav>

        {/* Footer info & Logout */}
        <div className="pt-3 border-t border-slate-200 flex flex-col gap-1.5 text-xs text-slate-500">
          <div className="flex items-center justify-between px-2 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Authority Active
            </span>
            <span className="font-mono text-slate-400">DoCA Central</span>
          </div>
          {onBackToHome ? (
            <button
              onClick={onBackToHome}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl font-semibold transition-colors"
            >
              <span>Back to Main Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <Link
              href="/"
              className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors"
            >
              <span>Exit to Public Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA                                                         */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AdminHeader
          selectedState={selectedState}
          onStateChange={setSelectedState}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onBackToHome={onBackToHome}
          tamperAlertCount={currentTelemetry.nationalTamperingAlerts}
        />

        <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {activeTab === "command_center" && (
            <AdminCommandCenterView
              selectedState={selectedState}
              telemetry={currentTelemetry}
              zones={filteredZones}
              recentViolations={filteredViolations}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === "inspector_allocator" && (
            <AdminInspectorAllocatorView
              officers={officers}
              onReallocateCaseload={handleReallocateCaseload}
            />
          )}

          {activeTab === "enforcement_seizures" && (
            <AdminEnforcementView cases={filteredViolations} />
          )}

          {activeTab === "standards_taxonomy" && (
            <AdminStandardsTaxonomyView
              rules={rules}
              onUpdateRuleFee={handleUpdateRuleFee}
            />
          )}

          {activeTab === "audit_ledger" && (
            <AdminAuditLedgerView blocks={MOCK_AUDIT_LEDGER} />
          )}

          {activeTab === "directorate_profile" && (
            <AdminProfileView selectedState={selectedState} />
          )}
        </div>
      </main>
    </div>
  );
}
