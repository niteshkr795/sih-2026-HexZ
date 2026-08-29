"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Shield, 
  MapPin, 
  Wifi, 
  Clock, 
  LogOut, 
  Award,
  BellRing
} from "lucide-react";
import { OfficerProfile } from "@/types/lmo";

interface LmoHeaderProps {
  officer: OfficerProfile;
  onBackToHome?: () => void;
}

export const LmoHeader: React.FC<LmoHeaderProps> = ({ officer, onBackToHome }) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-lg">
      {/* Top Officer Status Bar */}
      <div className="bg-slate-950 px-4 py-1.5 border-b border-slate-800/80 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[11px] border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {officer.syncStatus === "ONLINE_SYNCED" ? "OFFICER SUITE ONLINE • ENCRYPTED TLS" : "OFFLINE SQLITE CACHE"}
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-300 text-[11px] hidden sm:flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-400" />
              {officer.zone}, {officer.state}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-slate-300 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Field Shift: 09:00 - 18:00 IST
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-emerald-400">
              <Wifi className="w-3.5 h-3.5" /> 4G LTE Active
            </span>
          </div>
        </div>
      </div>

      {/* Main LMO Identity Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Department & Officer Profile */}
        <div className="flex items-center space-x-4">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white p-0.5 border border-slate-700 shadow-sm flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="Legal Metrology Emblem"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-extrabold text-lg text-white tracking-tight">
                {officer.name}
              </h1>
              <span className="text-[10px] font-mono font-bold bg-blue-600/30 text-blue-400 border border-blue-500/40 px-2 py-0.5 rounded-full">
                {officer.id}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {officer.designation} • Badge: <span className="font-mono text-slate-300">{officer.badgeNumber}</span>
            </p>
          </div>
        </div>

        {/* Right: Quick Officer Actions & Logout */}
        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300">
              Monthly Compliance: <strong className="text-emerald-400 font-mono">{officer.complianceRate}%</strong> ({officer.totalInspectionsThisMonth} Done)
            </span>
          </div>

          <div className="relative">
            <button 
              title="Notifications" 
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              <BellRing className="w-4 h-4 text-blue-400" />
            </button>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold flex items-center justify-center text-white">
              {officer.pendingQueueCount}
            </span>
          </div>

          {onBackToHome ? (
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-blue-950/50 text-slate-300 hover:text-blue-300 border border-slate-700 hover:border-blue-800/50 text-xs font-semibold transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Back to Main Dashboard</span>
            </button>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-red-950/50 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-800/50 text-xs font-semibold transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Portal</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
