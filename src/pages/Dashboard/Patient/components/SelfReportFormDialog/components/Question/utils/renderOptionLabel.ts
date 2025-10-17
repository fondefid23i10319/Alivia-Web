function renderOptionLabel(type: string, option: number): string {
  if (type === "general-health" || type === "exercises") {
    if (option === 0) {
      return "Muy mal";
    }
    if (option === 1) {
      return "Mal";
    }
    if (option === 2) {
      return "Regular";
    }
    if (option === 3) {
      return "Bien";
    }
    return "Muy bien";
  }
  if (type === "medicines" || type === "medicine-sos" || type === "symptoms" || type === "confirmation") {
    if (option === 0) {
      return "No";
    }
    if (option === 1) {
      return "Sí";
    }
  }
  if (type === "emotions") {
    if (option === 0) {
      return "Rabia";
    }
    if (option === 1) {
      return "Frustración";
    }
    if (option === 2) {
      return "Tristeza";
    }
    if (option === 3) {
      return "Miedo";
    }
    return "Alegría";
  }
  if (type === "weight") {
    if (option === 0) {
      return "Disminuyó";
    }
    if (option === 1) {
      return "No cambio";
    }
    return "Aumento";
  }
  return "";
}

export default renderOptionLabel;
