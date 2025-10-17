import apiClient from "../apiClient";

async function deleteQuestionnaireByIdRequest(questionnaireId: number) {
  const response = await apiClient.delete(`/questionaries/${questionnaireId}`);
  return response.data;
}

export { deleteQuestionnaireByIdRequest };
