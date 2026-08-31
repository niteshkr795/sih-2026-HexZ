"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
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
  ArrowLeft,
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
  Plus,
  Download,
  Filter,
  RefreshCw,
  Eye,
  CreditCard,
  Printer,
  FileWarning,
  Check,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Store,
  Fuel,
  Gem,
  Truck,
  ShoppingBag,
  Share2,
  Copy,
  CheckCheck,
  Upload,
  CalendarDays,
  ShieldCheck,
  Phone,
  Mail,
  Zap,
  LayoutDashboard,
  Boxes,
  ScrollText,
  FolderGit2,
  CalendarCheck,
  Calculator,
  MessageSquareQuote,
  ChevronLeft,
  X,
  Sliders
} from "lucide-react";

// Demo business profiles that the user can switch between
export type BusinessProfileId = "apex" | "sharma" | "hpcl" | "tanishq" | "omlogistics";

interface BusinessProfile {
  id: BusinessProfileId;
  name: string;
  categoryName: string;
  categoryType: string;
  icon: any;
  gstin: string;
  tradeLicense: string;
  establishmentReg: string;
  zone: string;
  address: string;
  authorizedPerson: string;
  phone: string;
  email: string;
  branches: string[];
}

const DEMO_PROFILES: Record<BusinessProfileId, BusinessProfile> = {
  apex: {
    id: "apex",
    name: "Apex Supermarket & Retail Chains Ltd.",
    categoryName: "Supermarket & Grocery Retail Chain",
    categoryType: "Commercial Retail",
    icon: ShoppingBag,
    gstin: "07AAACA6582N1ZT",
    tradeLicense: "DL-TRD-2024-91823",
    establishmentReg: "NDMC-SE-449102",
    zone: "Delhi Central & South Zone",
    address: "Plot 14, Commercial Complex, Connaught Place, New Delhi - 110001",
    authorizedPerson: "Mr. Vikram Malhotra (Operations Director)",
    phone: "+91 98110 44291",
    email: "trade.ops@apexretail.in",
    branches: ["Main Branch (Connaught Place)", "South Ext Store #2", "Saket Hub #3", "Dwarka Supermart #4"],
  },
  sharma: {
    id: "sharma",
    name: "Sharma Sweets & Confectionery",
    categoryName: "Local Sweet Shop & Retail Merchant",
    categoryType: "Shopkeeper / Kirana",
    icon: Store,
    gstin: "07BPKPS8912C1Z4",
    tradeLicense: "DL-KB-2023-11029",
    establishmentReg: "MCD-SE-883192",
    zone: "West Delhi Zone (Karol Bagh)",
    address: "Shop 12, Main Market Road, Karol Bagh, New Delhi - 110005",
    authorizedPerson: "Mr. Rajesh Sharma (Proprietor)",
    phone: "+91 98712 39012",
    email: "sharmasweets.kb@gmail.com",
    branches: ["Karol Bagh Main Shop", "Rajendra Place Counter"],
  },
  hpcl: {
    id: "hpcl",
    name: "HPCL Highway Retail Outlet #29",
    categoryName: "Petroleum, Diesel & Auto-LPG Fuel Station",
    categoryType: "Energy / Fuel Station",
    icon: Fuel,
    gstin: "07AAACH1249K1Z8",
    tradeLicense: "DL-PET-2022-8819",
    establishmentReg: "PESO-ST-991204",
    zone: "South Delhi / Faridabad Border Zone",
    address: "NH-19, Mathura Road, Badarpur, New Delhi - 110044",
    authorizedPerson: "Mr. Anil Swaminathan (Station Manager)",
    phone: "+91 99104 88310",
    email: "retail.dl29@hpcl-dealers.co.in",
    branches: ["Highway Dispensing Forecourt", "Commercial Fleet CNG Bay"],
  },
  tanishq: {
    id: "tanishq",
    name: "Tanishq Precision Gems & Gold Jewellers",
    categoryName: "Precious Metals & Micro-Weight Jewellery",
    categoryType: "Bullion & Gems Merchant",
    icon: Gem,
    gstin: "07AAACT0041M1ZY",
    tradeLicense: "DL-JWL-2023-77192",
    establishmentReg: "BIS-HM-2024-3019",
    zone: "South Delhi Zone (South Extension-I)",
    address: "F-28, Main Ring Road, South Extension Part-I, New Delhi - 110049",
    authorizedPerson: "Mrs. Radhika Singhal (Chief Gemologist)",
    phone: "+91 98188 55432",
    email: "compliance.southext@titanjewels.co.in",
    branches: ["Gold & Diamond Floor", "Hallmark Testing Lab Counter"],
  },
  omlogistics: {
    id: "omlogistics",
    name: "Om Freight & Logistics Weighbridge Hub",
    categoryName: "Industrial Heavy Weighbridge & Cargo Scales",
    categoryType: "Supply Chain & Freight",
    icon: Truck,
    gstin: "07AABCO4910P1Z1",
    tradeLicense: "DL-IND-2021-39182",
    establishmentReg: "DDA-IND-99410",
    zone: "Okhla Industrial Area Phase-II",
    address: "Shed 44-B, Okhla Industrial Area Phase-II, New Delhi - 110020",
    authorizedPerson: "Mr. Jaspreet Singh (Logistics Head)",
    phone: "+91 97119 22091",
    email: "weighbridge.ops@omfreight.in",
    branches: ["100MT Heavy Weighbridge Gate 1", "Warehouse Automated Platform #3"],
  },
};

export type InstrumentStatus = "VALID" | "EXPIRING_SOON" | "EXPIRED" | "UNDER_INSPECTION";

export interface InstrumentItem {
  id: string; // Instrument ID (e.g. IN-MET-2026-8941)
  certId: string; // Certificate ID
  name: string;
  category: string;
  model: string;
  brand: string;
  serialNumber: string;
  accuracyClass: string; // Class I, Class II, Class III, Class IIII
  maxCapacity: string;
  minCapacity: string;
  verificationInterval: string; // e value
  tacApprovalNo: string; // Type approval certificate
  branch: string;
  departmentLocation: string;
  verifiedAt: string;
  validUntil: string;
  daysRemaining: number;
  status: InstrumentStatus;
  inspectorName: string;
  inspectorId: string;
  sealNumber: string;
  sealIntact: boolean;
  qrToken: string;
  geotagLocation: string;
  stampingFee: number;
  lastTestReport: string;
  history: Array<{
    date: string;
    event: string;
    officer: string;
    remarks: string;
    certId: string;
  }>;
}

