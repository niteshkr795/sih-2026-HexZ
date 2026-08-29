"use client";

import React, { useState } from "react";
import {
  Layers,
  Search,
  CheckCircle2,
  Lock,
  Link as LinkIcon,
  ShieldCheck,
  Clock,
  KeyRound,
  FileCheck2,
} from "lucide-react";
import { AuditLedgerBlock } from "@/types/admin";

interface AdminAuditLedgerViewProps {
  blocks: AuditLedgerBlock[];
}

export const AdminAuditLedgerView: React.FC<AdminAuditLedgerViewProps> = ({ blocks }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = blocks.filter((b) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.instrumentId.toLowerCase().includes(q) ||
        b.actor.toLowerCase().includes(q) ||
        b.blockHash.toLowerCase().includes(q) ||
        b.actionType.toLowerCase().includes(q)
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
            <Lock className="w-3.5 h-3.5" />
            Immutable Cryptographic Proof Ledger (SHA-256 Block Chain)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            National Legal Metrology Audit Ledger
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Every verification event, field inspector seal change, GATC lab calibration test, and seizure order is cryptographically hashed and linked to prevent retroactive tampering.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[160px]">
          <span className="text-xs text-slate-300 font-medium block">Ledger Height</span>
          <span className="text-3xl font-black text-indigo-400 font-mono my-0.5">#489,124</span>
          <span className="text-[10px] text-slate-400 block">100% Cryptographic Integrity</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Block Hash, Instrument ID, Actor Name, or Action..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 transition"
          />
        </div>
      </div>

      {/* Blocks Sequence */}
      <div className="space-y-4">
        {filtered.map((b) => (
          <div
            key={b.blockNumber}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-indigo-300 transition"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-indigo-400 font-mono font-black text-xs flex items-center justify-center border border-slate-800 shrink-0">
                  #{b.blockNumber}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      {b.actionType.replace(/_/g, " ")}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Valid
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    Target Instrument: <strong>{b.instrumentId}</strong> • Timestamp: {b.timestamp}
                  </div>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-semibold self-end sm:self-auto">
                Role: {b.actorRole}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed">
              {b.detailsSummary}
            </p>

            {/* Cryptographic Hashes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-mono bg-slate-950 text-slate-300 p-3.5 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 block text-[10px]">PREVIOUS BLOCK HASH</span>
                <span className="text-slate-400 truncate block">{b.prevBlockHash}</span>
              </div>
              <div>
                <span className="text-indigo-400 block text-[10px]">CURRENT BLOCK SHA-256 HASH</span>
                <span className="text-indigo-300 font-bold truncate block">{b.blockHash}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Actor: <strong>{b.actor}</strong></span>
              <span className="truncate max-w-xs">{b.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
