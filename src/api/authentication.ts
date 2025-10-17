import apiClient from "./apiClient";

async function signInRequest(data: { email: string; password: string }) {
  const response = await apiClient.post(`/authenticate`, data, {
    headers: {
      Authorization: `Basic ${btoa(`${data.email}:${data.password}`)}`,
    },
  });
  return response.data;
}

async function forgotPasswordRequest(data: object) {
  const response = await apiClient.post(`/users/forgot-password`, data);
  return response.data;
}

async function resetPasswordRequest(data: object) {
  const response = await apiClient.post(`/users/reset-password`, data);
  return response.data;
}

export { signInRequest, forgotPasswordRequest, resetPasswordRequest };
