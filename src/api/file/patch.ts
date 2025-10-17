import apiClient from "../apiClient";

async function updateFileRequest(fileId: number, data: object) {
  const response = await apiClient.patch(`/articles/${fileId}`, data);
  return response.data;
}

export { updateFileRequest };
