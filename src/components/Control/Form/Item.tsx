import React from "react";
import { Controller, useController } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { NoteMessage } from "@/components/UI";
import FormContext, { FormContextState } from "./Context";
import { FieldError, FormRule } from "../type";

export interface FormItemProps {
  name: string;
  rules?: FormRule[];
  disabled?: boolean;
  children?: React.ReactNode | React.ReactNode[];
}

const FormItem: React.FC<FormItemProps> = ({ name, disabled = false, rules = [], children }) => {
  const {
    field: { name: rhfName, value: rhfValue, onChange: rhfOnChange, onBlur: rhfOnBlur },
    fieldState: { invalid: rhfError },
    formState: { errors },
  } = useController({ name });

  const initialState: FormContextState = {
    isRhf: true,
    rhfError,
    rhfName,
    rhfValue,
    rhfDisabled: disabled,
    rhfOnChange,
    rhfOnBlur,
  };

  const getRules = () => {
    const fieldError: FieldError = {};
    if (disabled) return fieldError;
    if (!rules.length) return fieldError;
    rules.forEach((rule) => {
      if (rule.required) fieldError.required = { value: rule.required, message: rule.message };
      if (rule.max) fieldError.max = { value: rule.max, message: rule.message };
      if (rule.maxLength) fieldError.maxLength = { value: rule.maxLength, message: rule.message };
      if (rule.min) fieldError.min = { value: rule.min, message: rule.message };
      if (rule.minLength) fieldError.minLength = { value: rule.minLength, message: rule.message };
      if (rule.phone) fieldError.pattern = { value: rule.pattern, message: rule.message };
      if (rule.email) fieldError.pattern = { value: rule.pattern, message: rule.message };
      if (rule.whiteSpace) fieldError.pattern = { value: rule.pattern, message: rule.message };
      if (rule.validate) fieldError.validate = rule.validate;
    });
    return fieldError;
  };

  return (
    <FormContext.Provider value={initialState}>
      <div className={`form-item`}>
        <Controller
          name={name}
          rules={{ ...getRules() }}
          render={() => <React.Fragment>{children}</React.Fragment>}
        />
        {errors[rhfName] && (
          <ErrorMessage
            name={name}
            errors={errors}
            render={(error) => <NoteMessage type="error" message={error.message} />}
          />
        )}
      </div>
    </FormContext.Provider>
  );
};

export default FormItem;
