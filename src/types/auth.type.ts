import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  email: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  user: {
    id: number;
    email: string;
    isVerified: boolean;
  } | null;
  accessToken: string;
  refreshToken: string;
};

export type UserRoleEnum = {
  admin: string;
  MeshOwner: string;
  HostelOwner: string;
};

export enum UserRole {
  Admin = 1,
  MeshOwner = 2,
  HostelOwner = 3,
}

// type Role = {
//   id: UserRole;
//   role: string;
// };


