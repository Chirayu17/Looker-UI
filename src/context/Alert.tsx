import React from "react";
import { createContext } from "react";
import { AlertService } from "../types/Alert";
import { CustomizedSnackbarInput } from "../types/Snackbar";
import useCustomizedSnackbars from "../hooks/useCustomizedSnackbars";

export const AlertContext = createContext<
  Partial<AlertService<CustomizedSnackbarInput>>
>({ alertElements: [] });

const AlertProvider: React.FC<{ children: React.JSX.Element[] }> = ({
  children,
}) => {
  const alertService = useCustomizedSnackbars([]);
  return (
    <AlertContext.Provider value={alertService}>
      {children}
    </AlertContext.Provider>
  );
};
export default AlertProvider;
