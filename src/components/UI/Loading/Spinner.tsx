import React from "react";
import { FaSpinner } from "react-icons/fa";

interface SpinnerProps {
  rootClassName?: string;
  style?: React.CSSProperties;
  type?: "default" | "bubble";
  size?: number;
  color?: "blue" | "red" | "green" | "yellow" | "orange" | "purple" | "pink" | "black" | "gray" | "white";
}

const Spinner: React.FC<SpinnerProps> = ({
  rootClassName = "",
  style,
  size = 14,
  color = "gray",
  type = "default",
}) => {
  const dotStyle = { width: `${size}px`, height: `${size}px` };

  const colorClassName = type === "default" ? `spinner-default-${color}` : `spinner-bubble-${color}`;

  return (
    <React.Fragment>
      {type === "default" && (
        <FaSpinner
          style={style}
          size={size}
          className={`spinner-default ${colorClassName} ${rootClassName}`}
        />
      )}
      {type === "bubble" && (
        <div style={style} className={`spinner-bubble ${colorClassName} ${rootClassName}`}>
          {[...Array(2)].map((_, idx) => (
            <div className="bubble-item" key={idx}>
              <div style={dotStyle} className="item-dot"></div>
              <div style={dotStyle} className="item-dot"></div>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default Spinner;
