import { LoginRequest } from "@/types/auth.type";
import axios, { AxiosRequestConfig } from "axios";

export const url = import.meta.env.VITE_API_URL;

export const getConfig = (): AxiosRequestConfig => {
  const t = localStorage.getItem("emp_management_token");
  return {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${t}`,
    },
  } as AxiosRequestConfig;
};

export const getFormDataConfig = (): AxiosRequestConfig => {
  const t = localStorage.getItem("accessToken");
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${t}`,
    },
  } as AxiosRequestConfig;
};

export const getOtpService = async (otpRequest: { mobileNumber: string }) => {
  return axios
    .post(url + "/api/admin/auth/login", otpRequest)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred during login:", error);
      throw error;
    });
};

export const loginService = async (
  loginRequest: LoginRequest,
  type: string
) => {
  if (type === "manager") {
    return axios
      .post(url + "/api/manager/login", loginRequest)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        // Handle error
        console.error("Error occurred during login:", error);
        throw error;
      });
  }
  if (type === "employee") {
    return axios
      .post(url + "/api/employee/login", loginRequest)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        // Handle error
        console.error("Error occurred during login:", error);
        throw error;
      });
  }
};
