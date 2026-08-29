"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ClipboardList,
  ScanSearch,
  FileCheck2,
  BarChart3,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  Shield,
  BadgePercent,
  CheckCircle2,
} from "lucide-react";
import { LmoHeader } from "@/components/lmo/LmoHeader";
import { LmoTabType } from "@/components/lmo/LmoNavTabs";
import { InspectionQueueView } from "@/components/lmo/InspectionQueueView";
import { FieldVerificationWizard } from "@/components/lmo/FieldVerificationWizard";
import { CertificateLedgerView } from "@/components/lmo/CertificateLedgerView";
import { TerritoryAnalyticsView } from "@/components/lmo/TerritoryAnalyticsView";
import { LmoProfileView } from "@/components/lmo/LmoProfileView";
import { ECertificateModal } from "@/components/lmo/ECertificateModal";
import { SeizureNoticeModal } from "@/components/lmo/SeizureNoticeModal";
import { 
  mockOfficer, 
  initialInspectionQueue, 
  initialIssuedCertificates, 
  initialSeizureNotices 
} from "@/data/mockLmoData";
import { 
  InspectionTask, 
  ECertificate, 
  SeizureNotice 
} from "@/types/lmo";

export interface LmoDashboardViewProps {
  onBackToHome?: () => void;
}

