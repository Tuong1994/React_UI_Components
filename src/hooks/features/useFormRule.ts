import { FormRule } from "@/components/Control/type";
import {
  EMAIL_REGEX,
  PHONE_REGEX,
  REPLACE_MAX_NUM_REGEX,
  REPLACE_MIN_NUM_REGEX,
  WHITE_SPACE_REGEX,
} from "@/common/constant/regex";
import { useLang } from "..";

const useFormRule = () => {
  const { lang } = useLang();

  const rule = lang.common.form.rule;

  const required = (): FormRule[] => {
    return [{ required: true, message: rule.required }];
  };

  const minNumber = (min: number): FormRule[] => {
    return [
      { required: true, message: rule.required },
      { min, message: rule.min.replace(REPLACE_MIN_NUM_REGEX, String(min)) },
    ];
  };

  const maxNumber = (max: number): FormRule[] => {
    return [
      { required: true, message: rule.required },
      { max, message: rule.min.replace(REPLACE_MAX_NUM_REGEX, String(max)) },
    ];
  };

  const email = (): FormRule[] => {
    return [
      { required: true, message: rule.required },
      { whiteSpace: true, pattern: WHITE_SPACE_REGEX, message: rule.whiteSpace },
      { email: true, pattern: EMAIL_REGEX, message: rule.email },
    ];
  };

  const password = (min = 6, max = 20): FormRule[] => {
    return [
      { required: true, message: rule.required },
      { whiteSpace: true, pattern: WHITE_SPACE_REGEX, message: rule.whiteSpace },
      {
        minLength: min,
        message: rule.minLength.replace(REPLACE_MIN_NUM_REGEX, String(min)),
      },
      {
        maxLength: max,
        message: rule.maxLength.replace(REPLACE_MAX_NUM_REGEX, String(max)),
      },
    ];
  };

  const phone = (): FormRule[] => {
    return [
      { required: true, message: rule.required },
      { whiteSpace: true, pattern: WHITE_SPACE_REGEX, message: rule.whiteSpace },
      { phone: true, pattern: PHONE_REGEX, message: rule.phone },
    ];
  };

  const match = (match: string): FormRule[] => {
    return [
      { required: true, message: rule.required },
      { validate: (value) => value === match || rule.confirmPassword },
    ];
  };

  return { required, minNumber, maxNumber, email, password, phone, match };
};

export default useFormRule;
