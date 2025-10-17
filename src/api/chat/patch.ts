import apiClient from "../apiClient";

async function updateChatRequest(userId: number, chatId: number, data: object) {
  const response = await apiClient.patch(`/chats/${chatId}/${userId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export { updateChatRequest };
