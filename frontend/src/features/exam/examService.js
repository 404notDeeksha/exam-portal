import { routes } from "../../constants/routes";
import { privateAPI } from "../../utils/axiosInstance";

const fetchQuestionsAPI = async () => {
  const response = await privateAPI.get(routes.questionsAPI);
  return response.data;
};

const submitExamAPI = async (examData) => {
  const response = await privateAPI.post(routes.submitAPI, examData);
  return response.data;
};

export default { fetchQuestionsAPI, submitExamAPI };
