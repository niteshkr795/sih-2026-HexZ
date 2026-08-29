"use client";

import React from "react";
import { 
  ClipboardList, 
  ScanSearch, 
  FileCheck2, 
  BarChart3,
  UserCheck,
} from "lucide-react";

export type LmoTabType = "queue" | "wizard" | "ledger" | "analytics" | "profile";

interface LmoNavTabsProps {
  activeTab: LmoTabType;
  setActiveTab: (tab: LmoTabType) => void;
  pendingCount: number;
  activeWizardTaskName?: string | null;
}

export const LmoNavTabs: React.FC<LmoNavTabsProps> = ({
  activeTab,
  setActiveTab,
  pendingCount,
  activeWizardTaskName,
}) => {
  const tabs = [
    {
      id: "queue" as LmoTabType,
      label: "Today's Inspection Queue",
      shortLabel: "Queue",
      icon: ClipboardList,
      badge: pendingCount > 0 ? `${pendingCount} Pending` : null,
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      id: "wizard" as LmoTabType,
      label: "5-Step Field Verification Wizard",
      shortLabel: "Field Wizard",
      icon: ScanSearch,
      badge: activeWizardTaskName ? "Active Session" : "New",
      badgeColor: activeWizardTaskName 
        ? "bg-emerald-100 text-emerald-800 border-emerald-300 animate-pulse" 
        : "bg-slate-100 text-slate-700 border-slate-200",
    },
    {
      id: "ledger" as LmoTabType,
      label: "Issued Certificates & Stamping Ledger",
      shortLabel: "Cert Ledger",
      icon: FileCheck2,
      badge: "Historical",
      badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    },
    {
      id: "analytics" as LmoTabType,
      label: "Territory Analytics & Compliance",
      shortLabel: "Analytics",
      icon: BarChart3,
      badge: "Live KPIs",
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    },
    {
      id: "profile" as LmoTabType,
      label: "Officer Credentials & Jurisdiction Profile",
      shortLabel: "Officer Profile",
      icon: UserCheck,
      badge: "Verified Badge",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
  ];

  return (
    <div className="bg-white border-b border-slate-200 sticky top-[92px] z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 scrollbar-none" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden">{tab.shortLabel}</span>

                {tab.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isActive
                        ? "bg-white/20 text-white border-white/30"
                        : tab.badgeColor
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
