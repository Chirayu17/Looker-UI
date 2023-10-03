import React, { useContext } from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { dictionary } from "../../../../dictonary/English";
import HistoryItem from "./HistoryItem";
import { HistoryContext } from "../../../../context/History";

const History = () => {
  const theme = useTheme();
  const { history, clearAll } = useContext(HistoryContext);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        width: "100%",
        boxSizing: "border-box",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        display={"flex"}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography component="h1" variant="h5" color={theme.palette.info.dark}>
          {dictionary.HISTORY.TITLE}
        </Typography>
        <Button color="warning" variant="text" onClick={clearAll}>
          {dictionary.HISTORY.CLEAR_ALL} {<ClearAllIcon />}
        </Button>
      </Box>
      <Divider sx={{ marginTop: 1 }} />
      <Typography
        color={theme.palette.grey[700]}
        sx={{ marginTop: 1 }}
        variant="body2"
      >
        {history && history.length === 0
          ? dictionary.HISTORY.NO_HISTORY
          : dictionary.HISTORY.RECENT}
      </Typography>
      {history &&
        history.length > 0 &&
        history.map((pastQuery, index) => (
          <Box
            key={pastQuery.query + pastQuery.time + index}
            sx={{
              mt: index === 0 ? 1 : 0,
            }}
          >
            <HistoryItem pastQuery={pastQuery} />
            <Divider />
          </Box>
        ))}
    </Paper>
  );
};
export default History;
