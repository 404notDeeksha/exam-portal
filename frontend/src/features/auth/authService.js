// Service layer (API calls only).

import { routes } from "../../constants/routes";
import { publicAPI } from "../../utils/axiosInstance";

const registerAPI = async (userData) => {
  const response = await publicAPI.post(routes.registerAPI, userData);
  return response.data;
};

const loginAPI = async (userData) => {
  const response = await publicAPI.post(routes.loginAPI, userData);
  return response.data;
};

export default { registerAPI, loginAPI };
