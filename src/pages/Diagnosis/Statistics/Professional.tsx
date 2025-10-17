import { useAppSelector } from "../../../hooks/redux";
import { selectId } from "../../../features/auth/selectors";

import Statistics from "./Content/Content";

function Patient() {
  const id = useAppSelector(selectId);
  return <Statistics patientId={id} />;
}

export default Patient;
