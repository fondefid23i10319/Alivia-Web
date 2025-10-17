interface PaletteColor {
  main: string;
  dark?: string;
}

interface ThemePalette {
  error: PaletteColor;
  info: PaletteColor;
  warning: PaletteColor;
  success: PaletteColor;
}

interface Theme {
  palette: ThemePalette;
}

interface MoodFaceStyle {
  backgroundColor: string;
  color: string;
}

function renderMoodFaceStyle(value: number, theme: Theme): MoodFaceStyle {
  if (value === 0) {
    return { backgroundColor: theme.palette.error.main, color: theme.palette.error.main };
  }
  if (value === 1) {
    return { backgroundColor: theme.palette.info.main, color: theme.palette.info.main };
  }
  if (value === 2) {
    return { backgroundColor: theme.palette.warning.main, color: theme.palette.warning.main };
  }
  if (value === 3) {
    return { backgroundColor: theme.palette.success.main, color: theme.palette.success.main };
  }
  if (value === 4) {
    return { backgroundColor: theme.palette.success.dark!, color: theme.palette.success.dark! };
  }
  return { backgroundColor: "transparent", color: "grey" };
}

export default renderMoodFaceStyle;
