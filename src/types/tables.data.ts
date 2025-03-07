import { ColumnDef } from "@tanstack/react-table";
import { Customer, Driver } from "./users.type";
import { Service } from "./services.type";
import { Employee } from "./employee.type";

export const customerTableColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "FirstName",
    header: "First Name",
  },
  {
    accessorKey: "LastName",
    header: "Last Name",
  },
  {
    accessorKey: "Email",
    header: "Email",
  },
  {
    accessorKey: "MobileNumber",
    header: "Mobile",
  },
  {
    accessorKey: "SocialLoginProvider",
    header: "Social Login Provider",
  },
  {
    accessorKey: "IsVerified",
    header: "Is Verified",
  },
];

export const driverTableColumns: ColumnDef<Driver>[] = [
  {
    accessorKey: "FirstName",
    header: "First Name",
  },
  {
    accessorKey: "LastName",
    header: "Last Name",
  },
  {
    accessorKey: "Email",
    header: "Email",
  },
  {
    accessorKey: "MobileNumber",
    header: "Mobile",
  },
  {
    accessorKey: "SocialLoginProvider",
    header: "Social Login Provider",
  },
  {
    accessorKey: "IsAdminVerified",
    header: "Is Verified",
  },
];

// export interface Service {
//   Id?: number;
//   serviceType: string;
//   subType: string;
//   perKmPrice: string;
//   perKgPrice: string | null;
//   perMinPrice: string;
//   description: string;
//   image: string | null;
//   createdAt?: string;
//   updatedAt?: string;
// }

export const serviceTableColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "ServiceType",
    header: "Service Type",
  },
  {
    accessorKey: "SubType",
    header: "Service Sub Type",
  },
  {
    accessorKey: "PerKmPrice",
    header: "Per KM Price",
  },
  {
    accessorKey: "PerKgPrice",
    header: "Per KG Price",
  },
  {
    accessorKey: "PerMinPrice",
    header: "Per Minute Price",
  },
  {
    accessorKey: "Description",
    header: "Description",
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created At",
  //   enableSorting: true, // Optional: if your UI library supports it and you want to enable sorting for this column
  // },
  // {
  //   accessorKey: "updatedAt",
  //   header: "Updated At",
  //   enableSorting: true, // Optional: similar to above
  // },
];

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
  }
];

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
