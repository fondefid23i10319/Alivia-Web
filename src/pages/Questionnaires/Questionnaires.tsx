import Patient from "./Patient";
import Professional from "./Professional";

import { useAppSelector } from "../../hooks/redux";
import { selectIsPatient } from "../../features/auth/selectors";

function Questionnaires() {
  const isPatient = useAppSelector(selectIsPatient);
  if (isPatient) return <Patient />;
  return <Professional />;
}

export default Questionnaires;
