import apiClient from "../apiClient";

async function createCrisisAlertRequest(data: object) {
  const response = await apiClient.post(`/messages`, data);
  return response.data;
}

async function completeSelfReportRequest(userId: number, data: object) {
  const response = await apiClient.post(`/users/${userId}/self-report`, data);
  return response.data;
}

async function createDoctorAssignmentRequest(userId: number, data: object) {
  const response = await apiClient.post(`/users/${userId}/patient-request`, data);
  return response.data;
}

export { createCrisisAlertRequest, completeSelfReportRequest, createDoctorAssignmentRequest };
