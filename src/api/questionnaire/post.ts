import apiClient from "../apiClient";

async function createQuestionnaireRequest(userId: number, data: object) {
  const response = await apiClient.post(`/questionaries/${userId}`, data);
  return response.data;
}

export { createQuestionnaireRequest };
