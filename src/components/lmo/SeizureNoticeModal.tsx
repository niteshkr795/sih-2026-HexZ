"use client";

import React from "react";
import Image from "next/image";
import { 
  AlertOctagon, 
  Printer, 
  X, 
  Scale, 
  AlertTriangle,
  FileWarning,
  Lock
} from "lucide-react";
import { SeizureNotice } from "@/types/lmo";

interface SeizureNoticeModalProps {
  notice: SeizureNotice | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SeizureNoticeModal: React.FC<SeizureNoticeModalProps> = ({
  notice,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !notice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-8 shadow-2xl border border-red-200 overflow-hidden text-slate-900 relative">
        {/* Modal Top Actions Toolbar */}
        <div className="bg-red-900 text-white px-6 py-4 flex items-center justify-between border-b border-red-800">
          <div className="flex items-center space-x-2">
            <AlertOctagon className="w-5 h-5 text-red-300" />
            <span className="font-bold text-sm">
              Form VIII — Notice of Seizure & Commercial Prohibition
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-800 hover:bg-red-700 text-white text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Notice</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-red-800 hover:bg-red-700 text-red-200 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Notice Body */}
        <div className="p-8 sm:p-12 bg-white">
          <div className="border-4 border-double border-red-800 rounded-2xl p-6 sm:p-8 relative bg-red-50/10 shadow-sm">
            {/* Red Prohibition Header Banner */}
            <div className="text-center pb-6 border-b-2 border-red-900 relative">
              <div className="relative w-14 h-14 mx-auto mb-2">
                <Image
                  src="/logo.jpg"
                  alt="Emblem of India"
                  fill
                  className="object-contain grayscale"
                />
              </div>

              <span className="text-[11px] font-bold tracking-[0.2em] text-red-900 uppercase block">
                Office of the Legal Metrology Officer • Enforcement Directorate
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-red-950 uppercase tracking-tight mt-1">
                Notice of Seizure & Stop-Use Order
              </h2>
              <p className="text-xs font-bold text-red-800 uppercase tracking-widest mt-0.5">
                (Issued under Section 15 of Legal Metrology Act, 2009 / Form VIII)
              </p>
            </div>

            {/* Notice Reference Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-b border-red-200 text-xs">
              <div>
                <span className="text-slate-500 font-medium block">Notice Memo No:</span>
                <span className="font-mono font-black text-red-900 text-sm">
                  {notice.noticeNumber}
                </span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Instrument Passport ID:</span>
                <span className="font-mono font-bold text-slate-800">
                  {notice.instrumentId}
                </span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Seizure Red Tag:</span>
                <span className="font-mono font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded border border-red-300">
                  {notice.redTagNumber}
                </span>
              </div>
            </div>

            {/* Notice Content */}
            <div className="py-5 space-y-4 text-xs leading-relaxed text-slate-800">
              <div className="bg-red-50 border border-red-300 rounded-xl p-4 flex items-start gap-3">
                <FileWarning className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-950 text-sm">
                    IMMEDIATE COMMERCIAL PROHIBITION & SEIZURE MEMO
                  </h4>
                  <p className="text-red-900 mt-1">
                    To: <strong className="underline">{notice.ownerName}</strong> ({notice.businessAddress})
                  </p>
                  <p className="text-red-800 text-[11px] mt-1">
                    You are hereby notified that the following instrument ({notice.instrumentType}, Serial No: {notice.serialNumber})
                    has failed mandatory verification standards and has been prohibited from commercial use.
                  </p>
                </div>
              </div>

              {/* Specific Violations Recorded */}
              <div>
                <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                  Metrological Violations & Non-Compliance Grounds:
                </h5>
                <ul className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {notice.reasons.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <span className="text-red-600 font-bold">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Penalty & Compounding Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-red-100/50 p-4 rounded-xl border border-red-200 text-xs">
                <div>
                  <span className="font-semibold text-slate-700 block">Violation Provisions:</span>
                  <span className="font-bold text-red-950 block mt-0.5">{notice.violationSection}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block">Compounding Penalty / Fine:</span>
                  <span className="font-mono font-black text-red-900 text-base">
                    ₹{notice.fineAmount.toLocaleString("en-IN")}.00
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    Rectification Window: {notice.rectificationDays} Days
                  </span>
                </div>
              </div>
            </div>

            {/* Signature & Seal */}
            <div className="pt-6 border-t-2 border-red-900 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="text-[11px] text-slate-500 font-mono">
                Date of Issue: {notice.issueDate} <br />
                Enforcement Location: Stamped on-site
              </div>

              <div className="text-right">
                <div className="inline-block text-center border-b border-dashed border-red-400 pb-1 px-4">
                  <span className="font-mono text-xs font-bold text-red-950 block italic">
                    {notice.officerName}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Officer ID: {notice.officerId}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-red-900 uppercase tracking-wider mt-1">
                  Seizing Officer / Inspector of Legal Metrology
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Failure to comply with this stop-use order attracts prosecution under Section 30 of the Act.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
          >
            Close Notice
          </button>
        </div>
      </div>
    </div>
  );
};
