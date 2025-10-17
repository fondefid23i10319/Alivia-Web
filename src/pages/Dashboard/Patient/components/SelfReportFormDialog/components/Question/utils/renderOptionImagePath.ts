function renderOptionImagePath(type: string, option: number): string {
  // ["Muy mal", "Mal", "Regular", "Bien", "Muy bien"]
  if (type === "general-health" || type === "exercises") {
    if (option === 0) {
      return "/src/assets/images/self-report/feel-very-bad.png";
    }
    if (option === 1) {
      return "/src/assets/images/self-report/feel-bad.png";
    }
    if (option === 2) {
      return "/src/assets/images/self-report/feel-regular.png";
    }
    if (option === 3) {
      return "/src/assets/images/self-report/feel-good.png";
    }
    return "/src/assets/images/self-report/feel-very-good.png";
  }
  //["No", "Sí"]
  if (type === "medicines" || type === "medicine-sos" || type === "confirmation") {
    if (option === 0) {
      return "/src/assets/images/self-report/negative.png";
    }
    if (option === 1) {
      return "/src/assets/images/self-report/afirmative.png";
    }
  }
  //["Rabia", "Frustración", "Tristeza", "Miedo", "Alegría"]
  if (type === "emotions") {
    if (option === 0) {
      return "/src/assets/images/self-report/feel-angry.png";
    }
    if (option === 1) {
      return "/src/assets/images/self-report/feel-frustration.png";
    }
    if (option === 2) {
      return "/src/assets/images/self-report/feel-sad.png";
    }
    if (option === 3) {
      return "/src/assets/images/self-report/feel-fear.png";
    }
    return "/src/assets/images/self-report/feel-happiness.png";
  }
  //["No, disminuyo", "No ha variado", "Sí, aumento"]
  if (type === "weight") {
    if (option === 0) {
      return "/src/assets/images/self-report/decrease.png";
    }
    if (option === 1) {
      return "/src/assets/images/self-report/equal.png";
    }
    return "/src/assets/images/self-report/increase.png";
  }
  return "";
}

export default renderOptionImagePath;
