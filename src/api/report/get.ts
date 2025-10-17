import apiClient from "../apiClient";

async function getReportByIdRequest(reportId: number) {
  const response = await apiClient.get(`/reports/${reportId}`);
  return response.data;
}

async function getReportsByPatientIdRequest(userId: number) {
  const response = await apiClient.get(`/users/${userId}/reports`);
  return response.data;
}

export { getReportByIdRequest, getReportsByPatientIdRequest };
