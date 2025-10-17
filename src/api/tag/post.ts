import apiClient from "../apiClient";

async function createTagRequest(data: object) {
  const response = await apiClient.post(`/tags`, data);
  return response.data;
}

async function addTagToPatientRequest(userId: number, data: object) {
  const response = await apiClient.post(`/users/${userId}/tags`, data);
  return response.data;
}

export { createTagRequest, addTagToPatientRequest };
