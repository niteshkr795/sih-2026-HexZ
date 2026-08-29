"use client";

import React from "react";
import {
  Scale,
  Award,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Shield,
  Activity,
  Calendar,
} from "lucide-react";
import { WorkingStandardAsset } from "@/types/gatc";

interface GatcStandardsViewProps {
  standards: WorkingStandardAsset[];
}

export const GatcStandardsView: React.FC<GatcStandardsViewProps> = ({ standards }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            National Metrological Traceability Hierarchy (NPL India)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Primary & Secondary Working Reference Standards
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            All GATC calibration equipment must maintain direct metrological traceability to National Standards maintained at the National Physical Laboratory (NPL, New Delhi) or Regional Reference Standard Laboratories (RRSL).
          </p>
        </div>
      </div>

      {/* Grid of Working Standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {standards.map((std) => {
          const isDue = std.status === "CALIBRATION_DUE";
          return (
            <div
              key={std.id}
              className={`bg-white rounded-2xl p-6 border shadow-sm space-y-4 ${
                isDue ? "border-amber-300 bg-amber-50/20" : "border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    {std.assetCode} • {std.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">{std.name}</h3>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
                    isDue
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}
                >
                  {isDue ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  {isDue ? "Calibration Due" : "Operational / Certified"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Precision & Uncertainty</span>
                  <span className="font-semibold text-slate-800">{std.accuracy}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Annual Drift Factor</span>
                  <span className="font-mono font-bold text-slate-800">+{std.driftPpm} ppm/yr</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Last Calibrated Date</span>
                  <span className="font-medium text-slate-800">{std.lastCalibratedDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Next Re-Calibration Due</span>
                  <span className={`font-bold ${isDue ? "text-amber-700" : "text-slate-900"}`}>
                    {std.nextCalibrationDueDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Certified By: <strong>{std.calibratedBy}</strong></span>
                <button
                  onClick={() => alert(`Viewing NPL Traceability Certificate for ${std.assetCode}`)}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold"
                >
                  <span>Traceability Cert</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
