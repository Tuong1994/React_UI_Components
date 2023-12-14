import React from "react";
import { ComponentColor, ComponentSize } from "@/common/type";
import { ControlShape } from "../type";

export type FormContextState = {
  isForm: boolean;
  sizes?: ComponentSize;
  shape?: ControlShape;
  color?: Exclude<ComponentColor, "red" | "black" | "white" | "gray">;
};

const FormContext = React.createContext<FormContextState>({
  isForm: true,
});

export default FormContext;
