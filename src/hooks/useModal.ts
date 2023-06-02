import { useState } from "react";

export interface IModal {
  isShowing: boolean;
  open: () => void;
  close: () => void;
}

const useModal = (): IModal => {
  const [isShowing, setIsShowing] = useState(false);

  const open = () => {
    setIsShowing(true);
  };

  const close = () => {
    setIsShowing(false);
  };

  return {
    isShowing,
    open,
    close,
  };
};

export default useModal;
