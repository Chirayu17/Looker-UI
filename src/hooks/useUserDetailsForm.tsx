import React, { useEffect, useMemo } from "react";
import {
  FormControl,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  FormService,
  RoleType,
  UserDetailsFormData,
  UserDetailsFormFields,
} from "../types/Forms";
import Validators from "../utils/Validators";
import {
  handleFieldTouched,
  handleInputChange,
  showError,
  validateForm,
} from "../utils/Form";
import { useFormFieldState } from "./useFormFieldState";

type UserDetailsFormProps = {
  handleFormFilled: (formData: UserDetailsFormData, isValid: boolean) => void;
};
function useUserDetailsForm({
  handleFormFilled,
}: UserDetailsFormProps): FormService<UserDetailsFormFields> {
  const { fieldState: fullname, setFieldState: setFullname } =
    useFormFieldState<UserDetailsFormData["fullname"]["value"]>(
      "Fullname",
      "",
      Validators.fullname
    );
  const { fieldState: email, setFieldState: setEmail } = useFormFieldState<
    UserDetailsFormData["email"]["value"]
  >("Email", "", Validators.email);
  const { fieldState: role, setFieldState: setRole } = useFormFieldState<
    UserDetailsFormData["role"]["value"]
  >("Role", "user", Validators.required);

  const data: UserDetailsFormData = useMemo(
    () => ({ fullname, email, role }),
    [fullname, email, role]
  );
  useEffect(() => {
    const isValid = !Boolean(validateForm(data));
    handleFormFilled(data, isValid);
  }, [data, handleFormFilled]);

  const Form = (
    <FormGroup>
      <TextField
        variant="outlined"
        type="text"
        id="full-name-input"
        label="Full Name"
        name="fullname"
        value={fullname.value}
        onChange={(event) => {
          handleInputChange(event.target.value, fullname, setFullname);
        }}
        onBlur={() => handleFieldTouched(fullname, setFullname)}
        autoComplete="name"
        autoFocus
        required
        sx={{ marginTop: 1 }}
        error={showError(fullname)}
        helperText={
          showError(fullname) ? fullname.error?.errorMessage ?? " " : " "
        }
      />
      <TextField
        variant="outlined"
        type="email"
        id="email-input"
        label="Email"
        name="email"
        value={email.value}
        onChange={(event) => {
          handleInputChange(event.target.value, email, setEmail);
        }}
        onBlur={() => handleFieldTouched(email, setEmail)}
        autoComplete="email"
        required
        sx={{ marginTop: 1 }}
        error={showError(email)}
        helperText={showError(email) ? email.error?.errorMessage ?? " " : " "}
      />
      <FormControl fullWidth sx={{ marginTop: 1 }}>
        <InputLabel id="select-role-label">Role</InputLabel>
        <Select
          labelId="role-input-label"
          id="role-input"
          label={role.label}
          name="role"
          value={role.value}
          onChange={(event) => {
            handleInputChange(event.target.value as RoleType, role, setRole);
          }}
          onBlur={() => handleFieldTouched(role, setRole)}
          required
        >
          <MenuItem value={"admin"}>Admin</MenuItem>
          <MenuItem value={"data_scientist"}>Data Scientist</MenuItem>
          <MenuItem value={"user"}>User</MenuItem>
        </Select>
        <FormHelperText error={showError(role)}>
          {showError(role) ? role.error?.errorMessage ?? " " : " "}
        </FormHelperText>
      </FormControl>
    </FormGroup>
  );

  return {
    Form,
    getFormData: () => data,
  };
}

export default useUserDetailsForm;
