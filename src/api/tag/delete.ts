import apiClient from "../apiClient";

async function deleteTagRequest(tagId: number) {
  const response = await apiClient.delete(`/tags/${tagId}`);
  return response.data;
}

async function deleteTagByPatientIdRequest(userId: number, tagId: number) {
  const response = await apiClient.delete(`/users/${userId}/tags`, {
    data: { tagID: tagId },
  });
  return response.data;
}

export { deleteTagRequest, deleteTagByPatientIdRequest };
