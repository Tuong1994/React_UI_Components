import React from "react";

export type FormContextState = {
  isRhf: boolean;
  rhfName: string;
  rhfValue: any;
  rhfError: boolean;
  rhfDisabled: boolean;
  rhfOnChange?: (...event: any) => void;
  rhfOnBlur?: (...event: any) => void;
};

const FormContext = React.createContext<FormContextState>({
  isRhf: false,
  rhfName: "",
  rhfValue: "",
  rhfError: false,
  rhfDisabled: false,
});

export default FormContext;