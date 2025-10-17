import apiClient from "../apiClient";

async function createFileRequest(data: object) {
  const response = await apiClient.post(`/articles`, data);
  return response.data;
}

async function assignFileToPatientRequest(articleId: number, data: object) {
  const response = await apiClient.post(`/articles/${articleId}/patients`, data);

  return response;
}

export { createFileRequest, assignFileToPatientRequest };
