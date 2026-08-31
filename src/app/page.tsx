"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TraderPortalView } from "@/components/trader/TraderPortalView";
import { LmoDashboardView } from "@/components/lmo/LmoDashboardView";
import { GatcDashboardView } from "@/components/gatc/GatcDashboardView";
import { AdminDashboardView } from "@/components/admin/AdminDashboardView";
import { GovHeader } from "@/components/gov/GovHeader";
import { GovFooter } from "@/components/gov/GovFooter";
import { StakeholderRegistrationModal } from "@/components/gov/StakeholderRegistrationModal";
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  QrCode,
  Search,
  Building2,
  UserCheck,
  Scale,
  FileCheck2,
  Smartphone,
  BarChart3,
  Lock,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Info,
  Calendar,
  MapPin,
  FileText,
  Clock,
  Sparkles,
  Layers,
  Award,
  Globe,
  SlidersHorizontal,
  ChevronDown,
  Phone,
  HelpCircle,
  Zap,
  Users,
} from "lucide-react";

export type RoleType = "businessman" | "lmo" | "gatc" | "admin";
export type PortalViewMode = "landing" | "trader" | "lmo" | "gatc" | "admin";

export default function LandingPage() {
  const router = useRouter();
  const [activePortalView, setPortalState] = useState<PortalViewMode>("landing");

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const portal = params.get("portal") as PortalViewMode | null;
      setPortalState(portal || "landing");
    };
    handlePopState();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const setActivePortalView = (view: PortalViewMode) => {
    setPortalState(view);
    const newUrl = view === "landing" ? window.location.pathname : `${window.location.pathname}?portal=${view}`;
    window.history.pushState({}, "", newUrl);
  };
  const [selectedRole, setSelectedRole] = useState<RoleType>("businessman");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleAuthenticate = (role: RoleType) => {
    if (role === "lmo") {
      setActivePortalView("lmo");
    } else if (role === "businessman") {
      setActivePortalView("trader");
    } else if (role === "gatc") {
      setActivePortalView("gatc");
    } else if (role === "admin") {
      setActivePortalView("admin");
    }
  };

  const handleOpenLoginForRole = (role?: RoleType) => {
    if (role) {
      setSelectedRole(role);
    }
    setIsLoginModalOpen(true);
  };

  // Sample mock passport data for instant public verification lookup demo
  const samplePassports: Record<string, any> = {
    "IN-MET-2026-8941": {
      instrumentId: "IN-MET-2026-8941",
      certificateId: "CERT-LM-2026-99201",
      type: "Non-Automatic Electronic Weighing Scale (Class III)",
      model: "Avery Weigh-Tronix Pro 500",
      serialNumber: "SN-AW-7882914-K",
      owner: "Reliance Retail Logistics Ltd.",
      location: "Warehouse Hub #4, Okhla Industrial Area, New Delhi",
      verifiedBy: "Inspector Rajesh Kumar (LMO ID: LMO-DL-042)",
      verifiedAt: "15 Jan 2026",
      validUntil: "14 Jan 2027",
      status: "VALID",
      sealIntact: true,
      maxCapacity: "500.00 kg",
      accuracyClass: "Class III (e = 50g)",
      qrToken: "qr_token_sec_99201a4e",
    },
    "CERT-LM-2026-99201": {
      instrumentId: "IN-MET-2026-8941",
      certificateId: "CERT-LM-2026-99201",
      type: "Non-Automatic Electronic Weighing Scale (Class III)",
      model: "Avery Weigh-Tronix Pro 500",
      serialNumber: "SN-AW-7882914-K",
      owner: "Reliance Retail Logistics Ltd.",
      location: "Warehouse Hub #4, Okhla Industrial Area, New Delhi",
      verifiedBy: "Inspector Rajesh Kumar (LMO ID: LMO-DL-042)",
      verifiedAt: "15 Jan 2026",
      validUntil: "14 Jan 2027",
      status: "VALID",
      sealIntact: true,
      maxCapacity: "500.00 kg",
      accuracyClass: "Class III (e = 50g)",
      qrToken: "qr_token_sec_99201a4e",
    },
    "IN-MET-2025-1049": {
      instrumentId: "IN-MET-2025-1049",
      certificateId: "CERT-LM-2025-41002",
      type: "Fuel Dispensing Unit (Multi-Product)",
      model: "Tokheim Quantium 510",
      serialNumber: "TK-DUAL-991244",
      owner: "HPCL Retail Outlet #29",
      location: "Sector 18, Noida, Uttar Pradesh",
      verifiedBy: "Officer Priya Sharma (LMO ID: LMO-UP-118)",
      verifiedAt: "10 Aug 2025",
      validUntil: "09 Aug 2026",
      status: "EXPIRED",
      sealIntact: false,
      maxCapacity: "80 L/min",
      accuracyClass: "Class 0.5 (±0.3%)",
      qrToken: "qr_token_sec_41002exp",
    },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      const match =
        samplePassports[searchQuery.trim().toUpperCase()] ||
        samplePassports["IN-MET-2026-8941"];
      setSearchResult(match);
      setIsSearching(false);
    }, 350);
  };

  const roleDetails: Record<
    RoleType,
    {
      title: string;
      subtitle: string;
      badge: string;
      icon: any;
      color: string;
      accentBg: string;
      description: string;
      sampleEmail: string;
      sampleIdLabel: string;
      sampleIdVal: string;
      capabilities: string[];
    }
  > = {
    businessman: {
      title: "Businessman & Instrument Owner",
      subtitle: "Commercial Traders, Importers & Manufacturers",
      badge: "Commercial Stakeholder",
      icon: Building2,
      color: "text-blue-600",
      accentBg: "bg-blue-50 border-blue-200",
      description:
        "Manage registered weighing instruments, apply for initial verification or periodic re-verification, track inspector visit schedules in real time, and download verified digital QR certificates.",
      sampleEmail: "trade.ops@apexretail.in",
      sampleIdLabel: "Business Entity / GSTIN",
      sampleIdVal: "07AAACA6582N1ZT",
      capabilities: [
        "Online initial & periodic re-verification applications",
        "Digital repository of verified instruments and due dates",
        "Download cryptographic PDF e-Certificates with QR codes",
        "Automated alerts for validity expiry and renewal",
      ],
    },
    lmo: {
      title: "Legal Metrology Officer (LMO)",
      subtitle: "State Enforcement & Field Verification Inspectors",
      badge: "Enforcement Officer",
      icon: Shield,
      color: "text-emerald-600",
      accentBg: "bg-emerald-50 border-emerald-200",
      description:
        "Mobile-first field verification suite to execute standardized load tests per OIML R76, calculate Maximum Permissible Errors, record geotagged photo evidence, and issue official e-Certificates.",
      sampleEmail: "lmo.delhi.zone1@legalmetrology.gov.in",
      sampleIdLabel: "Officer Badge / Employee ID",
      sampleIdVal: "LMO-DL-2026-042",
      capabilities: [
        "Mobile-optimized on-site inspection checklists",
        "Live photo capture & GPS stamping of physical seals",
        "Instant passport retrieval & historical compliance audit",
        "Direct approval & cryptographic e-Certificate generation",
      ],
    },
    gatc: {
      title: "Govt Approved Test Center (GATC)",
      subtitle: "Accredited Testing & Calibration Laboratories",
      badge: "NABL Laboratory",
      icon: Scale,
      color: "text-amber-600",
      accentBg: "bg-amber-50 border-amber-200",
      description:
        "Perform precision metrological testing for high-capacity weighbridges, mass standards, and fuel flow meter provers. Issue ISO/IEC 17025 calibration certificates synchronized to the Central Passport.",
      sampleEmail: "lab.director@gatc-national.res.in",
      sampleIdLabel: "NABL / GATC Accreditation Code",
      sampleIdVal: "GATC-NABL-CAL-8841",
      capabilities: [
        "Queue management for laboratory sample testing",
        "Standard mass & volume calibration documentation",
        "Issue verified laboratory compliance test sheets",
        "Direct synchronization with central instrument passport",
      ],
    },
    admin: {
      title: "Central & State Administrator",
      subtitle: "Ministry Regulators & Directorate Operations",
      badge: "Govt Authority",
      icon: UserCheck,
      color: "text-indigo-600",
      accentBg: "bg-indigo-50 border-indigo-200",
      description:
        "National compliance oversight with real-time KPI dashboards, inspector allocation balancing, pendency tracking, Section 15/27 seizure logs, and statutory fee schedules.",
      sampleEmail: "superadmin.metrology@nic.in",
      sampleIdLabel: "Ministry Authorization ID",
      sampleIdVal: "MOCA-FPD-GOV-001",
      capabilities: [
        "National compliance overview & KPI telemetry",
        "Intelligent inspector allocation & conflict resolution",
        "Enforcement and seizure logbook under Section 15/27",
        "Immutable cryptographic verification audit ledger",
      ],
    },
  };

  const activeRoleData = roleDetails[selectedRole];
  const ActiveRoleIcon = activeRoleData.icon;

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Official Government Header */}
      <GovHeader
        onSelectPortal={setActivePortalView}
        onOpenLogin={handleOpenLoginForRole}
        currentPortal={activePortalView}
      />

      {/* Render active portal workspace or the public landing overview */}
      {activePortalView === "trader" ? (
        <TraderPortalView onBackToHome={() => setActivePortalView("landing")} />
      ) : activePortalView === "lmo" ? (
        <LmoDashboardView onBackToHome={() => setActivePortalView("landing")} />
      ) : activePortalView === "gatc" ? (
        <GatcDashboardView onBackToHome={() => setActivePortalView("landing")} />
      ) : activePortalView === "admin" ? (
        <AdminDashboardView onBackToHome={() => setActivePortalView("landing")} />
      ) : (
        <>

      {/* Hero Section with Official Portal Theme */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* National Department Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-900 text-xs font-semibold shadow-2xs">
              <Scale className="w-4 h-4 text-blue-700" />
              <span>Department of Consumer Affairs • Legal Metrology Division</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.18]">
              National Online Verification & Digital Certification System
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
              Under the <strong className="font-semibold text-slate-800">Legal Metrology Act, 2009</strong> and the <strong className="font-semibold text-slate-800">Legal Metrology (General) Rules, 2011</strong>, unified online portal for registration, verification application submission, LMO/GATC inspection allocation, QR-enabled digital certification, and validity lifecycle tracking.
            </p>

            {/* Public Quick Verification Lookup Box */}
            <div id="verification" className="bg-white p-5 sm:p-6 rounded-2xl shadow-card border border-slate-200/90 max-w-3xl mx-auto text-left mt-8 scroll-mt-48">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <QrCode className="w-4 h-4 text-blue-600" />
                  Instant Public Passport & Verification Certificate Search
                </span>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-mono border border-emerald-200 font-medium">
                  Public Open Access
                </span>
              </div>

              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5 mt-3.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Instrument ID (e.g. IN-MET-2026-8941) or Certificate Code..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 font-mono text-slate-900 transition shadow-2xs placeholder:text-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-5 py-2.5 bg-[#003366] hover:bg-[#0A2540] text-white font-semibold text-xs sm:text-sm rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSearching ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Verify Status</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Sample Search Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 text-xs text-slate-500 border-t border-slate-100">
                <span className="font-medium text-slate-600">Sample Records:</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("IN-MET-2026-8941");
                    setSearchResult(samplePassports["IN-MET-2026-8941"]);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100/90 hover:bg-slate-200 text-slate-700 font-mono text-[11px] border border-slate-200/80 font-medium transition-colors cursor-pointer"
                >
                  IN-MET-2026-8941 (Valid Scale)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("IN-MET-2025-1049");
                    setSearchResult(samplePassports["IN-MET-2025-1049"]);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100/90 hover:bg-slate-200 text-slate-700 font-mono text-[11px] border border-slate-200/80 font-medium transition-colors cursor-pointer"
                >
                  IN-MET-2025-1049 (Expired Fuel Unit)
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Public Search Result Card (if verified) */}
      {searchResult && (
        <section className="py-8 bg-slate-100 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                    <QrCode className="w-8 h-8 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        Digital Verification Certificate
                      </h3>
                      {searchResult.status === "VALID" ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-400/30">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          VALID & CERTIFIED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-bold text-xs border border-rose-400/30">
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          RE-VERIFICATION DUE / EXPIRED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      Certificate ID: {searchResult.certificateId} • Instrument ID: {searchResult.instrumentId}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSearchResult(null)}
                  className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800"
                >
                  ✕ Close
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
                  <span className="text-slate-400 block text-[11px]">Equipment Model</span>
                  <span className="font-semibold text-white">{searchResult.model}</span>
                </div>
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
                  <span className="text-slate-400 block text-[11px]">Serial Number</span>
                  <span className="font-mono font-bold text-white">{searchResult.serialNumber}</span>
                </div>
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
                  <span className="text-slate-400 block text-[11px]">Accuracy & Max Cap</span>
                  <span className="font-semibold text-white">{searchResult.maxCapacity} ({searchResult.accuracyClass})</span>
                </div>
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
                  <span className="text-slate-400 block text-[11px]">Certificate Validity</span>
                  <span className={`font-bold ${searchResult.status === "VALID" ? "text-emerald-400" : "text-rose-400"}`}>
                    Till {searchResult.validUntil}
                  </span>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">REGISTERED USER PREMISES</span>
                  <span className="font-medium text-slate-200">{searchResult.owner} • {searchResult.location}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">VERIFIED BY INSPECTOR</span>
                  <span className="font-semibold text-amber-300">{searchResult.verifiedBy}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4 Core Stakeholder Portals Showcase */}
      <section id="registration" className="py-14 bg-white border-b border-slate-200/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold border border-blue-200/80 mb-2">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                Role-Based Stakeholder Portals
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Unified Portal Access for All Stakeholders
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-normal leading-relaxed">
                Dedicated digital interfaces tailored for commercial instrument users, state inspection officers, accredited laboratories, and central regulators.
              </p>
            </div>

            <button
              onClick={() => setIsRegModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#003366] hover:bg-[#0A2540] text-white font-semibold text-xs sm:text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>New Stakeholder Registration</span>
            </button>
          </div>

          {/* 4 Stakeholder Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(Object.keys(roleDetails) as RoleType[]).map((roleKey) => {
              const role = roleDetails[roleKey];
              const Icon = role.icon;
              return (
                <div
                  key={roleKey}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col justify-between hover:border-slate-300 hover:shadow-subtle transition-all space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl ${role.accentBg} ${role.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        {role.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-semibold text-base text-slate-900 leading-snug">{role.title}</h3>
                      <p className="text-[11px] text-slate-500 font-medium">{role.subtitle}</p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                      {role.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {role.capabilities.slice(0, 3).map((cap, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-700 font-normal">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    {roleKey === "businessman" ? (
                      <button
                        onClick={() => setActivePortalView("trader")}
                        className="w-full py-2.5 rounded-xl font-semibold text-xs bg-[#003366] text-white hover:bg-[#0A2540] shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Open Trader Portal</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : roleKey === "lmo" ? (
                      <button
                        onClick={() => setActivePortalView("lmo")}
                        className="w-full py-2.5 rounded-xl font-semibold text-xs bg-emerald-700 text-white hover:bg-emerald-800 shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Open LMO Officer Suite</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : roleKey === "gatc" ? (
                      <button
                        onClick={() => setActivePortalView("gatc")}
                        className="w-full py-2.5 rounded-xl font-semibold text-xs bg-amber-600 text-slate-950 hover:bg-amber-700 shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Open GATC Testing Lab</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setActivePortalView("admin")}
                        className="w-full py-2.5 rounded-xl font-semibold text-xs bg-indigo-700 text-white hover:bg-indigo-800 shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Open Directorate Admin</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Online Workflow & Lifecycle Management Infographic */}
      <section id="workflow" className="py-14 bg-slate-50 border-b border-slate-200/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              Statutory Lifecycle Management
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              End-to-End Online Verification Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Standardized digital process replacing manual physical stamping ledgers under Rule 11 of the Legal Metrology (General) Rules, 2011.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                step: "01",
                title: "Stakeholder Registration",
                desc: "Traders, LMOs, and GATCs register online with GSTIN, Badge, or NABL accreditation.",
                icon: UserCheck,
              },
              {
                step: "02",
                title: "Verification Application",
                desc: "Submit instrument specifications, TAC approval, location, and preferred testing mode.",
                icon: FileText,
              },
              {
                step: "03",
                title: "Smart Allocation",
                desc: "System assigns visit to jurisdictional LMO or GATC testing center with appointment slot.",
                icon: Layers,
              },
              {
                step: "04",
                title: "Digital Observation",
                desc: "Inspector records load tests, MPE error calculations, and GPS seal evidence photos.",
                icon: Smartphone,
              },
              {
                step: "05",
                title: "QR e-Certificate",
                desc: "Instant generation of verifiable cryptographic certificate with unique QR code stamp.",
                icon: QrCode,
              },
              {
                step: "06",
                title: "Automated Renewal",
                desc: "30-day & 15-day proactive alerts and reminders before annual validity expiration.",
                icon: Clock,
              },
            ].map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.step}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-2.5 relative group hover:border-blue-300 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">{st.step}</span>
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
                  </div>
                  <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">{st.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-normal">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statutory Act, Rules & Standards Reference Section */}
      <section id="standards" className="py-14 bg-white border-b border-slate-200/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                Regulatory Framework
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Legal Metrology Act, 2009 Statutory Mandates
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                General Rules, 2011
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                OIML International Standards
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/90 shadow-card space-y-3">
              <div className="flex items-center gap-2 text-blue-900 font-semibold text-sm">
                <FileCheck2 className="w-4 h-4 text-blue-600" />
                <span>Section 24: Verification & Stamping</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Every person having in his possession or custody any weight or measure for use in any commercial transaction or protection shall get it verified and stamped periodically before putting it into use.
              </p>
              <div className="text-[11px] font-mono text-slate-500 font-medium">
                Penalty: Section 30 fine up to ₹10,000/-
              </div>
            </div>

            <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/90 shadow-card space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-semibold text-sm">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Rule 11: Certificate of Verification</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                The Legal Metrology Officer shall issue a certificate of verification in Schedule VIII to the person whose weight or measure has been verified, containing the period of validity, user premises, and seal identification.
              </p>
              <div className="text-[11px] font-mono text-slate-500 font-medium">
                Digital e-Certificate with Tamper-Evident QR
              </div>
            </div>

            <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/90 shadow-card space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-semibold text-sm">
                <Shield className="w-4 h-4 text-rose-600" />
                <span>Section 15: Inspection & Seizure</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Authorized officers may enter premises, inspect records, test working standards, and seize non-verified, un-stamped, or short-delivering measuring instruments used in trade.
              </p>
              <div className="text-[11px] font-mono text-slate-500 font-medium">
                Section 27 Compounding Penalties Applicable
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Citizen FAQ & Grievance Redressal */}
      <section id="faq" className="py-14 bg-slate-50 border-b border-slate-200/80 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 space-y-1">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Citizen & Stakeholder Helpdesk
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-2">
              <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                How often must a commercial weighing scale be re-verified?
              </h4>
              <p className="text-slate-600 pl-6 leading-relaxed font-normal">
                Under the Legal Metrology (General) Rules, 2011, standard commercial counter scales, electronic weighing machines, and petrol/diesel dispensing units must be re-verified <strong className="font-semibold text-slate-800">annually (every 12 months)</strong>. High precision weights and bullion balances follow statutory state schedule cycles.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-2">
              <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                How do consumers verify whether a weighing scale or fuel dispenser is genuine?
              </h4>
              <p className="text-slate-600 pl-6 leading-relaxed font-normal">
                Every verified instrument bears a physical seal tag and a QR code Certificate sticker. Citizens can scan the QR code using any smartphone or enter the Instrument ID in the public verification search box above to confirm validity and last stamping details.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-2">
              <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                What is the procedure if a physical seal is accidentally damaged?
              </h4>
              <p className="text-slate-600 pl-6 leading-relaxed font-normal">
                Traders can log in to the <strong className="font-semibold text-slate-800">Businessman Portal</strong>, select the instrument, and submit an <strong className="font-semibold text-slate-800">Emergency Seal Damage Report</strong> within 24 hours. The instrument is isolated from trade, and an expedited re-verification inspection is scheduled with the jurisdictional LMO.
              </p>
            </div>
          </div>
        </div>
      </section>
        </>
      )}

      {/* Official Government Footer */}
      <GovFooter />

      {/* Stakeholder Registration Modal */}
      <StakeholderRegistrationModal
        isOpen={isRegModalOpen}
        onClose={() => setIsRegModalOpen(false)}
        onSuccess={(role, name) => {
          alert(`Stakeholder Registration successfully completed for ${name} (${role.toUpperCase()}). You can now access your dashboard.`);
          handleAuthenticate(role);
        }}
      />

      {/* Stakeholder Login Modal */}
      {isLoginModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsLoginModalOpen(false);
          }}
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold transition cursor-pointer"
              aria-label="Close Login Modal"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 bg-white p-1 flex-shrink-0">
                <Image src="/logo.jpg" alt="DigiPass" fill className="object-contain" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Stakeholder Single Sign-On</h3>
                <p className="text-xs text-slate-500">Legal Metrology National Portal</p>
              </div>
            </div>

            {/* Role Select Grid */}
            <div className="space-y-1.5 mb-5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Select Your Stakeholder Role:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(roleDetails) as RoleType[]).map((r) => {
                  const isRSelected = selectedRole === r;
                  const Icon = roleDetails[r].icon;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSelectedRole(r)}
                      className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 cursor-pointer ${
                        isRSelected
                          ? "bg-[#003366] border-[#003366] text-white font-bold shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold"
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isRSelected ? "text-amber-400" : "text-slate-500"}`} />
                      <div className="truncate">
                        <span className="block truncate text-xs font-bold">{roleDetails[r].title.split(" ")[0]}</span>
                        <span className={`text-[10px] block truncate font-normal ${isRSelected ? "text-slate-200" : "text-slate-400"}`}>
                          {roleDetails[r].badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoginModalOpen(false);
                handleAuthenticate(selectedRole);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {roleDetails[selectedRole].sampleIdLabel} / Official Email
                </label>
                <input
                  type="text"
                  defaultValue={roleDetails[selectedRole].sampleEmail}
                  key={`login-id-${selectedRole}`}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-slate-900"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Security Password / PIN
                  </label>
                  <span className="text-[11px] font-semibold text-blue-700 hover:underline cursor-pointer">
                    Forgot PIN?
                  </span>
                </div>
                <input
                  type="password"
                  defaultValue="••••••••••••"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Remember verified device</span>
                </label>
                <span className="text-[11px] text-slate-500 font-mono">DoCA 2FA Shield</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#003366] hover:bg-[#0A2540] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Log In & Enter {roleDetails[selectedRole].title} →</span>
              </button>

              <div className="text-center pt-2 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    setIsRegModalOpen(true);
                  }}
                  className="text-xs text-blue-700 hover:underline font-bold cursor-pointer"
                >
                  Don&apos;t have an account? Register as New Stakeholder →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
