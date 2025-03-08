import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { Employee } from "./employee.type";
import { Device, DeviceUsage } from "./device.type";

export const EmployeeTableColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "verified",
    header: "Is Verified",
  },
];

export const DeviceTableColumns: ColumnDef<Device>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "location",
    header: "Email",
  },
  {
    accessorKey: "isActive",
    header: "Is Active",
  },
];

export const DeviceUsageTableColumns: ColumnDef<DeviceUsage>[] = [
  {
    header: "Date",
    cell: ({ row }) =>
      format(parseISO(row.original.date), "MMM d, yyyy hh:mm a"),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "location",
    header: "Email",
  },
  {
    accessorKey: "duration",
    header: "Duration (In Minutes)",
  },
];

// export interface DeviceUsage {
//   id: number;
//   date: string; // ISO date string
//   duration: number; // Duration in minutes
//   name: string;
//   location: string;
// }

// export interface Driver {
//   UserId: number;
//   FirstName: string;
//   LastName: string;
//   MobileNumber: string;
//   Email: string;
//   OTP: string;
//   Role: string; // Specific role for the driver
//   SocialLoginProvider: string; // Assuming only 'Manual' here as per given data
//   SocialLoginId: null | string;
//   IsVerified: boolean;
//   IsAdminVerified: boolean;
//   FcmToken: string;
//   StripeAccountId: null | string;
//   createdAt: string;
//   updatedAt: string;
//   DriverDetail: {
//     Id: number;
//     UserId: number;
//     VehicleNo: string;
//     DrivingLicenseImage: string;
//     VehicleImage: string;
//     VehicleType: string; // Include other possible vehicle types as needed
//     createdAt: string;
//     updatedAt: string;
//   };
// }
