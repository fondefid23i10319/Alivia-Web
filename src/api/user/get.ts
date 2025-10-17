import apiClient from "../apiClient";

async function getUserRequest(userId: number) {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
}
export { getUserRequest };
