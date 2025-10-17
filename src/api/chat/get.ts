import apiClient from "../apiClient";

async function getChatsRequest(userId: number) {
  const response = await apiClient.get(`/chats/${userId}`);
  return response.data;
}

async function getChatMessagesRequest(userId: number, chatId: number) {
  const response = await apiClient.get(`/chats/seeChat/${chatId}/${userId}`);
  return response.data;
}

async function getUnreadChatMessages(userId: number) {
  const response = await apiClient.get(`/chats/unreadCount/${userId}`);
  return response.data;
}

export { getChatsRequest, getChatMessagesRequest, getUnreadChatMessages };
