"use client";

import React, { useState } from "react";
import {
  Scale,
  Settings2,
  FileCheck2,
  Lock,
  Edit,
  Save,
  CheckCircle2,
  IndianRupee,
  Shield,
} from "lucide-react";
import { StatutoryStandardRule } from "@/types/admin";

interface AdminStandardsTaxonomyViewProps {
  rules: StatutoryStandardRule[];
  onUpdateRuleFee: (ruleId: string, newFee: number) => void;
}

export const AdminStandardsTaxonomyView: React.FC<AdminStandardsTaxonomyViewProps> = ({
  rules,
  onUpdateRuleFee,
}) => {
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [tempFee, setTempFee] = useState<number>(0);

  const startEdit = (rule: StatutoryStandardRule) => {
    setEditingRuleId(rule.id);
    setTempFee(rule.statutoryFeeInr);
  };

  const saveEdit = (ruleId: string) => {
    onUpdateRuleFee(ruleId, tempFee);
    setEditingRuleId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            Legal Metrology (General) Rules, 2011 & OIML International Recommendations
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Statutory Standards & Verification Fee Schedules
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Central Directorate master taxonomy for Maximum Permissible Error (MPE) thresholds, re-verification grace periods, and government stamping fee tariffs.
          </p>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="space-y-4">
        {rules.map((rule) => {
          const isEditing = editingRuleId === rule.id;
          return (
            <div
              key={rule.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-indigo-200 transition"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                      {rule.categoryCode}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Standard: {rule.applicableOimlStandard}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{rule.instrumentCategoryName}</h3>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 text-right">
                    <span className="text-[10px] text-slate-400 block font-semibold">Statutory Stamping Fee</span>
                    {isEditing ? (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-bold">₹</span>
                        <input
                          type="number"
                          value={tempFee}
                          onChange={(e) => setTempFee(parseFloat(e.target.value) || 0)}
                          className="w-24 px-2 py-1 font-mono font-bold text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <button
                          onClick={() => saveEdit(rule.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-lg font-black text-slate-900 font-mono">
                          ₹{rule.statutoryFeeInr}
                        </span>
                        <button
                          onClick={() => startEdit(rule)}
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                          title="Edit Fee Schedule"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Rule Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Verification Cycle</span>
                  <span className="font-semibold text-slate-800">{rule.verificationFrequency}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Grace Period</span>
                  <span className="font-semibold text-slate-800">{rule.reVerificationGraceDays} Days</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Physical Seal Type</span>
                  <span className="font-semibold text-slate-800">{rule.securitySealType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Statutory MPE Tolerance</span>
                  <span className="font-mono font-bold text-indigo-900">{rule.maxPermissibleErrorMpe}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
