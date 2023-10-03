import React from "react";
import HeaderBar from "../components/Home/HeaderBar";
import FooterBar from "../components/Home/FooterBar";
import MainContent from "../components/Home/Main/MainContent";
import { Box } from "@mui/material";
import { HistoryProvider } from "../context/History";

const HomePage: React.FC<{}> = () => {
  return (
    <HistoryProvider>
      <React.Fragment>
        <HeaderBar />
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            m: 3,
          }}
        >
          <MainContent />
        </Box>
        <FooterBar />
      </React.Fragment>
    </HistoryProvider>
  );
};

export default HomePage;
