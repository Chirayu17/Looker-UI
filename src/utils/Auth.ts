import { NavigateFunction } from "react-router";
import { AuthContextValue } from "../types/Auth";
import { AuthFormFields, FormService } from "../types/Forms";
import { validateForm } from "./Form";
import { ROUTE_PATHS } from "../router/RoutePaths";

const setToken = (token: string) =>
  sessionStorage.setItem("token", `Bearer ${token}`);
const removeToken = () => sessionStorage.removeItem("token");
const getToken = () => sessionStorage.getItem("token")?.replace("Bearer ", "");

export const isAuthenticated = () => Boolean(getToken());

export function handleLogIn(
  AuthFormService: FormService<AuthFormFields>,
  authContext: AuthContextValue | null,
  navigate: NavigateFunction
) {
  const data = AuthFormService.getFormData();
  const validationError = validateForm(data);
  if (!validationError) {
    // TODO: Call API to get token
    setToken("random-token");
    authContext?.setAuthenticated(true);
    navigate(ROUTE_PATHS.INDEX, {
      replace: true,
      relative: "path",
    });
  } else {
    // TODO: Display Error if token validation fails,
    console.error(validationError.errorMessage, data);
  }
}

export function handleLogOut(
  authContext: AuthContextValue | null,
  navigate: NavigateFunction
) {
  removeToken();
  authContext?.setAuthenticated(false);
  navigate(ROUTE_PATHS.LOGIN, {
    replace: true,
  });
}
