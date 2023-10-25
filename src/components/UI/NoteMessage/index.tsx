import React from "react";

export interface NoteMessageProps {
  rootClassName?: string;
  style?: React.CSSProperties;
  message?: string;
  weight?: number;
  italic?: boolean;
  type?: "default" | "error";
  size?: "sm" | "md" | "lg" | number;
}

const NoteMessage: React.ForwardRefRenderFunction<HTMLDivElement, NoteMessageProps> = (
  { rootClassName = "", style, message = "", type = "default", size = "md", italic, weight = 400 },
  ref
) => {
  const typeClassName = `note-message-${type}`;

  const italicClassName = italic ? `note-message-italic` : "";

  const inlineStyle = (): React.CSSProperties => {
    const customStyle: React.CSSProperties = { ...style, fontWeight: weight };
    if (typeof size === "number") return { ...customStyle, fontSize: `${size}px` };
    if (size === "sm") return { ...customStyle, fontSize: "12px" };
    if (size === "md") return { ...customStyle, fontSize: "14px" };
    if (size === "lg") return { ...customStyle, fontSize: "18px" };
    return { ...customStyle };
  };

  return (
    <div
      ref={ref}
      style={inlineStyle()}
      className={`note-message ${typeClassName} ${italicClassName} ${rootClassName}`}
    >
      {message}
    </div>
  );
};

export default React.forwardRef(NoteMessage);
