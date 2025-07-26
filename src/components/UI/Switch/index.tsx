import { InputHTMLAttributes, ForwardRefRenderFunction, ChangeEvent, forwardRef } from "react";
import { SwitchColor, SwitchSize } from "./type";
import utils from "@/utils";

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  sizes?: SwitchSize;
  color?: SwitchColor;
  onSwitch?: (switched: boolean) => void;
}

const Switch: ForwardRefRenderFunction<HTMLInputElement, SwitchProps> = (
  { rootClassName = "", sizes = "md", color = "blue", onSwitch, ...restProps },
  ref
) => {
  const sizeClassName = `switch-${sizes}`;

  const colorClassName = `switch-${color}`;

  const className = utils.formatClassName("switch", colorClassName, sizeClassName, rootClassName);

  const handleSwitch = (e: ChangeEvent<HTMLInputElement>) => onSwitch?.(e.target.checked);

  return <input ref={ref} type="checkbox" {...restProps} className={className} onChange={handleSwitch} />;
};

export default forwardRef(Switch);
