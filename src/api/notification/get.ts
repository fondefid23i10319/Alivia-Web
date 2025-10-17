import apiClient from "../apiClient";

async function getNotificationsByPatientIdRequest(userId: number) {
  const response = await apiClient.get(`/users/${userId}/notifications`);
  return response.data;
}

export { getNotificationsByPatientIdRequest };
