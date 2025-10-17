import apiClient from "../apiClient";

async function deleteFileByIdRequest(fileId: number) {
  const response = await apiClient.delete(`/articles/${fileId}`);
  return response.data;
}

export { deleteFileByIdRequest };
