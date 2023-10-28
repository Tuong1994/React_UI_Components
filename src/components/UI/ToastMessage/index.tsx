import React from "react";
import ToastMessageItem from "./Item";
import Portal from "@/components/Portal";
import useMessage from "./useMessage";
import useRender from "@/hooks/useRender";

export interface ToastMessageProps {
  rootClassName?: string;
  style?: React.CSSProperties;
}

const ToastMessage: React.ForwardRefRenderFunction<HTMLDivElement, ToastMessageProps> = (
  { rootClassName = "", style },
  ref
) => {
  const { toasts } = useMessage();

  const render = useRender(toasts.length > 0);

  return (
    <Portal>
      {render && (
        <div ref={ref} style={style} className={`toast-message ${rootClassName}`}>
          {toasts.map((toast) => (
            <ToastMessageItem key={toast.id} toast={toast} />
          ))}
        </div>
      )}
    </Portal>
  );
};

export default React.forwardRef(ToastMessage);
