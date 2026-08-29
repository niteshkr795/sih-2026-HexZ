"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Scale,
  Award,
  BarChart3,
  Building2,
  ClipboardList,
  SlidersHorizontal,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { GatcHeader } from "./GatcHeader";
import { GatcQueueView } from "./GatcQueueView";
import { GatcCalibrationBenchView } from "./GatcCalibrationBenchView";
import { GatcCertificatesView } from "./GatcCertificatesView";
import { GatcStandardsView } from "./GatcStandardsView";
import { GatcAnalyticsView } from "./GatcAnalyticsView";
import { GatcProfileView } from "./GatcProfileView";
import { GatcCertificateModal } from "./GatcCertificateModal";
import {
  MOCK_GATC_BATCHES,
  MOCK_GATC_CERTIFICATES,
  MOCK_WORKING_STANDARDS,
  MOCK_LAB_TELEMETRY,
} from "@/data/mockGatcData";
import { LabSampleBatch, GatcCalibrationCertificate } from "@/types/gatc";

export function GatcDashboardView({ onBackToHome }: { onBackToHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<string>("testing_queue");
  const [batches, setBatches] = useState<LabSampleBatch[]>(MOCK_GATC_BATCHES);
  const [activeBatchId, setActiveBatchId] = useState<string>(MOCK_GATC_BATCHES[0].id);
  const [certificates, setCertificates] = useState<GatcCalibrationCertificate[]>(MOCK_GATC_CERTIFICATES);
  const [selectedCertificate, setSelectedCertificate] = useState<GatcCalibrationCertificate | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const activeBatchesCount = batches.filter(
    (b) => b.status === "IN_QUEUE" || b.status === "CALIBRATION_IN_PROGRESS"
  ).length;

  const handleSelectBatchForBench = (batchId: string) => {
    setActiveBatchId(batchId);
    setActiveTab("calibration_bench");
  };

  const handleIssueCertificate = (batch: LabSampleBatch) => {
    const newCertId = `GATC-NABL-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newUlr = `ULR-CC2981260000${Math.floor(1000 + Math.random() * 9000)}F`;

    const newCert: GatcCalibrationCertificate = {
      certificateId: newCertId,
      ulrNumber: newUlr,
      batchId: batch.id,
      instrumentId: `IN-MET-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      serialNumber: batch.serialNumber,
      equipmentDescription: batch.model,
      accuracyClass: "OIML R76 Class I / II High Precision",
      customerName: batch.clientName,
      customerAddress: "Accredited Commercial Premises, India",
      calibratedOn: "2026-08-29",
      validUntil: "2027-08-28",
      signatoryName: "Dr. Ananya Bose, Ph.D.",
      signatoryDesignation: "Chief Metrologist & Approved Signatory",
      traceabilityChain: "NPL Standard E2 Set -> GATC Primary Comparator -> Instrument",
      environmentalConditions: `Temp: ${MOCK_LAB_TELEMETRY.cleanroomTempC}°C, Humidity: ${MOCK_LAB_TELEMETRY.relativeHumidity}%`,
      overallVerdict: "CONFORMS_TO_OIML_R76",
      qrVerificationToken: `gatc_sec_token_${Date.now()}`,
      cryptographicSignature: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      passportSyncStatus: "SYNCED",
    };

    setCertificates([newCert, ...certificates]);
    // update batch status
    setBatches(
      batches.map((b) =>
        b.id === batch.id
          ? { ...b, status: "CERTIFICATE_ISSUED", certificateId: newCertId, syncTimestamp: "Just now" }
          : b
      )
    );

    setSelectedCertificate(newCert);
  };

  const handleSyncToPassport = (certId: string) => {
    setCertificates(
      certificates.map((c) =>
        c.certificateId === certId ? { ...c, passportSyncStatus: "SYNCED" } : c
      )
    );
    if (selectedCertificate && selectedCertificate.certificateId === certId) {
      setSelectedCertificate({ ...selectedCertificate, passportSyncStatus: "SYNCED" });
    }
  };

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setCertificates(certificates.map((c) => ({ ...c, passportSyncStatus: "SYNCED" })));
      setIsSyncing(false);
      alert("All GATC Calibration Certificates successfully pushed & synced to the National Central Metrology Passport database.");
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F9FAFB] text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950">
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
                    Digi<span className="text-amber-600">Pass</span>
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  GATC Testing Lab
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
                    Digi<span className="text-amber-600">Pass</span>
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  GATC Testing Lab
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Laboratory Profile Card (Clickable to open profile) */}
        <div
          onClick={() => setActiveTab("lab_profile")}
          className="bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 rounded-2xl p-3.5 mt-2 flex flex-col gap-2 shadow-2xs cursor-pointer transition-all group"
          title="Click to view full Laboratory Profile & ISO 17025 Accreditations"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 border border-amber-400 flex items-center justify-center text-slate-950 font-bold text-xs shrink-0 group-hover:scale-105 transition-transform shadow-xs">
              AB
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-xs text-slate-900 truncate group-hover:text-amber-700 transition-colors" title="Dr. Ananya Bose">
                Dr. Ananya Bose
              </h4>
              <p className="text-[10px] text-slate-500 font-mono truncate">
                GATC-NABL-CAL-8841
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
            <span className="text-slate-500 font-medium truncate max-w-[110px]">Chief Metrologist</span>
            <span className="inline-flex items-center gap-1 font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-[10px] shrink-0">
              <Award className="w-3 h-3 text-amber-600" /> NABL ISO 17025
            </span>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto mt-2 text-xs font-medium pr-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
            Main Operations
          </span>

          <button
            onClick={() => setActiveTab("testing_queue")}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "testing_queue"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-3">
              <ClipboardList className="w-4 h-4" />
              <span>Lab Sample Queue</span>
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === "testing_queue" ? "bg-slate-950/20 text-slate-950" : "bg-amber-100 text-amber-900"
              }`}
            >
              {activeBatchesCount} Active
            </span>
          </button>

          <button
            onClick={() => setActiveTab("calibration_bench")}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "calibration_bench"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-3">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Precision Test Bench</span>
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === "calibration_bench" ? "bg-slate-950/20 text-slate-950" : "bg-slate-200 text-slate-700"
              }`}
            >
              Bench 01
            </span>
          </button>

          <button
            onClick={() => setActiveTab("certificates")}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "certificates"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-3">
              <Award className="w-4 h-4" />
              <span>Calibration Certificates</span>
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === "certificates" ? "bg-slate-950/20 text-slate-950" : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {certificates.length} Issued
            </span>
          </button>

          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1">
            Standards & Telemetry
          </span>

          <button
            onClick={() => setActiveTab("standards_equipment")}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "standards_equipment"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-3">
              <Scale className="w-4 h-4" />
              <span>Working Standards</span>
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === "standards_equipment" ? "bg-slate-950/20 text-slate-950" : "bg-slate-200 text-slate-700"
              }`}
            >
              4 Assets
            </span>
          </button>

          <button
            onClick={() => setActiveTab("lab_analytics")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "lab_analytics"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Lab Telemetry & Analytics</span>
          </button>

          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1">
            Accreditation & Profile
          </span>

          <button
            onClick={() => setActiveTab("lab_profile")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
              activeTab === "lab_profile"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Laboratory Profile</span>
          </button>
        </nav>

        {/* Footer info & Logout */}
        <div className="pt-3 border-t border-slate-200 flex flex-col gap-1.5 text-xs text-slate-500">
          <div className="flex items-center justify-between px-2 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Lab Active
            </span>
            <span className="font-mono text-slate-400">ISO 17025</span>
          </div>
          {onBackToHome ? (
            <button
              onClick={onBackToHome}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-700 rounded-xl font-semibold transition-colors"
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
        <GatcHeader
          telemetry={MOCK_LAB_TELEMETRY}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onBackToHome={onBackToHome}
          isSyncing={isSyncing}
          onRefreshSync={handleSyncAll}
        />

        <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {activeTab === "testing_queue" && (
            <GatcQueueView
              batches={batches}
              onSelectBatchForBench={handleSelectBatchForBench}
            />
          )}

          {activeTab === "calibration_bench" && (
            <GatcCalibrationBenchView
              batches={batches}
              activeBatchId={activeBatchId}
              onSelectBatch={setActiveBatchId}
              onIssueCertificate={handleIssueCertificate}
              telemetry={MOCK_LAB_TELEMETRY}
            />
          )}

          {activeTab === "certificates" && (
            <GatcCertificatesView
              certificates={certificates}
              onOpenCertificateModal={setSelectedCertificate}
              onSyncAll={handleSyncAll}
              isSyncing={isSyncing}
            />
          )}

          {activeTab === "standards_equipment" && (
            <GatcStandardsView standards={MOCK_WORKING_STANDARDS} />
          )}

          {activeTab === "lab_analytics" && (
            <GatcAnalyticsView telemetry={MOCK_LAB_TELEMETRY} />
          )}

          {activeTab === "lab_profile" && (
            <GatcProfileView telemetry={MOCK_LAB_TELEMETRY} />
          )}
        </div>
      </main>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <GatcCertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
          onSyncToPassport={handleSyncToPassport}
        />
      )}
    </div>
  );
}
