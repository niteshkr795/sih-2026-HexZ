"use client";

import React, { useState } from "react";
import { LmoHeader } from "@/components/lmo/LmoHeader";
import { LmoNavTabs, LmoTabType } from "@/components/lmo/LmoNavTabs";
import { InspectionQueueView } from "@/components/lmo/InspectionQueueView";
import { FieldVerificationWizard } from "@/components/lmo/FieldVerificationWizard";
import { CertificateLedgerView } from "@/components/lmo/CertificateLedgerView";
import { TerritoryAnalyticsView } from "@/components/lmo/TerritoryAnalyticsView";
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
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Officer Header */}
      <LmoHeader officer={officer} onBackToHome={onBackToHome} />

      {/* Navigation Tabs */}
      <LmoNavTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={tasks.length}
        activeWizardTaskName={selectedTaskForWizard?.businessName || null}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
