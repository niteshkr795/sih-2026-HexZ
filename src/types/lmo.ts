export type AccuracyClass = "Class I (Special)" | "Class II (High)" | "Class III (Medium)" | "Class IV (Ordinary)";

export type InspectionStatus = 
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "VERIFIED_VALID"
  | "REJECTED_SEIZED"
  | "OVERDUE_RENEWAL";

export type InspectionPriority = "HIGH" | "URGENT" | "ROUTINE" | "COMPLAINT";

export type InstrumentCategory = 
  | "Electronic Counter Scale"
  | "Platform Weighing Scale"
  | "High Precision Gold Balance"
  | "Weighbridge (Heavy Goods)"
  | "Fuel Dispensing Unit (Multi-Product)"
  | "Automatic Checkweigher";

export interface CalibrationTestPoint {
  id: string;
  testLoad: number; // in kg or g
  unit: string;
  nominalLoad: string;
  indicatedLoad: number;
  error: number; // indicated - reference
  mpeAllowed: number; // maximum permissible error (+/-)
  passed: boolean;
}

export interface InspectionTask {
  id: string;
  instrumentId: string;
  businessName: string;
  tradeType: string;
  contactPerson: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  scheduledTime: string;
  priority: InspectionPriority;
  status: InspectionStatus;
  instrument: {
    type: InstrumentCategory;
    model: string;
    serialNumber: string;
    manufacturer: string;
    maxCapacity: string;
    minCapacity: string;
    verificationScaleInterval: string; // e
    accuracyClass: AccuracyClass;
    lastVerifiedDate: string;
    expiryDate: string;
    existingSealNumber: string;
  };
  assignedOfficer: string;
}

export interface VerificationEvidence {
  sealPhotoUrl?: string;
  displayPhotoUrl?: string;
  instrumentPhotoUrl?: string;
  officerSignatureUrl?: string;
  geoStamping: {
    lat: number;
    lng: number;
    timestamp: string;
    accuracyMeters: number;
  };
  notes: string;
}

export interface ECertificate {
  certificateNumber: string;
  instrumentId: string;
  serialNumber: string;
  ownerName: string;
  businessAddress: string;
  instrumentType: string;
  accuracyClass: AccuracyClass;
  maxCapacity: string;
  verificationScaleInterval: string;
  issueDate: string;
  validUntil: string;
  officerId: string;
  officerName: string;
  zone: string;
  sealTagAssigned: string;
  sha256VerificationHash: string;
  qrToken: string;
  status: "ACTIVE" | "EXPIRED" | "REVOKED";
  stampingFeePaid: number;
}

export interface SeizureNotice {
  noticeNumber: string;
  memoNumber: string;
  instrumentId: string;
  serialNumber: string;
  ownerName: string;
  businessAddress: string;
  instrumentType: string;
  issueDate: string;
  officerId: string;
  officerName: string;
  reasons: string[];
  violationSection: string;
  fineAmount: number;
  rectificationDays: number;
  prohibitionStatus: "SEALED_CONFISCATED" | "PROHIBITED_FOR_COMMERCIAL_USE";
  redTagNumber: string;
}

export interface OfficerProfile {
  id: string;
  name: string;
  designation: string;
  badgeNumber: string;
  zone: string;
  state: string;
  avatarUrl?: string;
  activeSince: string;
  totalInspectionsThisMonth: number;
  complianceRate: number;
  pendingQueueCount: number;
  syncStatus: "ONLINE_SYNCED" | "OFFLINE_CACHED";
}
