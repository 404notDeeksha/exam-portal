// Service layer (API calls only).

import { routes } from "../../constants/routes";
import { publicAPI } from "../../utils/axiosInstance";

const register = async (userData) => {
  const response = await publicAPI.post(routes.registerAPI, userData);
  return response.data;
};

export default { register };
