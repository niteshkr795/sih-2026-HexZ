"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  MapPin,
  Phone,
  Mail,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Shuffle,
  Shield,
  Activity,
} from "lucide-react";
import { LmoOfficerRoster } from "@/types/admin";

interface AdminInspectorAllocatorViewProps {
  officers: LmoOfficerRoster[];
  onReallocateCaseload: (officerId: string, delta: number) => void;
}

export const AdminInspectorAllocatorView: React.FC<AdminInspectorAllocatorViewProps> = ({
  officers,
  onReallocateCaseload,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedOfficerForModal, setSelectedOfficerForModal] = useState<LmoOfficerRoster | null>(null);

  const filteredOfficers = officers.filter((o) => {
    if (statusFilter !== "ALL" && o.currentDutyStatus !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.officerName.toLowerCase().includes(q) ||
        o.badgeNumber.toLowerCase().includes(q) ||
        o.zone.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            Field Inspector Deployment & Workload Balancer
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Legal Metrology Officer (LMO) Roster
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Monitor active field inspectors, track GPS heartbeat coordinates, re-balance caseloads across overloaded jurisdictions, and resolve inspection pendencies.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Officer Name, Badge ID, Zone, or Employee Code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 transition"
          />
        </div>

        <div className="w-full md:w-56">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 font-medium transition"
          >
            <option value="ALL">All Duty Statuses</option>
            <option value="ON_FIELD_ACTIVE">On-Field Active</option>
            <option value="IN_LAB">In-Lab Verification</option>
            <option value="ON_LEAVE">On Leave</option>
          </select>
        </div>
      </div>

      {/* Officers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOfficers.map((officer) => {
          const capacityPct = Math.round((officer.activeCaseload / officer.maxMonthlyCapacity) * 100);
          const isOverloaded = capacityPct > 80;

          return (
            <div
              key={officer.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 hover:border-indigo-200 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    {officer.badgeNumber} • {officer.state}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">{officer.officerName}</h3>
                  <div className="text-xs text-slate-500">{officer.zone}</div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    officer.currentDutyStatus === "ON_FIELD_ACTIVE"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : officer.currentDutyStatus === "IN_LAB"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <Activity className="w-3 h-3" />
                  {officer.currentDutyStatus.replace(/_/g, " ")}
                </span>
              </div>

              {/* Caseload Capacity Progress Bar */}
              <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Monthly Active Caseload</span>
                  <span className="font-mono font-bold text-slate-900">
                    {officer.activeCaseload} / {officer.maxMonthlyCapacity} ({capacityPct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isOverloaded ? "bg-rose-500" : capacityPct > 50 ? "bg-indigo-600" : "bg-emerald-500"
                    }`}
                    style={{ width: `${Math.min(100, capacityPct)}%` }}
                  />
                </div>
              </div>

              {/* GPS Heartbeat & Rating */}
              <div className="flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="text-[11px]">GPS Ping: {officer.geoCoordinates.lastPingsAgo}</span>
                </div>
                <div className="font-bold text-slate-900">⭐ {officer.averageInspectionRating} / 5.0</div>
              </div>

              {/* Reallocate Quick Action */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Completed this month: <strong>{officer.completedThisMonth}</strong>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onReallocateCaseload(officer.id, -1)}
                    disabled={officer.activeCaseload <= 0}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center justify-center disabled:opacity-30"
                    title="Transfer 1 case away from this inspector"
                  >
                    -
                  </button>
                  <button
                    onClick={() => onReallocateCaseload(officer.id, +1)}
                    className="w-7 h-7 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition flex items-center justify-center"
                    title="Assign 1 additional inspection case"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
