import apiClient from "../apiClient";

async function deleteChatByIdRequest(userId: number, chatId: number) {
  const response = await apiClient.delete(`/chats/${chatId}/${userId}`);
  return response.data;
}

export { deleteChatByIdRequest };
