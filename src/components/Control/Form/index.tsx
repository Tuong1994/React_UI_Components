import React from "react";
import { useForm, FormProvider } from "react-hook-form";

export interface FormProps<M> extends React.FormHTMLAttributes<HTMLFormElement> {
  initialData: M;
  children?: React.ReactNode | React.ReactNode[];
  onFinish?: (formData: M) => void;
}

const Form = <M extends object>(
  { initialData, children, onFinish, ...restProps }: FormProps<M>,
  ref: React.ForwardedRef<HTMLFormElement>
) => {
  const rhfMethods = useForm<M>({ values: initialData, mode: "all" });

  const onSubmit = (formData: M) => onFinish?.(formData);

  return (
    <FormProvider {...rhfMethods}>
      <form ref={ref} {...restProps} onSubmit={rhfMethods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default React.forwardRef(Form);
