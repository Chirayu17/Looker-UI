import React from "react";
import { AuthProvider } from "./context/Auth";
import RoutesProvider from "./router/AppRouter";
import { Box } from "@mui/material";
import AlertProvider from "./context/Alert";
import CustomAlerts from "./components/Common/CustomAlerts";

const App: React.FC<{}> = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AuthProvider>
        <AlertProvider>
          <RoutesProvider />
          <CustomAlerts />
        </AlertProvider>
      </AuthProvider>
    </Box>
  );
};
export default App;
