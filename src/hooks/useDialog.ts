import { useContext } from "react";

import DialogContext from "../contexts/DialogContext";
import type { DialogContextType } from "../contexts/DialogContext";

export default function useDialog(): DialogContextType {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return ctx;
}
