import apiClient from "../apiClient";

async function updateUserRequest(userId: number, data: object) {
  const response = await apiClient.patch(`/users/${userId}`, data);
  return response.data;
}

async function updatePasswordRequest(userId: number, data: object) {
  const response = await apiClient.patch(`/users/${userId}/change-password`, data);
  return response.data;
}

export { updateUserRequest, updatePasswordRequest };
