"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import ModalShell from "~/components/modal-shell/ModalShell";

interface Component {
  component: React.ReactElement;
}

interface ModalContextType {
  openModal: (component: Component) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({} as ModalContextType);

interface ModalProviderProps {
  children: React.ReactNode;
}

function ModalProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState<React.ReactElement | null>(null);

  const openModal: ModalContextType["openModal"] = useCallback(
    ({ component }) => setModal(component),
    []
  );
  const closeModal: ModalContextType["closeModal"] = useCallback(
    () => setModal(null),
    []
  );

  const contextValue: ModalContextType = {
    openModal,
    closeModal
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modal && <ModalShell content={modal} />}
    </ModalContext.Provider>
  );
}

const useModalContext = () => useContext(ModalContext);

export { ModalProvider, useModalContext };
