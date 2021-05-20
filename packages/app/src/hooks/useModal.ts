import React, { useCallback, useContext } from "react";
import { Context } from "../context/ModalProvider";

const useModal = (modal: React.ReactNode, key?: string) => {
  const { onDismiss, onPresent } = useContext(Context);

  const handlePresent = useCallback(() => {
    console.log("HANDLE PRESENT!!");
    onPresent(modal, key);
  }, [key, modal, onPresent]);

  return [handlePresent, onDismiss];
};

export default useModal;
