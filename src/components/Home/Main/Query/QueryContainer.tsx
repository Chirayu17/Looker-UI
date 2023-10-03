import React, { Fragment, useContext, useState } from "react";
import { CircularProgress, Paper, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import interpretQuery, { interpretQueryLooker } from "../../../../api/interpretQuery";
import { dictionary } from "../../../../dictonary/English";
import { AlertContext } from "../../../../context/Alert";
import { CustomizedSnackbarInput } from "../../../../types/Snackbar";
import CustomChart from "../Chart/CustomChart";
import { InterpretQueryResponse } from "../../../../types/ApiResponse";
import CustomChart2 from "../Chart/CustomChart2";

const ALERT_KEY = "SEARCH_QUERY_REQUIRED";
const QueryContainer = () => {
  const [query, setQuery] = useState<string>("");
  const [queryResponse, setQueryResponse] = useState<InterpretQueryResponse>();
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [lookerEmbedURL, setLookerEmbedURL] = useState<string>('');
  const alertService = useContext(AlertContext);

  const submitQuery = async (query: string) => {
    if (!query) {
      const queryRequiredAlert: CustomizedSnackbarInput = {
        key: ALERT_KEY,
        severity: "warning",
        message: dictionary.QUERY.SEARCH.REQUIRED,
      };
      alertService.addAlert!(queryRequiredAlert);
    } else {
      setShowLoader(true);
      interpretQueryLooker(query).then((response) => {
        // setQueryResponse(response);
        setShowLoader(false);
        setLookerEmbedURL(response);
      });
    }
  };

  return (
    // <Paper
    //   elevation={3}
    //   sx={{
    // flexGrow: 1,
    // display: "flex",
    // flexDirection: "column",
    // p: 3,
    //   }}
    // >
    <div style={{
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      // padding: '2rem 1rem'
    }}>
      <Paper
        component="form"
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
        }}
      >
        <SearchBar
          query={query}
          setQuery={setQuery}
          submitQuery={submitQuery}
        />
      </Paper>
      <div className="iframe-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2rem 0'
      }}>
        {showLoader && <CircularProgress color="inherit" />}
        {lookerEmbedURL !== '' && <CustomChart2 embedUrl={lookerEmbedURL} />}
      </div>

      {queryResponse && !showLoader && (
        <Fragment>
          {/* <CustomChart responseData={queryResponse} /> */}
          {/* TODO: Fix overflow by providing width to all parent elements */}
          <Typography
            sx={{
              m: 2,
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
          >
            <b>SQL Query: </b>
            {" " + queryResponse.generatedSqlQuery}
          </Typography>
        </Fragment>
      )}</div>
    // </Paper>
  );
};
export default QueryContainer;
