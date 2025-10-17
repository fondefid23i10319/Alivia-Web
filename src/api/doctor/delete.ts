import apiClient from "../apiClient";

async function deleteAssignedPatientRequest(userId: number, patientId: number) {
  const response = await apiClient.delete(`/users/${userId}/patients`, {
    data: { patientID: patientId },
  });
  return response.data;
}

export { deleteAssignedPatientRequest };
