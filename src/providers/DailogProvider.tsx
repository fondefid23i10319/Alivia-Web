import React, { useState, useCallback } from "react";

import DeleteDialog from "../components/dialogs/DeleteDialog";
import ErrorDialog from "../components/dialogs/ErrorDialog";
import LoadingDialog from "../components/dialogs/LoadingDialog";
import SuccessDialog from "../components/dialogs/SuccessDialog";

import DialogContext from "../contexts/DialogContext";

type DeleteState = {
  open: boolean;
  title: string;
  content: string;
  onClick: (() => void) | null;
};

type ErrorState = {
  open: boolean;
  title: string;
  content: string;
};

type LoadingState = {
  open: boolean;
  typeElement: string;
};

type SuccessState = {
  open: boolean;
  title: string;
  content: string;
  buttonLabel: string;
  onClick: (() => void) | null;
};

const DialogProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  const [deleteState, setDeleteState] = useState<DeleteState>({
    open: false,
    title: "",
    content: "",
    onClick: null,
  });

  const [errorState, setErrorState] = useState<ErrorState>({
    open: false,
    title: "",
    content: "",
  });

  const [loadingState, setLoadingState] = useState<LoadingState>({
    open: false,
    typeElement: "",
  });

  const [successState, setSuccessState] = useState<SuccessState>({
    open: false,
    title: "",
    content: "",
    buttonLabel: "Entendido",
    onClick: null,
  });

  const showDelete = useCallback(
    (params: { title?: string; content?: string; onClick?: (() => void) | null } = {}) => {
      const { title = "Eliminar", content = "", onClick = null } = params;
      setDeleteState({ open: true, title, content, onClick });
    },
    []
  );

  const hideDelete = useCallback(() => {
    setDeleteState((s) => ({ ...s, open: false }));
  }, []);

  const handleDeleteButtonClick = useCallback(() => {
    if (typeof deleteState.onClick === "function") {
      deleteState.onClick();
    }
    hideDelete();
  }, [deleteState, hideDelete]);

  const showError = useCallback((params: { title?: string; content?: string } = {}) => {
    const { title = "Error", content = "" } = params;
    setErrorState({ open: true, title, content });
  }, []);

  const hideError = useCallback(() => {
    setErrorState((s) => ({ ...s, open: false }));
  }, []);

  const showLoading = useCallback((params: { typeElement?: string } = {}) => {
    const { typeElement = "" } = params;
    setLoadingState({ open: true, typeElement });
  }, []);

  const hideLoading = useCallback(() => {
    setLoadingState((s) => ({ ...s, open: false }));
  }, []);

  const showSuccess = useCallback(
    (params: { title?: string; content?: string; buttonLabel?: string; onClick?: (() => void) | null } = {}) => {
      const { title = "Éxito", content = "", buttonLabel = "Aceptar", onClick = null } = params;
      setSuccessState({ open: true, title, content, buttonLabel, onClick });
    },
    []
  );

  const hideSuccess = useCallback(() => {
    setSuccessState((s) => ({ ...s, open: false }));
  }, []);

  const handleSuccessButtonClick = useCallback(() => {
    if (typeof successState.onClick === "function") {
      successState.onClick();
    }
    hideSuccess();
  }, [successState, hideSuccess]);

  return (
    <DialogContext.Provider
      value={{
        showDelete,
        hideDelete,
        showError,
        hideError,
        showLoading,
        hideLoading,
        showSuccess,
        hideSuccess,
      }}
    >
      {children}

      <DeleteDialog
        open={deleteState.open}
        title={deleteState.title}
        content={deleteState.content}
        onClose={hideDelete}
        onClick={handleDeleteButtonClick}
      />

      <ErrorDialog
        open={errorState.open}
        title={errorState.title}
        content={errorState.content}
        onClose={hideError}
      />

      <LoadingDialog open={loadingState.open} typeElement={loadingState.typeElement} onClose={hideLoading} />

      <SuccessDialog
        open={successState.open}
        title={successState.title}
        content={successState.content}
        buttonLabel={successState.buttonLabel}
        onClose={hideSuccess}
        onClick={handleSuccessButtonClick}
      />
    </DialogContext.Provider>
  );
};

export default DialogProvider;
