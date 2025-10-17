import apiClient from "../apiClient";

async function getFilesRequest() {
  const response = await apiClient.get(`/articles`);
  return response.data;
}

async function getFilesByPatientIdRequest(userId: number) {
  const response = await apiClient.get(`/users/${userId}/articles`);
  return response.data;
}

async function getPresignedUrl(fileName: string, fileType: string) {
  const response = await apiClient.get(`/articles/presigned-url`, {
    params: { fileName, fileType },
  });
  return response.data;
}

export { getFilesRequest, getFilesByPatientIdRequest, getPresignedUrl };
