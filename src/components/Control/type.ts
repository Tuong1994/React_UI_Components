import { Validate } from "react-hook-form";

export type FormRule = {
  required?: boolean;
  phone?: boolean;
  email?: boolean;
  whiteSpace?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  message?: string;
  pattern?: RegExp;
  validate?: Validate<any, any>;
};

export type FieldError = {
  [x: string]: any;
};

export type InputValue = number | string | readonly string[];

export type Option = {
  label: string;
  value: string | number | boolean;
};

export type SelectOptions = Option[];

export type SelectDate = {
  fullDate: Date;
  date: number;
  day: number;
  month: number;
  year: number;
  type: "main" | "sub";
};
