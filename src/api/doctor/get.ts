import apiClient from "../apiClient";

async function getDoctorsRequest(userId: number) {
  const response = await apiClient.get(`/users/${userId}/professionals`);
  return response.data;
}

async function getDoctorsWithoutPatientRequestsRequest(userId: number) {
  const response = await apiClient.get(`/users/${userId}/professionals-without-requests`);
  return response.data;
}

async function getDoctorGeneralInfoRequest(userId: number) {
  const response = await apiClient.get(`/users/${userId}/doctor-general-info`);
  return response.data;
}

async function getPatientsAssignedRequest(userId: number) {
  const response = await apiClient.get(`/users/${userId}/patients`);
  return response.data;
}

async function getPatientRequestsToDoctorRequest(userId: number) {
  const response = await apiClient.get(`/users/${userId}/requests`);
  return response.data;
}

async function getSummaryStatsOfUsersRequest(userId: number, range: string) {
  const response = await apiClient.post(`/users/${userId}/summary`, { range });
  return response.data;
}

async function getCrisisOfPatients(userId: number) {
  const response = await apiClient.get(`/users/${userId}/alerts-summary`);
  return response.data;
}

export {
  getDoctorsRequest,
  getDoctorsWithoutPatientRequestsRequest,
  getDoctorGeneralInfoRequest,
  getPatientsAssignedRequest,
  getPatientRequestsToDoctorRequest,
  getSummaryStatsOfUsersRequest,
  getCrisisOfPatients,
};
