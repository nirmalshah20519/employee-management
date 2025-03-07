import { getConfig, url } from "./auth.service";
import axios from "axios";

export const getCustomers = async (page: number, limit: number) => {
  const config = getConfig();
  return axios
    .get(`${url}/api/admin/user?page=${page}&limit=${limit}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(
        `Error occurred while fetching customers data: page ${page}, limit ${limit}`,
        error
      );
      throw error;
    });
};

export const getVerifiedDrivers = async () => {
  const config = getConfig();
  return axios
    .get(`${url}/api/admin/driver/verified`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred while fetching verified drivers", error);
      throw error;
    });
};

export const getUnverifiedDrivers = async () => {
  const config = getConfig();
  return axios
    .get(`${url}/api/admin/driver/unverified`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred while fetching unverified drivers", error);
      throw error;
    });
};

export const verifyDriver = async (driverId: number) => {
  const config = getConfig();
  return axios
    .post(`${url}/api/admin/driver/verify`, { driverId }, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(
        `Error occurred while trying to verify driver with ID: ${driverId}`,
        error
      );
      throw error;
    });
};