// Initial rich sample dataset for instruments across business profiles
const INITIAL_INSTRUMENTS: Record<BusinessProfileId, InstrumentItem[]> = {
  apex: [
    {
      id: "IN-MET-2026-8941",
      certId: "CERT-LM-2026-99201",
      name: "Countertop Electronic Retail Weighing Scale",
      category: "Non-Automatic Electronic Weighing Instrument",
      model: "Avery Pro-Retail 500",
      brand: "Avery Weigh-Tronix",
      serialNumber: "SN-AW-7882914-K",
      accuracyClass: "Class III (Medium Accuracy)",
      maxCapacity: "30.00 kg",
      minCapacity: "100 g",
      verificationInterval: "e = 5 g (d = 1 g)",
      tacApprovalNo: "IND/09/2022/419",
      branch: "Main Branch (Connaught Place)",
      departmentLocation: "Billing Counter #03 (Fresh Produce)",
      verifiedAt: "15 Jan 2026",
      validUntil: "14 Jan 2027",
      daysRemaining: 140,
      status: "VALID",
      inspectorName: "Inspector Rajesh Kumar",
      inspectorId: "LMO-DL-042",
      sealNumber: "SEAL-DL-994018",
      sealIntact: true,
      qrToken: "sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
      geotagLocation: "28.6315° N, 77.2167° E (Connaught Place)",
      stampingFee: 450,
      lastTestReport: "TR-DEL-2026-0918 (Zero Error, Eccentricity Passed)",
      history: [
        { date: "15 Jan 2026", event: "Annual Periodic Re-Verification & Stamping", officer: "Inspector Rajesh Kumar", remarks: "MPE within ±2.5g. Physical lead seal intact and barcode stamped.", certId: "CERT-LM-2026-99201" },
        { date: "16 Jan 2025", event: "Periodic Verification", officer: "Inspector P. K. Verma", remarks: "Passed all standard mass tests up to 30kg.", certId: "CERT-LM-2025-78119" },
        { date: "20 Jan 2024", event: "Initial Verification at Deployment", officer: "Inspector Rajesh Kumar", remarks: "Model TAC verified against Central Gazette registry.", certId: "CERT-LM-2024-11029" }
      ]
    },
    {
      id: "IN-MET-2026-8942",
      certId: "CERT-LM-2026-99202",
      name: "Heavy Duty Platform Receiving Scale",
      category: "Platform Electronic Weighing Instrument",
      model: "Essae Teraoka PR-300",
      brand: "Essae",
      serialNumber: "ES-300-991204-X",
      accuracyClass: "Class III (Medium Accuracy)",
      maxCapacity: "300.00 kg",
      minCapacity: "2.0 kg",
      verificationInterval: "e = 50 g",
      tacApprovalNo: "IND/04/2021/882",
      branch: "Main Branch (Connaught Place)",
      departmentLocation: "Goods Inward Loading Bay #01",
      verifiedAt: "28 Sep 2025",
      validUntil: "27 Sep 2026",
      daysRemaining: 31,
      status: "EXPIRING_SOON",
      inspectorName: "Inspector Rajesh Kumar",
      inspectorId: "LMO-DL-042",
      sealNumber: "SEAL-DL-994019",
      sealIntact: true,
      qrToken: "sha256:4a9c8e17bb02194fef2819cd88102a94f091bc7829104fae8912ceba78901b2a",
      geotagLocation: "28.6318° N, 77.2170° E (Loading Bay 1)",
      stampingFee: 850,
      lastTestReport: "TR-DEL-2025-8812 (Passed standard weight stack 300kg)",
      history: [
        { date: "28 Sep 2025", event: "Annual Periodic Verification", officer: "Inspector Rajesh Kumar", remarks: "Calibration confirmed using M1 standard test weights.", certId: "CERT-LM-2026-99202" }
      ]
    },
    {
      id: "IN-MET-2026-8943",
      certId: "CERT-LM-2025-41908",
      name: "Deli & Bakery Touchscreen Price-Computing Scale",
      category: "Non-Automatic Electronic Weighing Instrument",
      model: "Bizerba SC II 800",
      brand: "Bizerba",
      serialNumber: "BZ-800-449102-D",
      accuracyClass: "Class III (Medium Accuracy)",
      maxCapacity: "15.00 kg",
      minCapacity: "40 g",
      verificationInterval: "e = 2 g",
      tacApprovalNo: "IND/11/2020/601",
      branch: "South Ext Store #2",
      departmentLocation: "Bakery & Gourmet Cheese Counter",
      verifiedAt: "10 Aug 2025",
      validUntil: "09 Aug 2026",
      daysRemaining: -18,
      status: "EXPIRED",
      inspectorName: "Officer Priya Sharma",
      inspectorId: "LMO-DL-088",
      sealNumber: "SEAL-DL-773190",
      sealIntact: true,
      qrToken: "sha256:918230aafe18392109401827409182ab91029384759102384759102384759102",
      geotagLocation: "28.5714° N, 77.2210° E (South Ext)",
      stampingFee: 450,
      lastTestReport: "TR-DEL-2025-4190 (Expired - Pending Re-verification)",
      history: [
        { date: "10 Aug 2025", event: "Annual Periodic Verification", officer: "Officer Priya Sharma", remarks: "Verified and stamped for 12 months.", certId: "CERT-LM-2025-41908" }
      ]
    },
    {
      id: "IN-MET-2026-8944",
      certId: "CERT-LM-2026-11940",
      name: "Dry Fruits & Spices High-Precision Counter Scale",
      category: "Non-Automatic Electronic Weighing Instrument",
      model: "Mettler Toledo bPlus-T2",
      brand: "Mettler Toledo",
      serialNumber: "MT-BPLUS-904128",
      accuracyClass: "Class II (High Accuracy)",
      maxCapacity: "6.00 kg",
      minCapacity: "20 g",
      verificationInterval: "e = 0.5 g (d = 0.1 g)",
      tacApprovalNo: "IND/02/2023/118",
      branch: "Main Branch (Connaught Place)",
      departmentLocation: "Organic & Premium Spices Section",
      verifiedAt: "02 Feb 2026",
      validUntil: "01 Feb 2027",
      daysRemaining: 158,
      status: "VALID",
      inspectorName: "Inspector Rajesh Kumar",
      inspectorId: "LMO-DL-042",
      sealNumber: "SEAL-DL-994020",
      sealIntact: true,
      qrToken: "sha256:1029384759281726354819203847561928374651928374651928374651928374",
      geotagLocation: "28.6315° N, 77.2167° E",
      stampingFee: 550,
      lastTestReport: "TR-DEL-2026-1194 (F1 class test weights verified)",
      history: [
        { date: "02 Feb 2026", event: "Periodic Re-Verification", officer: "Inspector Rajesh Kumar", remarks: "Class II precision confirmed within ±0.25g error limit.", certId: "CERT-LM-2026-11940" }
      ]
    },
    {
      id: "IN-MET-2026-8945",
      certId: "PENDING-REQ-8891A",
      name: "Bulk Grain Hopper Automatic Weighing Machine",
      category: "Automatic Gravimetric Filling Instrument",
      model: "Yamato Multihead Dataweigh Alpha",
      brand: "Yamato",
      serialNumber: "YM-ALPHA-44910",
      accuracyClass: "Class X(1) Automatic",
      maxCapacity: "50.00 kg",
      minCapacity: "500 g",
      verificationInterval: "e = 10 g",
      tacApprovalNo: "IND/08/2021/339",
      branch: "Saket Hub #3",
      departmentLocation: "Packaging & Staple Bagging Line #02",
      verifiedAt: "Pending Field Visit",
      validUntil: "Under Inspection Slot",
      daysRemaining: 0,
      status: "UNDER_INSPECTION",
      inspectorName: "Inspector Rajesh Kumar (Assigned)",
      inspectorId: "LMO-DL-042",
      sealNumber: "PENDING-STAMP",
      sealIntact: true,
      qrToken: "sha256:pending_inspection_verification_slot_booked",
      geotagLocation: "28.5244° N, 77.2177° E (Saket Hub)",
      stampingFee: 1200,
      lastTestReport: "Application #REQ-2026-8891A (Scheduled for Tomorrow 11:30 AM)",
      history: [
        { date: "24 Aug 2026", event: "Re-Verification Appointment Booked", officer: "Assigned: Insp. Rajesh Kumar", remarks: "On-site visit confirmed. Government fee ₹1,200 paid.", certId: "REQ-2026-8891A" }
      ]
    },
  ],
  sharma: [
    {
      id: "IN-MET-2026-7712",
      certId: "CERT-LM-2026-44182",
      name: "Tabletop Stainless Sweet Counter Weighing Scale",
      category: "Non-Automatic Electronic Weighing Instrument",
      model: "Crown Electronics CR-30K",
      brand: "Crown Scales",
      serialNumber: "CR-2024-884102",
      accuracyClass: "Class III (Medium Accuracy)",
      maxCapacity: "30.00 kg",
      minCapacity: "100 g",
      verificationInterval: "e = 5 g",
      tacApprovalNo: "IND/05/2021/309",
      branch: "Karol Bagh Main Shop",
      departmentLocation: "Sweets & Bengali Mithai Counter",
      verifiedAt: "12 Mar 2026",
      validUntil: "11 Mar 2027",
      daysRemaining: 196,
      status: "VALID",
      inspectorName: "Officer Suresh Meena",
      inspectorId: "LMO-DL-019",
      sealNumber: "SEAL-DL-552019",
      sealIntact: true,
      qrToken: "sha256:9988112233445566778899aabbccddeeff00112233445566778899aabbccddeeff",
      geotagLocation: "28.6517° N, 77.1906° E (Karol Bagh)",
      stampingFee: 400,
      lastTestReport: "TR-DEL-2026-7712 (Sensitivity & Corner Load Passed)",
      history: [
        { date: "12 Mar 2026", event: "Annual Stamping", officer: "Officer Suresh Meena", remarks: "Stamped with 2026 Q1 emblem seal.", certId: "CERT-LM-2026-44182" }
      ]
    },
    {
      id: "IN-MET-2026-7713",
      certId: "CERT-LM-2025-33901",
      name: "Brass Standard Cylindrical Weights Set (100g to 2kg)",
      category: "Weights & Measures Standard (Class M2)",
      model: "Standard Hexagonal Cast Brass Series",
      brand: "National Standard Weights",
      serialNumber: "SET-BR-2023-99",
      accuracyClass: "Class M2 Commercial Standard",
      maxCapacity: "2.00 kg",
      minCapacity: "100 g",
      verificationInterval: "M2 Tolerance ±30 mg",
      tacApprovalNo: "IND/01/2019/004",
      branch: "Karol Bagh Main Shop",
      departmentLocation: "Backup Manual Balance Display",
      verifiedAt: "05 Sep 2025",
      validUntil: "04 Sep 2026",
      daysRemaining: 8,
      status: "EXPIRING_SOON",
      inspectorName: "Officer Suresh Meena",
      inspectorId: "LMO-DL-019",
      sealNumber: "SEAL-DL-552020",
      sealIntact: true,
      qrToken: "sha256:77889900112233445566778899aabbccddeeff00112233445566778899aabbcc",
      geotagLocation: "28.6517° N, 77.1906° E",
      stampingFee: 200,
      lastTestReport: "TR-DEL-2025-3390 (M2 tolerance verification)",
      history: [
        { date: "05 Sep 2025", event: "Biennial Weights Verification", officer: "Officer Suresh Meena", remarks: "Lead plug cavity stamped with state seal.", certId: "CERT-LM-2025-33901" }
      ]
    }
  ],
  hpcl: [
    {
      id: "IN-MET-2025-1049",
      certId: "CERT-LM-2025-41002",
      name: "Multi-Product Fuel Dispenser (Petrol / Speed)",
      category: "Liquid Fuel Measuring & Dispensing Unit",
      model: "Tokheim Quantium 510 D-4",
      brand: "Tokheim Dover",
      serialNumber: "TK-DUAL-991244",
      accuracyClass: "Class 0.5 (±0.3% Volumetric MPE)",
      maxCapacity: "80.00 L/min",
      minCapacity: "2.0 L/min",
      verificationInterval: "e = 10 mL",
      tacApprovalNo: "IND/07/2021/712",
      branch: "Highway Dispensing Forecourt",
      departmentLocation: "Island #02, Nozzles 1 & 2 (Motor Spirit)",
      verifiedAt: "10 Aug 2025",
      validUntil: "09 Aug 2026",
      daysRemaining: -18,
      status: "EXPIRED",
      inspectorName: "Officer Priya Sharma",
      inspectorId: "LMO-DL-088",
      sealNumber: "SEAL-DL-881920",
      sealIntact: false,
      qrToken: "sha256:fuel_dispenser_expired_tokheim_41002",
      geotagLocation: "28.4982° N, 77.3012° E (Mathura Road Outlet)",
      stampingFee: 2500,
      lastTestReport: "TR-DEL-2025-4100 (Volumetric 5L & 20L check passed)",
      history: [
        { date: "10 Aug 2025", event: "Annual Meter Calibration & Stamping", officer: "Officer Priya Sharma", remarks: "Pulsar pulse count calibrated with standard 20L copper measure.", certId: "CERT-LM-2025-41002" }
      ]
    },
    {
      id: "IN-MET-2026-1050",
      certId: "CERT-LM-2026-66201",
      name: "Commercial Diesel High-Flow Dispensing Unit",
      category: "Liquid Fuel Measuring & Dispensing Unit",
      model: "Gilbarco Veeder-Root Horizon Pro",
      brand: "Gilbarco Veeder-Root",
      serialNumber: "GV-HPRO-881029",
      accuracyClass: "Class 0.5 (±0.3% Volumetric MPE)",
      maxCapacity: "120.00 L/min",
      minCapacity: "5.0 L/min",
      verificationInterval: "e = 10 mL",
      tacApprovalNo: "IND/03/2022/190",
      branch: "Highway Dispensing Forecourt",
      departmentLocation: "Island #04, Heavy Truck Diesel Bay",
      verifiedAt: "18 Apr 2026",
      validUntil: "17 Apr 2027",
      daysRemaining: 233,
      status: "VALID",
      inspectorName: "Officer Priya Sharma",
      inspectorId: "LMO-DL-088",
      sealNumber: "SEAL-DL-881921",
      sealIntact: true,
      qrToken: "sha256:gilbarco_hpro_valid_dispenser_66201",
      geotagLocation: "28.4982° N, 77.3012° E",
      stampingFee: 2500,
      lastTestReport: "TR-DEL-2026-6620 (High flow rate test 120 L/min verified)",
      history: [
        { date: "18 Apr 2026", event: "Annual Calibration & Stamping", officer: "Officer Priya Sharma", remarks: "Totalizer readings recorded and wire lead seal locked.", certId: "CERT-LM-2026-66201" }
      ]
    }
  ],
  tanishq: [
    {
      id: "IN-MET-2026-3301",
      certId: "CERT-LM-2026-10928",
      name: "Ultra-Micro Balance for Gold & Bullion Valuation",
      category: "High Precision Micro Weighing Instrument",
      model: "Sartorius Cubis II Ultra-Micro",
      brand: "Sartorius AG",
      serialNumber: "SAR-CUB-2024-91",
      accuracyClass: "Class I (Special Accuracy / Micro)",
      maxCapacity: "2.100000 kg",
      minCapacity: "1 mg",
      verificationInterval: "e = 1 mg (d = 0.1 mg)",
      tacApprovalNo: "IND/12/2022/990",
      branch: "Gold & Diamond Floor",
      departmentLocation: "Main Hallmark Gold Billing Desk #01",
      verifiedAt: "10 Feb 2026",
      validUntil: "09 Feb 2027",
      daysRemaining: 166,
      status: "VALID",
      inspectorName: "Inspector Rajesh Kumar",
      inspectorId: "LMO-DL-042",
      sealNumber: "SEAL-DL-994033",
      sealIntact: true,
      qrToken: "sha256:sartorius_class1_special_accuracy_10928",
      geotagLocation: "28.5714° N, 77.2210° E (South Ext-I)",
      stampingFee: 1500,
      lastTestReport: "TR-DEL-2026-3301 (E2 Class calibrated reference weights used)",
      history: [
        { date: "10 Feb 2026", event: "Annual Precision Re-Verification", officer: "Inspector Rajesh Kumar", remarks: "Tested with E2 class standard weights. Draft shield seal applied.", certId: "CERT-LM-2026-10928" }
      ]
    }
  ],
  omlogistics: [
    {
      id: "IN-MET-2026-5501",
      certId: "CERT-LM-2026-77810",
      name: "100-Tonne Electronic Heavy Road Weighbridge",
      category: "Heavy Automatic / Non-Automatic Weighbridge",
      model: "Leotronic Pitless Modular 100T",
      brand: "Leotronic Scales",
      serialNumber: "LEO-100T-2023-41",
      accuracyClass: "Class IIII (Ordinary Accuracy - Industrial)",
      maxCapacity: "100,000.00 kg (100 MT)",
      minCapacity: "400 kg",
      verificationInterval: "e = 20 kg",
      tacApprovalNo: "IND/06/2021/502",
      branch: "100MT Heavy Weighbridge Gate 1",
      departmentLocation: "Entry Gate Weighbridge Bay #01",
      verifiedAt: "01 Jun 2026",
      validUntil: "31 May 2027",
      daysRemaining: 277,
      status: "VALID",
      inspectorName: "Inspector V. K. Aggarwal",
      inspectorId: "LMO-DL-007",
      sealNumber: "SEAL-DL-441092",
      sealIntact: true,
      qrToken: "sha256:weighbridge_100t_leotronic_77810",
      geotagLocation: "28.5355° N, 77.2732° E (Okhla Phase-II)",
      stampingFee: 6000,
      lastTestReport: "TR-DEL-2026-5501 (Mobile verification truck with 20MT test block weights)",
      history: [
        { date: "01 Jun 2026", event: "Annual Weighbridge Stamping", officer: "Inspector V. K. Aggarwal", remarks: "Full capacity corner load test passed up to 100 MT.", certId: "CERT-LM-2026-77810" }
      ]
    }
  ]
};

// Applications data
export interface VerificationApplication {
  id: string;
  applicationDate: string;
  instrumentsCount: number;
  instrumentIds: string[];
  type: "PERIODIC_REVERIFICATION" | "NEW_REGISTRATION" | "EMERGENCY_RESEALING";
  stage: "SUBMITTED" | "FEE_PAID" | "OFFICER_ASSIGNED" | "SCHEDULED" | "COMPLETED";
  scheduledDate: string;
  scheduledSlot: string;
  assignedOfficer: string;
  officerContact: string;
  totalFee: number;
  paymentRef: string;
  paymentMode: string;
  statusLabel: string;
}

