import { HTMLAttributes, ForwardRefRenderFunction, forwardRef, CSSProperties } from "react";
import { TypingTextColor } from "./type";
import useTypingInterval from "./useTypingInterval";
import utils from "@/utils";

interface TypingTextProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  contentClassName?: string;
  textList?: string[];
  textWeight?: number;
  textColor?: TypingTextColor;
}

const TypingText: ForwardRefRenderFunction<HTMLDivElement, TypingTextProps> = (
  { rootClassName = "", contentClassName = "", textList = ['Typing Text'], textWeight = 500, textColor, ...restProps },
  ref
) => {
  const typingText = useTypingInterval(textList);

  const colorClassName = textColor ? `typing-text-${textColor}` : "";

  const mainClassName = utils.formatClassName("typing-text", colorClassName, rootClassName);

  const textClassName = utils.formatClassName("typing-text-content", contentClassName);

  const textStyle: CSSProperties = { fontWeight: textWeight };

  return (
    <div ref={ref} {...restProps} className={mainClassName}>
      <div style={textStyle} className={textClassName}>
        {typingText}
        <div className="content-line" />
      </div>
    </div>
  );
};

export default forwardRef(TypingText);
