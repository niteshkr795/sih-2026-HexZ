"use client";

import React, { useState } from "react";
import { 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  Scale, 
  Compass, 
  SlidersHorizontal,
  FileBadge
} from "lucide-react";
import { InspectionTask, InspectionPriority } from "@/types/lmo";

interface InspectionQueueViewProps {
  tasks: InspectionTask[];
  onSelectTaskForVerification: (task: InspectionTask) => void;
}

export const InspectionQueueView: React.FC<InspectionQueueViewProps> = ({
  tasks,
  onSelectTaskForVerification,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = 
      task.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.instrumentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.instrument.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.instrument.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority = 
      priorityFilter === "ALL" || task.priority === priorityFilter;

    const matchesCategory = 
      categoryFilter === "ALL" || task.instrument.type.includes(categoryFilter);

    return matchesSearch && matchesPriority && matchesCategory;
  });

  const getPriorityBadge = (priority: InspectionPriority) => {
    switch (priority) {
      case "URGENT":
        return {
          label: "URGENT DUE",
          bg: "bg-red-100 text-red-800 border-red-200",
          dot: "bg-red-500",
        };
      case "HIGH":
        return {
          label: "HIGH PRIORITY",
          bg: "bg-amber-100 text-amber-800 border-amber-200",
          dot: "bg-amber-500",
        };
      case "COMPLAINT":
        return {
          label: "CITIZEN GRIEVANCE",
          bg: "bg-purple-100 text-purple-800 border-purple-200",
          dot: "bg-purple-500",
        };
      case "ROUTINE":
      default:
        return {
          label: "ROUTINE SCHEDULE",
          bg: "bg-blue-100 text-blue-800 border-blue-200",
          dot: "bg-blue-500",
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner & Context */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            Active Route Optimization • Zone 1 Dispatch
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Today's Assigned Inspection Itinerary
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Legal Metrology Act, 2009 mandatory annual re-verifications, APMC Mandi bulk scale tests, 
            and citizen tampering grievance checks assigned to your badge.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[180px] self-stretch md:self-auto flex md:flex-col items-center justify-between md:justify-center">
          <span className="text-xs text-slate-300 font-medium">Pending Today</span>
          <span className="text-3xl font-black text-emerald-400 font-mono my-0.5">
            {filteredTasks.length}
          </span>
          <span className="text-[11px] text-slate-400">Scheduled Visits</span>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Merchant name, Instrument ID, Model, or Address..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Priority Pill Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {["ALL", "URGENT", "HIGH", "COMPLAINT", "ROUTINE"].map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  priorityFilter === p
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {p === "ALL" ? "All Priorities" : p}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-semibold flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Instrument Filter:
          </span>
          {["ALL", "Scale", "Gold Balance", "Weighbridge", "Fuel Dispensing"].map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                categoryFilter === c
                  ? "bg-blue-100 text-blue-800 font-bold border border-blue-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c === "ALL" ? "All Equipment" : c}
            </button>
          ))}
        </div>
      </div>

      {/* Task Cards Grid */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Inspection Tasks Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No pending tasks matched your current search and filter criteria. Try resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setPriorityFilter("ALL");
              setCategoryFilter("ALL");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredTasks.map((task) => {
            const priorityInfo = getPriorityBadge(task.priority);

            return (
              <div
                key={task.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group text-left"
              >
                <div>
                  {/* Top Bar: Priority & Schedule */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${priorityInfo.bg}`}>
                        <span className={`w-2 h-2 rounded-full ${priorityInfo.dot}`} />
                        {priorityInfo.label}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {task.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{task.scheduledTime}</span>
                    </div>
                  </div>

                  {/* Business & Location Info */}
                  <div className="space-y-1 mb-4">
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {task.businessName}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500">
                      {task.tradeType}
                    </p>
                    <div className="flex items-start gap-2 text-xs text-slate-600 pt-1.5">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{task.address}</span>
                    </div>
                  </div>

                  {/* Instrument Specs Highlight Box */}
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 mb-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-blue-600" />
                        {task.instrument.type}
                      </span>
                      <span className="font-mono text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold border border-blue-200">
                        {task.instrumentId}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-200/60">
                      <div>
                        <span className="text-slate-400 block">Model & Serial:</span>
                        <span className="font-semibold text-slate-800 truncate block">
                          {task.instrument.model}
                        </span>
                        <span className="font-mono text-slate-500 text-[10px]">
                          {task.instrument.serialNumber}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Accuracy Class & Cap:</span>
                        <span className="font-bold text-slate-800 block">
                          {task.instrument.accuracyClass.split(" ")[0]} ({task.instrument.maxCapacity})
                        </span>
                        <span className="font-mono text-slate-500 text-[10px]">
                          e = {task.instrument.verificationScaleInterval}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-200/60">
                      <span className="text-slate-500">Last Verification Seal:</span>
                      <span className="font-mono font-medium text-slate-700">
                        {task.instrument.existingSealNumber}
                      </span>
                    </div>
                  </div>

                  {/* Merchant Contact Info */}
                  <div className="flex items-center justify-between text-xs text-slate-600 pb-2">
                    <span className="text-slate-500">Contact: {task.contactPerson}</span>
                    <a
                      href={`tel:${task.phone}`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{task.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Card Action CTAs */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectTaskForVerification(task)}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                  >
                    <FileBadge className="w-4 h-4" />
                    <span>Launch Field Verification</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      alert(`Opening GPS Navigation route to: ${task.address} (Lat: ${task.latitude}, Lng: ${task.longitude})`);
                    }}
                    title="Navigate GPS"
                    className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                  >
                    <Compass className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
