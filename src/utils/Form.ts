import { FormData, FormField, SetFormField } from "../types/Forms";
import { ValidationError } from "../types/Validators";

export function showError<V>(field: FormField<V>) {
  return field.touched && Boolean(field.error) ? true : false;
}

export function handleFieldTouched<V>(
  field: FormField<V>,
  setField: SetFormField<V>
) {
  if (!field.touched) setField({ ...field, touched: true });
}

export function handleInputChange<V>(
  newInput: V,
  field: FormField<V>,
  setField: SetFormField<V>
) {
  if (newInput !== field.value) {
    const validationError = field.validator(newInput, field.label);
    setField({
      ...field,
      value: newInput,
      error: validationError,
    });
  }
}

export function validateForm<FormFields extends string>(
  data: FormData<FormFields>
) {
  let validationError: ValidationError | null = null;
  const keys = Object.keys(data) as FormFields[];

  for (let key of keys) {
    const element = data[key];
    validationError = element.validator(element.value, element.label);
    if (validationError) return validationError;
  }
  return validationError;
}
