import React from "react";
import { TextField } from "@mui/material";
import {
  handleFieldTouched,
  handleInputChange,
  showError,
} from "../../../utils/Form";
import { AuthFormData, FormField, SetFormField } from "../../../types/Forms";

type UsernameInputProps = {
  username: FormField<AuthFormData["username"]["value"]>;
  setUsername: SetFormField<AuthFormData["username"]["value"]>;
};
const UsernameInput = ({ username, setUsername }: UsernameInputProps) => (
  <TextField
    id="username-input"
    type="text"
    label={username.label}
    name="username"
    value={username.value}
    onChange={(event) => {
      handleInputChange(event.target.value, username, setUsername);
    }}
    onBlur={() => handleFieldTouched(username, setUsername)}
    autoComplete="username"
    autoFocus
    required
    error={showError(username)}
    helperText={showError(username) ? username.error?.errorMessage ?? " " : " "}
    sx={{ marginTop: 1 }}
  />
);
export default UsernameInput;
