import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { dictionary } from "../../dictonary/English";
import { Box, useTheme } from "@mui/material";

function FooterBar() {
  const theme = useTheme();
  const backgroundColor = theme.palette.primary.main;

  return (
    <footer style={{ width: "100%" }}>
      <Box sx={{ backgroundColor: backgroundColor }}>
        <Toolbar disableGutters sx={{ justifyContent: "center" }}>
          <Typography color={theme.palette.getContrastText(backgroundColor)}>
            <small>
              &copy; Copyright {dictionary.COPYRIGHT.YEAR},{" "}
              {dictionary.COPYRIGHT.COMPANY_NAME}
            </small>
          </Typography>
        </Toolbar>
      </Box>
    </footer>
  );
}
export default FooterBar;
