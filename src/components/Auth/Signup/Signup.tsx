import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { CardActions, CardContent } from "@mui/material";
import ContainerButton from "../../Common/ContainerButton";
import useAuthForm from "../../../hooks/useAuthForm";
import useUserDetailsForm from "../../../hooks/useUserDetailsForm";
import { AuthContext } from "../../../context/Auth";
import { handleLogIn } from "../../../utils/Auth";

type FormConfig = Array<{
  form: React.JSX.Element;
  action: React.JSX.Element;
  justifyContent: "end" | "space-between";
}>;
const Signup = () => {
  const [formStep, setFormStep] = useState<number>(0);
  const [isAuthFormDisabled, setIsAuthFormDisabled] = useState<boolean>(true);
  const [isUserDetailsFormDisabled, setIsUserDetailsDisabled] =
    useState<boolean>(true);
  const AuthFormService = useAuthForm({
    isNewUser: false,
    handleFormFilled(formData, isValid) {
      setIsAuthFormDisabled(!isValid);
    },
  });
  const UserDetailsFormService = useUserDetailsForm({
    handleFormFilled(formData, isValid) {
      setIsUserDetailsDisabled(!isValid);
    },
  });
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const nextActionButton = (
    <ContainerButton
      key={`Next-${formStep}`}
      text={"Next"}
      handleButtonPress={() => setFormStep(formStep + 1)}
      isDisabled={isUserDetailsFormDisabled}
    />
  );
  const backActionButton = (
    <ContainerButton
      key={`Back-${formStep}`}
      text={"Back"}
      handleButtonPress={() => setFormStep(formStep - 1)}
    />
  );
  const signUpButton = (
    <ContainerButton
      key={`Sign Up-${formStep}`}
      text={"Sign Up"}
      handleButtonPress={(event) =>
        handleLogIn(AuthFormService, authContext, navigate)
      }
      isDisabled={isAuthFormDisabled}
    />
  );

  const formConfig: FormConfig = [
    {
      form: UserDetailsFormService.Form,
      action: nextActionButton,
      justifyContent: "end",
    },
    {
      form: AuthFormService.Form,
      action: (
        <React.Fragment>
          {backActionButton}
          {signUpButton}
        </React.Fragment>
      ),
      justifyContent: "space-between",
    },
  ];

  return (
    <React.Fragment>
      <CardContent>{formConfig[formStep].form}</CardContent>
      <CardActions
        sx={{ justifyContent: formConfig[formStep].justifyContent, p: 2 }}
      >
        {formConfig[formStep].action}
      </CardActions>
    </React.Fragment>
  );
};

export default Signup;
