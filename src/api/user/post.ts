import baseApi from "../baseApi";

async function createProfileRequest(userId: number, data: object) {
  const response = await baseApi.post(`/users/${userId}/image`, data);
  return response.data;
}

async function createInvitationToNewPatientRequest(data: object) {
  const response = await baseApi.post(`/users/new-account`, data);
  return response.data;
}

async function createNewPasswordRequest(userId: number, data: object) {
  const response = await baseApi.post(`/users/${userId}/change-password`, data);
  return response.data;
}

export { createProfileRequest, createInvitationToNewPatientRequest, createNewPasswordRequest };
