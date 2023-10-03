import React, { useContext } from "react";
import { AlertContext } from "../../context/Alert";

const CustomAlerts = () => {
  const { alertElements } = useContext(AlertContext);
  return <React.Fragment>{alertElements}</React.Fragment>;
};
export default CustomAlerts;
