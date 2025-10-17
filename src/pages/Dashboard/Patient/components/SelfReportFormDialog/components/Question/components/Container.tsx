import { type ReactNode } from "react";

import Box from "@mui/material/Box";

import getPalette from "../utils/getPalette";

interface ContainerProps {
  typeMetric: string;
  children: ReactNode;
}

function Container({ typeMetric, children }: ContainerProps) {
  const pal = getPalette(typeMetric);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      py={2}
      gap={2}
      width="100%"
      minHeight="320px"
      sx={{
        backgroundImage: `linear-gradient(to bottom right, ${pal.start}, ${pal.end})`,
      }}
    >
      {children}
    </Box>
  );
}

export default Container;
