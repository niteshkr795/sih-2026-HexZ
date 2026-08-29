"use client";

import React, { useState } from "react";
import {
  Building2,
  Shield,
  Scale,
  Users,
  CheckCircle2,
  Lock,
  ArrowRight,
  Upload,
  FileCheck,
  UserCheck,
} from "lucide-react";

interface StakeholderRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: "businessman" | "lmo" | "gatc" | "admin", name: string) => void;
}

export const StakeholderRegistrationModal: React.FC<StakeholderRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [selectedRole, setSelectedRole] = useState<"businessman" | "lmo" | "gatc" | "admin">("businessman");
  const [formData, setFormData] = useState({
    entityName: "",
    contactPerson: "",
    email: "",
    phone: "",
    state: "Delhi NCT",
    idNumber: "", // GSTIN / Badge No / NABL Code
    address: "",
    password: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
    setTimeout(() => {
      onSuccess(selectedRole, formData.contactPerson || formData.entityName || "Registered User");
      setIsRegistered(false);
      onClose();
    }, 1200);
  };

  const roleConfig = {
    businessman: {
      title: "Commercial Trader / Manufacturer / Importer",
      idLabel: "GSTIN or Business Registration Number",
      idPlaceholder: "e.g. 07AAACA6582N1ZT",
      icon: Building2,
      color: "text-blue-600",
      accent: "bg-blue-50 border-blue-200",
    },
    lmo: {
      title: "Legal Metrology Officer (LMO Inspector)",
      idLabel: "Officer Badge No. / Government Employee ID",
      idPlaceholder: "e.g. LMO-DL-2026-042",
      icon: Shield,
      color: "text-emerald-600",
      accent: "bg-emerald-50 border-emerald-200",
    },
    gatc: {
      title: "Govt Approved Test Center (GATC Lab)",
      idLabel: "NABL Accreditation Code / Lab Approval Ref",
      idPlaceholder: "e.g. GATC-NABL-CAL-8841",
      icon: Scale,
      color: "text-amber-600",
      accent: "bg-amber-50 border-amber-200",
    },
    admin: {
      title: "State / Central Directorate Administrator",
      idLabel: "Ministry Authorization / NIC Officer Code",
      idPlaceholder: "e.g. MOCA-FPD-GOV-001",
      icon: Users,
      color: "text-indigo-600",
      accent: "bg-indigo-50 border-indigo-200",
    },
  };

  const currentRole = roleConfig[selectedRole];
  const CurrentIcon = currentRole.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-[#0b1c30] text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl ${currentRole.accent} bg-white/10 text-white`}>
              <CurrentIcon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Online Stakeholder Registration</h3>
              <p className="text-xs text-slate-400">
                Department of Consumer Affairs • Legal Metrology Act, 2009
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-slate-100 p-2 sm:p-3 border-b border-slate-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs font-semibold">
            {(["businessman", "lmo", "gatc", "admin"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRole(r)}
                className={`py-2 px-2.5 rounded-xl transition text-center truncate ${
                  selectedRole === r
                    ? "bg-[#003366] text-white shadow-sm font-bold"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {r === "businessman" ? "Trader / Owner" : r === "lmo" ? "LMO Officer" : r === "gatc" ? "GATC Lab" : "Admin"}
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Registration Category
            </span>
            <div className="font-bold text-slate-900">{currentRole.title}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Legal Entity / Establishment Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Apex Retail Logistics India Pvt Ltd"
                value={formData.entityName}
                onChange={(e) => setFormData({ ...formData, entityName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Authorized Contact Person / Officer *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Chandra Sharma"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official Email Address (2FA Enabled) *
              </label>
              <input
                type="email"
                required
                placeholder="e.g. contact@apexretail.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number (for SMS Alerts) *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. +91 98110 12345"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {currentRole.idLabel} *
              </label>
              <input
                type="text"
                required
                placeholder={currentRole.idPlaceholder}
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                State / Jurisdiction *
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
              >
                <option value="Delhi NCT">Delhi NCT</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Registered Physical Premises Address *
            </label>
            <textarea
              rows={2}
              required
              placeholder="Full premises address where weights/measures are installed or jurisdiction base..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-200 flex items-start gap-2.5 text-xs text-blue-900">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              By registering, you declare that all weighing and measuring instruments in commercial use will be verified and stamped per Legal Metrology Act, 2009 statutory timelines.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isRegistered}
              className="px-6 py-2.5 rounded-xl bg-[#003366] hover:bg-[#0A2540] text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              {isRegistered ? (
                <span>Registering Stakeholder...</span>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Complete Online Registration</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
