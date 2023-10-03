import { ValidationError, ValidatorFn } from "./Validators";

export interface FormField<ValueType> {
  touched: boolean;
  label: string;
  value: ValueType;
  error: ValidationError | null;
  validator: ValidatorFn<ValueType>;
}
export type SetFormField<ValueType> = React.Dispatch<
  React.SetStateAction<FormField<ValueType>>
>;

export type FormData<Key extends string> = Record<Key, FormField<any>>;

export type AuthFormFields = "username" | "password";
export interface AuthFormData extends FormData<AuthFormFields> {
  username: FormField<string>;
  password: FormField<string>;
}

export type RoleType = "admin" | "data_scientist" | "user";
export type UserDetailsFormFields = "fullname" | "email" | "role";
export interface UserDetailsFormData extends FormData<UserDetailsFormFields> {
  fullname: FormField<string>;
  email: FormField<string>;
  role: FormField<RoleType>;
}

export interface FormService<FormFields extends string> {
  Form: React.JSX.Element;
  getFormData: () => FormData<FormFields>;
}
