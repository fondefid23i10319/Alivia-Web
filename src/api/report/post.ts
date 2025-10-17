import apiClient from "../apiClient";

async function createReportRequest(userId: number, data: object) {
  const response = await apiClient.post(`/reports/${userId}`, data);
  return response.data;
}

export { createReportRequest };
