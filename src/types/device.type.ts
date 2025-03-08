export interface Device {
  id: number;
  managerId: number;
  name: string;
  location: string;
  isActive: boolean;
}

export interface DeviceUsage {
  id: number;
  date: string; // ISO date string
  duration: number; // Duration in minutes
  name: string;
  location: string;
}
