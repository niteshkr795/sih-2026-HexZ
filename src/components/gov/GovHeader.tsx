"use client";

import React, { useState } from "react";
import Image from "next/image";
import { translations } from "@/translations";
import {
  Phone,
  Menu,
  X,
  Lock,
  ChevronDown,
  Building2,
  Shield,
  Scale,
  Users,
} from "lucide-react";

interface GovHeaderProps {
  onSelectPortal: (portal: "landing" | "trader" | "lmo" | "gatc" | "admin") => void;
  onOpenLogin?: (role?: "businessman" | "lmo" | "gatc" | "admin") => void;
  currentPortal: string;
}

export const GovHeader: React.FC<GovHeaderProps> = ({
  onSelectPortal,
  onOpenLogin,
  currentPortal,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  
  const t = translations["EN"];

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    const triggerHighlight = (id: string) => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Add transition classes first
        target.classList.add("transition-all", "duration-700");
        
        // Request a frame to ensure transition is applied before background color
        requestAnimationFrame(() => {
          target.classList.add("!bg-blue-200", "ring-4", "ring-blue-400", "rounded-3xl");
        });
        
        // Remove it after 1.5 seconds
        setTimeout(() => {
          target.classList.remove("!bg-blue-200", "ring-4", "ring-blue-400", "rounded-3xl");
        }, 1500);
      }
    };

    if (currentPortal !== "landing") {
      onSelectPortal("landing");
      setTimeout(() => triggerHighlight(targetId), 150);
    } else {
      triggerHighlight(targetId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="w-full bg-white relative z-40">
        {/* Tricolor National Stripe */}
        <div className="h-1.5 w-full flex">
          <div className="flex-1 bg-[#FF9933]" /> {/* Saffron */}
          <div className="flex-1 bg-white border-y border-slate-200/50" /> {/* White */}
          <div className="flex-1 bg-[#138808]" /> {/* Green */}
        </div>

        {/* Top GIGW Accessibility & National Identity Bar */}
        <div className="bg-[#0b1c30] text-slate-200 text-xs px-3 sm:px-6 py-1.5 border-b border-slate-800">
        <div className="w-full flex flex-wrap items-center justify-between gap-2">
          {/* Left: Govt Identity Text */}
          <div className="flex items-center space-x-2 text-[11px] sm:text-xs">
            <span className="font-semibold text-amber-400">{t.govOfIndia}</span>
            <span className="text-slate-500">|</span>
            <span className="font-medium text-slate-300">{t.govOfIndia}</span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-300">
              {t.deptConsumerAffairs}
            </span>
          </div>

          {/* Right: Accessibility Controls */}
          <div className="flex items-center space-x-3 text-[11px]">
            <div className="hidden sm:flex items-center space-x-1 border-r border-slate-700 pr-3">
              <span className="text-slate-400">{t.textSize}</span>
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

            {/* Helpline */}
            <div className="hidden lg:flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <Phone className="w-3 h-3" />
              <span>{t.tollFree} 1800-11-4000</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Ministry Emblem & Brand Banner (Desktop - static, scrolls away) */}
      <div className="hidden md:block w-full px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div
            onClick={() => {
              onSelectPortal("landing");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-slate-200 shadow-xs flex-shrink-0 bg-white p-1">
              <Image src="/logo.jpg" alt="Emblem of India / DigiPass" fill className="object-contain" priority />
            </div>
            <div className="text-left">
              <div className="text-[11px] sm:text-xs font-semibold text-slate-600 tracking-wide uppercase">
                {t.ministryName}
              </div>
              <div className="text-sm sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                {t.divisionName} • Legal Metrology Division
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-normal flex items-center gap-1.5 mt-0.5">
                <span className="font-semibold text-blue-700">{t.eMaapak}</span>
                <span>•</span>
                <span>{t.actRules}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Sticky Header Container */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200 flex flex-col transition-all duration-300">
        
      {/* Main Ministry Emblem & Brand Banner (Mobile - sticky) */}
      <div className="md:hidden w-full px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Official Emblem + Department Branding */}
          <div
            onClick={() => {
              onSelectPortal("landing");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
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
              <div className="text-[11px] sm:text-xs font-semibold text-slate-600 tracking-wide uppercase">
                {t.ministryName}
              </div>
              <div className="text-sm sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                {t.divisionName} • Legal Metrology Division
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-normal flex items-center gap-1.5 mt-0.5">
                <span className="font-semibold text-blue-700">{t.eMaapak}</span>
                <span>•</span>
                <span>{t.actRules}</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => onOpenLogin?.()}
              className="px-3 py-1.5 bg-[#FF9933] text-slate-950 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              <span>{t.login}</span>
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
        <div className="w-full px-4 sm:px-6 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center space-x-1 py-1 overflow-x-auto scrollbar-none">
            <button
              onClick={() => {
                onSelectPortal("landing");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentPortal === "landing" ? "bg-white/20 text-white font-bold" : "hover:bg-white/10 text-slate-200"
              }`}
            >
              {t.home}
            </button>
            <a
              href="#verification"
              onClick={(e) => handleNavClick(e, "verification")}
              className="px-3.5 py-2 rounded-lg hover:bg-white/10 text-slate-200 transition-colors"
            >
              {t.verifyCert}
            </a>
            <a
              href="#registration"
              onClick={(e) => handleNavClick(e, "registration")}
              className="px-3.5 py-2 rounded-lg hover:bg-white/10 text-slate-200 transition-colors"
            >
              {t.registration}
            </a>
            <a
              href="#workflow"
              onClick={(e) => handleNavClick(e, "workflow")}
              className="px-3.5 py-2 rounded-lg hover:bg-white/10 text-slate-200 transition-colors"
            >
              {t.workflow}
            </a>
            <a
              href="#standards"
              onClick={(e) => handleNavClick(e, "standards")}
              className="px-3.5 py-2 rounded-lg hover:bg-white/10 text-slate-200 transition-colors"
            >
              {t.actAndRulesMenu}
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, "faq")}
              className="px-3.5 py-2 rounded-lg hover:bg-white/10 text-slate-200 transition-colors"
            >
              Citizen FAQ & Helpdesk
            </a>
          </div>

          {/* Login Button & Dropdown in Navigation Ribbon */}
          <div className="relative py-1">
            <button
              onClick={() => {
                if (onOpenLogin) {
                  onOpenLogin();
                } else {
                  setIsLoginDropdownOpen(!isLoginDropdownOpen);
                }
              }}
              onMouseEnter={() => setIsLoginDropdownOpen(true)}
              className="px-4 py-1.5 bg-[#FF9933] hover:bg-[#f08c28] text-slate-950 font-bold text-xs rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer select-none"
              title="Click to Open Stakeholder Login / Switch Portal"
            >
              <Lock className="w-3.5 h-3.5 text-slate-950" />
              <span>Stakeholder Login</span>
              <ChevronDown className="w-3 h-3 text-slate-950 ml-0.5" />
            </button>

            {/* Quick Stakeholder Switcher & Login Dropdown */}
            {isLoginDropdownOpen && (
              <div
                onMouseLeave={() => setIsLoginDropdownOpen(false)}
                className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-slate-900 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Direct Workspace Login
                  </span>
                  <p className="text-[11px] text-slate-600 font-medium">Select your stakeholder role:</p>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setIsLoginDropdownOpen(false);
                      onSelectPortal("trader");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-left rounded-xl hover:bg-blue-50 text-slate-800 hover:text-blue-900 transition text-xs font-semibold"
                  >
                    <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block font-bold">Trader Portal</span>
                      <span className="text-[10px] text-slate-500 font-normal">Commercial Instrument Users</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setIsLoginDropdownOpen(false);
                      onSelectPortal("lmo");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-left rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 transition text-xs font-semibold"
                  >
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Shield className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block font-bold">LMO Field Suite</span>
                      <span className="text-[10px] text-slate-500 font-normal">State Metrology Officers</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setIsLoginDropdownOpen(false);
                      onSelectPortal("gatc");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-left rounded-xl hover:bg-amber-50 text-slate-800 hover:text-amber-900 transition text-xs font-semibold"
                  >
                    <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Scale className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block font-bold">GATC Lab Bench</span>
                      <span className="text-[10px] text-slate-500 font-normal">Accredited Testing Labs</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setIsLoginDropdownOpen(false);
                      onSelectPortal("admin");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-left rounded-xl hover:bg-indigo-50 text-slate-800 hover:text-indigo-900 transition text-xs font-semibold"
                  >
                    <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block font-bold">Directorate Admin</span>
                      <span className="text-[10px] text-slate-500 font-normal">Apex Ministry Regulators</span>
                    </div>
                  </button>
                </div>

                <div className="pt-2 mt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setIsLoginDropdownOpen(false);
                      onOpenLogin?.();
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-[#003366] hover:bg-[#0A2540] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Open Single Sign-On Modal</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 text-white border-t border-slate-800 p-4 space-y-3 animate-in slide-in-from-top-2">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider px-2">
            Navigation Menu
          </div>
          <div className="space-y-1 text-xs text-slate-300">
            <button
              onClick={() => {
                onSelectPortal("landing");
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full text-left p-2 hover:bg-slate-800 rounded-lg font-medium"
            >
              🏠 Home & Public Verification
            </button>
            <a
              href="#registration"
              onClick={(e) => handleNavClick(e, "registration")}
              className="block p-2 hover:bg-slate-800 rounded-lg font-medium"
            >
              📝 Stakeholder Registration
            </a>
            <a
              href="#workflow"
              onClick={(e) => handleNavClick(e, "workflow")}
              className="block p-2 hover:bg-slate-800 rounded-lg font-medium"
            >
              🔄 Verification Workflow
            </a>
            <a
              href="#standards"
              onClick={(e) => handleNavClick(e, "standards")}
              className="block p-2 hover:bg-slate-800 rounded-lg font-medium"
            >
              📜 Legal Metrology Act & Rules
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, "faq")}
              className="block p-2 hover:bg-slate-800 rounded-lg font-medium"
            >
              ❓ Citizen FAQ & Helpdesk
            </a>

            <div className="pt-2 border-t border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 px-2 block">
                Direct Workspace Access:
              </span>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onSelectPortal("trader");
                }}
                className="w-full text-left p-2 hover:bg-slate-800 rounded-lg font-medium text-slate-200 flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>Trader Portal</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onSelectPortal("lmo");
                }}
                className="w-full text-left p-2 hover:bg-slate-800 rounded-lg font-medium text-slate-200 flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>LMO Field Suite</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onSelectPortal("gatc");
                }}
                className="w-full text-left p-2 hover:bg-slate-800 rounded-lg font-medium text-slate-200 flex items-center gap-2"
              >
                <Scale className="w-4 h-4 text-amber-400" />
                <span>GATC Lab Bench</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onSelectPortal("admin");
                }}
                className="w-full text-left p-2 hover:bg-slate-800 rounded-lg font-medium text-slate-200 flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Directorate Admin</span>
              </button>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLogin?.();
              }}
              className="w-full text-left p-2.5 mt-2 bg-[#FF9933] text-slate-950 rounded-lg font-bold flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Stakeholder Login Modal</span>
              </span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}
    </header>
    </>
  );
};

