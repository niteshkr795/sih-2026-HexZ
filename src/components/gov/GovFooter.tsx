"use client";

import React from "react";
import Image from "next/image";
import {
  Shield,
  Phone,
  Mail,
  ExternalLink,
  MapPin,
  Clock,
  CheckCircle2,
  FileText,
} from "lucide-react";

export const GovFooter: React.FC = () => {
  return (
    <footer className="bg-[#0b1c30] text-white border-t border-slate-800 text-xs">
      {/* Tricolor Ribbon */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Government Authority */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-white p-1 flex-shrink-0">
                <Image src="/logo.jpg" alt="National Emblem" fill className="object-contain" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">e-Maapak Portal</h4>
                <p className="text-[11px] text-slate-400">Department of Consumer Affairs</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Unified National Online Verification, Digital Stamping & Lifecycle Certification System for Weighing and Measuring Instruments under the Legal Metrology Act, 2009.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-amber-300 text-[11px] font-mono border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              SIH 2026 • Problem Statement ID: 26036
            </div>
          </div>

          {/* Col 2: Important Government Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
              National Metrology Portals
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a
                  href="https://consumeraffairs.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>Dept. of Consumer Affairs (DoCA)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://india.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>National Portal of India (india.gov.in)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://digitalindia.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>Digital India Initiative</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://nplindia.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>National Physical Laboratory (NPL India)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Statutory Acts & Guidelines */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
              Statutory Acts & Norms
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#standards" className="hover:text-white transition-colors">
                  Legal Metrology Act, 2009 (No. 1 of 2010)
                </a>
              </li>
              <li>
                <a href="#standards" className="hover:text-white transition-colors">
                  Legal Metrology (General) Rules, 2011
                </a>
              </li>
              <li>
                <a href="#standards" className="hover:text-white transition-colors">
                  OIML International Recommendations (R76 / R111 / R117)
                </a>
              </li>
              <li>
                <a href="#standards" className="hover:text-white transition-colors">
                  NABL ISO/IEC 17025 Laboratory Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Helpdesk & Grievances */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
              Official Helpdesk & Support
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Krishi Bhawan / Shastri Bhawan, Dr. Rajendra Prasad Road, New Delhi - 110001
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-white font-bold">1800-11-4000 / 1915</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>dir-metrology@nic.in</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Mon - Fri: 09:30 AM to 06:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* GIGW Policy Footnote & Compliance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="text-center md:text-left space-y-1">
            <p>© 2026 Department of Consumer Affairs, Government of India. All Rights Reserved.</p>
            <p className="text-[10px] text-slate-500">
              Portal designed and developed for Smart India Hackathon (SIH 2026) • Problem Statement ID 26036.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-slate-300">
            <a href="#" className="hover:text-white">Website Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Hyperlinking Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white">GIGW Compliance</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Screen Reader Access</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
