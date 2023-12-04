import React from "react";
import { HiCheck } from "react-icons/hi2";
import { useFormContext } from "react-hook-form";
import { InputValue } from "../type";
import { ComponentColor, ComponentSize } from "@/common/type";
import FormContext from "../Form/FormContext";
import FormItemContext from "../Form/FormItemContext";

export interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  labelClassName?: string;
  controlClassName?: string;
  rootStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  controlStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  sizes?: ComponentSize;
  color?: Exclude<ComponentColor, "red">;
  onCheck?: (checked: boolean) => void;
  onCheckInput?: (value: InputValue) => void;
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
    value,
    onCheck,
    onCheckInput,
    ...restProps
  },
  ref
) => {
  const rhfMethods = useFormContext();

  const { color: rhfColor, sizes: rhfSizes } = React.useContext(FormContext);

  const { isRhf, rhfName, rhfValue, rhfDisabled, rhfError } = React.useContext(FormItemContext);

  const [isChecked, setIsChecked] = React.useState<boolean>(checked);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const controlSize = isRhf ? rhfSizes : sizes;

  const gapClassName = !isRhf ? "checkbox-gap" : "";

  const sizeClassName = `checkbox-${controlSize}`;

  const checkedClassName = isChecked ? `checkbox-checked-${controlColor}` : `checkbox-${controlColor}`;

  const errorClassName = rhfError ? "checkbox-group-error" : "";

  const disabledClassName = controlDisabled ? "checkbox-group-disabled" : "";

  React.useEffect(() => {
    if (!isRhf) return setIsChecked(checked);
    // setIsChecked(rhfValue);
  }, [isRhf, rhfValue, checked]);

  const iconSize = () => {
    if (sizes === "sm") return 12;
    if (sizes === "md") return 14;
    if (sizes === "lg") return 16;
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setIsChecked(checked);

    onCheck?.(checked);
    if (checked) onCheckInput?.(value);
    else onCheckInput?.("");

    if (isRhf) rhfMethods.setValue(rhfName, value);
  };

  return (
    <div
      style={rootStyle}
      className={`checkbox ${gapClassName} ${sizeClassName} ${checkedClassName} ${rootClassName}`}
    >
      <label className={`checkbox-group ${errorClassName} ${disabledClassName}`}>
        <input
          {...restProps}
          ref={ref}
          value={value}
          checked={isChecked}
          type="checkbox"
          className="group-control"
          disabled={controlDisabled}
          onChange={handleChecked}
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
