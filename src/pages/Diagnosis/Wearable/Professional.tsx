import { useAppSelector } from "../../../hooks/redux";
import { selectId } from "../../../features/auth/selectors";

import Wearable from "./Wearable";

function Patient() {
  const id = useAppSelector(selectId);
  return <Wearable patientId={id} />;
}

export default Patient;
