import apiClient from "../apiClient";

async function getSelfReportsRequest(userId: number, range: string) {
  const response = await apiClient.get(`/users/${userId}/clinical-questionnaires-answers?range=${range}`);
  return response.data;
}

async function getItemsOfSelfReportRequest() {
  const response = await apiClient.get(`/clinicalQuestionnaires/self-report`);
  return response.data;
}

export { getSelfReportsRequest, getItemsOfSelfReportRequest };
