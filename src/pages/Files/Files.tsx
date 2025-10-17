import PatientFiles from "./Patient";
import ProfessionalFiles from "./Professional";

import { useAppSelector } from "../../hooks/redux";
import { selectIsPatient } from "../../features/auth/selectors";

function Files() {
  const isPatient = useAppSelector(selectIsPatient);
  if (isPatient) return <PatientFiles />;
  return <ProfessionalFiles />;
}

export default Files;
