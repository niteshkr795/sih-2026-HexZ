export type LabTestStatus = 
  | "IN_QUEUE"
  | "CALIBRATION_IN_PROGRESS"
  | "CERTIFICATE_ISSUED"
  | "REJECTED_OUT_OF_TOLERANCE"
  | "PASSPORT_SYNCED";

export type TestPriority = "NORMAL" | "HIGH" | "STATUTORY_URGENT";

export type InstrumentTestCategory =
  | "Precision Mass Standards (F1/F2 Class)"
  | "Heavy Industrial Load Cells & Weighbridges"
  | "Fuel & Liquid Flow Meter Provers"
  | "High-Accuracy Bullion Balances (Class I/II)"
  | "Automatic Checkweighers & Batchers";

export interface PrecisionTestRun {
  pointIndex: number;
  nominalValue: number; // e.g. 500
  unit: string; // "kg" | "g" | "L"
  run1Observed: number;
  run2Observed: number;
  run3Observed: number;
  meanObserved: number;
  expandedUncertainty: number; // e.g. ±0.012 g (k=2, 95% confidence)
  mpeAllowed: number; // maximum permissible error (+/-)
  error: number;
  passed: boolean;
}

export interface LabSampleBatch {
  id: string;
  batchCode: string;
  clientName: string;
  clientType: "Commercial Manufacturer" | "Importer" | "State Govt Metrology Lab" | "Public Corporation";
  gstinOrEntityId: string;
  category: InstrumentTestCategory;
  model: string;
  serialNumber: string;
  manufacturer: string;
  receivedDate: string;
  dueDate: string;
  priority: TestPriority;
  status: LabTestStatus;
  leadTechnician: string;
  environmentalTempC: number;
  environmentalHumidityPct: number;
  atmosphericPressureHpa: number;
  testPoints: PrecisionTestRun[];
  remarks: string;
  syncTimestamp?: string;
  certificateId?: string;
}

export interface GatcCalibrationCertificate {
  certificateId: string;
  ulrNumber: string; // Unique Lab Report (NABL)
  batchId: string;
  instrumentId: string;
  serialNumber: string;
  equipmentDescription: string;
  accuracyClass: string;
  customerName: string;
  customerAddress: string;
  calibratedOn: string;
  validUntil: string;
  signatoryName: string;
  signatoryDesignation: string;
  traceabilityChain: string;
  environmentalConditions: string;
  overallVerdict: "CONFORMS_TO_OIML_R76" | "CONFORMS_TO_OIML_R111" | "NON_CONFORMING";
  qrVerificationToken: string;
  cryptographicSignature: string;
  passportSyncStatus: "SYNCED" | "PENDING";
}

export interface WorkingStandardAsset {
  id: string;
  assetCode: string;
  name: string;
  category: "E2 Reference Weights" | "Deadweight Test Machine" | "Sonic Nozzle Prover" | "Micro-balance Comparator";
  accuracy: string;
  lastCalibratedDate: string;
  nextCalibrationDueDate: string;
  calibratedBy: "National Physical Laboratory (NPL India)" | "Directorate of Legal Metrology (RRSL)";
  driftPpm: number;
  status: "OPERATIONAL_CERTIFIED" | "CALIBRATION_DUE" | "STANDBY";
}

export interface LabTelemetry {
  cleanroomTempC: number;
  tempTolerance: number;
  relativeHumidity: number;
  humidityTolerance: number;
  barometricPressureHpa: number;
  dewPointC: number;
  airDensityKgM3: number;
  ambientVibrationLevel: "NORMAL (<0.02 m/s²)" | "ELEVATED";
  lastSensorReadingTime: string;
}
