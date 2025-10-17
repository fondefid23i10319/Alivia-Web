import apiClient from "../apiClient";

async function updatePatientRequest(userId: number, data: object) {
  const response = await apiClient.patch(`/users/${userId}`, data);
  return response.data;
}

async function updateBodyMapRequest(userId: number, data: object) {
  const response = await apiClient.patch(`/users/${userId}/body-map`, data);
  return response.data;
}

async function updateAssignedTaskRequest(taskId: number, data: object) {
  const response = await apiClient.patch(`/patientTasks/${taskId}`, data);
  return response.data;
}

export { updatePatientRequest, updateBodyMapRequest, updateAssignedTaskRequest };
