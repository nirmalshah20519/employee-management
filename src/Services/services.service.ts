import { Service } from "@/types/services.type";
import { getConfig, getFormDataConfig, url } from "./auth.service";
import axios from "axios";

export const getServices = async () => {
  const config = getConfig();
  return axios
    .get(`${url}/api/admin/service`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred while fetching services", error);
      throw error;
    });
};

export const createService = async (service: Service) => {
  const config = getFormDataConfig();
  const formData = new FormData();
  Object.keys(service).forEach((key) => {
    if (key === "Image") {
      return;
    }
    const value = service[key as keyof Service]?.toString();
    if (value !== undefined) {
      formData.append(key, value);
    }
  });
  if (service.Image && service.Image instanceof File) {
    formData.append("Image", service?.Image, service?.Image?.name);
  }
  return axios
    .post(`${url}/api/admin/service`, formData, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred while creating services", error);
      throw error;
    });
};

export const updateService = async (service: Service) => {
  const config = getFormDataConfig();
  const formData = new FormData();
  const { Id, CreatedAt, UpdatedAt, ...temp } = service;
  Object.keys(service).forEach((key) => {
    if (key === "Image") {
      return;
    }
    const value = service[key as keyof Service]?.toString();
    if (value !== undefined) {
      formData.append(key, value);
    }
  });
  if (service.Image && service.Image instanceof File) {
    formData.append("Image", service?.Image, service?.Image?.name);
  }
  return axios
    .put(`${url}/api/admin/service/${Id}`, formData, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred while updating services", error);
      throw error;
    });
};

export const deleteService = async (service: Service) => {
  const config = getConfig();

  return axios
    .delete(`${url}/api/admin/service/${service.Id}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred while deleting services", error);
      throw error;
    });
};
