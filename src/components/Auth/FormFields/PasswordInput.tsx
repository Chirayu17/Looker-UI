import React, { MouseEventHandler, useState } from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  handleFieldTouched,
  handleInputChange,
  showError,
} from "../../../utils/Form";
import { AuthFormData, FormField, SetFormField } from "../../../types/Forms";

interface PasswordInputProps {
  password: FormField<AuthFormData["password"]["value"]>;
  setPassword: SetFormField<AuthFormData["password"]["value"]>;
  isNewUser: boolean;
}
const PasswordInput = ({
  password,
  setPassword,
  isNewUser,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  // TODO: Understand the default behavior of below event
  const handleMouseDownPassword: MouseEventHandler = (event) =>
    event.preventDefault();

  return (
    <FormControl sx={{ marginTop: 1 }} variant="outlined" required>
      <InputLabel htmlFor="password-input">Password</InputLabel>
      <OutlinedInput
        id="password-input"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        label={password.label}
        name="password"
        value={password.value}
        onChange={(event) => {
          handleInputChange(event.target.value, password, setPassword);
        }}
        onBlur={() => handleFieldTouched(password, setPassword)}
        error={showError(password)}
        autoComplete={isNewUser ? "new-password" : "current-password"}
      />
      <FormHelperText error={showError(password)}>
        {showError(password) ? password.error?.errorMessage ?? " " : " "}
      </FormHelperText>
    </FormControl>
  );
};
export default PasswordInput;
