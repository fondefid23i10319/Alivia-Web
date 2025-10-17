import apiClient from "../apiClient";

async function getPatientGeneralInfoRequest(userId: number) {
  const response = await apiClient.get(`/users/${userId}/patient-general-info`);
  return response.data;
}

async function getBodyMapRequest(userId: number) {
  const response = await apiClient.get(`/users/${userId}/body-map`);
  return response.data;
}

async function getDoctorsByPatientIdRequest(userId: number) {
  const response = await apiClient.get(`/users/${userId}/attendants`);
  return response.data;
}

async function getPatientUserHealthDataRequest(userId: number, statType: string, range: string) {
  const response = await apiClient.get(`/users/${userId}/health-data?statType=${statType}&range=${range}`);
  return response.data;
}

export {
  getPatientGeneralInfoRequest,
  getBodyMapRequest,
  getDoctorsByPatientIdRequest,
  getPatientUserHealthDataRequest,
};
