import { useParams } from "react-router-dom";

import DiagnosisLayout from "./DiagnosisLayout";

function Patient() {
  const { patientId } = useParams();
  return <DiagnosisLayout origin={`/my-patients/${patientId}/diagnosis`} />;
}

export default Patient;
