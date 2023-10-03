import React from "react";

export type AlertService<T> = {
  alertElements: React.JSX.Element[];
  showAlert: (key: string) => void;
  addAlert: (alert: T) => void;
};
