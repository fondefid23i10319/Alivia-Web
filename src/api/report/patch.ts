import apiClient from "../apiClient";

async function updateReportRequest(reportId: number, data: object) {
  const response = await apiClient.patch(`/reports/${reportId}`, data);
  return response.data;
}

export { updateReportRequest };
