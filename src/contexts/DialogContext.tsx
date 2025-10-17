import { createContext } from "react";

export type DialogContextType = {
  showDelete: (params?: { title?: string; content?: string; onClick?: (() => void) | null }) => void;
  hideDelete: () => void;
  showError: (params?: { title?: string; content?: string }) => void;
  hideError: () => void;
  showLoading: (params?: { typeElement?: string }) => void;
  hideLoading: () => void;
  showSuccess: (params?: {
    title?: string;
    content?: string;
    buttonLabel?: string;
    onClick?: (() => void) | null;
  }) => void;
  hideSuccess: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export default DialogContext;
