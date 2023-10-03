import React, { useContext } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { QueryHistory } from "../../../../types/History";
import { HistoryContext } from "../../../../context/History";

type HistoryItemProps = {
  pastQuery: QueryHistory;
};
const HistoryItem = ({ pastQuery }: HistoryItemProps) => {
  const theme = useTheme();
  const { removeHistoryItem } = useContext(HistoryContext);

  return (
    <Box
      sx={{
        p: "2px",
        boxSizing: "border-box",
        height: "46px",
        display: "flex",
        alignItems: "center",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.background.paper,
        borderRadius: 1,
        "&:hover": {
          color: theme.palette.primary.dark,
          borderColor: theme.palette.primary.dark,
          background: alpha(theme.palette.primary.dark, 0.1),
        },
      }}
    >
      <RestoreIcon />
      <Typography
        sx={{
          ml: 1,
          flexGrow: 1,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {pastQuery.query}
      </Typography>
      <IconButton color="primary">
        <StarBorderIcon />
      </IconButton>
      <IconButton
        color="primary"
        onClick={(event) => removeHistoryItem!(pastQuery)}
      >
        <CloseIcon />
      </IconButton>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
};
export default HistoryItem;
