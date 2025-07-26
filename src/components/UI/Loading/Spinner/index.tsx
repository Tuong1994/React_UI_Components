import { CSSProperties, FC, Fragment } from "react";
import { ComponentColor } from "@/common/type";
import { FaSpinner } from "react-icons/fa";
import { SpinnerType } from "./type";
import utils from "@/utils";

export interface SpinnerProps {
  rootClassName?: string;
  style?: CSSProperties;
  type?: SpinnerType;
  color?: ComponentColor;
  size?: number;
}

const Spinner: FC<SpinnerProps> = ({
  rootClassName = "",
  style,
  size = 14,
  color = "gray",
  type = "default",
}) => {
  const dotStyle = { width: `${size}px`, height: `${size}px` };

  const colorClassName = type === "default" ? `spinner-default-${color}` : `spinner-bubble-${color}`;

  const defaultClassName = utils.formatClassName("spinner-default", colorClassName, rootClassName);

  const bubbleClassName = utils.formatClassName("spinner-bubble", colorClassName, rootClassName);

  return (
    <Fragment>
      {type === "default" && <FaSpinner style={style} size={size} className={defaultClassName} />}

      {type === "bubble" && (
        <div style={style} className={bubbleClassName}>
          {[...Array(2)].map((_, idx) => (
            <div className="bubble-item" key={idx}>
              <div style={dotStyle} className="item-dot"></div>
              <div style={dotStyle} className="item-dot"></div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Spinner;
