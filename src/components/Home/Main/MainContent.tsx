import React, { useContext } from "react";
import { Grid } from "@mui/material";
import QueryContainer from "./Query/QueryContainer";
import History from "./History/History";
import { HistoryContext } from "../../../context/History";

const MAIN_COL_SIZE = 9;
const MainContent = () => {
  const { showHistory } = useContext(HistoryContext);
  const mainContentSize = showHistory ? MAIN_COL_SIZE : 12;
  const sideContentSize = showHistory ? 12 - MAIN_COL_SIZE : 0;

  return (
    <main style={{ flexGrow: 1, display: "flex" }}>
      <Grid container flexGrow={1} spacing={1}>
        <Grid container item xs={mainContentSize}>
          <QueryContainer />
        </Grid>

        {showHistory && (
          <Grid container item xs={sideContentSize}>
            <History />
          </Grid>
        )}
      </Grid>
    </main>
  );
};
export default MainContent;
