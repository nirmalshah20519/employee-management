export interface Customer {
  UserId: number;
  FirstName: string;
  LastName: string;
  MobileNumber: string;
  Email: string;
  OTP: null | string;
  Role: string; // Assuming roles could be 'User' or 'Admin'
  SocialLoginProvider: string; // Assuming these as possible providers
  SocialLoginId: null | string;
  IsVerified: boolean;
  IsAdminVerified: boolean;
  FcmToken: string;
  StripeAccountId: null | string;
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  UserId: number;
  FirstName: string;
  LastName: string;
  MobileNumber: string;
  Email: string;
  OTP: string;
  Role: string; // Specific role for the driver
  SocialLoginProvider: string; // Assuming only 'Manual' here as per given data
  SocialLoginId: null | string;
  IsVerified: boolean;
  IsAdminVerified: boolean;
  FcmToken: string;
  StripeAccountId: null | string;
  createdAt: string;
  updatedAt: string;
  DriverDetail: {
    Id: number;
    UserId: number;
    VehicleNo: string;
    DrivingLicenseImage: string;
    VehicleImage: string;
    VehicleType: string; // Include other possible vehicle types as needed
    createdAt: string;
    updatedAt: string;
  };
}
