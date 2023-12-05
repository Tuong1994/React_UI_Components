import React from "react";
import { ComponentColor, ComponentSize } from "@/common/type";

export type FormContextState = {
  isForm: boolean;
  color?: Exclude<ComponentColor, "red" | "black" | "white" | "gray">;
  sizes?: ComponentSize;
};

const FormContext = React.createContext<FormContextState>({
  isForm: true,
});

export default FormContext;
