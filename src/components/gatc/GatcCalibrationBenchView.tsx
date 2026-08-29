"use client";

import React, { useState } from "react";
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Save,
  FileCheck2,
  Sparkles,
  Calculator,
  RefreshCw,
  Sliders,
  Award,
  Thermometer,
  Droplets,
  Gauge,
  Info,
} from "lucide-react";
import { LabSampleBatch, PrecisionTestRun, LabTelemetry } from "@/types/gatc";

interface GatcCalibrationBenchViewProps {
  batches: LabSampleBatch[];
  activeBatchId: string;
  onSelectBatch: (id: string) => void;
  onIssueCertificate: (batch: LabSampleBatch) => void;
  telemetry: LabTelemetry;
}

export const GatcCalibrationBenchView: React.FC<GatcCalibrationBenchViewProps> = ({
  batches,
  activeBatchId,
  onSelectBatch,
  onIssueCertificate,
  telemetry,
}) => {
  const currentBatch = batches.find((b) => b.id === activeBatchId) || batches[0];
  const [testRuns, setTestRuns] = useState<PrecisionTestRun[]>(currentBatch ? currentBatch.testPoints : []);
  const [technicianNotes, setTechnicianNotes] = useState(
    "Test performed using E2 reference standards (Asset NPL-E2-SET-991). Repeatability and eccentric loading tests strictly within OIML R76 Class I tolerances."
  );
  const [selectedStandardAsset, setSelectedStandardAsset] = useState("NPL-E2-SET-991 (Class E2 Stainless Steel)");

  // Handle run value changes and dynamically re-calculate mean, error and pass/fail status
  const handleRunChange = (
    index: number,
    runKey: "run1Observed" | "run2Observed" | "run3Observed",
    value: number
  ) => {
    const updated = [...testRuns];
    const point = { ...updated[index], [runKey]: value };

    const mean = (point.run1Observed + point.run2Observed + point.run3Observed) / 3;
    const error = mean - point.nominalValue;
    const absError = Math.abs(error);
    const passed = absError <= point.mpeAllowed;

    point.meanObserved = Number(mean.toFixed(5));
    point.error = Number(error.toFixed(5));
    point.passed = passed;

    updated[index] = point;
    setTestRuns(updated);
  };

  const allPointsPassed = testRuns.length > 0 && testRuns.every((p) => p.passed);
  const maxErrorRatio = Math.max(
    ...testRuns.map((p) => Math.min(100, Math.round((Math.abs(p.error) / p.mpeAllowed) * 100)))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Bench Header & Instrument Selector */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            <Scale className="w-3.5 h-3.5 text-amber-600" />
            Active Test Bench #01 • Precision Metrology Workstation
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {currentBatch?.model || "Precision Testing Workstation"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-mono">
            Lab ID: <strong>{currentBatch?.id}</strong> • Serial No: <strong>{currentBatch?.serialNumber}</strong> • Client: <strong>{currentBatch?.clientName}</strong>
          </p>
        </div>

        {/* Switch Batch Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="bg-slate-50 p-2 rounded-2xl border border-slate-200 flex flex-col">
            <span className="text-[10px] text-slate-400 font-semibold px-2 uppercase tracking-wider">
              Active Instrument Under Test
            </span>
            <select
              value={activeBatchId}
              onChange={(e) => onSelectBatch(e.target.value)}
              className="bg-transparent font-bold text-xs sm:text-sm text-slate-800 focus:outline-none px-2 py-1"
            >
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.id} - {b.model.slice(0, 32)}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => onIssueCertificate({ ...currentBatch, testPoints: testRuns })}
            disabled={!allPointsPassed}
            className={`inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold shadow-md transition ${
              allPointsPassed
                ? "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-emerald-700/20"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Generate Certified NABL Certificate</span>
          </button>
        </div>
      </div>

      {/* Environmental & Standards Context Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Lab Environmental Conditions Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Lab Environmental Lock
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
              Cleanroom ISO 7
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <Thermometer className="w-4 h-4 text-rose-500 mx-auto mb-1" />
              <span className="text-xs font-mono font-bold text-slate-900">{telemetry.cleanroomTempC}°C</span>
              <span className="text-[10px] text-slate-400 block">±0.5°C</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <Droplets className="w-4 h-4 text-cyan-500 mx-auto mb-1" />
              <span className="text-xs font-mono font-bold text-slate-900">{telemetry.relativeHumidity}%</span>
              <span className="text-[10px] text-slate-400 block">Humidity</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <Gauge className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <span className="text-xs font-mono font-bold text-slate-900">{telemetry.barometricPressureHpa}</span>
              <span className="text-[10px] text-slate-400 block">hPa</span>
            </div>
          </div>
        </div>

        {/* Working Reference Standard Used */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Primary Traceability Standard
          </span>
          <select
            value={selectedStandardAsset}
            onChange={(e) => setSelectedStandardAsset(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
          >
            <option value="NPL-E2-SET-991 (Class E2 Stainless Steel)">NPL-E2-SET-991 (Class E2 Mass Set)</option>
            <option value="RRSL-DWM-500KN (Deadweight Loadcell 500kN)">RRSL-DWM-500KN (Deadweight 500kN)</option>
            <option value="NPL-FL-PROVER-04 (Volumetric Liquid Prover)">NPL-FL-PROVER-04 (Sonic Flow Prover)</option>
          </select>
          <p className="text-[11px] text-slate-500">
            Calibrated by National Physical Laboratory (NPL India). Traceability Certificate ref: <strong>NPL/DIR/2025/8912</strong>.
          </p>
        </div>

        {/* Overall Tolerance Verdict Meter */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Statutory MPE Consumption
            </span>
            <span
              className={`text-xs font-mono font-bold ${
                allPointsPassed ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              Peak Error: {maxErrorRatio}% of MPE
            </span>
          </div>

          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
            <div
              className={`h-full rounded-full transition-all ${
                maxErrorRatio > 100
                  ? "bg-rose-500"
                  : maxErrorRatio > 70
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              }`}
              style={{ width: `${Math.min(100, maxErrorRatio)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>0% (Ideal)</span>
            <span>100% (Statutory MPE Limit)</span>
          </div>
        </div>
      </div>

      {/* Precision Calibration Data Sheet Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
        <div className="p-5 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" />
              Repeatability & Tolerance Calculation Sheet (OIML R76 / R111)
            </h3>
            <p className="text-xs text-slate-400">
              Input 3 independent observed readings per test load. System calculates Mean, Δ Error, and compliance with statutory Maximum Permissible Error.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-mono text-xs font-bold border border-amber-400/30">
            Expanded Uncertainty: k=2 (95% CL)
          </span>
        </div>

        <div className="overflow-x-auto p-2 sm:p-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3">Point</th>
                <th className="px-4 py-3">Nominal Standard Load</th>
                <th className="px-4 py-3">Run 1 Observed</th>
                <th className="px-4 py-3">Run 2 Observed</th>
                <th className="px-4 py-3">Run 3 Observed</th>
                <th className="px-4 py-3">Calculated Mean</th>
                <th className="px-4 py-3">Error (Δ)</th>
                <th className="px-4 py-3">Allowed MPE (±)</th>
                <th className="px-4 py-3 text-right">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-800">
              {testRuns.map((tp, idx) => (
                <tr key={tp.pointIndex} className="hover:bg-amber-50/30 transition">
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">
                    P0{tp.pointIndex}
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-900 font-mono text-sm">
                      {tp.nominalValue} {tp.unit}
                    </span>
                  </td>

                  {/* Run 1 Input */}
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="any"
                      value={tp.run1Observed}
                      onChange={(e) =>
                        handleRunChange(idx, "run1Observed", parseFloat(e.target.value) || 0)
                      }
                      className="w-28 px-2 py-1.5 font-mono text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none"
                    />
                  </td>

                  {/* Run 2 Input */}
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="any"
                      value={tp.run2Observed}
                      onChange={(e) =>
                        handleRunChange(idx, "run2Observed", parseFloat(e.target.value) || 0)
                      }
                      className="w-28 px-2 py-1.5 font-mono text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none"
                    />
                  </td>

                  {/* Run 3 Input */}
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="any"
                      value={tp.run3Observed}
                      onChange={(e) =>
                        handleRunChange(idx, "run3Observed", parseFloat(e.target.value) || 0)
                      }
                      className="w-28 px-2 py-1.5 font-mono text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none"
                    />
                  </td>

                  {/* Calculated Mean */}
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">
                    {tp.meanObserved} {tp.unit}
                  </td>

                  {/* Error Delta */}
                  <td className="px-4 py-3 font-mono font-semibold">
                    <span
                      className={
                        tp.error > 0
                          ? "text-blue-600"
                          : tp.error < 0
                          ? "text-amber-600"
                          : "text-slate-600"
                      }
                    >
                      {tp.error >= 0 ? `+${tp.error}` : tp.error} {tp.unit}
                    </span>
                  </td>

                  {/* Allowed MPE */}
                  <td className="px-4 py-3 font-mono text-slate-600">
                    ±{tp.mpeAllowed} {tp.unit}
                  </td>

                  {/* Verdict */}
                  <td className="px-4 py-3 text-right">
                    {tp.passed ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        PASS
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" />
                        OUT OF MPE
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Technician Notes & Signature Declaration */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Metrologist Assessment & Calibration Observations
            </label>
            <textarea
              rows={2}
              value={technicianNotes}
              onChange={(e) => setTechnicianNotes(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4 text-blue-500 shrink-0" />
              <span>
                Generated report will be cryptographically signed with <strong>SHA-256 HSM Digital Signature</strong> and pushed to the central DigiPass passport ledger.
              </span>
            </div>

            <button
              onClick={() => onIssueCertificate({ ...currentBatch, testPoints: testRuns })}
              disabled={!allPointsPassed}
              className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition ${
                allPointsPassed
                  ? "bg-amber-600 hover:bg-amber-700 text-white"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Save className="w-4 h-4" />
              <span>Confirm & Lock Test Bench Results</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
