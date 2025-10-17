import apiClient from "../apiClient";

async function createChatRequest(data: object) {
  const response = await apiClient.post(`/chats`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export { createChatRequest };
