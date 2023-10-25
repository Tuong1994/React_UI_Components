import React from "react";
import { HiCheck } from "react-icons/hi2";
import FormContext from "../Form/Context";

export interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  labelClassName?: string;
  controlClassName?: string;
  rootStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  controlStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  sizes?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "orange" | "yellow" | "purple" | "pink" | "black" | "white";
  onCheck?: (checked: boolean) => void;
}

const CheckBox: React.ForwardRefRenderFunction<HTMLInputElement, CheckBoxProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    controlClassName = "",
    rootStyle,
    labelStyle,
    controlStyle,
    label,
    sizes = "md",
    color = "blue",
    checked = false,
    disabled,
    onCheck,
    onBlur,
    ...restProps
  },
  ref
) => {
  const { isRhf, rhfValue, rhfDisabled, rhfError, rhfOnChange, rhfOnBlur } = React.useContext(FormContext);

  const [isChecked, setIsChecked] = React.useState<boolean>(checked);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const sizeClassName = `checkbox-${sizes}`;

  const gapClassName = !isRhf ? "checkbox-gap" : "";

  const checkedClassName = isChecked ? `checkbox-checked-${color}` : `checkbox-${color}`;

  const errorClassName = rhfError ? "checkbox-group-error" : "";

  const disabledClassName = controlDisabled ? "checkbox-group-disabled" : "";

  React.useEffect(() => {
    if (!isRhf) return setIsChecked(checked);
    setIsChecked(rhfValue);
  }, [isRhf, rhfValue, checked]);

  const iconSize = () => {
    if (sizes === "sm") return 12;
    if (sizes === "md") return 14;
    if (sizes === "lg") return 16;
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(!checked);
    onCheck?.(checked);
  };

  const onChangeFn = rhfOnChange ? rhfOnChange : handleChecked;

  const onBlurFn = rhfOnBlur ? rhfOnBlur : onBlur;

  return (
    <div
      style={rootStyle}
      className={`checkbox ${gapClassName} ${sizeClassName} ${checkedClassName} ${rootClassName}`}
    >
      <label className={`checkbox-group ${errorClassName} ${disabledClassName}`}>
        <input
          {...restProps}
          ref={ref}
          type="checkbox"
          className="group-control"
          disabled={controlDisabled}
          onChange={onChangeFn}
          onBlur={onBlurFn}
        />

        <div style={controlStyle} className={`group-checked ${controlClassName}`}>
          {isChecked && <HiCheck size={iconSize()} />}
        </div>

        {label && (
          <div style={labelStyle} className={`group-label ${labelClassName}`}>
            {label}
          </div>
        )}
      </label>
    </div>
  );
};

export default React.forwardRef(CheckBox);
