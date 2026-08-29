"use client";

import React, { useState } from "react";
import { GatcHeader } from "./GatcHeader";
import { GatcQueueView } from "./GatcQueueView";
import { GatcCalibrationBenchView } from "./GatcCalibrationBenchView";
import { GatcCertificatesView } from "./GatcCertificatesView";
import { GatcStandardsView } from "./GatcStandardsView";
import { GatcAnalyticsView } from "./GatcAnalyticsView";
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
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col antialiased">
      <GatcHeader
        telemetry={MOCK_LAB_TELEMETRY}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBackToHome={onBackToHome}
        isSyncing={isSyncing}
        onRefreshSync={handleSyncAll}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
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
