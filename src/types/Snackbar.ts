import { AlertColor } from "@mui/material";

export type CustomizedSnackbarInput = {
  key: string;
  severity: AlertColor;
  message: string;
  defaultOpen?: boolean;
  autoHideDuration?: number;
};
