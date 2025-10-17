import apiClient from "../apiClient";

async function createWearableDataByPatientIdRequest(userId: number, data: object) {
  const response = await apiClient.post(`/users/${userId}/watchdata`, data);
  return response.data;
}

export { createWearableDataByPatientIdRequest };
