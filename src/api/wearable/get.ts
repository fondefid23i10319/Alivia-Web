import apiClient from "../apiClient";

async function getWearableDataByPatientIdRequest(userId: number, range: string) {
  const response = await apiClient.get(`/users/${userId}/watchdata?range=${range}`);
  return response.data;
}

export { getWearableDataByPatientIdRequest };
