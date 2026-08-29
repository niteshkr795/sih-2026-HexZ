"use client";

import React, { useState } from "react";
import { AdminHeader } from "./AdminHeader";
import { AdminCommandCenterView } from "./AdminCommandCenterView";
import { AdminInspectorAllocatorView } from "./AdminInspectorAllocatorView";
import { AdminEnforcementView } from "./AdminEnforcementView";
import { AdminStandardsTaxonomyView } from "./AdminStandardsTaxonomyView";
import { AdminAuditLedgerView } from "./AdminAuditLedgerView";
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
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col antialiased">
      <AdminHeader
        selectedState={selectedState}
        onStateChange={setSelectedState}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBackToHome={onBackToHome}
        tamperAlertCount={currentTelemetry.nationalTamperingAlerts}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
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
      </main>
    </div>
  );
}
