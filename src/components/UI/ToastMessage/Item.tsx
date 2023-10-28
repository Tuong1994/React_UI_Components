import React from "react";
import { ToastMessage } from "./type";
import {
  HiXMark,
  HiOutlineCheckCircle as SuccessIcon,
  HiOutlineXCircle as ErrorIcon,
  HiOutlineInformationCircle as InfoIcon,
} from "react-icons/hi2";
import { PiWarningCircle as WarningIcon } from "react-icons/pi";
import { Record } from "@/common/base";
import useMessageStore from "./MessageStore";

interface ToastMessageItemProps {
  toast: ToastMessage;
}

const ANIMATION_TIME = 4000;

const ToastMessageItem: React.FC<ToastMessageItemProps> = ({ toast }) => {
  const removeToast = useMessageStore((state) => state.removeToast);

  const [removed, setRemoved] = React.useState<boolean>(false);

  const barRef = React.useRef<HTMLDivElement>(null);

  const timeRef = React.useRef<any>(null);

  const { id, type, message } = toast;

  const typeClassName = `message-item-${type}`;

  const removeClassName = removed ? "message-item-hide" : "";

  React.useEffect(() => {
    timeRef.current = setTimeout(() => handleRemove(), ANIMATION_TIME);
    return () => clearTimeout(timeRef.current);
  }, []);

  const iconType = () => {
    const iconProps = { size: 20 };
    const icon: Record = {
      success: <SuccessIcon {...iconProps} />,
      error: <ErrorIcon {...iconProps} />,
      warning: <WarningIcon {...iconProps} />,
      info: <InfoIcon {...iconProps} />,
    };
    return icon[type ?? "success"];
  };

  const handleRemove = () => {
    setRemoved(true);
    setTimeout(() => removeToast(id), 400);
  };

  const handleMouseEnter = () => {
    if (!barRef.current) return;
    clearTimeout(timeRef.current);
    barRef.current.style.animationPlayState = "paused";
  };

  const handleMouseLeave = () => {
    const barEl = barRef.current;
    if (!barEl) return;
    if (!barEl.parentElement) return;
    const remainTime = (barEl.offsetWidth / barEl.parentElement.offsetWidth) * ANIMATION_TIME;
    barEl.style.animationPlayState = "running";
    timeRef.current = setTimeout(() => handleRemove(), remainTime);
  };

  return (
    <div
      className={`message-item ${typeClassName} ${removeClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="item-content">
        <div className="content-icon">{iconType()}</div>

        <div className="content-message">
          <p className="message-text">{message}</p>

          <div className="message-progress">
            <div ref={barRef} className="progress-bar" />
          </div>
        </div>
      </div>

      <button type="button" className="item-action" onClick={handleRemove}>
        <HiXMark />
      </button>
    </div>
  );
};

export default ToastMessageItem;
