import { Validate } from "react-hook-form";

// Form
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

// Input
export type InputValue = number | string | readonly string[];

// Select
export type Option = {
  label: string;
  value: string | number | boolean;
};

export type SelectOptions = Option[];

// DatePicker
export type SelectDate = {
  fullDate: Date;
  date: number;
  day: number;
  month: number;
  year: number;
  type: "main" | "sub";
};

// Upload
export type UploadError = {
  active: boolean;
  type: "fileType" | "fileSize" | "fileMax";
};

export type UploadImage = {
  id: string;
  file?: File;
  url?: string;
};

export type UploadImages = UploadImage[]