const INITIAL_APPLICATIONS: VerificationApplication[] = [
  {
    id: "REQ-2026-8891A",
    applicationDate: "24 Aug 2026",
    instrumentsCount: 1,
    instrumentIds: ["IN-MET-2026-8945"],
    type: "PERIODIC_REVERIFICATION",
    stage: "SCHEDULED",
    scheduledDate: "28 Aug 2026",
    scheduledSlot: "11:30 AM - 01:00 PM",
    assignedOfficer: "Inspector Rajesh Kumar (LMO-DL-042)",
    officerContact: "+91 98102 33411",
    totalFee: 1200,
    paymentRef: "GRN-DL-2026-88410294",
    paymentMode: "UPI (SBI Treasury Portal)",
    statusLabel: "Inspector Visit Scheduled"
  },
  {
    id: "REQ-2026-7704B",
    applicationDate: "15 Jul 2026",
    instrumentsCount: 2,
    instrumentIds: ["IN-MET-2026-8941", "IN-MET-2026-8944"],
    type: "PERIODIC_REVERIFICATION",
    stage: "COMPLETED",
    scheduledDate: "18 Jul 2026",
    scheduledSlot: "02:00 PM - 03:30 PM",
    assignedOfficer: "Inspector Rajesh Kumar (LMO-DL-042)",
    officerContact: "+91 98102 33411",
    totalFee: 1000,
    paymentRef: "GRN-DL-2026-55102931",
    paymentMode: "Net Banking (HDFC e-Treasury)",
    statusLabel: "Certificates Issued & Verified"
  }
];

