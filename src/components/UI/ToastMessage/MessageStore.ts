import { create, StateCreator } from "zustand";
import { ToastMessage, ToastMessages, ToastType } from "./type";
import utils from "@/utils";

interface MessageState {
  toasts: ToastMessages;
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
}

const store: StateCreator<MessageState> = (set) => ({
  toasts: [],
  addToast: (type, message) => {
    const newToast: ToastMessage = { id: utils.uuid(), type, message };
    set((state) => ({ ...state, toasts: [newToast, ...state.toasts] }));
  },
  removeToast: (id) =>
    set((state) => ({ ...state, toasts: [...state.toasts].filter((toast) => toast.id !== id) })),
});

const useMessageStore = create(store);

export default useMessageStore;
