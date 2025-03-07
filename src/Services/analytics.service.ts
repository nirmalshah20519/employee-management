import { getConfig, url } from "./auth.service";
import axios from "axios";

export const getAnalytics = async () => {
  const config = getConfig();
  return axios
    .get(`${url}/api/admin/analytics`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred while fetching analytics", error);
      throw error;
    });
};
