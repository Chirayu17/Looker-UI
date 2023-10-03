import { Alert, AlertColor, Snackbar } from "@mui/material";
import * as React from "react";

type CustomizedSnackbarProps = {
  id: string;
  open: boolean;
  severity: AlertColor;
  message: string;
  autoHideDuration?: number;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
};
export default function CustomizedSnackbar({
  id,
  open,
  severity,
  message,
  autoHideDuration,
  handleClose,
}: CustomizedSnackbarProps) {
  return (
    <Snackbar
      key={id}
      open={open}
      autoHideDuration={autoHideDuration ?? 5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