export function LmoDashboardView({ onBackToHome }: LmoDashboardViewProps = {}) {
  const [officer, setOfficer] = useState(mockOfficer);
  const [activeTab, setActiveTab] = useState<LmoTabType>("queue");
  const [tasks, setTasks] = useState<InspectionTask[]>(initialInspectionQueue);
  const [selectedTaskForWizard, setSelectedTaskForWizard] = useState<InspectionTask | null>(null);

  const [certificates, setCertificates] = useState<ECertificate[]>(initialIssuedCertificates);
  const [seizureNotices, setSeizureNotices] = useState<SeizureNotice[]>(initialSeizureNotices);

  // Modal display states
  const [activeCertModal, setActiveCertModal] = useState<ECertificate | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const [activeSeizureModal, setActiveSeizureModal] = useState<SeizureNotice | null>(null);
  const [isSeizureModalOpen, setIsSeizureModalOpen] = useState(false);

  // Launch field verification from queue
  const handleLaunchVerification = (task: InspectionTask) => {
    setSelectedTaskForWizard(task);
    setActiveTab("wizard");
  };

  // When a certificate is newly issued in Step 5
  const handleCertificateIssued = (newCert: ECertificate) => {
    setCertificates((prev) => [newCert, ...prev]);
    
    // Remove or update the task status in queue
    if (selectedTaskForWizard) {
      setTasks((prev) =>
        prev.filter((t) => t.id !== selectedTaskForWizard.id)
      );
    }

    // Update officer stats
    setOfficer((prev) => ({
      ...prev,
      totalInspectionsThisMonth: prev.totalInspectionsThisMonth + 1,
      pendingQueueCount: Math.max(0, prev.pendingQueueCount - 1),
    }));

    // Open certificate modal for immediate print/view
    setActiveCertModal(newCert);
    setIsCertModalOpen(true);
    setSelectedTaskForWizard(null);
  };

  // When a seizure notice is issued in Step 5
  const handleSeizureIssued = (newNotice: SeizureNotice) => {
    setSeizureNotices((prev) => [newNotice, ...prev]);

    // Remove or update the task status in queue
    if (selectedTaskForWizard) {
      setTasks((prev) =>
        prev.filter((t) => t.id !== selectedTaskForWizard.id)
      );
    }

    // Update officer stats
    setOfficer((prev) => ({
      ...prev,
      totalInspectionsThisMonth: prev.totalInspectionsThisMonth + 1,
      pendingQueueCount: Math.max(0, prev.pendingQueueCount - 1),
    }));

    // Open seizure modal
    setActiveSeizureModal(newNotice);
    setIsSeizureModalOpen(true);
    setSelectedTaskForWizard(null);
  };

  const handleViewExistingCert = (cert: ECertificate) => {
    setActiveCertModal(cert);
    setIsCertModalOpen(true);
  };

  const handleViewExistingSeizure = (notice: SeizureNotice) => {
    setActiveSeizureModal(notice);
    setIsSeizureModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F9FAFB] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
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
                    Digi<span className="text-blue-600">Pass</span>
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  LMO Field Inspector
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
                    Digi<span className="text-blue-600">Pass</span>
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  LMO Field Inspector
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Officer Profile Card (Clickable to open profile) */}
        <div
          onClick={() => setActiveTab("profile")}
          className="bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-2xl p-3.5 mt-2 flex flex-col gap-2 shadow-2xs cursor-pointer transition-all group"
          title="Click to view full Officer Credentials & Jurisdiction Profile"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 border border-blue-500 flex items-center justify-center text-white font-bold text-xs shrink-0 group-hover:scale-105 transition-transform shadow-xs">
              RK
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-xs text-slate-900 truncate group-hover:text-blue-600 transition-colors" title={officer.name}>
                {officer.name}
              </h4>
              <p className="text-[10px] text-slate-500 font-mono truncate">
                {officer.id} • {officer.badgeNumber}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
            <span className="text-slate-500 font-medium truncate max-w-[110px]">{officer.zone}</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px] shrink-0">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Officer
            </span>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto mt-2 text-xs font-medium pr-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
            Main Operations
          </span>

          <button
            onClick={() => setActiveTab("queue")}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "queue"
                ? "bg-blue-600 text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-3">
              <ClipboardList className="w-4 h-4" />
              <span>Inspection Queue</span>
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === "queue" ? "bg-white/20 text-white" : "bg-blue-100 text-blue-800"
              }`}
            >
              {tasks.length} Pending
            </span>
          </button>

          <button
            onClick={() => setActiveTab("wizard")}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "wizard"
                ? "bg-blue-600 text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-3">
              <ScanSearch className="w-4 h-4" />
              <span>5-Step Verification</span>
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === "wizard"
                  ? "bg-white/20 text-white"
                  : selectedTaskForWizard
                  ? "bg-emerald-100 text-emerald-800 animate-pulse"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {selectedTaskForWizard ? "Active" : "Wizard"}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("ledger")}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "ledger"
                ? "bg-blue-600 text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-3">
              <FileCheck2 className="w-4 h-4" />
              <span>Certificates Ledger</span>
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === "ledger" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              {certificates.length} Issued
            </span>
          </button>

          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1">
            Analytics & Reports
          </span>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "analytics"
                ? "bg-blue-600 text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-3">
              <BarChart3 className="w-4 h-4" />
              <span>Territory Analytics</span>
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === "analytics" ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-800"
              }`}
            >
              Live KPIs
            </span>
          </button>

          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1">
            Officer Profile
          </span>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "profile"
                ? "bg-blue-600 text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Officer Credentials</span>
          </button>
        </nav>

        {/* Footer info & Logout */}
        <div className="pt-3 border-t border-slate-200 flex flex-col gap-1.5 text-xs text-slate-500">
          <div className="flex items-center justify-between px-2 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Field Office Active
            </span>
            <span className="font-mono text-slate-400">DoCA LMO</span>
          </div>
          {onBackToHome ? (
            <button
              onClick={onBackToHome}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-xl font-semibold transition-colors"
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
        <LmoHeader
          officer={officer}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onBackToHome={onBackToHome}
          pendingCount={tasks.length}
        />

        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === "queue" && (
            <InspectionQueueView
              tasks={tasks}
              onSelectTaskForVerification={handleLaunchVerification}
            />
          )}

          {activeTab === "wizard" && (
            <FieldVerificationWizard
              initialTask={selectedTaskForWizard}
              tasks={tasks.length > 0 ? tasks : initialInspectionQueue}
              officer={officer}
              onCertificateIssued={handleCertificateIssued}
              onSeizureIssued={handleSeizureIssued}
              onCancelOrReset={() => {
                setSelectedTaskForWizard(null);
                setActiveTab("queue");
              }}
            />
          )}

          {activeTab === "ledger" && (
            <CertificateLedgerView
              certificates={certificates}
              seizureNotices={seizureNotices}
              onViewCertificate={handleViewExistingCert}
              onViewSeizureNotice={handleViewExistingSeizure}
            />
          )}

          {activeTab === "analytics" && (
            <TerritoryAnalyticsView officer={officer} />
          )}

          {activeTab === "profile" && (
            <LmoProfileView officer={officer} />
          )}
        </div>
      </main>

      {/* Modals */}
      <ECertificateModal
        certificate={activeCertModal}
        isOpen={isCertModalOpen}
        onClose={() => {
          setIsCertModalOpen(false);
          setActiveCertModal(null);
        }}
      />

      <SeizureNoticeModal
        notice={activeSeizureModal}
        isOpen={isSeizureModalOpen}
        onClose={() => {
          setIsSeizureModalOpen(false);
          setActiveSeizureModal(null);
        }}
      />
    </div>
  );
}
