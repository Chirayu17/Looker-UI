import { useState } from "react";
import { FormField } from "../types/Forms";
import { ValidatorFn } from "../types/Validators";

export function useFormFieldState<ValueType>(
  label: string,
  value: ValueType,
  validator: ValidatorFn<ValueType>
) {
  const [fieldState, setFieldState] = useState<FormField<ValueType>>({
    touched: false,
    label,
    value,
    error: validator(value, label),
    validator,
  });
  return { fieldState, setFieldState };
}
