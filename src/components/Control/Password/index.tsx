import React from "react";
import { HiEye, HiEyeSlash, HiXCircle } from "react-icons/hi2";
import { InputValue } from "../type";
import { useFormContext } from "react-hook-form";
import FormContext from "../Form/Context";

export interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  rootStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  addonBefore?: React.ReactNode | React.ReactNode[];
  addonAfter?: React.ReactNode | React.ReactNode[];
  sizes?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "orange" | "yellow" | "purple" | "pink";
  onChangeInput?: (text: string) => void;
}

const InputPassword: React.ForwardRefRenderFunction<HTMLInputElement, InputPasswordProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    inputClassName = "",
    rootStyle,
    labelStyle,
    label,
    addonBefore,
    addonAfter,
    value = "",
    sizes = "md",
    color = "blue",
    placeholder = "Enter infomation...",
    disabled,
    onBlur,
    onChangeInput,
    ...restProps
  },
  ref
) => {
  const rhfMethods = useFormContext();

  const { isRhf, rhfName, rhfError, rhfValue, rhfDisabled, rhfOnChange, rhfOnBlur } =
    React.useContext(FormContext);

  const [inputValue, setInputValue] = React.useState<InputValue>(value);

  const [isPassword, setIsPassword] = React.useState<boolean>(true);

  const inputRef = React.useRef<HTMLDivElement>(null);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const showClearIcon = inputValue && !controlDisabled;

  const sizeClassName = `input-${sizes}`;

  const colorClassName = `input-${color}`;

  const disabledClassName = controlDisabled ? "input-disabled" : "";

  const errorClassName = rhfError ? "input-error" : "";

  // Focus input when error is trigger
  React.useEffect(() => {
    if (rhfError) inputRef.current?.click();
  }, [rhfError]);

  // Set default value
  React.useEffect(() => {
    if (isRhf) return setInputValue(rhfValue);
    setInputValue(value);
  }, [value, isRhf, rhfValue]);

  const iconSize = () => {
    if (sizes === "sm") return 14;
    if (sizes === "md") return 16;
    if (sizes === "lg") return 18;
  };

  const handleSwitchType = () => setIsPassword(!isPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChangeInput?.(value);
  };

  const handleClearInput = () => {
    if (isRhf) return rhfMethods.setValue(rhfName, "");
    setInputValue("");
    onChangeInput?.("");
  };

  const onChangeFn = rhfOnChange ? rhfOnChange : handleChange;

  const onBlurFn = rhfOnBlur ? rhfOnBlur : onBlur;

  return (
    <div
      style={rootStyle}
      className={`input ${colorClassName} ${sizeClassName} ${errorClassName} ${rootClassName} ${disabledClassName}`}
    >
      <label>
        {label && (
          <div style={labelStyle} className={`input-label ${labelClassName}`}>
            {label}
          </div>
        )}

        <div ref={inputRef} className="input-group">
          {addonBefore && <div className="group-addon group-addon-before">{addonBefore}</div>}

          <div className="group-control">
            <input
              {...restProps}
              ref={ref}
              value={inputValue}
              disabled={controlDisabled}
              placeholder={placeholder}
              type={isPassword ? "password" : "text"}
              className={`control-box ${inputClassName}`}
              onChange={onChangeFn}
              onBlur={onBlurFn}
            />
            {showClearIcon && (
              <div className="control-action" onClick={handleClearInput}>
                <HiXCircle size={iconSize()} />
              </div>
            )}
            <div className="control-action" onClick={handleSwitchType}>
              {isPassword ? <HiEye size={iconSize()} /> : <HiEyeSlash size={iconSize()} />}
            </div>
          </div>

          {addonAfter && <div className="group-addon group-addon-after">{addonAfter}</div>}
        </div>
      </label>
    </div>
  );
};

export default React.forwardRef(InputPassword);
