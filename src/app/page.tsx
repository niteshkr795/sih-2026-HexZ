"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TraderPortalView } from "@/components/trader/TraderPortalView";
import { LmoDashboardView } from "@/components/lmo/LmoDashboardView";
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
  ChevronDown
} from "lucide-react";

type RoleType = "businessman" | "lmo" | "gatc" | "admin";
export type PortalViewMode = "landing" | "trader" | "lmo";

export default function LandingPage() {
  const router = useRouter();
  const [activePortalView, setActivePortalView] = useState<PortalViewMode>("landing");
  const [selectedRole, setSelectedRole] = useState<RoleType>("businessman");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "lifecycle" | "standards">("overview");

  const handleAuthenticate = (role: RoleType) => {
    if (role === "lmo") {
      setActivePortalView("lmo");
    } else if (role === "businessman") {
      setActivePortalView("trader");
    } else {
      alert(`Login submitted for ${roleDetails[role].title}. (Prototype UI Mode)`);
    }
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
      const match = samplePassports[searchQuery.trim().toUpperCase()] || samplePassports["IN-MET-2026-8941"];
      setSearchResult(match);
      setIsSearching(false);
    }, 450);
  };

  const openLoginForRole = (role: RoleType) => {
    setSelectedRole(role);
    setIsLoginModalOpen(true);
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
      badge: "Industry / Commercial",
      icon: Building2,
      color: "text-blue-600",
      accentBg: "bg-blue-50 border-blue-200",
      description:
        "Manage instrument registrations, apply for initial/periodic verifications, track application status in real time, and download verified digital certificates with instant QR codes.",
      sampleEmail: "trade.ops@apexretail.in",
      sampleIdLabel: "Business Entity / GSTIN",
      sampleIdVal: "07AAACA6582N1ZT",
      capabilities: [
        "Register new weighing & measuring instruments",
        "Submit online re-verification applications",
        "Track LMO assignment & scheduled visit",
        "Download cryptographic PDF e-Certificates",
      ],
    },
    lmo: {
      title: "Legal Metrology Officer (LMO)",
      subtitle: "Authorized Field Verification Inspectors",
      badge: "Enforcement Authority",
      icon: Shield,
      color: "text-emerald-600",
      accentBg: "bg-emerald-50 border-emerald-200",
      description:
        "Access mobile-optimized field verification workflows, load instrument passport history, execute standardized checklists, record geotagged photo evidence, and approve/lock verification records.",
      sampleEmail: "lmo.delhi.zone1@legalmetrology.gov.in",
      sampleIdLabel: "Officer Badge / Employee ID",
      sampleIdVal: "LMO-DL-2026-042",
      capabilities: [
        "Mobile-first on-site field verification checklists",
        "Live photo capture & GPS stamping of physical seals",
        "Instant passport retrieval & historical compliance audit",
        "Direct approval & cryptographic certificate generation",
      ],
    },
    gatc: {
      title: "Govt Approved Test Center (GATC)",
      subtitle: "Accredited Testing & Calibration Laboratories",
      badge: "Accredited Lab",
      icon: Scale,
      color: "text-amber-600",
      accentBg: "bg-amber-50 border-amber-200",
      description:
        "Perform precision metrological testing for high-capacity weights, measures, flow meters, and weighing bridges. Issue laboratory calibration reports and sync testing records to the passport.",
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
      badge: "Govt Governance",
      icon: UserCheck,
      color: "text-indigo-600",
      accentBg: "bg-indigo-50 border-indigo-200",
      description:
        "Comprehensive regulatory oversight with real-time KPI dashboards, inspector allocation, pendency tracking, non-compliance heatmaps, audit logs, and master instrument taxonomy configuration.",
      sampleEmail: "superadmin.metrology@nic.in",
      sampleIdLabel: "Ministry Authorization ID",
      sampleIdVal: "MOCA-FPD-GOV-001",
      capabilities: [
        "National compliance overview & KPI telemetry",
        "Intelligent inspector allocation & conflict resolution",
        "Automated expiry alerts & re-verification notices",
        "Immutable chronological audit trail logs",
      ],
    },
  };

  const activeRoleData = roleDetails[selectedRole];
  const ActiveRoleIcon = activeRoleData.icon;

  if (activePortalView === "trader") {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
        {/* Unified EcoSystem Switcher Bar */}
        <div className="bg-slate-950 text-white px-4 py-2.5 border-b border-slate-800 sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2.5">
              <span className="bg-blue-600 text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                DigiPass Ecosystem
              </span>
              <span className="text-slate-300 font-semibold hidden sm:inline">
                Active View: <strong className="text-white">Businessman & Trader Portal</strong>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActivePortalView("landing")}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>🏠 Main Portal / Overview</span>
              </button>
              <button
                onClick={() => setActivePortalView("lmo")}
                className="px-3 py-1.5 bg-emerald-800/90 hover:bg-emerald-700 text-emerald-100 rounded-lg text-xs font-semibold border border-emerald-600/50 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>🛡️ Switch to LMO Inspector Suite</span>
              </button>
            </div>
          </div>
        </div>
        <TraderPortalView onBackToHome={() => setActivePortalView("landing")} />
      </div>
    );
  }

  if (activePortalView === "lmo") {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        {/* Unified EcoSystem Switcher Bar */}
        <div className="bg-slate-950 text-white px-4 py-2.5 border-b border-slate-800 sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2.5">
              <span className="bg-emerald-600 text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                DigiPass Ecosystem
              </span>
              <span className="text-slate-300 font-semibold hidden sm:inline">
                Active View: <strong className="text-white">Legal Metrology Officer (LMO) Suite</strong>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActivePortalView("landing")}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>🏠 Main Portal / Overview</span>
              </button>
              <button
                onClick={() => setActivePortalView("trader")}
                className="px-3 py-1.5 bg-blue-800/90 hover:bg-blue-700 text-blue-100 rounded-lg text-xs font-semibold border border-blue-600/50 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>🏢 Switch to Trader Portal</span>
              </button>
            </div>
          </div>
        </div>
        <LmoDashboardView onBackToHome={() => setActivePortalView("landing")} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Advisory Banner */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-600 text-white font-semibold text-[10px] px-2 py-0.5 rounded tracking-wide uppercase">
              Official Portal
            </span>
            <span className="text-slate-300">
              Department of Legal Metrology • National Digital Instrument Passport Ecosystem (SIH 26036)
            </span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Tamper-Proof Cryptographic QR
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">24x7 Helpline: 1800-11-4000</span>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Department Branding */}
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white p-0.5 flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="DigiPass Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-2xl tracking-tight text-slate-950 font-mono">
                  Digi<span className="text-blue-600">Pass</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full border border-blue-200">
                  SIH 26036
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Digital Instrument Passport & Smart Field Verification
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="#ecosystem" className="hover:text-blue-600 transition-colors">
              Ecosystem
            </a>
            <button
              onClick={() => setActivePortalView("trader")}
              className="text-blue-600 hover:text-blue-700 font-bold transition-colors flex items-center gap-1"
            >
              <Building2 className="w-4 h-4" />
              <span>Trader Portal</span>
            </button>
            <button
              onClick={() => setActivePortalView("lmo")}
              className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors flex items-center gap-1"
            >
              <Shield className="w-4 h-4" />
              <span>LMO Portal</span>
            </button>
            <a href="#verification" className="hover:text-blue-600 transition-colors">
              Public QR Verify
            </a>
            <a href="#lifecycle" className="hover:text-blue-600 transition-colors">
              Lifecycle
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setActivePortalView("trader")}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 shadow-2xs"
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Trader Portal</span>
              <span className="sm:hidden">Trader</span>
            </button>

            <button
              onClick={() => setActivePortalView("lmo")}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200 shadow-2xs"
            >
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">LMO Suite</span>
              <span className="sm:hidden">LMO</span>
            </button>

            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm text-xs font-semibold text-blue-700 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Next-Gen Legal Metrology Verification Architecture
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-6">
              Trust & Transparency in <span className="text-blue-600">Every Measure</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8">
              A unified digital ecosystem connecting instrument registration, field inspector workflows,
              tamper-proof QR certificates, and continuous lifecycle compliance monitoring.
            </p>

            {/* Quick Public Verification Lookup Bar */}
            <div className="bg-white p-3 rounded-2xl shadow-xl border border-slate-200/80 max-w-2xl mx-auto mb-6 text-left">
              <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-blue-600" />
                  Instant Public Passport & Certificate Verification
                </span>
                <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                  No Login Required
                </span>
              </div>

              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mt-2">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Instrument ID (e.g. IN-MET-2026-8941) or Certificate Code"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Verify Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Sample quick tokens for convenience */}
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 text-xs text-slate-500">
                <span className="font-medium">Try Sample Passport:</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("IN-MET-2026-8941");
                    setSearchResult(samplePassports["IN-MET-2026-8941"]);
                  }}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] border border-slate-200 transition-colors"
                >
                  IN-MET-2026-8941 (Valid)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("IN-MET-2025-1049");
                    setSearchResult(samplePassports["IN-MET-2025-1049"]);
                  }}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] border border-slate-200 transition-colors"
                >
                  IN-MET-2025-1049 (Expired)
                </button>
              </div>
            </div>

            {/* Quick Portal Switcher Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-600">
              <span className="font-semibold text-slate-700 mr-1">Direct Stakeholder Portals:</span>
              <button
                onClick={() => setActivePortalView("trader")}
                className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 shadow-sm font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                🏢 Business / Trader Portal →
              </button>
              <button
                onClick={() => setActivePortalView("lmo")}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 shadow-sm font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                🛡️ LMO Field Inspector →
              </button>
              <button
                onClick={() => openLoginForRole("gatc")}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-amber-500 hover:text-amber-600 shadow-sm font-medium transition-all"
              >
                ⚖️ GATC Testing Lab
              </button>
              <button
                onClick={() => openLoginForRole("admin")}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-indigo-500 hover:text-indigo-600 shadow-sm font-medium transition-all"
              >
                📊 Central Admin
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Result Drawer (if searched) */}
      {searchResult && (
        <section id="verification" className="py-10 bg-white border-b border-slate-200 scroll-mt-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                    <QrCode className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                        Digital Instrument Passport
                      </h3>
                      {searchResult.status === "VALID" ? (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> VALID & CERTIFIED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold px-3 py-1 rounded-full">
                          <XCircle className="w-3.5 h-3.5" /> RE-VERIFICATION DUE / EXPIRED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      Passport ID: {searchResult.instrumentId} • Cert ID: {searchResult.certificateId}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSearchResult(null)}
                  className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Close Result
                </button>
              </div>

              {/* Passport Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6 text-sm">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1">Equipment Category</span>
                  <span className="font-semibold text-slate-100">{searchResult.type}</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1">Model & Serial No.</span>
                  <span className="font-semibold text-slate-100">{searchResult.model}</span>
                  <span className="text-xs text-slate-400 block font-mono mt-0.5">
                    {searchResult.serialNumber}
                  </span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1">Registered Owner</span>
                  <span className="font-semibold text-slate-100">{searchResult.owner}</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1">Validity Period</span>
                  <span className="font-semibold text-emerald-400 font-mono">
                    {searchResult.verifiedAt} → {searchResult.validUntil}
                  </span>
                </div>
              </div>

              {/* Security & Inspection Details */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-slate-300">
                    <strong className="text-white">Location:</strong> {searchResult.location}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-300">
                    <strong className="text-white">Inspecting Authority:</strong> {searchResult.verifiedBy}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 font-mono">
                    Cap: {searchResult.maxCapacity}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 font-mono">
                    {searchResult.accuracyClass}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stakeholder Login Portal Section */}
      <section id="portals" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Role-Based Authentication Access
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-3 tracking-tight">
              Unified Portal for All Metrology Stakeholders
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Select your organization or regulatory capacity to access tailored workflows, field apps, and dashboards.
            </p>
          </div>

          {/* 4 Stakeholder Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {(Object.keys(roleDetails) as RoleType[]).map((roleKey) => {
              const role = roleDetails[roleKey];
              const Icon = role.icon;
              const isSelected = selectedRole === roleKey;

              return (
                <div
                  key={roleKey}
                  onClick={() => setSelectedRole(roleKey)}
                  className={`cursor-pointer rounded-2xl p-6 transition-all border-2 text-left relative flex flex-col justify-between ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/40 shadow-lg ring-2 ring-blue-600/20"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                      Selected Role
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {role.badge}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-slate-900 leading-snug">{role.title}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 mb-4">{role.subtitle}</p>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {role.description}
                    </p>
                  </div>

                  {roleKey === "businessman" ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePortalView("trader");
                      }}
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#1A56DB] text-white hover:bg-blue-700 shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Open Businessman Portal</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : roleKey === "lmo" ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePortalView("lmo");
                      }}
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Open LMO Officer Suite</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openLoginForRole(roleKey);
                      }}
                      className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <span>Sign In as {role.title.split(" ")[0]}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Role Login Preview Pane */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Role Details & Permissions */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl ${activeRoleData.accentBg}`}>
                    <ActiveRoleIcon className={`w-8 h-8 ${activeRoleData.color}`} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Active Portal Selected
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900">{activeRoleData.title}</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeRoleData.description}
                </p>

                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Key Role Capabilities & Workflows:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activeRoleData.capabilities.map((cap, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200/80 text-slate-700 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Login UI Form */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-lg">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">Stakeholder Portal Sign In</h4>
                      <p className="text-xs text-slate-500">SIH 26036 Single Sign-On Access</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-700 rounded-md">
                      {selectedRole.toUpperCase()}
                    </span>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (selectedRole === "businessman") {
                        setActivePortalView("trader");
                      } else if (selectedRole === "lmo") {
                        setActivePortalView("lmo");
                      } else {
                        alert(`Login submitted for ${activeRoleData.title}. (Prototype UI Mode)`);
                      }
                    }}
                    className="space-y-4 text-left"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        {activeRoleData.sampleIdLabel} or Official Email
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          defaultValue={activeRoleData.sampleEmail}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono text-xs"
                          placeholder="e.g. user@organization.gov.in"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Password / Security PIN
                        </label>
                        <a href="#" className="text-[11px] font-semibold text-blue-600 hover:underline">
                          Forgot?
                        </a>
                      </div>
                      <input
                        type="password"
                        defaultValue="••••••••••••"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                        <span>Remember credentials</span>
                      </label>
                      <span className="text-[11px] text-slate-400 font-mono">2FA / OTP Enabled</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Authenticate & Open Workspace</span>
                    </button>

                    <div className="text-center pt-2">
                      <p className="text-[11px] text-slate-500">
                        Need registration or test certificate assistance?{" "}
                        <a href="#help" className="text-blue-600 font-semibold hover:underline">
                          Contact Helpdesk
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Ecosystem Lifecycle Workflow */}
      <section id="lifecycle" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              End-to-End Operational Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
              The Digital Instrument Passport Lifecycle
            </h2>
            <p className="text-slate-400 mt-3 text-base">
              One Instrument → One Digital Passport → Multi-Verification History → Trusted e-Certificate → Public Verification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                step: "01",
                title: "Instrument Registration",
                desc: "Business/owner registers instrument details, serial number, accuracy class, capacity, and operational location.",
                icon: FileText,
                badge: "Merchant",
              },
              {
                step: "02",
                title: "Digital Passport Created",
                desc: "System generates persistent Instrument ID, QR identity chip, and immutable chronological lifecycle history.",
                icon: QrCode,
                badge: "System Core",
              },
              {
                step: "03",
                title: "Smart Field Inspection",
                desc: "LMO executes standardized checklists on mobile, capturing live photos, seal integrity, GPS geotags & readings.",
                icon: Smartphone,
                badge: "LMO Field",
              },
              {
                step: "04",
                title: "Cryptographic e-Cert",
                desc: "Upon approval, an idempotent, tamper-proof PDF certificate with server-verified QR token is generated.",
                icon: Award,
                badge: "Issuing Authority",
              },
              {
                step: "05",
                title: "Lifecycle Monitoring",
                desc: "Automated validity tracking, re-verification reminders, public QR scans, and state-wide pendency oversight.",
                icon: Clock,
                badge: "Continuous",
              },
            ].map((stage, idx) => {
              const StageIcon = stage.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/10 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-black text-blue-400">
                        {stage.step}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-slate-300">
                        {stage.badge}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <StageIcon className="w-5 h-5" />
                    </div>

                    <h3 className="font-bold text-base text-white mb-2">{stage.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key National Metrics & Governance Stats */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-mono block mb-1">
                480,000+
              </span>
              <span className="text-xs font-semibold text-slate-600">
                Verified Digital Passports Issued
              </span>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-mono block mb-1">
                99.8%
              </span>
              <span className="text-xs font-semibold text-slate-600">
                Metrological Compliance Rate
              </span>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 font-mono block mb-1">
                18,400+
              </span>
              <span className="text-xs font-semibold text-slate-600">
                Active Legal Metrology Officers
              </span>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-mono block mb-1">
                &lt; 1.5s
              </span>
              <span className="text-xs font-semibold text-slate-600">
                Public QR Certificate Lookup Speed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Standards Section */}
      <section id="standards" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                Regulatory Standards
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Engineered for Legal Metrology Act & OIML Compliance
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Built strictly to adhere to the Legal Metrology Act, 2009, Legal Metrology (General) Rules,
                and International Organization of Legal Metrology (OIML) guidelines.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Immutable Digital Passport",
                    desc: "Every scale, flow meter, and weight standard has a persistent unique ID that prevents duplicate or fraudulent records.",
                  },
                  {
                    title: "Geotagged & Timestamped Inspection Evidence",
                    desc: "Photographic proof of calibration seals, stamping, and laboratory master tests are sealed cryptographically.",
                  },
                  {
                    title: "Public Instant Trust Verification",
                    desc: "Consumers and merchants can scan any instrument’s QR code to confirm official validity, inspector stamp, and expiry date.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-200">
                      <Image src="/logo.jpg" alt="DigiPass" fill className="object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Official Legal Metrology Seal</h4>
                      <p className="text-[11px] text-slate-500">Government of India Standard</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    ✓ VALIDATED
                  </span>
                </div>

                <div className="py-6 space-y-4 text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-500 font-medium">Standard Compliance:</span>
                    <span className="font-bold text-slate-900">SIH 26036 / LM General Rules 2011</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-500 font-medium">Cryptographic Security:</span>
                    <span className="font-bold text-slate-900">SHA-256 Tamper-Evident QR Token</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-500 font-medium">Accessibility Standard:</span>
                    <span className="font-bold text-slate-900">WCAG 2.2 AA Certified Layout</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-500 font-medium">Audit Record Retention:</span>
                    <span className="font-bold text-slate-900">Permanent Lifecycle History</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center gap-3 text-xs text-blue-900">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>
                    All verification operations are logged with officer ID, geolocation, timestamp, and verification photos.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholder Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0">
                <Image src="/logo.jpg" alt="DigiPass" fill className="object-contain" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-slate-900">Stakeholder Portal Sign In</h3>
                <p className="text-xs text-slate-500">Select your access role to continue</p>
              </div>
            </div>

            {/* Role Select Grid */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {(Object.keys(roleDetails) as RoleType[]).map((r) => {
                const isRSelected = selectedRole === r;
                const Icon = roleDetails[r].icon;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                      isRSelected
                        ? "bg-blue-50 border-blue-600 text-blue-900 font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="truncate text-xs">{roleDetails[r].title.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoginModalOpen(false);
                if (selectedRole === "businessman") {
                  setActivePortalView("trader");
                } else if (selectedRole === "lmo") {
                  setActivePortalView("lmo");
                } else {
                  alert(`Authenticated as ${roleDetails[selectedRole].title}. Entering portal dashboard...`);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {roleDetails[selectedRole].sampleIdLabel} / Username
                </label>
                <input
                  type="text"
                  defaultValue={roleDetails[selectedRole].sampleEmail}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  defaultValue="password123"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                <span className="font-semibold text-slate-800">Demo Role:</span> {roleDetails[selectedRole].title}
                <br />
                <span className="text-slate-500 font-mono">Sample ID: {roleDetails[selectedRole].sampleIdVal}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Enter {roleDetails[selectedRole].title.split(" ")[0]} Dashboard</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Official Footer */}
      <footer className="mt-auto bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white p-0.5">
                  <Image src="/logo.jpg" alt="DigiPass" fill className="object-contain" />
                </div>
                <span className="font-bold text-white text-lg tracking-tight font-mono">
                  Digi<span className="text-blue-500">Pass</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                National Legal Metrology Digital Verification Ecosystem for Weighing & Measuring Instruments (SIH 26036).
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Stakeholder Portals
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => setActivePortalView("trader")} className="hover:text-white text-left">
                    Businessman & Trader Portal
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePortalView("lmo")} className="hover:text-white text-left">
                    Legal Metrology Officer (LMO)
                  </button>
                </li>
                <li>
                  <button onClick={() => openLoginForRole("gatc")} className="hover:text-white">
                    Govt Approved Test Center (GATC)
                  </button>
                </li>
                <li>
                  <button onClick={() => openLoginForRole("admin")} className="hover:text-white">
                    Central & State Regulators
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Public Services
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#verification" className="hover:text-white">
                    Public QR Certificate Verify
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Instrument Type Approval Catalog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Fee Structure & Metrology Norms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Grievance & Tampering Redressal
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Contact & Support
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-2">
                Toll-Free National Helpline: <span className="text-white font-semibold">1800-11-4000</span>
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Email: <span className="text-white font-semibold">support.metrology@gov.in</span>
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© 2026 Legal Metrology Division • SIH 26036 Ecosystem. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300">Terms of Service</a>
              <a href="#" className="hover:text-slate-300">WCAG 2.2 AA Accessibility</a>
              <a href="#" className="hover:text-slate-300">Security Audit</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