export function TraderPortalView({ onBackToHome }: { onBackToHome?: () => void } = {}) {
  // Active Registered Trader Profile
  const [activeProfileId] = useState<BusinessProfileId>("apex");

  // Selected Branch Filter
  const [selectedBranch, setSelectedBranch] = useState<string>("ALL");

  // Navigation tab
  const [currentTab, setCurrentTab] = useState<
    | "overview"
    | "instruments"
    | "register"
    | "booking"
    | "applications"
    | "certificates"
    | "emergency_seal"
    | "fee_schedule"
    | "helpdesk"
    | "profile"
  >("overview");

  // Instruments state
  const [instrumentsMap, setInstrumentsMap] = useState<Record<BusinessProfileId, InstrumentItem[]>>(INITIAL_INSTRUMENTS);
  const currentInstruments = useMemo(() => instrumentsMap[activeProfileId] || [], [instrumentsMap, activeProfileId]);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Applications state
  const [applications, setApplications] = useState<VerificationApplication[]>(INITIAL_APPLICATIONS);

  // Selected Instrument for Passport Modal
  const [selectedPassportInstrument, setSelectedPassportInstrument] = useState<InstrumentItem | null>(null);

  // QR Modal
  const [qrModalInstrument, setQrModalInstrument] = useState<InstrumentItem | null>(null);
  const [isQrCopied, setIsQrCopied] = useState(false);

  // Registration Wizard State
  const [regStep, setRegStep] = useState(1);
  const [regFormData, setRegFormData] = useState({
    name: "",
    category: "Non-Automatic Electronic Weighing Instrument",
    brand: "",
    model: "",
    serialNumber: "",
    accuracyClass: "Class III (Medium Accuracy)",
    maxCapacity: "",
    minCapacity: "",
    verificationInterval: "",
    tacApprovalNo: "",
    branch: "",
    departmentLocation: "",
    verificationType: "ON_SITE_PREMISES",
    manufacturer: "",
    invoiceNo: "",
    invoiceDate: "2026-08-15",
  });
  const [isRegSuccessModal, setIsRegSuccessModal] = useState(false);
  const [newlyRegisteredId, setNewlyRegisteredId] = useState<string>("");

  // Booking Flow State
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedBookingInstrumentIds, setSelectedBookingInstrumentIds] = useState<string[]>([]);
  const [bookingMode, setBookingMode] = useState<"ON_SITE" | "GATC_LAB">("ON_SITE");
  const [bookingDate, setBookingDate] = useState("2026-08-31");
  const [bookingSlot, setBookingSlot] = useState("10:00 AM - 12:00 PM");
  const [bookingPaymentMethod, setBookingPaymentMethod] = useState<"UPI" | "NETBANKING" | "CHALLAN">("UPI");
  const [isBookingSuccessModal, setIsBookingSuccessModal] = useState(false);
  const [lastCreatedApplication, setLastCreatedApplication] = useState<VerificationApplication | null>(null);

  // Emergency Seal Form State
  const [sealReportFormData, setSealReportFormData] = useState({
    instrumentId: "",
    reason: "ACCIDENTAL_PHYSICAL_DAMAGE",
    description: "",
    occurredAt: "2026-08-27",
    preventiveAction: "Machine isolated from billing counter immediately.",
  });
  const [isSealReportSubmitted, setIsSealReportSubmitted] = useState(false);

  // Active Business Data
  const currentProfile = DEMO_PROFILES[activeProfileId];

  // Derived Metrics / Telemetry
  const telemetry = useMemo(() => {
    const total = currentInstruments.length;
    const valid = currentInstruments.filter((i) => i.status === "VALID").length;
    const expiring = currentInstruments.filter((i) => i.status === "EXPIRING_SOON").length;
    const expired = currentInstruments.filter((i) => i.status === "EXPIRED").length;
    const underInspection = currentInstruments.filter((i) => i.status === "UNDER_INSPECTION").length;
    const complianceRate = total > 0 ? Math.round((valid / total) * 100) : 100;

    return { total, valid, expiring, expired, underInspection, complianceRate };
  }, [currentInstruments]);

  // Filtered Instruments List
  const filteredInstruments = useMemo(() => {
    return currentInstruments.filter((item) => {
      // Branch filter
      if (selectedBranch !== "ALL" && item.branch !== selectedBranch) return false;

      // Status filter
      if (statusFilter !== "ALL" && item.status !== statusFilter) return false;

      // Category filter
      if (categoryFilter !== "ALL" && item.category !== categoryFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesId = item.id.toLowerCase().includes(query);
        const matchesCert = item.certId.toLowerCase().includes(query);
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSerial = item.serialNumber.toLowerCase().includes(query);
        const matchesModel = item.model.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesLoc = item.departmentLocation.toLowerCase().includes(query);
        return matchesId || matchesCert || matchesName || matchesSerial || matchesModel || matchesBrand || matchesLoc;
      }

      return true;
    });
  }, [currentInstruments, selectedBranch, statusFilter, categoryFilter, searchQuery]);

  // Distinct categories for filter dropdown
  const availableCategories = useMemo(() => {
    const set = new Set(currentInstruments.map((i) => i.category));
    return Array.from(set);
  }, [currentInstruments]);


  // Handle New Registration Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `IN-MET-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInstrument: InstrumentItem = {
      id: generatedId,
      certId: `CERT-PENDING-${Math.floor(10000 + Math.random() * 90000)}`,
      name: regFormData.name || `${regFormData.brand} ${regFormData.model} Scale`,
      category: regFormData.category,
      model: regFormData.model || "Custom Industrial Scale",
      brand: regFormData.brand || "Authorized Manufacturer",
      serialNumber: regFormData.serialNumber || `SN-${Math.floor(100000 + Math.random() * 900000)}`,
      accuracyClass: regFormData.accuracyClass,
      maxCapacity: regFormData.maxCapacity || "30.00 kg",
      minCapacity: regFormData.minCapacity || "100 g",
      verificationInterval: regFormData.verificationInterval || "e = 5 g",
      tacApprovalNo: regFormData.tacApprovalNo || "IND/08/2026/910",
      branch: regFormData.branch || currentProfile.branches[0],
      departmentLocation: regFormData.departmentLocation || "Store Counter",
      verifiedAt: "Pending Initial Stamping",
      validUntil: "Upon Verification Stamping",
      daysRemaining: 0,
      status: "UNDER_INSPECTION",
      inspectorName: "To be Assigned by Zonal LMO",
      inspectorId: "LMO-ASSIGNING",
      sealNumber: "NEW-APPLICATION",
      sealIntact: true,
      qrToken: `sha256:new_registered_${generatedId}_token`,
      geotagLocation: currentProfile.address,
      stampingFee: 500,
      lastTestReport: "New Registration Form Submitted",
      history: [
        {
          date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          event: "New Instrument Registered on DigiPass Portal",
          officer: "Self-Registered by Merchant",
          remarks: "Initial Stamping Slot created under Form-LM-01.",
          certId: "REG-APPLICATION"
        }
      ]
    };

    setInstrumentsMap((prev) => ({
      ...prev,
      [activeProfileId]: [newInstrument, ...prev[activeProfileId]]
    }));

    setNewlyRegisteredId(generatedId);
    setIsRegSuccessModal(true);
    setRegStep(1);
  };

  // Handle Re-Verification Booking Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBookingInstrumentIds.length === 0) {
      alert("Please select at least one instrument to book for verification.");
      return;
    }

    const calculatedFee = selectedBookingInstrumentIds.reduce((sum, id) => {
      const inst = currentInstruments.find((i) => i.id === id);
      return sum + (inst ? inst.stampingFee : 450);
    }, 0);

    const newAppId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}B`;
    const newApp: VerificationApplication = {
      id: newAppId,
      applicationDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      instrumentsCount: selectedBookingInstrumentIds.length,
      instrumentIds: [...selectedBookingInstrumentIds],
      type: "PERIODIC_REVERIFICATION",
      stage: "SCHEDULED",
      scheduledDate: bookingDate,
      scheduledSlot: bookingSlot,
      assignedOfficer: "Inspector Rajesh Kumar (LMO-DL-042)",
      officerContact: "+91 98102 33411",
      totalFee: calculatedFee,
      paymentRef: `GRN-DL-2026-${Math.floor(10000000 + Math.random() * 90000000)}`,
      paymentMode: bookingPaymentMethod === "UPI" ? "Instant UPI (Govt BharatQR)" : bookingPaymentMethod === "NETBANKING" ? "Net Banking (e-Treasury Portal)" : "Treasury Challan (State Bank)",
      statusLabel: "Slot Confirmed & LMO Dispatched"
    };

    // Update instrument status to UNDER_INSPECTION
    setInstrumentsMap((prev) => {
      const updatedList = prev[activeProfileId].map((inst) => {
        if (selectedBookingInstrumentIds.includes(inst.id)) {
          return {
            ...inst,
            status: "UNDER_INSPECTION" as InstrumentStatus,
            history: [
              {
                date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
                event: `Re-Verification Booked (${newAppId})`,
                officer: "Inspector Rajesh Kumar (Assigned)",
                remarks: `Scheduled for ${bookingDate} (${bookingSlot}). Fee: ₹${calculatedFee} paid.`,
                certId: newAppId
              },
              ...inst.history
            ]
          };
        }
        return inst;
      });
      return { ...prev, [activeProfileId]: updatedList };
    });

    setApplications((prev) => [newApp, ...prev]);
    setLastCreatedApplication(newApp);
    setIsBookingSuccessModal(true);
    setSelectedBookingInstrumentIds([]);
    setBookingStep(1);
  };

  // Handle Emergency Seal Report Submit
  const handleSealReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sealReportFormData.instrumentId) {
      alert("Please select the instrument with the damaged or broken seal.");
      return;
    }

    // Mark seal as broken in instruments map
    setInstrumentsMap((prev) => {
      const updatedList = prev[activeProfileId].map((inst) => {
        if (inst.id === sealReportFormData.instrumentId) {
          return {
            ...inst,
            sealIntact: false,
            status: "UNDER_INSPECTION" as InstrumentStatus,
            history: [
              {
                date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
                event: "Emergency Damaged Seal Intimation Filed (Section 25 Compliance)",
                officer: "Self-Reported by Merchant",
                remarks: `Reason: ${sealReportFormData.reason}. Remarks: ${sealReportFormData.description || "Seal damaged during handling"}. Immediate re-stamping slot requested.`,
                certId: `EMERGENCY-SEAL-INTIMATION`
              },
              ...inst.history
            ]
          };
        }
        return inst;
      });
      return { ...prev, [activeProfileId]: updatedList };
    });

    setIsSealReportSubmitted(true);
  };

  const copyQrLink = (text: string) => {
    navigator.clipboard?.writeText(text);
    setIsQrCopied(true);
    setTimeout(() => setIsQrCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F9FAFB] text-slate-900 font-sans selection:bg-[#1A56DB] selection:text-white">
      {/* ========================================================================= */}
      {/* DESKTOP SIDEBAR NAVIGATION                                               */}
      {/* ========================================================================= */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0 z-40 p-4 gap-2 flex-shrink-0 select-none">
        {/* Top Logo & App Identity */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          {onBackToHome ? (
            <button onClick={onBackToHome} className="flex items-center gap-2.5 group text-left">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white p-0.5 flex-shrink-0">
                <Image src="/logo.jpg" alt="DigiPass" fill className="object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl font-mono text-slate-950 tracking-tight">
                    Digi<span className="text-[#1A56DB]">Pass</span>
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Merchant Portal
                </span>
              </div>
            </button>
          ) : (
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white p-0.5 flex-shrink-0">
                <Image src="/logo.jpg" alt="DigiPass" fill className="object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl font-mono text-slate-950 tracking-tight">
                    Digi<span className="text-[#1A56DB]">Pass</span>
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Merchant Portal
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Registered Trader Entity Card (Clickable to open profile) */}
        <div
          onClick={() => setCurrentTab("profile")}
          className="bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-2xl p-3.5 mt-2 flex flex-col gap-2 shadow-xs cursor-pointer transition-all group"
          title="Click to view full Business Profile & Legal Metrology Dossier"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1A56DB] shrink-0 group-hover:scale-105 transition-transform">
              <currentProfile.icon className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-xs text-slate-900 truncate group-hover:text-[#1A56DB] transition-colors" title={currentProfile.name}>
                {currentProfile.name}
              </h4>
              <p className="text-[10px] text-slate-500 font-mono truncate">
                GSTIN: {currentProfile.gstin}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
            <span className="text-slate-500 font-medium truncate max-w-[110px]">{currentProfile.categoryType}</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px] shrink-0">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Trader
            </span>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto mt-2 text-xs font-medium pr-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
            Main Operations
          </span>

          <button
            onClick={() => setCurrentTab("overview")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
              currentTab === "overview"
                ? "bg-[#1A56DB] text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setCurrentTab("instruments")}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
              currentTab === "instruments"
                ? "bg-[#1A56DB] text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-3">
              <Scale className="w-4 h-4" />
              <span>My Instruments</span>
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                currentTab === "instruments" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              {currentInstruments.length}
            </span>
          </button>

          <button
            onClick={() => setCurrentTab("booking")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
              currentTab === "booking"
                ? "bg-[#1A56DB] text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book Re-Verification</span>
          </button>

          <button
            onClick={() => setCurrentTab("register")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
              currentTab === "register"
                ? "bg-[#1A56DB] text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Register New Scale</span>
          </button>

          <button
            onClick={() => setCurrentTab("applications")}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
              currentTab === "applications"
                ? "bg-[#1A56DB] text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-3">
              <Clock className="w-4 h-4" />
              <span>Active Applications</span>
            </span>
            {applications.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#1A56DB] ring-4 ring-blue-100" />
            )}
          </button>

          <button
            onClick={() => setCurrentTab("certificates")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
              currentTab === "certificates"
                ? "bg-[#1A56DB] text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>e-Certificates Vault</span>
          </button>

          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1">
            Compliance & Support
          </span>

          <button
            onClick={() => setCurrentTab("profile")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
              currentTab === "profile"
                ? "bg-[#1A56DB] text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Business Profile</span>
          </button>

          <button
            onClick={() => setCurrentTab("emergency_seal")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
              currentTab === "emergency_seal"
                ? "bg-[#E02424] text-white font-bold shadow-sm"
                : "text-red-700 hover:bg-red-50"
            }`}
          >
            <FileWarning className="w-4 h-4 text-red-600" />
            <span>Report Damaged Seal</span>
          </button>

          <button
            onClick={() => setCurrentTab("fee_schedule")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
              currentTab === "fee_schedule"
                ? "bg-[#1A56DB] text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Legal Metrology Fees</span>
          </button>

          <button
            onClick={() => setCurrentTab("helpdesk")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
              currentTab === "helpdesk"
                ? "bg-[#1A56DB] text-white font-bold shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Official Helpdesk</span>
          </button>
        </nav>

        {/* Footer info & Logout */}
        <div className="pt-3 border-t border-slate-200 flex flex-col gap-1.5 text-xs text-slate-500">
          <div className="flex items-center justify-between px-2 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Portal Active
            </span>
            <span className="font-mono text-slate-400">DoCA e-Maapak</span>
          </div>
          {onBackToHome ? (
            <button
              onClick={onBackToHome}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1A56DB] rounded-xl font-semibold transition-colors"
            >
              <span>Back to Main Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <Link
              href="/"
              className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors"
            >
              <span>Exit to Public Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA                                                         */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between transition-all shadow-2xs">
          {/* Left Title / Branch Selector */}
          <div className="flex items-center gap-4">
            <div className="md:hidden flex items-center gap-2">
              {onBackToHome ? (
                <button onClick={onBackToHome} className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200">
                  <Image src="/logo.jpg" alt="DigiPass" fill className="object-contain" />
                </button>
              ) : (
                <Link href="/" className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200">
                  <Image src="/logo.jpg" alt="DigiPass" fill className="object-contain" />
                </Link>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-extrabold text-base sm:text-lg text-slate-950 tracking-tight">
                  {currentProfile.name}
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  {currentProfile.categoryType}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono hidden sm:block">
                GSTIN: {currentProfile.gstin} • Zone: {currentProfile.zone}
              </p>
            </div>
          </div>

          {/* Branch Filter & Quick Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Branch Selector Dropdown */}
            <div className="hidden lg:flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="font-semibold text-slate-500">Branch:</span>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer pr-1"
              >
                <option value="ALL">All Branches ({currentInstruments.length})</option>
                {currentProfile.branches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Action Button: Register */}
            <button
              onClick={() => setCurrentTab("register")}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1A56DB] hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Register Scale</span>
            </button>


          </div>
        </header>

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden flex items-center overflow-x-auto bg-white border-b border-slate-200 px-4 py-2 gap-1.5 scrollbar-none text-xs">
          {[
            { id: "overview", label: "Dashboard", icon: LayoutDashboard },
            { id: "profile", label: "Profile", icon: UserCheck },
            { id: "instruments", label: "Instruments", icon: Scale },
            { id: "booking", label: "Book Inspector", icon: CalendarCheck },
            { id: "register", label: "Register New", icon: Plus },
            { id: "applications", label: "Applications", icon: Clock },
            { id: "certificates", label: "Certificates", icon: Award },
            { id: "emergency_seal", label: "Damaged Seal", icon: FileWarning },
            { id: "fee_schedule", label: "Fees", icon: Calculator },
            { id: "helpdesk", label: "Helpdesk", icon: HelpCircle },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold transition-all ${
                  isActive
                    ? "bg-[#1A56DB] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Body Content Scroll Area */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* ========================================================================= */}
          {/* TAB 1: DASHBOARD OVERVIEW                                                */}
          {/* ========================================================================= */}
          {currentTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Urgent Action Alert Banner (if any expired or expiring soon) */}
              {(telemetry.expiring > 0 || telemetry.expired > 0) && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm relative overflow-hidden">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-[#C27803] flex-shrink-0 mt-0.5">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-amber-950 text-sm flex items-center gap-2">
                        <span>Action Required: Mandatory Metrological Re-Verification Due</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-200 text-amber-900">
                          {telemetry.expiring + telemetry.expired} Scale(s) Affected
                        </span>
                      </h4>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        Under Legal Metrology Rules, instruments must be verified before expiry to avoid commercial trade penalties under Section 25.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setStatusFilter("EXPIRING_SOON");
                        setCurrentTab("instruments");
                      }}
                      className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-amber-950 hover:bg-amber-100 text-xs font-bold transition-all shadow-2xs"
                    >
                      View Expiring ({telemetry.expiring})
                    </button>
                    <button
                      onClick={() => {
                        // Preselect expiring instruments
                        const expiringIds = currentInstruments
                          .filter((i) => i.status === "EXPIRING_SOON" || i.status === "EXPIRED")
                          .map((i) => i.id);
                        setSelectedBookingInstrumentIds(expiringIds);
                        setCurrentTab("booking");
                      }}
                      className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#C27803] hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>Instant Re-Verify Now</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Bento Grid: Telemetry Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Stat 1: Total Instruments */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                    <span>Total Scales & Measures</span>
                    <Scale className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums tracking-tight">
                      {telemetry.total}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">In active store registry</p>
                  </div>
                </div>

                {/* Stat 2: Valid & Certified */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                    <span>Valid & Certified</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl sm:text-3xl font-bold text-emerald-600 font-mono tabular-nums tracking-tight">
                      {telemetry.valid}
                    </span>
                    <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                      {telemetry.complianceRate}% Compliance Score
                    </p>
                  </div>
                </div>

                {/* Stat 3: Expiring Soon */}
                <div
                  onClick={() => {
                    setStatusFilter("EXPIRING_SOON");
                    setCurrentTab("instruments");
                  }}
                  className="bg-white p-5 rounded-2xl border border-amber-200 hover:border-amber-300 cursor-pointer shadow-card flex flex-col justify-between transition-all"
                >
                  <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                    <span className="text-amber-800">Expiring &lt; 30 Days</span>
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl sm:text-3xl font-bold text-amber-600 font-mono tabular-nums tracking-tight">
                      {telemetry.expiring}
                    </span>
                    <p className="text-[11px] text-amber-700 font-semibold mt-1 flex items-center gap-1">
                      <span>Click to resolve</span>
                      <ArrowRight className="w-3 h-3" />
                    </p>
                  </div>
                </div>

                {/* Stat 4: Re-verification Pending / Active Inspections */}
                <div
                  onClick={() => setCurrentTab("applications")}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 cursor-pointer shadow-card flex flex-col justify-between transition-all"
                >
                  <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                    <span>Inspections Scheduled</span>
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl sm:text-3xl font-bold text-blue-700 font-mono tabular-nums tracking-tight">
                      {applications.filter((a) => a.stage !== "COMPLETED").length}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">Active field bookings</p>
                  </div>
                </div>

                {/* Stat 5: Digital Certificates */}
                <div
                  onClick={() => setCurrentTab("certificates")}
                  className="col-span-2 lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 hover:border-purple-300 cursor-pointer shadow-card flex flex-col justify-between transition-all"
                >
                  <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                    <span>e-Certificates Vault</span>
                    <Award className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl sm:text-3xl font-bold text-purple-700 font-mono tabular-nums tracking-tight">
                      {telemetry.valid}
                    </span>
                    <p className="text-[11px] text-purple-700 font-semibold mt-1 flex items-center gap-1">
                      <span>Instant QR Download</span>
                      <ArrowRight className="w-3 h-3" />
                    </p>
                  </div>
                </div>
              </div>

              {/* Main 2-Column Split: Active Applications Stepper & Quick Action Hub */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Real-time Application Pipeline (Spans 8) */}
                <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1A56DB] flex items-center justify-center">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-slate-900">
                            Active Stamping Application Pipeline
                          </h3>
                          <p className="text-xs text-slate-500 font-mono">
                            Application: {applications[0]?.id || "REQ-2026-8891A"} • {applications[0]?.type.replace(/_/g, " ")}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setCurrentTab("applications")}
                        className="text-xs font-bold text-[#1A56DB] hover:underline flex items-center gap-1"
                      >
                        <span>View All ({applications.length})</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Stepper Pipeline */}
                    <div className="py-4">
                      <div className="relative flex w-full pt-2 pb-2">
                        {/* Line track */}
                        <div className="absolute top-[24px] left-[10%] w-[80%] h-1 bg-slate-100 rounded-full" />
                        <div className="absolute top-[24px] left-[10%] w-[40%] h-1 bg-[#1A56DB] rounded-full transition-all duration-700" />

                        {/* 5 Steps */}
                        {[
                          { label: "Request Submitted", sub: "Form-LM-01", done: true, current: false },
                          { label: "Fee Paid", sub: "Verified", done: true, current: false },
                          { label: "LMO Assigned", sub: "Slot Booked", done: true, current: false },
                          { label: "Field Visit", sub: "Tomorrow 11:30", done: false, current: true },
                          { label: "e-Cert Issued", sub: "QR Stamping", done: false, current: false },
                        ].map((step, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center text-center z-10 relative">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2 mb-2 ${
                                step.done
                                  ? "bg-[#1A56DB] border-[#1A56DB] text-white shadow-xs"
                                  : step.current
                                  ? "bg-white border-[#1A56DB] text-[#1A56DB] ring-4 ring-blue-100 font-extrabold"
                                  : "bg-slate-100 border-slate-200 text-slate-400"
                              }`}
                            >
                              {step.done ? <Check className="w-4 h-4" /> : idx + 1}
                            </div>
                            <div className="px-1 flex flex-col items-center">
                              <span
                                className={`text-[10px] sm:text-[11px] font-bold block leading-tight ${
                                  step.current
                                    ? "text-[#1A56DB]"
                                    : step.done
                                    ? "text-slate-900"
                                    : "text-slate-400"
                                }`}
                              >
                                {step.label}
                              </span>
                              <span className="text-[9px] sm:text-[10px] text-slate-400 block mt-0.5 font-mono leading-tight whitespace-nowrap">
                                {step.sub}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Scheduled Officer Card */}
                  <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold flex items-center justify-center text-xs">
                        RK
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">
                            Inspector Rajesh Kumar
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                            Assigned LMO
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Badge ID: LMO-DL-042 • Central Legal Metrology Division
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <a
                        href="tel:+919810233411"
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                        <span>Call Officer</span>
                      </a>
                      <button
                        onClick={() => setCurrentTab("applications")}
                        className="px-3 py-1.5 rounded-xl bg-[#1A56DB] text-white hover:bg-blue-700 font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <span>Reschedule / Details</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Quick Action Center (Spans 4) */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>Quick Actions</span>
                    </h3>

                    <div className="space-y-2.5">
                      <button
                        onClick={() => setCurrentTab("booking")}
                        className="w-full p-3 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group flex items-center gap-3.5"
                      >
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <CalendarCheck className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                            Book Stamping Inspector
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate">
                            Schedule on-site or lab verification visit
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                      </button>

                      <button
                        onClick={() => setCurrentTab("register")}
                        className="w-full p-3 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 text-left transition-all group flex items-center gap-3.5"
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1A56DB] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <Plus className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-xs text-slate-900 group-hover:text-blue-800">
                            Register New Instrument
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate">
                            Add scale to Digital Passport registry
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                      </button>

                      <button
                        onClick={() => setCurrentTab("certificates")}
                        className="w-full p-3 rounded-2xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/40 text-left transition-all group flex items-center gap-3.5"
                      >
                        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <Download className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-xs text-slate-900 group-hover:text-purple-800">
                            Download e-Certificates
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate">
                            Batch export official certificates & QR
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
                      </button>

                      <button
                        onClick={() => setCurrentTab("emergency_seal")}
                        className="w-full p-3 rounded-2xl border border-red-200 hover:border-red-500 hover:bg-red-50/40 text-left transition-all group flex items-center gap-3.5"
                      >
                        <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <FileWarning className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-xs text-red-700">
                            Report Damaged / Broken Seal
                          </h4>
                          <p className="text-[11px] text-red-600 truncate">
                            Immediate immunity intimation form
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-red-400 group-hover:text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                    <a
                      href="#help"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentTab("helpdesk");
                      }}
                      className="text-[11px] text-slate-500 hover:text-blue-600 font-semibold"
                    >
                      Need assistance? Contact Metrology Helpline 1800-11-4000
                    </a>
                  </div>
                </div>
              </div>

              {/* Recent Verification Activity Feed / Fast Inventory Preview */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      Registered Weighing & Measuring Instruments
                    </h3>
                    <p className="text-xs text-slate-500">
                      Live status of all verified instruments registered under {currentProfile.name}
                    </p>
                  </div>

                  <button
                    onClick={() => setCurrentTab("instruments")}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <span>Full Inventory Table</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Instruments Quick Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentInstruments.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all bg-slate-50/50 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {item.id}
                          </span>
                          {item.status === "VALID" && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3 h-3" /> VALID
                            </span>
                          )}
                          {item.status === "EXPIRING_SOON" && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                              <AlertTriangle className="w-3 h-3" /> EXPIRING ({item.daysRemaining}d)
                            </span>
                          )}
                          {item.status === "EXPIRED" && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                              <XCircle className="w-3 h-3" /> EXPIRED
                            </span>
                          )}
                          {item.status === "UNDER_INSPECTION" && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                              <Clock className="w-3 h-3" /> INSPECTION BOOKED
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{item.name}</h4>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {item.brand} • {item.model}
                        </p>

                        <div className="mt-3 pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-[11px]">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Capacity</span>
                            <span className="font-semibold text-slate-800">{item.maxCapacity}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Valid Until</span>
                            <span className="font-semibold text-slate-800 font-mono">
                              {item.validUntil}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setSelectedPassportInstrument(item)}
                          className="flex-1 py-1.5 px-2 bg-white hover:bg-blue-50 text-[#1A56DB] border border-slate-200 hover:border-blue-200 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>DigiPass</span>
                        </button>
                        <button
                          onClick={() => setQrModalInstrument(item)}
                          className="p-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg transition-colors"
                          title="View Tamper-Proof QR"
                        >
                          <QrCode className="w-4 h-4 text-emerald-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: MY INSTRUMENTS (INVENTORY & DIGITAL PASSPORTS)                      */}
          {/* ========================================================================= */}
          {currentTab === "instruments" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Header with Search and Filter Toolbar */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-950">
                      Instrument Passports & Stamping Registry
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Total {filteredInstruments.length} verified instrument(s) in active inventory
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      onClick={() => setCurrentTab("booking")}
                      className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>Re-Verification Booking</span>
                    </button>
                    <button
                      onClick={() => setCurrentTab("register")}
                      className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-[#1A56DB] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Register New</span>
                    </button>
                  </div>
                </div>

                {/* Filter Controls Bar */}
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                  {/* Search input (Spans 5) */}
                  <div className="lg:col-span-5 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Instrument ID, Serial No, Brand, Model, Location..."
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
                    />
                  </div>

                  {/* Status filter (Spans 3) */}
                  <div className="lg:col-span-3">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
                    >
                      <option value="ALL">All Compliance Statuses</option>
                      <option value="VALID">✓ VALID & Certified</option>
                      <option value="EXPIRING_SOON">⚠ Expiring &lt; 30 Days</option>
                      <option value="EXPIRED">✗ Expired / Overdue</option>
                      <option value="UNDER_INSPECTION">○ Inspection Scheduled</option>
                    </select>
                  </div>

                  {/* Category filter (Spans 3) */}
                  <div className="lg:col-span-3">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
                    >
                      <option value="ALL">All Scale Categories</option>
                      {availableCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* View Mode Toggle (Spans 1) */}
                  <div className="lg:col-span-1 flex items-center justify-end gap-1">
                    <button
                      onClick={() => setViewMode("table")}
                      className={`p-2 rounded-lg border text-xs ${
                        viewMode === "table"
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                      title="Table View"
                    >
                      <Sliders className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg border text-xs ${
                        viewMode === "grid"
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                      title="Grid View"
                    >
                      <Boxes className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Table View */}
              {viewMode === "table" && (
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-3.5 px-4">Instrument ID & QR</th>
                          <th className="py-3.5 px-4">Equipment Details</th>
                          <th className="py-3.5 px-4">Accuracy Class & Cap</th>
                          <th className="py-3.5 px-4">Location / Premise</th>
                          <th className="py-3.5 px-4">Validity & Stamping</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredInstruments.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="text-center py-12 text-slate-400">
                              No instruments found matching your search and filter criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredInstruments.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                              {/* Instrument ID & QR */}
                              <td className="py-4 px-4 font-mono">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setQrModalInstrument(item)}
                                    className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-emerald-700 border border-slate-200 transition-colors"
                                    title="View QR Token"
                                  >
                                    <QrCode className="w-4 h-4" />
                                  </button>
                                  <div>
                                    <span className="font-bold text-slate-900 block">{item.id}</span>
                                    <span className="text-[10px] text-slate-400 block font-mono">
                                      {item.certId}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Details */}
                              <td className="py-4 px-4">
                                <span className="font-bold text-slate-900 block">{item.name}</span>
                                <span className="text-[11px] text-slate-500 block">
                                  {item.brand} • {item.model}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  SN: {item.serialNumber}
                                </span>
                              </td>

                              {/* Accuracy Class & Cap */}
                              <td className="py-4 px-4">
                                <span className="font-semibold text-slate-800 block">
                                  {item.maxCapacity}
                                </span>
                                <span className="text-[11px] text-purple-700 font-medium block">
                                  {item.accuracyClass}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono block">
                                  {item.verificationInterval}
                                </span>
                              </td>

                              {/* Location */}
                              <td className="py-4 px-4">
                                <span className="font-medium text-slate-800 block">
                                  {item.departmentLocation}
                                </span>
                                <span className="text-[10px] text-slate-400 block truncate max-w-[160px]">
                                  {item.branch}
                                </span>
                              </td>

                              {/* Validity */}
                              <td className="py-4 px-4 font-mono text-[11px]">
                                <span className="text-slate-800 block font-semibold">
                                  {item.validUntil}
                                </span>
                                <span className="text-[10px] text-slate-400 block">
                                  Stamped: {item.verifiedAt}
                                </span>
                                {item.daysRemaining > 0 && (
                                  <span className="text-[10px] text-emerald-600 block">
                                    {item.daysRemaining} days left
                                  </span>
                                )}
                              </td>

                              {/* Status Badge */}
                              <td className="py-4 px-4">
                                {item.status === "VALID" && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> VALID
                                  </span>
                                )}
                                {item.status === "EXPIRING_SOON" && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                                    <AlertTriangle className="w-3.5 h-3.5" /> EXPIRING
                                  </span>
                                )}
                                {item.status === "EXPIRED" && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-800">
                                    <XCircle className="w-3.5 h-3.5" /> EXPIRED
                                  </span>
                                )}
                                {item.status === "UNDER_INSPECTION" && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                                    <Clock className="w-3.5 h-3.5" /> BOOKED
                                  </span>
                                )}
                              </td>

                              {/* Actions */}
                              <td className="py-4 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => setSelectedPassportInstrument(item)}
                                    className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#1A56DB] rounded-lg font-bold text-xs transition-colors flex items-center gap-1"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>Passport</span>
                                  </button>

                                  {(item.status === "EXPIRING_SOON" || item.status === "EXPIRED") && (
                                    <button
                                      onClick={() => {
                                        setSelectedBookingInstrumentIds([item.id]);
                                        setCurrentTab("booking");
                                      }}
                                      className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs transition-colors"
                                      title="Book Re-verification"
                                    >
                                      Renew
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Grid View */}
              {viewMode === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredInstruments.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                          <span className="font-mono text-xs font-bold text-slate-900 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                            {item.id}
                          </span>

                          {item.status === "VALID" && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3.5 h-3.5" /> VALID
                            </span>
                          )}
                          {item.status === "EXPIRING_SOON" && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                              <AlertTriangle className="w-3.5 h-3.5" /> EXPIRING
                            </span>
                          )}
                          {item.status === "EXPIRED" && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-800">
                              <XCircle className="w-3.5 h-3.5" /> EXPIRED
                            </span>
                          )}
                          {item.status === "UNDER_INSPECTION" && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                              <Clock className="w-3.5 h-3.5" /> BOOKED
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-sm text-slate-900">{item.name}</h3>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          {item.brand} • {item.model}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                          SN: {item.serialNumber}
                        </p>

                        <div className="my-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">Max Capacity:</span>
                            <span className="font-bold text-slate-900 font-mono">{item.maxCapacity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">Accuracy Class:</span>
                            <span className="font-bold text-purple-700">{item.accuracyClass}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">Valid Until:</span>
                            <span className="font-bold text-slate-900 font-mono">{item.validUntil}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">Location:</span>
                            <span className="font-medium text-slate-700 truncate max-w-[150px]">
                              {item.departmentLocation}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setSelectedPassportInstrument(item)}
                          className="flex-1 py-2 px-3 bg-[#1A56DB] text-white hover:bg-blue-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Passport</span>
                        </button>
                        <button
                          onClick={() => setQrModalInstrument(item)}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                          title="QR Passport Token"
                        >
                          <QrCode className="w-4 h-4 text-emerald-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: REGISTER NEW INSTRUMENT WIZARD                                    */}
          {/* ========================================================================= */}
          {currentTab === "register" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-150">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
                <div className="pb-6 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1A56DB] flex items-center justify-center">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-950">
                        Register New Weighing & Measuring Instrument
                      </h2>
                      <p className="text-xs text-slate-500">
                        Statutory Registration under Section 19 of the Legal Metrology Act, 2009 (Form-LM-01)
                      </p>
                    </div>
                  </div>

                  {/* Step indicators */}
                  <div className="flex items-center justify-between mt-6 max-w-xl mx-auto text-xs font-bold">
                    {[
                      { step: 1, label: "Category & Type" },
                      { step: 2, label: "Technical Specs" },
                      { step: 3, label: "Premises & Stamping" },
                    ].map((s) => (
                      <div
                        key={s.step}
                        className={`flex items-center gap-2 ${
                          regStep === s.step
                            ? "text-[#1A56DB]"
                            : regStep > s.step
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold border-2 ${
                            regStep === s.step
                              ? "border-[#1A56DB] bg-blue-50 text-[#1A56DB]"
                              : regStep > s.step
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-slate-300 bg-white text-slate-400"
                          }`}
                        >
                          {regStep > s.step ? <Check className="w-4 h-4" /> : s.step}
                        </div>
                        <span className="hidden sm:inline">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-6">
                  {/* Step 1 */}
                  {regStep === 1 && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Equipment Metrological Category *
                        </label>
                        <select
                          value={regFormData.category}
                          onChange={(e) => setRegFormData({ ...regFormData, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#1A56DB]"
                          required
                        >
                          <option value="Non-Automatic Electronic Weighing Instrument">
                            Non-Automatic Electronic Weighing Instrument (Counter / Tabletop)
                          </option>
                          <option value="Platform Electronic Weighing Instrument">
                            Platform Electronic Weighing Instrument (Industrial Goods)
                          </option>
                          <option value="High Precision Micro Weighing Instrument">
                            High Precision Micro Weighing Balance (Jewellery / Gems Class I/II)
                          </option>
                          <option value="Liquid Fuel Measuring & Dispensing Unit">
                            Liquid Fuel Dispenser (Petrol / Diesel / LPG)
                          </option>
                          <option value="Heavy Automatic / Non-Automatic Weighbridge">
                            Heavy Industrial Weighbridge (Road / Rail Weighing)
                          </option>
                          <option value="Automatic Gravimetric Filling Instrument">
                            Automatic Gravimetric Filling / Bagging Machine
                          </option>
                          <option value="Measures of Length & Volume Standards">
                            Physical Measure of Length (Fabric / Tape) or Capacity
                          </option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Accuracy Classification *
                          </label>
                          <select
                            value={regFormData.accuracyClass}
                            onChange={(e) =>
                              setRegFormData({ ...regFormData, accuracyClass: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#1A56DB]"
                            required
                          >
                            <option value="Class III (Medium Accuracy)">
                              Class III (Medium Accuracy - Commercial Retail / Grocery)
                            </option>
                            <option value="Class II (High Accuracy)">
                              Class II (High Accuracy - Spices / Silver / Laboratories)
                            </option>
                            <option value="Class I (Special Accuracy / Micro)">
                              Class I (Special Accuracy - Gold Bullion / Diamond Gems)
                            </option>
                            <option value="Class IIII (Ordinary Accuracy - Industrial)">
                              Class IIII (Ordinary Accuracy - Weighbridges / Bulk Scrap)
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Instrument Purpose / Descriptive Title *
                          </label>
                          <input
                            type="text"
                            value={regFormData.name}
                            onChange={(e) => setRegFormData({ ...regFormData, name: e.target.value })}
                            placeholder="e.g. Counter 04 Billing Scale"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#1A56DB]"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          type="button"
                          onClick={() => setRegStep(2)}
                          className="px-6 py-2.5 bg-[#1A56DB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                        >
                          <span>Continue to Technical Specs</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2 */}
                  {regStep === 2 && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Manufacturer / Make *
                          </label>
                          <input
                            type="text"
                            value={regFormData.brand}
                            onChange={(e) => setRegFormData({ ...regFormData, brand: e.target.value })}
                            placeholder="e.g. Avery Weigh-Tronix / Essae / Mettler Toledo"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#1A56DB]"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Model Number / Designation *
                          </label>
                          <input
                            type="text"
                            value={regFormData.model}
                            onChange={(e) => setRegFormData({ ...regFormData, model: e.target.value })}
                            placeholder="e.g. Pro-Retail 500 / PR-300"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#1A56DB]"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Serial Number (Engraved on Body) *
                          </label>
                          <input
                            type="text"
                            value={regFormData.serialNumber}
                            onChange={(e) =>
                              setRegFormData({ ...regFormData, serialNumber: e.target.value })
                            }
                            placeholder="e.g. SN-AW-99201"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:bg-white focus:ring-2 focus:ring-[#1A56DB]"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Maximum Capacity ($Max$) *
                          </label>
                          <input
                            type="text"
                            value={regFormData.maxCapacity}
                            onChange={(e) =>
                              setRegFormData({ ...regFormData, maxCapacity: e.target.value })
                            }
                            placeholder="e.g. 30.00 kg / 500 kg"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#1A56DB]"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Verification Scale Interval ($e$) *
                          </label>
                          <input
                            type="text"
                            value={regFormData.verificationInterval}
                            onChange={(e) =>
                              setRegFormData({ ...regFormData, verificationInterval: e.target.value })
                            }
                            placeholder="e.g. e = 5 g / e = 1 g"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#1A56DB]"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Central Govt Model Approval / TAC Number (Type Approval Certificate) *
                        </label>
                        <input
                          type="text"
                          value={regFormData.tacApprovalNo}
                          onChange={(e) =>
                            setRegFormData({ ...regFormData, tacApprovalNo: e.target.value })
                          }
                          placeholder="e.g. IND/09/2022/419 (as printed on approval badge)"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:bg-white focus:ring-2 focus:ring-[#1A56DB]"
                          required
                        />
                      </div>

                      <div className="flex justify-between pt-4">
                        <button
                          type="button"
                          onClick={() => setRegStep(1)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setRegStep(3)}
                          className="px-6 py-2.5 bg-[#1A56DB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                        >
                          <span>Continue to Location & Stamping</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3 */}
                  {regStep === 3 && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Store / Branch Location *
                          </label>
                          <select
                            value={regFormData.branch || currentProfile.branches[0]}
                            onChange={(e) => setRegFormData({ ...regFormData, branch: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#1A56DB]"
                            required
                          >
                            {currentProfile.branches.map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Exact Counter / Department Placement *
                          </label>
                          <input
                            type="text"
                            value={regFormData.departmentLocation}
                            onChange={(e) =>
                              setRegFormData({ ...regFormData, departmentLocation: e.target.value })
                            }
                            placeholder="e.g. Counter #04 (Fresh Produce) or Inward Bay"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#1A56DB]"
                            required
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                        <div>
                          <span className="font-bold text-blue-950 block">
                            Calculated Legal Metrology Stamping Fee:
                          </span>
                          <p className="text-blue-800 text-[11px] mt-0.5">
                            Based on Schedule IX of Legal Metrology (General) Rules, 2011 for{" "}
                            {regFormData.accuracyClass.split(" ")[0]}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black text-[#1A56DB] font-mono">₹500.00</span>
                          <span className="text-[10px] text-blue-700 block font-semibold">
                            GST Exempted (Govt Statutory Fee)
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <button
                          type="button"
                          onClick={() => setRegStep(2)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Submit Registration & Generate DigiPass</span>
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: RE-VERIFICATION & INSPECTOR BOOKING WIZARD                          */}
          {/* ========================================================================= */}
          {currentTab === "booking" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-150">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
                <div className="pb-6 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <CalendarCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-950">
                        Book Metrological Re-Verification & Stamping Visit
                      </h2>
                      <p className="text-xs text-slate-500">
                        Schedule an authorized Legal Metrology Officer (LMO) field verification visit
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  {/* Step 1: Select Instruments */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Select Instrument(s) for Verification ({selectedBookingInstrumentIds.length} selected) *
                    </label>

                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {currentInstruments.map((item) => {
                        const isChecked = selectedBookingInstrumentIds.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              if (isChecked) {
                                setSelectedBookingInstrumentIds((prev) =>
                                  prev.filter((id) => id !== item.id)
                                );
                              } else {
                                setSelectedBookingInstrumentIds((prev) => [...prev, item.id]);
                              }
                            }}
                            className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                              isChecked
                                ? "bg-blue-50/60 border-[#1A56DB] shadow-xs"
                                : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {}}
                                className="w-4 h-4 rounded text-[#1A56DB] focus:ring-blue-500 border-slate-300"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs font-bold text-slate-900">
                                    {item.id}
                                  </span>
                                  <span className="font-bold text-xs text-slate-800">{item.name}</span>
                                </div>
                                <span className="text-[11px] text-slate-500">
                                  {item.departmentLocation} • {item.maxCapacity} ({item.accuracyClass})
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="font-mono text-xs font-bold text-slate-900 block">
                                Fee: ₹{item.stampingFee}
                              </span>
                              {item.status === "EXPIRING_SOON" && (
                                <span className="text-[10px] text-amber-700 font-semibold">
                                  Expires in {item.daysRemaining}d
                                </span>
                              )}
                              {item.status === "EXPIRED" && (
                                <span className="text-[10px] text-red-700 font-bold">OVERDUE</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Inspection Mode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      {
                        mode: "ON_SITE",
                        title: "On-Site Store Visit (LMO Officer)",
                        desc: "LMO visits your premises with standard test weights.",
                        icon: Building2,
                      },
                      {
                        mode: "GATC_LAB",
                        title: "GATC Testing Center",
                        desc: "Submit precision weights to accredited govt laboratory.",
                        icon: Scale,
                      },
                    ].map((m) => {
                      const Icon = m.icon;
                      const isSelected = bookingMode === m.mode;
                      return (
                        <div
                          key={m.mode}
                          onClick={() => setBookingMode(m.mode as any)}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            isSelected
                              ? "bg-blue-50/60 border-[#1A56DB] shadow-xs ring-2 ring-blue-600/20"
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 ${
                              isSelected ? "bg-[#1A56DB] text-white" : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <h4 className="font-bold text-xs text-slate-900">{m.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{m.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Step 3: Date & Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Preferred Inspection Date *
                      </label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min="2026-08-28"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#1A56DB]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Time Window Slot *
                      </label>
                      <select
                        value={bookingSlot}
                        onChange={(e) => setBookingSlot(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#1A56DB]"
                        required
                      >
                        <option value="10:00 AM - 12:00 PM">Morning Slot: 10:00 AM - 12:00 PM</option>
                        <option value="12:30 PM - 02:30 PM">Afternoon Slot: 12:30 PM - 02:30 PM</option>
                        <option value="03:00 PM - 05:00 PM">Evening Slot: 03:00 PM - 05:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 4: Payment Method */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Government Statutory Stamping Fee Payment *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "UPI", label: "Instant UPI / QR", sub: "BharatQR Treasury", icon: Smartphone },
                        { id: "NETBANKING", label: "NetBanking e-Challan", sub: "All Major Banks", icon: CreditCard },
                        { id: "CHALLAN", label: "State Bank Treasury Challan", sub: "Manual GRN Counter", icon: FileText },
                      ].map((pay) => {
                        const Icon = pay.icon;
                        const isPaySelected = bookingPaymentMethod === pay.id;
                        return (
                          <div
                            key={pay.id}
                            onClick={() => setBookingPaymentMethod(pay.id as any)}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                              isPaySelected
                                ? "bg-emerald-50 border-emerald-600 shadow-xs"
                                : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 ${isPaySelected ? "text-emerald-700" : "text-slate-500"}`}
                            />
                            <div>
                              <span className="font-bold text-xs text-slate-900 block">{pay.label}</span>
                              <span className="text-[10px] text-slate-500 block">{pay.sub}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fee Summary */}
                  <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-slate-400 block">Total Stamping Fee Payable:</span>
                      <span className="text-2xl font-black font-mono text-emerald-400">
                        ₹
                        {selectedBookingInstrumentIds.reduce((sum, id) => {
                          const inst = currentInstruments.find((i) => i.id === id);
                          return sum + (inst ? inst.stampingFee : 450);
                        }, 0)}
                        .00
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={selectedBookingInstrumentIds.length === 0}
                      className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Pay & Confirm Inspector Slot</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: ACTIVE APPLICATIONS TRACKER                                       */}
          {/* ========================================================================= */}
          {currentTab === "applications" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-950">
                      Active Stamping Applications & Visit Tracker
                    </h2>
                    <p className="text-xs text-slate-500">
                      Real-time statutory status of all filed verification and stamping requests
                    </p>
                  </div>

                  <button
                    onClick={() => setCurrentTab("booking")}
                    className="px-4 py-2 bg-[#1A56DB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Booking</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="p-6 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1A56DB] flex items-center justify-center border border-blue-200">
                            <Clock className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2.5">
                              <span className="font-mono text-sm font-black text-slate-950">
                                {app.id}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                                {app.type.replace(/_/g, " ")}
                              </span>
                              {app.stage === "COMPLETED" ? (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> COMPLETED
                                </span>
                              ) : (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> IN PROGRESS
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                              Applied on {app.applicationDate} • {app.instrumentsCount} Instrument(s) Included
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-slate-500 block">Total Fee Paid</span>
                          <span className="text-base font-black text-slate-900 font-mono">
                            ₹{app.totalFee}.00
                          </span>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            Ref: {app.paymentRef}
                          </span>
                        </div>
                      </div>

                      {/* Application Timeline Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-slate-200/80 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Scheduled Slot</span>
                          <span className="font-bold text-slate-800">{app.scheduledDate}</span>
                          <span className="text-[11px] text-slate-500 block font-mono">{app.scheduledSlot}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Assigned Metrology Officer</span>
                          <span className="font-bold text-slate-800">{app.assignedOfficer}</span>
                          <span className="text-[11px] text-blue-600 block">{app.officerContact}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Target Instrument IDs</span>
                          <span className="font-mono font-semibold text-slate-800 block">
                            {app.instrumentIds.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: DIGITAL CERTIFICATES REPOSITORY                                    */}
          {/* ========================================================================= */}
          {currentTab === "certificates" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-950">
                      Cryptographic e-Certificates Vault
                    </h2>
                    <p className="text-xs text-slate-500">
                      Officially stamped, tamper-evident digital certificates with SHA-256 QR tokens
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      alert("Batch downloading all valid certificates as encrypted ZIP archive.");
                    }}
                    className="px-4 py-2 bg-[#1A56DB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Batch Download All (ZIP)</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentInstruments.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between pb-3 border-b border-slate-200/80 mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                              <Award className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="font-mono text-xs font-black text-slate-900 block">
                                {item.certId}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                DigiPass: {item.id}
                              </span>
                            </div>
                          </div>

                          {item.status === "VALID" ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              ✓ VERIFIED ACTIVE
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                              RE-STAMPING DUE
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-xs text-slate-900">{item.name}</h4>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {item.brand} • {item.model} • SN: {item.serialNumber}
                        </p>

                        <div className="my-3 p-3 bg-white rounded-xl border border-slate-100 text-xs space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-slate-400 text-[11px]">Validity:</span>
                            <span className="font-bold text-slate-900 font-mono">{item.validUntil}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400 text-[11px]">Inspecting Officer:</span>
                            <span className="font-semibold text-slate-800">{item.inspectorName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400 text-[11px]">Lead Seal Code:</span>
                            <span className="font-mono text-slate-800">{item.sealNumber}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setSelectedPassportInstrument(item)}
                          className="flex-1 py-2 px-3 bg-white hover:bg-blue-50 text-[#1A56DB] border border-slate-200 hover:border-blue-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>View Official e-Cert</span>
                        </button>
                        <button
                          onClick={() => setQrModalInstrument(item)}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                          title="View QR Code"
                        >
                          <QrCode className="w-4 h-4 text-emerald-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: EMERGENCY SEAL DAMAGE / BROKEN REPORT FORM                         */}
          {/* ========================================================================= */}
          {currentTab === "emergency_seal" && (
            <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-150">
              <div className="bg-white border-2 border-red-200 rounded-3xl p-6 sm:p-8 shadow-xs">
                <div className="pb-6 border-b border-red-100 mb-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center">
                      <FileWarning className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-red-950">
                        Intimation of Broken or Damaged Metrological Seal
                      </h2>
                      <p className="text-xs text-red-700">
                        Immediate statutory reporting under Section 25 (Immunity against unannounced tampering fines)
                      </p>
                    </div>
                  </div>
                </div>

                {isSealReportSubmitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Emergency Intimation Successfully Logged
                    </h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                      Your damaged seal report has been officially logged with Zonal Metrology Officer. Temporary statutory immunity is active for 7 days while re-sealing is scheduled.
                    </p>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs font-mono">
                      <div>Intimation Reference: INTIM-DL-2026-9901</div>
                      <div>Target Scale ID: {sealReportFormData.instrumentId}</div>
                      <div>Status: Priority Re-sealing Ticket Dispatched</div>
                    </div>
                    <button
                      onClick={() => {
                        setIsSealReportSubmitted(false);
                        setCurrentTab("overview");
                      }}
                      className="px-6 py-2.5 bg-[#1A56DB] text-white font-bold text-xs rounded-xl shadow-xs"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSealReportSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Select Affected Instrument *
                      </label>
                      <select
                        value={sealReportFormData.instrumentId}
                        onChange={(e) =>
                          setSealReportFormData({ ...sealReportFormData, instrumentId: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500"
                        required
                      >
                        <option value="">-- Choose Instrument with Damaged Seal --</option>
                        {currentInstruments.map((i) => (
                          <option key={i.id} value={i.id}>
                            {i.id} - {i.name} ({i.departmentLocation})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Reason for Seal Damage *
                        </label>
                        <select
                          value={sealReportFormData.reason}
                          onChange={(e) =>
                            setSealReportFormData({ ...sealReportFormData, reason: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500"
                          required
                        >
                          <option value="ACCIDENTAL_PHYSICAL_DAMAGE">
                            Accidental Physical Damage during Daily Use
                          </option>
                          <option value="INTERNAL_COMPONENT_REPAIR">
                            Machine Breakdown / Authorized Technical Repair
                          </option>
                          <option value="ENVIRONMENTAL_CORROSION">
                            Lead Wire Corrosion / Environmental Moisture
                          </option>
                          <option value="TRANSPORT_RELOCATION">
                            Damage during Store Relocation / Shifting
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Date & Time of Incident *
                        </label>
                        <input
                          type="date"
                          value={sealReportFormData.occurredAt}
                          onChange={(e) =>
                            setSealReportFormData({ ...sealReportFormData, occurredAt: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Incident Description & Immediate Measures Taken *
                      </label>
                      <textarea
                        rows={3}
                        value={sealReportFormData.description}
                        onChange={(e) =>
                          setSealReportFormData({ ...sealReportFormData, description: e.target.value })
                        }
                        placeholder="State clearly what happened and confirm that instrument has been suspended from trade usage until re-stamping."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                      <span className="font-bold block mb-1">Notice:</span>
                      Under Rule 14, filing this online report within 24 hours of damage grants immediate protection against Section 25 confiscation while priority inspector re-sealing is organized.
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
                      >
                        <FileWarning className="w-4 h-4" />
                        <span>Submit Damaged Seal Intimation</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 8: STATUTORY FEE SCHEDULE & LEGAL METROLOGY RULES                     */}
          {/* ========================================================================= */}
          {currentTab === "fee_schedule" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
                <div className="pb-6 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-950">
                        Official Legal Metrology Fee Schedule & Tolerance Rules
                      </h2>
                      <p className="text-xs text-slate-500">
                        Schedule IX & Maximum Permissible Error (MPE) Limits under Legal Metrology (General) Rules, 2011
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stamping Fee Chart */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 mb-3">
                      Government Verification & Stamping Fee Schedule (Schedule IX)
                    </h3>
                    <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                          <tr>
                            <th className="py-3 px-4">Instrument Category</th>
                            <th className="py-3 px-4">Capacity Range</th>
                            <th className="py-3 px-4">Accuracy Class</th>
                            <th className="py-3 px-4">Stamping Validity</th>
                            <th className="py-3 px-4 text-right">Statutory Fee (INR)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50">
                            <td className="py-3 px-4 font-semibold text-slate-900">
                              Electronic Counter / Tabletop Scale
                            </td>
                            <td className="py-3 px-4 font-mono">Up to 50 kg</td>
                            <td className="py-3 px-4 text-blue-700 font-medium">Class III (Medium)</td>
                            <td className="py-3 px-4">12 Months (Annual)</td>
                            <td className="py-3 px-4 text-right font-mono font-bold">₹400.00</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="py-3 px-4 font-semibold text-slate-900">
                              Platform Scale / Warehouse Scale
                            </td>
                            <td className="py-3 px-4 font-mono">50 kg to 500 kg</td>
                            <td className="py-3 px-4 text-blue-700 font-medium">Class III (Medium)</td>
                            <td className="py-3 px-4">12 Months (Annual)</td>
                            <td className="py-3 px-4 text-right font-mono font-bold">₹850.00</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="py-3 px-4 font-semibold text-slate-900">
                              High Precision Jewellery Balance
                            </td>
                            <td className="py-3 px-4 font-mono">Micro to 10 kg</td>
                            <td className="py-3 px-4 text-purple-700 font-medium">Class I / Class II</td>
                            <td className="py-3 px-4">12 Months (Annual)</td>
                            <td className="py-3 px-4 text-right font-mono font-bold">₹1,500.00</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="py-3 px-4 font-semibold text-slate-900">
                              Fuel Dispenser Unit (Nozzle Meter)
                            </td>
                            <td className="py-3 px-4 font-mono">Up to 150 L/min</td>
                            <td className="py-3 px-4 text-amber-700 font-medium">Class 0.5 (Volumetric)</td>
                            <td className="py-3 px-4">12 Months (Annual)</td>
                            <td className="py-3 px-4 text-right font-mono font-bold">₹2,500.00</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="py-3 px-4 font-semibold text-slate-900">
                              Heavy Road Weighbridge
                            </td>
                            <td className="py-3 px-4 font-mono">50 MT to 100 MT</td>
                            <td className="py-3 px-4 text-slate-700 font-medium">Class IIII (Ordinary)</td>
                            <td className="py-3 px-4">12 Months (Annual)</td>
                            <td className="py-3 px-4 text-right font-mono font-bold">₹6,000.00</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="py-3 px-4 font-semibold text-slate-900">
                              Standard Commercial Weights Set
                            </td>
                            <td className="py-3 px-4 font-mono">50 g to 10 kg</td>
                            <td className="py-3 px-4 text-emerald-700 font-medium">Class M1 / M2</td>
                            <td className="py-3 px-4">24 Months (Biennial)</td>
                            <td className="py-3 px-4 text-right font-mono font-bold">₹200.00 / set</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Legal Protection Tips */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Merchant Protection Rights</span>
                      </h4>
                      <p className="text-slate-600 leading-relaxed">
                        Every merchant is entitled to receive an official digital certificate with a verifiable QR code upon successful field stamping. Demand to inspect the officer badge before handing over instruments.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Re-verification Deadline Rules</span>
                      </h4>
                      <p className="text-slate-600 leading-relaxed">
                        Applications filed at least 30 days prior to expiry receive automatic provisional extension if government scheduling is delayed, safeguarding you from compounding penalties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 9: OFFICIAL HELPDESK & SUPPORT                                        */}
          {/* ========================================================================= */}
          {currentTab === "helpdesk" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-150">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
                <div className="pb-6 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1A56DB] flex items-center justify-center">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-950">
                        Legal Metrology Merchant Helpdesk & Grievances
                      </h2>
                      <p className="text-xs text-slate-500">
                        Direct support channel for traders, shopkeepers, and commercial instrument owners
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <Phone className="w-6 h-6 text-[#1A56DB] mx-auto mb-2" />
                    <h4 className="font-bold text-xs text-slate-900">National Toll-Free Helpline</h4>
                    <p className="font-mono text-sm font-black text-slate-900 mt-1">1800-11-4000</p>
                    <span className="text-[10px] text-slate-500 block mt-0.5">24x7 Support Available</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <Mail className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <h4 className="font-bold text-xs text-slate-900">Official Email Support</h4>
                    <p className="font-mono text-xs font-bold text-slate-900 mt-1">
                      support.metrology@gov.in
                    </p>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Max response time: 24h</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <MapPin className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-bold text-xs text-slate-900">Zonal Controller Office</h4>
                    <p className="text-xs font-bold text-slate-900 mt-1">Delhi State Metrology Wing</p>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Vikas Bhawan, New Delhi</span>
                  </div>
                </div>

                {/* Submit query */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                  <h3 className="font-bold text-sm text-slate-900 mb-3">Submit Trader Query / Grievance</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("Your enquiry ticket has been submitted to the Zonal Legal Metrology Controller.");
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Subject / Issue Type</label>
                      <input
                        type="text"
                        placeholder="e.g. Delay in Inspector Visit for REQ-2026-8891A"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-[#1A56DB]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Detailed Description</label>
                      <textarea
                        rows={3}
                        placeholder="Describe your issue with relevant instrument or application IDs."
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-[#1A56DB]"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#1A56DB] text-white font-bold rounded-xl shadow-xs hover:bg-blue-700 transition-colors"
                    >
                      Submit Ticket
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: TRADER BUSINESS PROFILE & COMPLIANCE DOSSIER */}
          {currentTab === "profile" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Profile Top Banner */}
              <div className="bg-gradient-to-r from-[#003366] via-slate-900 to-[#0A2540] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-600 text-white p-1 shadow-lg flex items-center justify-center">
                      <currentProfile.icon className="w-9 h-9" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-xl sm:text-2xl font-black tracking-tight">{currentProfile.name}</h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified Commercial Enterprise
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 font-medium">
                        {currentProfile.categoryName} • Category: {currentProfile.categoryType}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                        <span>GSTIN: <strong>{currentProfile.gstin}</strong></span>
                        <span>•</span>
                        <span>Zone: <strong>{currentProfile.zone}</strong></span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-white/10 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Trader Dossier</span>
                  </button>
                </div>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Legal Registration & Branches */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Legal Entity & Statutory Registrations */}
                  <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-[#003366]" />
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                          Legal Entity & Metrology Registration
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
                        Active Certificate
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                        <span className="text-slate-500 block">Goods & Services Tax (GSTIN)</span>
                        <span className="font-mono font-bold text-slate-900 block text-sm">
                          {currentProfile.gstin}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-medium">
                          ✓ Active & Tax Compliant
                        </span>
                      </div>

                      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                        <span className="text-slate-500 block">Municipal Trade License No.</span>
                        <span className="font-mono font-bold text-slate-900 block text-sm">
                          {currentProfile.tradeLicense}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Valid for commercial retail & weighing.
                        </span>
                      </div>

                      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                        <span className="text-slate-500 block">Shops & Establishment Reg.</span>
                        <span className="font-mono font-bold text-slate-900 block text-sm">
                          {currentProfile.establishmentReg}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Registered under State Labour Dept.
                        </span>
                      </div>

                      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                        <span className="text-slate-500 block">Legal Metrology Trader Enrollment ID</span>
                        <span className="font-mono font-bold text-[#003366] block text-sm">
                          LM-ENR-DL-2024-0918
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Registered under Legal Metrology Act, 2009.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Registered Branches & Locations */}
                  <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Store className="w-5 h-5 text-blue-600" />
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                          Operating Commercial Branches & Counters
                        </h3>
                      </div>
                      <span className="text-xs text-slate-500">{currentProfile.branches.length} Registered Locations</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      {currentProfile.branches.map((branchName, idx) => {
                        const branchInstruments = currentInstruments.filter((i) => i.branch.includes(branchName) || idx === 0);
                        return (
                          <div
                            key={branchName}
                            className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#1A56DB] flex items-center justify-center font-bold text-xs">
                                0{idx + 1}
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900">{branchName}</h4>
                                <p className="text-[11px] text-slate-500">{currentProfile.zone} • Active Commercial Premise</p>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="font-mono font-bold text-slate-900 block text-xs">
                                {branchInstruments.length || 1} Scales Active
                              </span>
                              <span className="text-[10px] text-emerald-700 font-semibold">100% Stamped</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Column: Contact, Authorized Person & Compliance Score */}
                <div className="space-y-6">
                  {/* Digital Metrology Passport Trust Score */}
                  <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl border border-slate-800 text-center space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[10px] uppercase tracking-widest font-mono text-amber-400">
                      <span>Metrology Compliance</span>
                      <span>Verified</span>
                    </div>

                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 mx-auto flex flex-col items-center justify-center text-emerald-300">
                      <span className="text-2xl font-black font-mono">100%</span>
                      <span className="text-[8px] uppercase tracking-wider font-bold">Compliant</span>
                    </div>

                    <div>
                      <h3 className="font-black text-base text-white">Trust & Verification Score</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        All {currentInstruments.length} commercial measuring instruments hold valid Digital Passports.
                      </p>
                    </div>

                    <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 text-left space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Periodic Verification:</span>
                        <span className="font-mono font-bold text-emerald-400">Up to Date</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Seizures / Notices:</span>
                        <span className="font-mono font-bold text-slate-200">0 Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Treasury Stamping Fees:</span>
                        <span className="font-mono font-bold text-emerald-400">Paid in Full</span>
                      </div>
                    </div>
                  </div>

                  {/* Authorized Signatory & Contact Info */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4 text-xs">
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-100 pb-2">
                      Authorized Signatory & Contact
                    </h4>

                    <div className="space-y-3">
                      <div className="flex items-start gap-2.5">
                        <UserCheck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-400 block text-[11px]">Authorized Representative</span>
                          <span className="font-bold text-slate-900">{currentProfile.authorizedPerson}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-400 block text-[11px]">Principal Business Address</span>
                          <span className="font-medium text-slate-800">{currentProfile.address}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                        <div>
                          <span className="text-slate-400 block text-[11px]">Official Email</span>
                          <span className="font-medium text-slate-800">{currentProfile.email}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                        <div>
                          <span className="text-slate-400 block text-[11px]">Registered Mobile</span>
                          <span className="font-medium text-slate-800">{currentProfile.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: DIGITAL PASSPORT & OFFICIAL e-CERTIFICATE MODAL                  */}
      {/* ========================================================================= */}
      {selectedPassportInstrument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
            {/* Top Toolbar with Back Button */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <button
                onClick={() => setSelectedPassportInstrument(null)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <ArrowLeft className="w-4 h-4 text-slate-700" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setSelectedPassportInstrument(null)}
                className="text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold transition"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Certificate Header Layout */}
            <div className="text-center pb-6 border-b-2 border-slate-900 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-200 bg-white p-0.5">
                  <Image src="/logo.jpg" alt="DigiPass" fill className="object-contain" />
                </div>
                <span className="font-extrabold text-lg font-mono text-slate-950">
                  Digi<span className="text-[#1A56DB]">Pass</span>
                </span>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                Government of India • Department of Legal Metrology
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 mt-1 uppercase tracking-tight">
                Certificate of Metrological Verification
              </h2>
              <span className="text-[11px] font-bold text-[#1A56DB] bg-blue-50 px-3 py-0.5 rounded-full border border-blue-200 mt-2 inline-block font-mono">
                Certificate No: {selectedPassportInstrument.certId}
              </span>
            </div>

            {/* Passport Identity Grid */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] block">Instrument ID</span>
                  <span className="font-mono font-extrabold text-slate-900">
                    {selectedPassportInstrument.id}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] block">Accuracy Class</span>
                  <span className="font-bold text-purple-700">
                    {selectedPassportInstrument.accuracyClass}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] block">Max Capacity</span>
                  <span className="font-mono font-bold text-slate-900">
                    {selectedPassportInstrument.maxCapacity}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] block">Scale Interval</span>
                  <span className="font-mono font-bold text-slate-900">
                    {selectedPassportInstrument.verificationInterval}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Instrument Model:</span>
                  <span className="font-bold text-slate-900">
                    {selectedPassportInstrument.brand} {selectedPassportInstrument.model}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Serial Number:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {selectedPassportInstrument.serialNumber}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Registered Owner / Trader:</span>
                  <span className="font-bold text-slate-900">{currentProfile.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Installation Premise:</span>
                  <span className="font-medium text-slate-800 text-right max-w-[280px]">
                    {selectedPassportInstrument.departmentLocation}, {selectedPassportInstrument.branch}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Validity Period:</span>
                  <span className="font-mono font-bold text-emerald-600">
                    {selectedPassportInstrument.verifiedAt} → {selectedPassportInstrument.validUntil}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">Verification Seal Number:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {selectedPassportInstrument.sealNumber}
                  </span>
                </div>
              </div>

              {/* Cryptographic SHA-256 Token & QR Banner */}
              <div className="p-3 rounded-xl bg-slate-900 text-white flex items-center justify-between gap-3 text-[11px]">
                <div className="flex items-center gap-2 font-mono truncate">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="truncate text-slate-300">
                    Token: {selectedPassportInstrument.qrToken}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold font-mono text-[10px] flex-shrink-0">
                  SHA-256 VERIFIED
                </span>
              </div>

              {/* Stamping Authority Stamp Box */}
              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">
                    Inspecting Legal Metrology Officer
                  </span>
                  <span className="font-bold text-slate-900 block">
                    {selectedPassportInstrument.inspectorName}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono block">
                    Badge ID: {selectedPassportInstrument.inspectorId}
                  </span>
                </div>

                <div className="w-24 h-24 rounded-full border-2 border-dashed border-emerald-500 flex flex-col items-center justify-center text-center p-1 bg-emerald-50/50">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-0.5" />
                  <span className="text-[8px] font-black uppercase text-emerald-900 tracking-tighter">
                    OFFICIAL SEAL
                  </span>
                  <span className="text-[7px] text-emerald-700 font-mono">GOVT OF INDIA</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedPassportInstrument(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600" />
                <span>Back</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    window.print?.();
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>Print Official Certificate</span>
                </button>
                <button
                  onClick={() => {
                    alert(`Downloading cryptographic PDF e-Certificate for ${selectedPassportInstrument.id}...`);
                  }}
                  className="px-5 py-2.5 bg-[#1A56DB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Verified PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: INTERACTIVE QR CODE VERIFICATION MODAL                           */}
      {/* ========================================================================= */}
      {qrModalInstrument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-center">
            <button
              onClick={() => setQrModalInstrument(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-950">
              Tamper-Proof DigiPass QR Token
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              Instrument ID: {qrModalInstrument.id}
            </p>

            {/* Simulated Scannable QR code frame */}
            <div className="my-6 p-6 bg-slate-900 rounded-3xl max-w-[240px] mx-auto border-4 border-slate-800 shadow-xl relative">
              <div className="aspect-square bg-white rounded-2xl p-4 flex flex-col items-center justify-center relative">
                {/* Visual SVG QR Representation */}
                <div className="grid grid-cols-6 gap-1 w-full h-full p-1">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        i % 2 === 0 || i % 7 === 0 || i < 6 || i > 30 || i % 5 === 0
                          ? "bg-slate-950"
                          : "bg-slate-100"
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <Shield className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-mono text-emerald-400 mt-3 block font-bold">
                ✓ Cryptographically Sealed
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left font-mono text-[11px]">
                <span className="text-slate-400 block text-[10px]">Verification URL:</span>
                <span className="text-slate-800 font-bold truncate block">
                  https://metrology.gov.in/verify/{qrModalInstrument.id}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    copyQrLink(`https://metrology.gov.in/verify/${qrModalInstrument.id}`)
                  }
                  className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  {isQrCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{isQrCopied ? "Link Copied!" : "Copy Verification URL"}</span>
                </button>
                <button
                  onClick={() => {
                    alert(`Downloading printable high-res QR label sticker for ${qrModalInstrument.id}...`);
                  }}
                  className="py-2.5 px-4 bg-[#1A56DB] hover:bg-blue-700 text-white rounded-xl font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Sticker Label</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* ========================================================================= */}
      {/* MODAL 4: REGISTRATION SUCCESS NOTIFICATION MODAL                          */}
      {/* ========================================================================= */}
      {isRegSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-950">
              New Scale Successfully Registered!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your instrument has been minted with an official Digital Passport ID and added to your active inventory.
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-xs text-left space-y-1">
              <div>
                <span className="text-slate-400">Assigned DigiPass ID:</span>{" "}
                <span className="font-bold text-slate-950">{newlyRegisteredId}</span>
              </div>
              <div>
                <span className="text-slate-400">Status:</span>{" "}
                <span className="text-blue-700 font-bold">Inspection Slot Generated</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setIsRegSuccessModal(false);
                  setCurrentTab("instruments");
                }}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
              >
                View in Inventory
              </button>
              <button
                onClick={() => {
                  setIsRegSuccessModal(false);
                  setSelectedBookingInstrumentIds([newlyRegisteredId]);
                  setCurrentTab("booking");
                }}
                className="flex-1 py-2.5 bg-[#1A56DB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                Book Stamping Slot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: BOOKING SUCCESS NOTIFICATION MODAL                               */}
      {/* ========================================================================= */}
      {isBookingSuccessModal && lastCreatedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-950">
              Inspector Visit Booked & Confirmed!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Statutory fee verified. Official Legal Metrology Inspector has been allocated to your branch.
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-xs text-left space-y-1.5">
              <div>
                <span className="text-slate-400">Application Number:</span>{" "}
                <span className="font-bold text-slate-950">{lastCreatedApplication.id}</span>
              </div>
              <div>
                <span className="text-slate-400">Visit Date & Slot:</span>{" "}
                <span className="font-bold text-slate-900">{lastCreatedApplication.scheduledDate} ({lastCreatedApplication.scheduledSlot})</span>
              </div>
              <div>
                <span className="text-slate-400">Assigned Inspector:</span>{" "}
                <span className="text-blue-700 font-bold">{lastCreatedApplication.assignedOfficer}</span>
              </div>
              <div>
                <span className="text-slate-400">Challan Ref:</span>{" "}
                <span className="text-emerald-700 font-bold">{lastCreatedApplication.paymentRef}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsBookingSuccessModal(false);
                setCurrentTab("applications");
              }}
              className="w-full py-3 bg-[#1A56DB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              Track in Active Applications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TraderPage() {
  return <TraderPortalView />;
}
