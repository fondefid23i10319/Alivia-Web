import apiClient from "../apiClient";

async function getTagsRequest() {
  const response = await apiClient.get(`/tags`);
  return response.data;
}

async function getTagsByPatientIdRequest(userId: number) {
  const response = await apiClient.get(`/users/${userId}/tags`);
  return response.data;
}

export { getTagsRequest, getTagsByPatientIdRequest };
