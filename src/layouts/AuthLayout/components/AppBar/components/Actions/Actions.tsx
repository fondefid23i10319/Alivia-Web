import PatientActions from "./PatientActions";
import ProfessionalActions from "./ProfessionalActions";

import { useAppSelector } from "../../../../../../hooks/redux";
import { selectIsPatient } from "../../../../../../features/auth/selectors";

function Actions() {
  const isPatient = useAppSelector(selectIsPatient);
  if (isPatient) return <PatientActions />;
  return <ProfessionalActions />;
}

export default Actions;
