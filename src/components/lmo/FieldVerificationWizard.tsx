"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  QrCode, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Camera, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Scale, 
  FileCheck2, 
  AlertOctagon, 
  Sparkles, 
  Check, 
  RefreshCw,
  Eye,
  Sliders,
  BadgeCheck
} from "lucide-react";
import { 
  InspectionTask, 
  CalibrationTestPoint, 
  ECertificate, 
  SeizureNotice,
  OfficerProfile 
} from "@/types/lmo";

interface FieldVerificationWizardProps {
  initialTask: InspectionTask | null;
  tasks: InspectionTask[];
  officer: OfficerProfile;
  onCertificateIssued: (cert: ECertificate) => void;
  onSeizureIssued: (notice: SeizureNotice) => void;
  onCancelOrReset: () => void;
}

export const FieldVerificationWizard: React.FC<FieldVerificationWizardProps> = ({
  initialTask,
  tasks,
  officer,
  onCertificateIssued,
  onSeizureIssued,
  onCancelOrReset,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedTask, setSelectedTask] = useState<InspectionTask>(
    initialTask || tasks[0]
  );

  // Step 1: Scanner state
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanSuccess, setScanSuccess] = useState<boolean>(true);

  // Step 2: Physical Checklist State
  const [checklist, setChecklist] = useState({
    sealIntact: true,
    hologramValid: true,
    plateReadable: true,
    levelBubbleCentered: true,
    displaySegmentsClear: true,
    zeroBalanceStable: true,
    noUnauthorizedMods: true,
  });
  const [physicalNotes, setPhysicalNotes] = useState<string>(
    "Physical casing and manufacturer stamping plate are in clean order. Spirit level bubble centered."
  );

  // Step 3: Calibration & MPE State
  const [calibrationPoints, setCalibrationPoints] = useState<CalibrationTestPoint[]>([
    {
      id: "tp-zero",
      nominalLoad: "0.00 kg (Zero Load)",
      testLoad: 0,
      unit: "kg",
      indicatedLoad: 0.00,
      error: 0.00,
      mpeAllowed: 0.025, // +/- 25g
      passed: true,
    },
    {
      id: "tp-min",
      nominalLoad: "5.00 kg (Min Test)",
      testLoad: 5.00,
      unit: "kg",
      indicatedLoad: 5.00,
      error: 0.00,
      mpeAllowed: 0.050, // +/- 50g
      passed: true,
    },
    {
      id: "tp-half",
      nominalLoad: "250.00 kg (1/2 Max Cap)",
      testLoad: 250.00,
      unit: "kg",
      indicatedLoad: 250.02,
      error: 0.02,
      mpeAllowed: 0.075, // +/- 75g
      passed: true,
    },
    {
      id: "tp-max",
      nominalLoad: "500.00 kg (Max Capacity)",
      testLoad: 500.00,
      unit: "kg",
      indicatedLoad: 500.04,
      error: 0.04,
      mpeAllowed: 0.075, // +/- 75g
      passed: true,
    },
    {
      id: "tp-ecc",
      nominalLoad: "160.00 kg (4-Corner Eccentricity)",
      testLoad: 160.00,
      unit: "kg",
      indicatedLoad: 160.01,
      error: 0.01,
      mpeAllowed: 0.050, // +/- 50g
      passed: true,
    },
  ]);

  // Step 4: Photo evidence state
  const [photosCaptured, setPhotosCaptured] = useState({
    seal: true,
    display: true,
    environment: true,
  });
  const [officerPin, setOfficerPin] = useState<string>("4092");

  // Step 5: Decision state
  const [assignedSealTag, setAssignedSealTag] = useState<string>(
    `DL-LM-SEC-2026-${Math.floor(10000 + Math.random() * 90000)}A`
  );
  const [stampingFee, setStampingFee] = useState<number>(750);
  const [rejectionReasons, setRejectionReasons] = useState<string[]>([
    "Lead-wire verification seal found tampered and broken.",
    "Calibration test readings exceeded Maximum Permissible Error (MPE) tolerances.",
  ]);

  // Sync selected task when initialTask changes
  useEffect(() => {
    if (initialTask) {
      setSelectedTask(initialTask);
    }
  }, [initialTask]);

  // Update calibration point reading
  const handleIndicatedChange = (id: string, newIndicatedStr: string) => {
    const newIndicated = parseFloat(newIndicatedStr) || 0;
    setCalibrationPoints((prev) =>
      prev.map((pt) => {
        if (pt.id === id) {
          const error = parseFloat((newIndicated - pt.testLoad).toFixed(3));
          const passed = Math.abs(error) <= pt.mpeAllowed;
          return {
            ...pt,
            indicatedLoad: newIndicated,
            error,
            passed,
          };
        }
        return pt;
      })
    );
  };

  const handleInjectPassingReadings = () => {
    setCalibrationPoints((prev) =>
      prev.map((pt) => ({
        ...pt,
        indicatedLoad: pt.testLoad,
        error: 0,
        passed: true,
      }))
    );
  };

  const handleInjectFailingReadings = () => {
    setCalibrationPoints((prev) =>
      prev.map((pt, idx) => {
        if (idx === 2 || idx === 3) {
          const badReading = parseFloat((pt.testLoad - 0.45).toFixed(2));
          return {
            ...pt,
            indicatedLoad: badReading,
            error: -0.45,
            passed: false,
          };
        }
        return pt;
      })
    );
  };

  const allCalibrationPassed = calibrationPoints.every((pt) => pt.passed);
  const allChecklistPassed = Object.values(checklist).every(Boolean);
  const overallCompliant = allCalibrationPassed && allChecklistPassed;

  // Final Action Handlers
  const handleApproveAndIssue = () => {
    const newCert: ECertificate = {
      certificateNumber: `CERT-LM-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      instrumentId: selectedTask.instrumentId,
      serialNumber: selectedTask.instrument.serialNumber,
      ownerName: selectedTask.businessName,
      businessAddress: selectedTask.address,
      instrumentType: `${selectedTask.instrument.type} (${selectedTask.instrument.maxCapacity})`,
      accuracyClass: selectedTask.instrument.accuracyClass,
      maxCapacity: selectedTask.instrument.maxCapacity,
      verificationScaleInterval: selectedTask.instrument.verificationScaleInterval,
      issueDate: "27 Aug 2026",
      validUntil: "26 Aug 2027",
      officerId: officer.id,
      officerName: officer.name,
      zone: officer.zone,
      sealTagAssigned: assignedSealTag,
      sha256VerificationHash: "a7c88b9921ef48991209ccbb019485771239845012384a5581902837482910ba",
      qrToken: `digipass_sec_cert_${selectedTask.instrumentId.toLowerCase()}_valid`,
      status: "ACTIVE",
      stampingFeePaid: stampingFee,
    };

    onCertificateIssued(newCert);
  };

  const handleRejectAndSeize = () => {
    const newNotice: SeizureNotice = {
      noticeNumber: `SEIZ-LM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      memoNumber: `FORM-VIII-DL-2026/${Math.floor(10 + Math.random() * 90)}`,
      instrumentId: selectedTask.instrumentId,
      serialNumber: selectedTask.instrument.serialNumber,
      ownerName: selectedTask.businessName,
      businessAddress: selectedTask.address,
      instrumentType: selectedTask.instrument.type,
      issueDate: "27 Aug 2026",
      officerId: officer.id,
      officerName: officer.name,
      reasons: rejectionReasons,
      violationSection: "Section 24 & 30 of the Legal Metrology Act, 2009",
      fineAmount: 25000,
      rectificationDays: 14,
      prohibitionStatus: "SEALED_CONFISCATED",
      redTagNumber: `RED-TAG-DL-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    onSeizureIssued(newNotice);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Wizard Progress Stepper */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {[
            { step: 1, title: "Passport Scan" },
            { step: 2, title: "Physical & Seals" },
            { step: 3, title: "MPE Calibration" },
            { step: 4, title: "Evidence & GPS" },
            { step: 5, title: "Official Decision" },
          ].map((s, idx) => {
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;

            return (
              <React.Fragment key={s.step}>
                <div 
                  onClick={() => s.step <= currentStep && setCurrentStep(s.step)}
                  className={`flex flex-col items-center text-center cursor-pointer transition-all ${
                    isCurrent ? "scale-105" : ""
                  }`}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
                      isCompleted
                        ? "bg-emerald-600 text-white shadow-sm"
                        : isCurrent
                        ? "bg-blue-600 text-white ring-4 ring-blue-100 shadow-md"
                        : "bg-slate-100 text-slate-400 border border-slate-200"
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : s.step}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-semibold mt-1.5 hidden sm:block ${
                      isCurrent
                        ? "text-blue-600 font-bold"
                        : isCompleted
                        ? "text-emerald-700 font-medium"
                        : "text-slate-400"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>

                {idx < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 sm:mx-3 rounded-full transition-all ${
                      currentStep > idx + 1 ? "bg-emerald-500" : "bg-slate-200"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Instrument Passport Lookup & Scanner */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                Step 1 of 5 • Identification
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                Scan Instrument QR Code / Passport Lookup
              </h3>
              <p className="text-xs text-slate-500">
                Verify physical scale identity against the National Legal Metrology database.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Switch Target:</span>
              <select
                value={selectedTask.id}
                onChange={(e) => {
                  const t = tasks.find((item) => item.id === e.target.value);
                  if (t) setSelectedTask(t);
                }}
                className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {tasks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.instrumentId} — {t.businessName.substring(0, 26)}...
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Live Camera Scanner Simulation */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 shadow-xl text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[320px]">
                {/* Viewfinder Reticle */}
                <div className="relative w-48 h-48 border-2 border-emerald-400/80 rounded-2xl flex items-center justify-center p-3 bg-white/5">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-emerald-400 rounded-tl" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-emerald-400 rounded-tr" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-emerald-400 rounded-bl" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-emerald-400 rounded-br" />

                  {/* Red Laser Scan Line */}
                  <div className="w-full h-0.5 bg-red-500 absolute animate-bounce shadow-[0_0_8px_#ef4444]" />

                  <QrCode className="w-28 h-28 text-white/40" />
                </div>

                <p className="text-xs text-slate-300 font-mono mt-4 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Optical Camera Sensor Active
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsScanning(true);
                      setTimeout(() => {
                        setIsScanning(false);
                        setScanSuccess(true);
                      }, 400);
                    }}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Trigger Optical Scan</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Verified Passport Card Output */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">
                      Instrument Digital Passport
                    </span>
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {selectedTask.instrumentId}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> MATCH VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Commercial Entity:</span>
                    <span className="font-bold text-slate-900">{selectedTask.businessName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Trade Activity:</span>
                    <span className="font-medium text-slate-700">{selectedTask.tradeType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Model & Make:</span>
                    <span className="font-bold text-slate-900">{selectedTask.instrument.model}</span>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      SN: {selectedTask.instrument.serialNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Accuracy Class & Capacity:</span>
                    <span className="font-bold text-blue-800">{selectedTask.instrument.accuracyClass}</span>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      Max: {selectedTask.instrument.maxCapacity} • e={selectedTask.instrument.verificationScaleInterval}
                    </span>
                  </div>
                </div>

                {/* GPS Location & Geo-Fence Validation Box */}
                <div className="bg-white rounded-xl p-3 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 block">
                        GPS Geofence Validation: PASS
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Lat: {selectedTask.latitude}° N, Lng: {selectedTask.longitude}° E (Within 18m)
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    GEO-LOCKED
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Navigation Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onCancelOrReset}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Cancel / Back to Queue
            </button>
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center gap-2"
            >
              <span>Proceed to Physical & Seal Checks</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Physical & Seal Integrity Assessment */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Step 2 of 5 • Physical & Seal Audit
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Visual & Stamping Integrity Checklist
            </h3>
            <p className="text-xs text-slate-500">
              Audit the physical condition, lead-wire seal, level indicator, and display segments.
            </p>
          </div>

          {/* Interactive Checklist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {[
              {
                key: "sealIntact",
                label: "Lead-Wire Verification Seal Intact",
                desc: "Existing official seal wire is unbroken and matches registered seal code.",
              },
              {
                key: "hologramValid",
                label: "Anti-Tamper Security Hologram Intact",
                desc: "No peeling, void markings, or unauthorized removal attempts.",
              },
              {
                key: "plateReadable",
                label: "Manufacturer & Stamping Plate Legible",
                desc: "Model approval number, serial number, max capacity & e-value clearly embossed.",
              },
              {
                key: "levelBubbleCentered",
                label: "Level Indicator Bubble Centered",
                desc: "Instrument sits on a rigid, vibration-free surface with leveling feet aligned.",
              },
              {
                key: "displaySegmentsClear",
                label: "Digital 7-Segment LED / LCD Clear",
                desc: "All digits illuminate without burned segments or flickering digits.",
              },
              {
                key: "zeroBalanceStable",
                label: "Zero Balance Mechanism Stable",
                desc: "Scale returns reliably to 0.000 upon removal of tare load.",
              },
              {
                key: "noUnauthorizedMods",
                label: "No Unauthorized Hardware Modification",
                desc: "No bypass wires, remote relays, or external interceptor chips observed.",
              },
            ].map((item) => {
              const isChecked = checklist[item.key as keyof typeof checklist];

              return (
                <div
                  key={item.key}
                  onClick={() =>
                    setChecklist((prev) => ({
                      ...prev,
                      [item.key]: !isChecked,
                    }))
                  }
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isChecked
                      ? "border-emerald-500 bg-emerald-50/40 text-slate-900"
                      : "border-red-300 bg-red-50/40 text-slate-700"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="font-bold block text-sm flex items-center gap-1.5">
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      {item.label}
                    </span>
                    <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase font-mono ${
                      isChecked
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-red-100 text-red-800 border border-red-300"
                    }`}
                  >
                    {isChecked ? "PASSED" : "DEFECT"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Officer Field Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Officer Inspection Field Remarks:
            </label>
            <textarea
              value={physicalNotes}
              onChange={(e) => setPhysicalNotes(e.target.value)}
              rows={2}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-sans"
            />
          </div>

          {/* Stepper Navigation Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center gap-2"
            >
              <span>Proceed to Calibration & MPE Tests</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Metrological Calibration & MPE Tolerance Calculations */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                Step 3 of 5 • Metrological Verification
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                Calibration & Maximum Permissible Error (MPE) Math
              </h3>
              <p className="text-xs text-slate-500">
                Apply standard calibrated reference weights and test for span, linearity, and corner eccentricity.
              </p>
            </div>

            {/* Quick Demo Simulator Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleInjectPassingReadings}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200 transition-colors"
              >
                ✓ Fill Standard (Compliant)
              </button>
              <button
                type="button"
                onClick={handleInjectFailingReadings}
                className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold border border-red-200 transition-colors"
              >
                ✗ Inject Error Drift (Violations)
              </button>
            </div>
          </div>

          {/* Calibration Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-3 rounded-tl-xl font-bold">Standard Test Load</th>
                  <th className="p-3 font-bold">Reference Value</th>
                  <th className="p-3 font-bold">Officer Indicated Reading</th>
                  <th className="p-3 font-bold">Calculated Error (Δm)</th>
                  <th className="p-3 font-bold">MPE Allowed (±)</th>
                  <th className="p-3 rounded-tr-xl font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 border-x border-b border-slate-200">
                {calibrationPoints.map((pt) => {
                  return (
                    <tr key={pt.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-semibold text-slate-900">
                        {pt.nominalLoad}
                      </td>
                      <td className="p-3 font-mono font-bold text-slate-700">
                        {pt.testLoad.toFixed(2)} {pt.unit}
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          step="0.01"
                          value={pt.indicatedLoad}
                          onChange={(e) => handleIndicatedChange(pt.id, e.target.value)}
                          className="w-28 px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs"
                        />
                      </td>
                      <td className="p-3 font-mono font-bold">
                        <span
                          className={
                            pt.passed ? "text-emerald-700" : "text-red-600"
                          }
                        >
                          {pt.error >= 0 ? `+${pt.error.toFixed(3)}` : pt.error.toFixed(3)} {pt.unit}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-slate-500">
                        ±{pt.mpeAllowed.toFixed(3)} {pt.unit}
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase font-mono ${
                            pt.passed
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-red-100 text-red-800 border border-red-300"
                          }`}
                        >
                          {pt.passed ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              PASS
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-red-600" />
                              FAIL
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mathematical Summary Card */}
          <div
            className={`rounded-2xl p-4 border flex flex-wrap items-center justify-between gap-4 text-xs ${
              allCalibrationPassed
                ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                : "bg-red-50 border-red-300 text-red-950"
            }`}
          >
            <div className="flex items-center space-x-3">
              {allCalibrationPassed ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertOctagon className="w-6 h-6 text-red-600 flex-shrink-0" />
              )}
              <div>
                <h4 className="font-bold text-sm">
                  {allCalibrationPassed
                    ? "Metrological Calibration Approved (Within OIML R76 Limits)"
                    : "Calibration Error Beyond Tolerances (Non-Compliant)"}
                </h4>
                <p className="text-[11px] opacity-80">
                  {allCalibrationPassed
                    ? "All 5 test weight points are strictly within the Maximum Permissible Error tolerance for Class III instruments."
                    : "Deviations detected in span / full load. Scale cannot be used for commercial transactions without recalibration."}
                </p>
              </div>
            </div>

            <span className="font-mono text-xs font-black px-3 py-1 rounded-xl bg-white/80 border border-current">
              {allCalibrationPassed ? "READY FOR CERTIFICATE" : "REJECTION REQUIRED"}
            </span>
          </div>

          {/* Stepper Navigation Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center gap-2"
            >
              <span>Proceed to Photo Evidence & GPS Stamping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Photo Evidence & GPS Timestamp Watermarking */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Step 4 of 5 • Digital Evidence Audit
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Geotagged Photographic Proof & Authorization
            </h3>
            <p className="text-xs text-slate-500">
              Cryptographically seal field inspection evidence with tamper-proof GPS and timestamp watermarks.
            </p>
          </div>

          {/* 3 Evidence Photos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                id: "seal",
                title: "1. Stamped Lead Seal Photo",
                status: photosCaptured.seal,
                desc: "Macro close-up of lead-wire seal & embossed inspector pliers stamp.",
              },
              {
                id: "display",
                title: "2. Calibration Display Reading",
                status: photosCaptured.display,
                desc: "Optical capture of test weight reading on 7-segment digital screen.",
              },
              {
                id: "environment",
                title: "3. Premises & Scale View",
                status: photosCaptured.environment,
                desc: "Wide perspective of store checkout counter and scale position.",
              },
            ].map((p) => (
              <div
                key={p.id}
                className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[200px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-slate-200">{p.title}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                      ✓ GEOTAGGED
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{p.desc}</p>
                </div>

                {/* Simulated Camera Watermark Box */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-[10px] font-mono space-y-0.5 mt-4">
                  <span className="text-emerald-400 block font-bold">
                    GPS: {selectedTask.latitude}°N, {selectedTask.longitude}°E (±3m)
                  </span>
                  <span className="text-slate-300 block">
                    TIME: 2026-08-27 15:42:09 IST
                  </span>
                  <span className="text-blue-300 block">
                    OFFICER: {officer.id}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Officer Authorization & Digital PIN */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block text-sm">
                  Inspector Digital Authorization
                </span>
                <span className="text-slate-500 text-[11px]">
                  Sign off using your designated officer authorization badge PIN.
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                Badge: {officer.badgeNumber}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <input
                type="password"
                value={officerPin}
                onChange={(e) => setOfficerPin(e.target.value)}
                placeholder="Enter 4-Digit PIN"
                className="w-40 px-3 py-2 bg-white border border-slate-300 rounded-xl text-center font-mono font-black text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Cryptographic Key Active (SHA-256 Enabled)
              </span>
            </div>
          </div>

          {/* Stepper Navigation Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center gap-2"
            >
              <span>Proceed to Official Decision & Issuance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Official Decision & Document Generation */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Step 5 of 5 • Final Determination
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Official Legal Metrology Determination
            </h3>
            <p className="text-xs text-slate-500">
              Choose to either approve and issue an official cryptographic e-Certificate, or reject and execute Form VIII seizure.
            </p>
          </div>

          {/* Inspection Summary Review Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[11px]">Physical Checklist:</span>
              <span
                className={`font-bold flex items-center gap-1 mt-0.5 ${
                  allChecklistPassed ? "text-emerald-700" : "text-red-600"
                }`}
              >
                {allChecklistPassed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {allChecklistPassed ? "ALL 7 CRITERIA PASSED" : "DEFECTS RECORDED"}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[11px]">Calibration Math (MPE):</span>
              <span
                className={`font-bold flex items-center gap-1 mt-0.5 ${
                  allCalibrationPassed ? "text-emerald-700" : "text-red-600"
                }`}
              >
                {allCalibrationPassed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {allCalibrationPassed ? "WITHIN TOLERANCE (0-500kg)" : "TOLERANCE EXCEEDED"}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[11px]">Geotagged Evidence:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
                3 PHOTOS & GPS LOCKED
              </span>
            </div>
          </div>

          {/* Decision Path Choices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            {/* OPTION A: Approve & Issue e-Certificate */}
            <div
              className={`rounded-3xl p-6 border-2 transition-all flex flex-col justify-between text-left space-y-4 ${
                overallCompliant
                  ? "border-emerald-500 bg-emerald-50/30 shadow-md ring-2 ring-emerald-500/20"
                  : "border-slate-200 bg-slate-50/50 opacity-90"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    RECOMMENDED (PASSED)
                  </span>
                </div>

                <h4 className="text-lg font-extrabold text-slate-900">
                  Approve & Issue DigiPass e-Certificate
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Instrument fulfills all metrological requirements. Assign a new lead-wire security seal tag, 
                  record government stamping fee receipt, and issue a cryptographic PDF e-Certificate valid for 1 year.
                </p>

                <div className="space-y-2 pt-2 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Assigned Security Lead Seal Tag Number:
                    </label>
                    <input
                      type="text"
                      value={assignedSealTag}
                      onChange={(e) => setAssignedSealTag(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Statutory Stamping Verification Fee (INR):
                    </label>
                    <input
                      type="number"
                      value={stampingFee}
                      onChange={(e) => setStampingFee(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-xs"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleApproveAndIssue}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Issue Official e-Certificate & QR Code</span>
              </button>
            </div>

            {/* OPTION B: Reject & Issue Form VIII Seizure */}
            <div
              className={`rounded-3xl p-6 border-2 transition-all flex flex-col justify-between text-left space-y-4 ${
                !overallCompliant
                  ? "border-red-500 bg-red-50/30 shadow-md ring-2 ring-red-500/20"
                  : "border-slate-200 bg-slate-50/50"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center">
                    <AlertOctagon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-300">
                    ENFORCEMENT SEIZURE
                  </span>
                </div>

                <h4 className="text-lg font-extrabold text-slate-900">
                  Reject & Execute Form VIII Seizure Notice
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Instrument violates Legal Metrology Act provisions. Affix Red Prohibition Tag, issue 
                  statutory Form VIII seizure memo, and compound penalties with a 14-day rectification order.
                </p>

                <div className="space-y-2 pt-2 text-xs">
                  <span className="block font-semibold text-slate-700">
                    Recorded Violation Reasons:
                  </span>
                  <ul className="bg-white p-3 rounded-xl border border-slate-200 space-y-1 text-[11px] text-slate-700">
                    {rejectionReasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-red-600 font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={handleRejectAndSeize}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <AlertOctagon className="w-4 h-4" />
                <span>Execute Form VIII Seizure & Impound</span>
              </button>
            </div>
          </div>

          {/* Stepper Navigation Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Evidence</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
