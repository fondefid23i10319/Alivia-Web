function renderMetricName(name: string): string {
  if (name === "general-health") {
    return "Salud General";
  }
  if (name === "medicines") {
    return "Medicamentos";
  }
  if (name === "level-pain") {
    return "Nivel de Dolor";
  }
  if (name === "medicine-sos") {
    return "Medicamento SOS";
  }
  if (name === "symptoms") {
    return "Síntomas";
  }
  if (name === "exercises") {
    return "Ejercicios";
  }
  if (name === "level-sleep") {
    return "Nivel de Sueño";
  }
  if (name === "fatigue") {
    return "Fátiga";
  }
  if (name === "emotions") {
    return "Emociones";
  }
  if (name === "weight") {
    return "Peso";
  }
  if (name === "goals") {
    return "Metas";
  }
  return "";
}

export default renderMetricName;
