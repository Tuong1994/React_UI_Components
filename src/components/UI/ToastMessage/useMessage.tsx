import useMessageStore from "./MessageStore";

const useMessage = () => {
  const [toasts, addToast] = useMessageStore((state) => [state.toasts, state.addToast]);

  const success = (message: string) => addToast("success", message);

  const error = (message: string) => addToast("error", message);

  const warning = (message: string) => addToast("warning", message);

  const info = (message: string) => addToast("info", message);

  const messageApi = { success, error, warning, info };

  return { toasts, messageApi };
};

export default useMessage;
