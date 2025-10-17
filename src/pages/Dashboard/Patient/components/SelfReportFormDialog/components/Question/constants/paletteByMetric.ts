import type { PaletteProps } from "../../../interfaces";

const paletteByMetric: Record<string, PaletteProps> = {
  "general-health": { start: "#FFF7E6", end: "#FFF3D1", accent: "#8C7233" },
  medicines: { start: "#E9F9F0", end: "#DFF3E8", accent: "#2E8457" },
  "level-pain": {
    start: "#F0F6FF",
    end: "#E6F0FF",
    accent: "#4476B5",
  },
  "medicine-sos": {
    start: "#FFF1F0",
    end: "#FFE6E5",
    accent: "#C0392B",
  },
  symptoms: { start: "#F6EAFE", end: "#F3E4FD", accent: "#8465BF" },
  exercises: { start: "#FFF8E8", end: "#FFF2D8", accent: "#917235" },
  "level-sleep": { start: "#F0FAFF", end: "#E6F8FF", accent: "#447C99" },
  fatigue: { start: "#FFF6F6", end: "#FFF0F0", accent: "#B45B5B" },
  emotions: { start: "#F5F0FF", end: "#EEE7FF", accent: "#8365B4" },
  weight: { start: "#F7FFF5", end: "#EEFFEA", accent: "#4F8050" },
  goals: {
    start: "#FFF8F0",
    end: "#FFF4EA",
    accent: "#8E7143",
  },
};

export default paletteByMetric;
