import React, { useContext } from "react";
import { useNavigate } from "react-router";
import {
  Toolbar,
  Typography,
  FormControlLabel,
  Button,
  Switch,
  AppBar,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import { AuthContext } from "../../context/Auth";
import { HistoryContext } from "../../context/History";
import { dictionary } from "../../dictonary/English";
import { handleLogOut } from "../../utils/Auth";

function HeaderBar() {
  const authContext = useContext(AuthContext);
  const { showHistory, toggleHistoryView } = useContext(HistoryContext);
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textTransform: "capitalize" }}
        >
          {dictionary.APP_NAME.SHORT}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              color="secondary"
              checked={showHistory}
              onChange={toggleHistoryView}
            />
          }
          label={showHistory ? <HistoryToggleOffIcon /> : <HistoryIcon />}
          labelPlacement="end"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleLogOut(authContext, navigate)}
          sx={{ textTransform: "capitalize" }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
export default HeaderBar;
