import { useAppSelector } from "../../../hooks/redux";
import { selectId } from "../../../features/auth/selectors";

import Content from "./Content";

function Patient() {
  const id = useAppSelector(selectId);
  return <Content patientId={id} />;
}

export default Patient;
