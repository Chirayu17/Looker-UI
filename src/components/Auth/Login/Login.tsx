import React, { useContext, useState } from "react";
import { CardActions, CardContent } from "@mui/material";
import { useNavigate } from "react-router";
import ContainerButton from "../../Common/ContainerButton";
import useAuthForm from "../../../hooks/useAuthForm";
import { AuthContext } from "../../../context/Auth";
import { handleLogIn } from "../../../utils/Auth";

const Login = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAuthFormDisabled, setIsAuthFormDisabled] = useState<boolean>(true);
  const AuthFormService = useAuthForm({
    isNewUser: false,
    handleFormFilled(formData, isValid) {
      setIsAuthFormDisabled(!isValid);
    },
  });

  return (
    <React.Fragment>
      <CardContent>{AuthFormService.Form}</CardContent>
      <CardActions sx={{ p: 2 }}>
        <ContainerButton
          text="Login"
          fullWidth={true}
          handleButtonPress={(event) =>
            handleLogIn(AuthFormService, authContext, navigate)
          }
          isDisabled={isAuthFormDisabled}
        />
      </CardActions>
    </React.Fragment>
  );
};

export default Login;
