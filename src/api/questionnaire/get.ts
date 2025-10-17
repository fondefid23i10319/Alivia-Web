import apiClient from "../apiClient";

async function getQuestionnairesRequest() {
  const response = await apiClient.get(`/questionaries`);
  return response.data;
}

async function getQuestionnaireByIdRequest(questionnaireId: number) {
  const response = await apiClient.get(`/questionaries/${questionnaireId}`);
  return response.data;
}

export { getQuestionnairesRequest, getQuestionnaireByIdRequest };
