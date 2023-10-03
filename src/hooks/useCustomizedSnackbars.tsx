import React, { useState } from "react";
import CustomizedSnackbar from "../components/Common/CustomizedSnackbar";
import { CustomizedSnackbarInput } from "../types/Snackbar";
import { AlertService } from "../types/Alert";

type SnackbarProps = CustomizedSnackbarInput & { open: boolean };
const useCustomizedSnackbars = (
  input: CustomizedSnackbarInput[]
): AlertService<CustomizedSnackbarInput> => {
  const mapAlertInputToProp = (
    input: CustomizedSnackbarInput
  ): SnackbarProps => ({ ...input, open: input.defaultOpen ?? true });

  const defaultSnackbarProps: SnackbarProps[] = input.map(mapAlertInputToProp);
  const [snackbarProps, setSnackbarProps] =
    useState<SnackbarProps[]>(defaultSnackbarProps);

  const showSnackbar = (key: string) => {
    setSnackbarProps(
      snackbarProps.map((prop) =>
        prop.key === key ? { ...prop, open: true } : prop
      )
    );
  };

  const hideSnackbar = (key: string) => {
    setSnackbarProps(
      snackbarProps.map((prop) =>
        prop.key === key ? { ...prop, open: false } : prop
      )
    );
  };

  const addSnackbar = (alert: CustomizedSnackbarInput) => {
    const index = snackbarProps.findIndex((prop) => prop.key === alert.key);
    const newSnackbarProps = [...snackbarProps];
    const alertProp = mapAlertInputToProp(alert);
    if (index !== -1) {
      newSnackbarProps[index] = alertProp;
    } else {
      newSnackbarProps.push(alertProp);
    }
    setSnackbarProps(newSnackbarProps);
  };

  const handleClose = (
    key: string,
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    hideSnackbar(key);
  };

  const snackbarElements = snackbarProps.map((prop) => (
    <CustomizedSnackbar
      {...prop}
      id={prop.key}
      open={prop.open}
      handleClose={(event, reason) => handleClose(prop.key, event, reason)}
    />
  ));
  return {
    alertElements: snackbarElements,
    showAlert: showSnackbar,
    addAlert: addSnackbar,
  };
};
export default useCustomizedSnackbars;
