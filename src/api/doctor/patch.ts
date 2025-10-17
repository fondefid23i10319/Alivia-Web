import apiClient from "../apiClient";

async function updatePatientRequestToDoctorRequest(userId: number, data: object) {
  const response = await apiClient.patch(`/users/${userId}/update-request`, data);
  return response.data;
}

async function updatePatientDiagnosesRequest(userId: number, data: object) {
  const response = await apiClient.patch(`/users/${userId}/diagnosis`, data);
  return response.data;
}

export { updatePatientRequestToDoctorRequest, updatePatientDiagnosesRequest };
