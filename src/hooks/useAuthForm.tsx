import React, { useEffect, useMemo } from "react";
import { AuthFormData, AuthFormFields, FormService } from "../types/Forms";
import { useFormFieldState } from "./useFormFieldState";
import Validators from "../utils/Validators";
import UsernameInput from "../components/Auth/FormFields/UsernameInput";
import PasswordInput from "../components/Auth/FormFields/PasswordInput";
import { validateForm } from "../utils/Form";
import { FormGroup } from "@mui/material";

type AuthFormProps = {
  isNewUser: boolean;
  intialFormData?: AuthFormData;
  handleFormFilled: (formData: AuthFormData, isValid: boolean) => void;
};
const useAuthForm: (props: AuthFormProps) => FormService<AuthFormFields> = ({
  isNewUser,
  intialFormData,
  handleFormFilled,
}) => {
  const { fieldState: username, setFieldState: setUsername } =
    useFormFieldState<AuthFormData["username"]["value"]>(
      "Username",
      intialFormData?.username.value ?? "",
      Validators.username
    );
  const { fieldState: password, setFieldState: setPassword } =
    useFormFieldState<AuthFormData["password"]["value"]>(
      "Password",
      intialFormData?.password.value ?? "",
      Validators.password
    );

  const data: AuthFormData = useMemo(
    () => ({ username, password }),
    [username, password]
  );
  useEffect(() => {
    const isValid = !Boolean(validateForm(data));
    handleFormFilled(data, isValid);
  }, [data, handleFormFilled]);

  const Form = (
    <FormGroup>
      <UsernameInput username={username} setUsername={setUsername} />
      <PasswordInput
        password={password}
        setPassword={setPassword}
        isNewUser={isNewUser}
      />
    </FormGroup>
  );

  return {
    Form,
    getFormData: () => data,
  };
};

export default useAuthForm;
