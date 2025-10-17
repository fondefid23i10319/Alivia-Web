import type { PaletteProps } from "../../../interfaces";

import paletteByMetric from "../constants/paletteByMetric";

function getPalette(name: string): PaletteProps {
  return (
    paletteByMetric[name] ?? {
      start: "#F7FAFF",
      end: "#EEF6FF",
      accent: "#4476B5",
    }
  );
}
export default getPalette;
