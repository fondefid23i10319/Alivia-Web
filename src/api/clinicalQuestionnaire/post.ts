import apiClient from "../apiClient";

async function createAnswerForItemRequest(itemId: number, data: object) {
  const response = await apiClient.post(`/clinicalQuestionnaires/self-report/items/${itemId}`, data);
  return response.data;
}

export { createAnswerForItemRequest };
