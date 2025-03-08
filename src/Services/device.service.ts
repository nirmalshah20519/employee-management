import axios from "axios";
import { getConfig, url } from "./auth.service";
import { Device } from "@/types/device.type";
import { PaginationFilter } from "@/Modules/Admin/Pages/EmployeeDashboard";

export const getDevices = async () => {
  const config = getConfig();
  return axios
    .get(`${url}/api/device/all`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred while fetching Devices", error);
      throw error;
    });
};

export const createDevice = async (Device: Device) => {
  const config = getConfig();
  const device = { ...Device, ManagerId: 1 };
  return axios
    .post(`${url}/api/device`, device, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred while creating Devices", error);
      throw error;
    });
};

export const updateDevice = async (Device: Device) => {
  const config = getConfig();
  const { id, ...device } = Device;
  return axios
    .put(`${url}/api/device/${id}`, device, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred while creating Devices", error);
      throw error;
    });
};

export const deleteDevice = async (Device: Device) => {
  const config = getConfig();

  return axios
    .delete(`${url}/api/device/${Device.id}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred while deleting Devices", error);
      throw error;
    });
};

export const getDeviceUsage = async (
  pagination: PaginationFilter,
  id: number
) => {
  const config = getConfig();
  const { pageNo, pageSize } = pagination;
  return axios
    .get(
      `${url}/api/employee/deviceusage/${id}?pageNo=${pageNo}&pageSize=${pageSize}`,
      config
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred while fetching Devices", error);
      throw error;
    });
};
