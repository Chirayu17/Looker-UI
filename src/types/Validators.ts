export type ValidationError = { errorMessage: string };
export type ValidatorFn<T> = (
  input: T,
  label: string
) => ValidationError | null;
