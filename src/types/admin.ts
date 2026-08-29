export type JurisdictionState = 
  | "ALL_INDIA"
  | "Delhi NCT"
  | "Maharashtra"
  | "Karnataka"
  | "Gujarat"
  | "Tamil Nadu"
  | "Uttar Pradesh";

export type AdminTab = 
  | "command_center"
  | "inspector_allocator"
  | "enforcement_seizures"
  | "standards_taxonomy"
  | "audit_ledger";

export interface NationalTelemetryKPIs {
  totalRegisteredInstruments: number;
  activeCompliantRate: number; // e.g. 94.2%
  annualStampingFeeCollectedInr: number; // e.g. 1428000000 (142.8 Cr)
  activeInspectionsPending: number;
  totalSeizuresAndViolations: number;
  gatcCalibrationVolume: number;
  averageInspectionTurnaroundDays: number;
  nationalTamperingAlerts: number;
}

export interface ZoneWorkloadMetric {
  zoneId: string;
  zoneName: string;
  state: JurisdictionState;
  leadOfficer: string;
  totalOfficers: number;
  activeAssignedCases: number;
  completedThisQuarter: number;
  complianceRate: number;
  averageResponseHours: number;
  status: "OPTIMAL" | "OVERLOADED" | "SURPLUS_CAPACITY";
}

export interface LmoOfficerRoster {
  id: string;
  officerName: string;
  badgeNumber: string;
  zone: string;
  state: JurisdictionState;
  phone: string;
  email: string;
  activeCaseload: number;
  maxMonthlyCapacity: number;
  completedThisMonth: number;
  averageInspectionRating: number; // e.g. 4.9
  currentDutyStatus: "ON_FIELD_ACTIVE" | "IN_LAB" | "ON_LEAVE";
  geoCoordinates: {
    lat: number;
    lng: number;
    lastPingsAgo: string;
  };
}

export interface EnforcementViolationRecord {
  id: string;
  caseNumber: string;
  businessName: string;
  tradeType: string;
  location: string;
  state: JurisdictionState;
  instrumentType: string;
  instrumentId: string;
  violationType: 
    | "UNAUTHORIZED_SEAL_TAMPERING"
    | "UNVERIFIED_UNDERWEIGHT_DISPENSING"
    | "ILLEGAL_SOFTWARE_CALIBRATION_OVERRIDE"
    | "COUNTERFEIT_VERIFICATION_STAMP";
  legalSection: string; // e.g. "Section 15 & Section 27, Legal Metrology Act 2009"
  seizureDate: string;
  investigatingOfficer: string;
  seizureStatus: "SEIZED_UNDER_CUSTODY" | "COMPOUNDING_FEE_PAID" | "PENDING_COURT_PROSECUTION";
  compoundingPenaltyInr: number;
  evidenceCount: number;
  courtCaseRefNo?: string;
}

export interface StatutoryStandardRule {
  id: string;
  categoryCode: string;
  instrumentCategoryName: string;
  applicableOimlStandard: string;
  accuracyClass: string;
  verificationFrequency: "Annual (12 Months)" | "Biennial (24 Months)" | "Triennial (36 Months)";
  statutoryFeeInr: number;
  maxPermissibleErrorMpe: string;
  reVerificationGraceDays: number;
  securitySealType: "Lead Wire Tamper Seal" | "RFID Holographic Secure Cap" | "Cryptographic Digital QR";
  lastAmendedDate: string;
}

export interface AuditLedgerBlock {
  blockNumber: number;
  timestamp: string;
  actionType: 
    | "INITIAL_REGISTRATION"
    | "OFFICER_FIELD_VERIFICATION"
    | "GATC_LAB_CALIBRATION"
    | "SEAL_CHANGE_SECURITY_LOG"
    | "SEIZURE_ORDER_ISSUED";
  instrumentId: string;
  actor: string;
  actorRole: "TRADER" | "LMO_OFFICER" | "GATC_METROLOGIST" | "MINISTRY_ADMIN";
  location: string;
  prevBlockHash: string;
  blockHash: string;
  detailsSummary: string;
  isCryptographicallyVerified: boolean;
}
