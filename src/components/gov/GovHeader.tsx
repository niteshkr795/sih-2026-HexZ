"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Building2,
  Scale,
  Users,
  Lock,
  Phone,
  Search,
  Menu,
  X,
  Globe2,
  CheckCircle2,
  ArrowRight,
  FileCheck2,
  QrCode,
} from "lucide-react";

interface GovHeaderProps {
  onSelectPortal: (portal: "landing" | "trader" | "lmo" | "gatc" | "admin") => void;
  onOpenLogin: (role?: "businessman" | "lmo" | "gatc" | "admin") => void;
  currentPortal: string;
}

export const GovHeader: React.FC<GovHeaderProps> = ({
  onSelectPortal,
  onOpenLogin,
  currentPortal,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [lang, setLang] = useState<"EN" | "HI">("EN");

  const changeFontSize = (size: "sm" | "base" | "lg") => {
    setFontSize(size);
    if (size === "sm") {
      document.documentElement.style.fontSize = "14px";
    } else if (size === "lg") {
      document.documentElement.style.fontSize = "18px";
    } else {
      document.documentElement.style.fontSize = "16px";
    }
  };

  return (
    <header className="w-full bg-white shadow-sm border-b border-slate-200 z-50 sticky top-0">
      {/* Tricolor National Stripe */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#FF9933]" /> {/* Saffron */}
        <div className="flex-1 bg-white border-y border-slate-200/50" /> {/* White */}
        <div className="flex-1 bg-[#138808]" /> {/* Green */}
      </div>

      {/* Top GIGW Accessibility & National Identity Bar */}
      <div className="bg-[#0b1c30] text-slate-200 text-xs px-3 sm:px-6 py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Govt Identity Text */}
          <div className="flex items-center space-x-2 text-[11px] sm:text-xs">
            <span className="font-semibold text-amber-400">भारत सरकार</span>
            <span className="text-slate-500">|</span>
            <span className="font-medium text-slate-300">Government of India</span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-300">
              Department of Consumer Affairs (DoCA)
            </span>
          </div>

          {/* Right: Accessibility Controls */}
          <div className="flex items-center space-x-3 text-[11px]">
            <div className="hidden sm:flex items-center space-x-1 border-r border-slate-700 pr-3">
              <span className="text-slate-400">Text Size:</span>
              <button
                onClick={() => changeFontSize("sm")}
                className={`px-1.5 py-0.5 rounded ${fontSize === "sm" ? "bg-blue-600 text-white" : "hover:text-white"}`}
                title="Small Text"
              >
                A-
              </button>
              <button
                onClick={() => changeFontSize("base")}
                className={`px-1.5 py-0.5 rounded ${fontSize === "base" ? "bg-blue-600 text-white" : "hover:text-white"}`}
                title="Default Text"
              >
                A
              </button>
              <button
                onClick={() => changeFontSize("lg")}
                className={`px-1.5 py-0.5 rounded font-bold ${fontSize === "lg" ? "bg-blue-600 text-white" : "hover:text-white"}`}
                title="Large Text"
              >
                A+
              </button>
            </div>

            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
              className="flex items-center gap-1 hover:text-white font-medium bg-slate-800 px-2 py-0.5 rounded border border-slate-700 text-[10px] sm:text-xs"
            >
              <Globe2 className="w-3 h-3 text-amber-400" />
              <span>{lang === "EN" ? "हिन्दी" : "English"}</span>
            </button>

            {/* Helpline */}
            <div className="hidden lg:flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <Phone className="w-3 h-3" />
              <span>Toll Free: 1800-11-4000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Ministry Emblem & Brand Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Official Emblem + Department Branding */}
          <div
            onClick={() => onSelectPortal("landing")}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            {/* National Emblem & Logo Graphic */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-slate-200 shadow-xs flex-shrink-0 bg-white p-1">
              <Image
                src="/logo.jpg"
                alt="Emblem of India / DigiPass"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="text-left">
              <div className="text-[11px] sm:text-xs font-bold text-slate-700 tracking-wide uppercase">
                उपभोक्ता मामले, खाद्य और सार्वजनिक वितरण मंत्रालय
              </div>
              <div className="text-sm sm:text-lg font-black text-[#0A2540] tracking-tight leading-tight">
                विधि मापविज्ञान प्रभाग • Legal Metrology Division
              </div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <span className="font-semibold text-blue-700">e-Maapak Portal</span>
                <span>•</span>
                <span>Legal Metrology Act, 2009 & General Rules, 2011</span>
              </div>
            </div>
          </div>

          {/* Quick Action Badges & Direct Portal Buttons (Desktop) */}
          <div className="hidden xl:flex items-center space-x-2">
            <button
              onClick={() => onSelectPortal("trader")}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                currentPortal === "trader"
                  ? "bg-blue-700 text-white border-blue-800 shadow-sm"
                  : "bg-blue-50/80 text-blue-900 border-blue-200 hover:bg-blue-100"
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Trader Portal</span>
            </button>

            <button
              onClick={() => onSelectPortal("lmo")}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                currentPortal === "lmo"
                  ? "bg-emerald-700 text-white border-emerald-800 shadow-sm"
                  : "bg-emerald-50/80 text-emerald-900 border-emerald-200 hover:bg-emerald-100"
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>LMO Officer</span>
            </button>

            <button
              onClick={() => onSelectPortal("gatc")}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                currentPortal === "gatc"
                  ? "bg-amber-600 text-slate-950 border-amber-700 shadow-sm"
                  : "bg-amber-50/80 text-amber-900 border-amber-200 hover:bg-amber-100"
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-amber-700" />
              <span>GATC Lab</span>
            </button>

            <button
              onClick={() => onSelectPortal("admin")}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                currentPortal === "admin"
                  ? "bg-indigo-700 text-white border-indigo-800 shadow-sm"
                  : "bg-indigo-50/80 text-indigo-900 border-indigo-200 hover:bg-indigo-100"
              }`}
            >
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>Directorate Admin</span>
            </button>

            <button
              onClick={() => onOpenLogin()}
              className="ml-2 px-4 py-2 bg-[#0A2540] hover:bg-[#003366] text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Stakeholder Login</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center space-x-2 xl:hidden">
            <button
              onClick={() => onOpenLogin()}
              className="px-3 py-1.5 bg-[#0A2540] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              <span>Sign In</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Official Government Navigation Ribbon */}
      <nav className="bg-[#003366] text-white border-t border-[#002244] hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center space-x-1 py-1 overflow-x-auto scrollbar-none">
            <button
              onClick={() => onSelectPortal("landing")}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentPortal === "landing" ? "bg-white/20 text-white font-bold" : "hover:bg-white/10 text-slate-200"
              }`}
            >
              Home / Overview
            </button>
            <a
              href="#verification"
              className="px-3.5 py-2 rounded-lg hover:bg-white/10 text-slate-200 transition-colors"
            >
              Public Certificate Verify
            </a>
            <a
              href="#registration"
              className="px-3.5 py-2 rounded-lg hover:bg-white/10 text-slate-200 transition-colors"
            >
              Stakeholder Registration
            </a>
            <a
              href="#workflow"
              className="px-3.5 py-2 rounded-lg hover:bg-white/10 text-slate-200 transition-colors"
            >
              Verification Workflow
            </a>
            <a
              href="#standards"
              className="px-3.5 py-2 rounded-lg hover:bg-white/10 text-slate-200 transition-colors"
            >
              Act & Rules (2009/2011)
            </a>
            <a
              href="#faq"
              className="px-3.5 py-2 rounded-lg hover:bg-white/10 text-slate-200 transition-colors"
            >
              Citizen FAQ & Helpdesk
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-2 text-[11px] text-amber-300 font-mono py-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>SIH 2026 Problem ID: 26036</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 text-white border-t border-slate-800 p-4 space-y-3 animate-in slide-in-from-top-2">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider px-2">
            Stakeholder Portals
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                onSelectPortal("trader");
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-blue-950/80 border border-blue-800 rounded-xl text-left font-bold text-blue-200 flex items-center justify-between"
            >
              <span>🏢 Trader Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                onSelectPortal("lmo");
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-xl text-left font-bold text-emerald-200 flex items-center justify-between"
            >
              <span>🛡️ LMO Officer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                onSelectPortal("gatc");
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-amber-950/80 border border-amber-800 rounded-xl text-left font-bold text-amber-200 flex items-center justify-between"
            >
              <span>⚖️ GATC Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                onSelectPortal("admin");
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-indigo-950/80 border border-indigo-800 rounded-xl text-left font-bold text-indigo-200 flex items-center justify-between"
            >
              <span>📊 Central Admin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-1 text-xs text-slate-300">
            <button
              onClick={() => {
                onSelectPortal("landing");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left p-2 hover:bg-slate-800 rounded-lg font-medium"
            >
              🏠 Home & Public Verification
            </button>
            <a
              href="#registration"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-2 hover:bg-slate-800 rounded-lg font-medium"
            >
              📝 Stakeholder Registration
            </a>
            <a
              href="#standards"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-2 hover:bg-slate-800 rounded-lg font-medium"
            >
              📜 Legal Metrology Act & Rules
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
