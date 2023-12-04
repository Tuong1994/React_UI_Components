import React from "react";
import { HiXCircle } from "react-icons/hi2";
import { useFormContext } from "react-hook-form";
import { InputValue } from "../type";
import { ComponentColor, ComponentSize } from "@/common/type";
import FormItemContext from "../Form/FormItemContext";
import FormContext from "../Form/FormContext";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rootClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  rootStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  addonBefore?: React.ReactNode | React.ReactNode[];
  addonAfter?: React.ReactNode | React.ReactNode[];
  sizes?: ComponentSize;
  color?: Exclude<ComponentColor, "red">;
  onChangeInput?: (text: string) => void;
}

const Input: React.ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = (
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
    rows = 5,
    disabled,
    onBlur,
    onChangeInput,
    ...restProps
  },
  ref
) => {
  const rhfMethods = useFormContext();

  const { color: rhfColor, sizes: rhfSizes } = React.useContext(FormContext);

  const { isRhf, rhfName, rhfError, rhfValue, rhfDisabled, rhfOnChange, rhfOnBlur } =
    React.useContext(FormItemContext);

  const [inputValue, setInputValue] = React.useState<InputValue>(value);

  const inputRef = React.useRef<HTMLDivElement>(null);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const controlSize = isRhf ? rhfSizes : sizes;

  const showClearIcon = inputValue && !controlDisabled;

  const sizeClassName = `textarea-${controlSize}`;

  const colorClassName = `textarea-${controlColor}`;

  const disabledClassName = controlDisabled ? "textarea-disabled" : "";

  const errorClassName = rhfError ? "textarea-error" : "";

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
    if (controlSize === "sm") return 14;
    if (controlSize === "md") return 16;
    if (controlSize === "lg") return 18;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      className={`textarea ${colorClassName} ${sizeClassName} ${errorClassName} ${rootClassName} ${disabledClassName}`}
    >
      <label>
        {label && (
          <div style={labelStyle} className={`textarea-label ${labelClassName}`}>
            {label}
          </div>
        )}

        <div ref={inputRef} className="textarea-group">
          <div className="group-control">
            <textarea
              {...restProps}
              ref={ref}
              rows={rows}
              value={inputValue}
              disabled={controlDisabled}
              placeholder={placeholder}
              className={`control-box ${inputClassName}`}
              onChange={onChangeFn}
              onBlur={onBlurFn}
            />
            {showClearIcon && (
              <div className="control-action" onClick={handleClearInput}>
                <HiXCircle size={iconSize()} />
              </div>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default React.forwardRef(Input);
