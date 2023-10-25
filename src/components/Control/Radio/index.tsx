import React from "react";
import FormContext from "../Form/Context";

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  labelClassName?: string;
  controlClassName?: string;
  rootStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  controlStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  sizes?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "orange" | "yellow" | "purple" | "pink" | "black" | "white";
  onCheck?: (value: any) => void;
}

const Radio: React.ForwardRefRenderFunction<HTMLInputElement, RadioProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    controlClassName = "",
    name,
    rootStyle,
    labelStyle,
    controlStyle,
    label,
    sizes = "md",
    color = "blue",
    checked = false,
    disabled,
    value,
    onCheck,
    onBlur,
    ...restProps
  },
  ref
) => {
  const { isRhf, rhfValue, rhfName, rhfDisabled, rhfError, rhfOnChange, rhfOnBlur } =
    React.useContext(FormContext);

  const [isChecked, setIsChecked] = React.useState<boolean>(checked);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlName = rhfName ? rhfName : name;

  const gapClassName = !isRhf ? "radio-gap" : "";

  const sizeClassName = `radio-${sizes}`;

  const colorClassName = `radio-${color}`;

  const errorClassName = rhfError ? "radio-group-error" : "";

  const disabledClassName = controlDisabled ? "radio-group-disabled" : "";

  React.useEffect(() => {
    if (!isRhf) return setIsChecked(checked);
    if (isRhf && rhfValue == value) return setIsChecked(true);
  }, [value, checked, isRhf, rhfValue]);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsChecked(!e.target.checked);
    onCheck?.(value);
  };

  const onChangeFn = rhfOnChange ? rhfOnChange : handleChecked;

  const onBlurFn = rhfOnBlur ? rhfOnBlur : onBlur;

  return (
    <div
      style={rootStyle}
      className={`radio ${gapClassName} ${sizeClassName} ${colorClassName} ${rootClassName}`}
    >
      <label className={`radio-group ${errorClassName} ${disabledClassName}`}>
        <input
          {...restProps}
          ref={ref}
          value={value}
          name={controlName}
          disabled={controlDisabled}
          checked={isChecked}
          type="radio"
          className="group-control"
          onChange={onChangeFn}
          onBlur={onBlurFn}
        />

        <div style={controlStyle} className={`group-checked ${controlClassName}`} />

        {label && (
          <div style={labelStyle} className={`group-label ${labelClassName}`}>
            {label}
          </div>
        )}
      </label>
    </div>
  );
};

export default React.forwardRef(Radio);
