import { create } from 'zustand';

type ModalContent = {
  title?: string;
  content?: string;
  children?: React.ReactNode | null;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isVisible: boolean;
};

type ModalContentState = {
  modalState: ModalContent;
  setModalState: (
    isVisible: boolean,
    title: string,
    content: string,
    children: React.ReactNode | null,
    confirmText: string,
    cancelText: string,
    onConfirm: () => void,
    onCancel: () => void,
  ) => void;
  removeModal: () => void;
};
export const useModal = create<ModalContentState>(set => ({
  modalState: {
    isVisible: false,
    title: '',
    content: '',
    children: null,
    confirmText: '',
    cancelText: '',
    onConfirm: () => {},
    onCancel: () => {},
  },
  setModalState: (
    isVisible,
    title,
    content,
    children,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
  ) => {
    set(state => {
      const current = state.modalState;

      const unchanged =
        current.isVisible === isVisible &&
        current.title === title &&
        current.content === content &&
        current.children === children &&
        current.confirmText === confirmText &&
        current.cancelText === cancelText &&
        current.onConfirm === onConfirm &&
        current.onCancel === onCancel;

      if (unchanged) return state;

      return {
        modalState: {
          isVisible,
          title,
          content,
          children,
          confirmText,
          cancelText,
          onConfirm,
          onCancel,
        },
      };
    });
  },
  removeModal: () => {
    set(state => {
      if (!state.modalState.isVisible) return state;
      return { modalState: { ...state.modalState, isVisible: false } };
    });
  },
}));
