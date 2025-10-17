import { useParams } from "react-router-dom";

import Content from "./Content";

function Professional() {
  const { patientId } = useParams();
  return <Content patientId={Number(patientId)} />;
}

export default Professional;
