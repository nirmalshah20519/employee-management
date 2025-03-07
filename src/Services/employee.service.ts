import { Employee } from "@/types/employee.type";
import axios from "axios";
import { getConfig, url } from "./auth.service";

export const getEmployees = async () => {
  const config = getConfig();
  return axios
    .get(`${url}/api/employee/all`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred while fetching Employees", error);
      throw error;
    });
};

export const createEmployee = async (Employee: Employee) => {
  const config = getConfig();
  const employee = { ...Employee, ManagerId: 1, Password:'00000000' };
  return axios
    .post(`${url}/api/employee/signup`, employee, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred while creating Employees", error);
      throw error;
    });
};

// export const updateEmployee = async (Employee: Employee) => {
//   const config = getFormDataConfig();
//   const formData = new FormData();
//   const { Id, CreatedAt, UpdatedAt, ...temp } = Employee;
//   Object.keys(Employee).forEach((key) => {
//     if (key === "Image") {
//       return;
//     }
//     const value = Employee[key as keyof Employee]?.toString();
//     if (value !== undefined) {
//       formData.append(key, value);
//     }
//   });
//   if (Employee.Image && Employee.Image instanceof File) {
//     formData.append("Image", Employee?.Image, Employee?.Image?.name);
//   }
//   return axios
//     .put(`${url}/api/admin/Employee/${Id}`, formData, config)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error("Error occurred while updating Employees", error);
//       throw error;
//     });
// };

// export const deleteEmployee = async (Employee: Employee) => {
//   const config = getConfig();

//   return axios
//     .delete(`${url}/api/admin/Employee/${Employee.Id}`, config)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error("Error occurred while deleting Employees", error);
//       throw error;
//     });
// };
