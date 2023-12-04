import React from "react";
import { ComponentColor, ComponentSize } from "@/common/type";

export type FormContextState = {
  color?: Exclude<ComponentColor, "red">;
  sizes?: ComponentSize;
};

const FormContext = React.createContext<FormContextState>({});

export default FormContext;
