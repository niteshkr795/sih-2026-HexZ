"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  ArrowRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  Building2,
  Calendar,
  Sparkles,
  FileCheck,
  Zap,
} from "lucide-react";
import { LabSampleBatch, InstrumentTestCategory } from "@/types/gatc";

interface GatcQueueViewProps {
  batches: LabSampleBatch[];
  onSelectBatchForBench: (batchId: string) => void;
}

export const GatcQueueView: React.FC<GatcQueueViewProps> = ({
  batches,
  onSelectBatchForBench,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");
  const [selectedBatchForDrawer, setSelectedBatchForDrawer] = useState<LabSampleBatch | null>(null);

  const filteredBatches = batches.filter((b) => {
    if (categoryFilter !== "ALL" && b.category !== categoryFilter) return false;
    if (priorityFilter !== "ALL" && b.priority !== priorityFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.id.toLowerCase().includes(q) ||
        b.batchCode.toLowerCase().includes(q) ||
        b.clientName.toLowerCase().includes(q) ||
        b.serialNumber.toLowerCase().includes(q) ||
        b.model.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const categories: InstrumentTestCategory[] = [
    "Precision Mass Standards (F1/F2 Class)",
    "Heavy Industrial Load Cells & Weighbridges",
    "Fuel & Liquid Flow Meter Provers",
    "High-Accuracy Bullion Balances (Class I/II)",
    "Automatic Checkweighers & Batchers",
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "STATUTORY_URGENT":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "HIGH":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CALIBRATION_IN_PROGRESS":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200",
          label: "Bench Calibration Active",
        };
      case "CERTIFICATE_ISSUED":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          label: "Report Certified",
        };
      case "PASSPORT_SYNCED":
        return {
          bg: "bg-purple-50 text-purple-700 border-purple-200",
          label: "Synced to Passport",
        };
      case "REJECTED_OUT_OF_TOLERANCE":
        return {
          bg: "bg-red-50 text-red-700 border-red-200",
          label: "Out of Tolerance",
        };
      default:
        return {
          bg: "bg-slate-100 text-slate-700 border-slate-200",
          label: "In Testing Queue",
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            NABL Accredited Calibration Laboratory • Schedule VIII Standards
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Metrological Sample Testing Queue
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Manage incoming test batches, pattern approval samples, high-tonnage loadcells, and primary liquid flow provers under statutory legal metrology tolerances.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[130px]">
            <span className="text-[11px] text-slate-300 font-medium block">Active Queue</span>
            <span className="text-3xl font-black text-amber-400 font-mono">{filteredBatches.length}</span>
            <span className="text-[10px] text-slate-400 block">Batches Loaded</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[130px]">
            <span className="text-[11px] text-slate-300 font-medium block">Avg Turnaround</span>
            <span className="text-3xl font-black text-emerald-400 font-mono">1.8d</span>
            <span className="text-[10px] text-slate-400 block">SLA Target: 3.0d</span>
          </div>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Lab ID, Batch Code, Manufacturer, Client, or Serial Number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900 transition"
            />
          </div>

          {/* Category Dropdown */}
          <div className="w-full md:w-64">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-700 font-medium transition"
            >
              <option value="ALL">All Instrument Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Dropdown */}
          <div className="w-full md:w-48">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-700 font-medium transition"
            >
              <option value="ALL">All Priorities</option>
              <option value="STATUTORY_URGENT">Statutory Urgent</option>
              <option value="HIGH">High Priority</option>
              <option value="NORMAL">Normal SLA</option>
            </select>
          </div>
        </div>
      </div>

      {/* High Density Batch Queue Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Sample / Lab ID</th>
                <th className="px-5 py-3.5">Equipment / Model</th>
                <th className="px-5 py-3.5">Client & Organization</th>
                <th className="px-5 py-3.5">Due Date</th>
                <th className="px-5 py-3.5">Priority</th>
                <th className="px-5 py-3.5">Test Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-800">
              {filteredBatches.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                    No sample test batches found matching the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredBatches.map((b) => {
                  const statusInfo = getStatusBadge(b.status);
                  return (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition group">
                      <td className="px-5 py-4">
                        <div className="font-mono font-bold text-slate-900">{b.id}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{b.batchCode}</div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-900 max-w-xs truncate">{b.model}</div>
                        <div className="text-[11px] text-slate-500 font-mono">SN: {b.serialNumber} • {b.category}</div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-medium text-slate-900">{b.clientName}</div>
                        <div className="text-[11px] text-slate-500">{b.clientType}</div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{b.dueDate}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">Recv: {b.receivedDate}</span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${getPriorityBadge(
                            b.priority
                          )}`}
                        >
                          {b.priority.replace("_", " ")}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusInfo.bg}`}
                        >
                          {statusInfo.label}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedBatchForDrawer(b)}
                            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition"
                            title="View Batch Specs"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => onSelectBatchForBench(b.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition"
                          >
                            <span>Test Bench</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Batch Details Drawer Modal */}
      {selectedBatchForDrawer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                  Sample Batch Specification
                </span>
                <h3 className="text-xl font-bold text-white">{selectedBatchForDrawer.model}</h3>
              </div>
              <button
                onClick={() => setSelectedBatchForDrawer(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto text-xs sm:text-sm">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[11px] text-slate-400 block">Lab Sample ID</span>
                  <span className="font-mono font-bold text-slate-900">{selectedBatchForDrawer.id}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Batch Code</span>
                  <span className="font-mono font-bold text-slate-900">{selectedBatchForDrawer.batchCode}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Serial Number</span>
                  <span className="font-mono font-bold text-slate-900">{selectedBatchForDrawer.serialNumber}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Client</span>
                  <span className="font-semibold text-slate-900">{selectedBatchForDrawer.clientName}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Manufacturer</span>
                  <span className="font-semibold text-slate-900">{selectedBatchForDrawer.manufacturer}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Lead Metrologist</span>
                  <span className="font-semibold text-slate-900">{selectedBatchForDrawer.leadTechnician}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Standard Remarks & Statutory Purpose</h4>
                <p className="text-slate-600 bg-amber-50/50 p-3 rounded-xl border border-amber-100 leading-relaxed">
                  {selectedBatchForDrawer.remarks}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Preset Calibration Load Matrix</h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-2">Point</th>
                        <th className="p-2">Nominal Load</th>
                        <th className="p-2">Mean Observed</th>
                        <th className="p-2">Allowed MPE</th>
                        <th className="p-2 text-right">Verdict</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedBatchForDrawer.testPoints.map((tp) => (
                        <tr key={tp.pointIndex}>
                          <td className="p-2 font-mono">P{tp.pointIndex}</td>
                          <td className="p-2 font-semibold">{tp.nominalValue} {tp.unit}</td>
                          <td className="p-2 font-mono">{tp.meanObserved} {tp.unit}</td>
                          <td className="p-2 font-mono">±{tp.mpeAllowed} {tp.unit}</td>
                          <td className="p-2 text-right font-bold text-emerald-600">
                            {tp.passed ? "PASS (Within MPE)" : "FAIL"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedBatchForDrawer(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const id = selectedBatchForDrawer.id;
                  setSelectedBatchForDrawer(null);
                  onSelectBatchForBench(id);
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm"
              >
                Load into Precision Test Bench
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
