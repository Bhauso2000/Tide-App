export enum TideEventType {
  High = "High",
  Low = "Low",
}

export enum SafetyStatus {
  Safe = "SAFE",
  Caution = "CAUTION",
  Unsafe = "UNSAFE",
}

export interface TideExtreme {
  date: string;
  type: TideEventType;
  height?: number;
}

export interface TideApiResponse {
  extremes: TideExtreme[];
}

export interface NearestCoastData {
  coastName: string;
  locationLabel: string;
  lat: number;
  lng: number;
  nextHigh?: TideExtreme;
  nextLow?: TideExtreme;
  timeline: { timeISO: string; height: number }[];
  timezone: string;
  safety: SafetyStatus;
}
