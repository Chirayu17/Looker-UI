import React from "react";
import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { dictionary } from "../../../../dictonary/English";
import { SetState } from "../../../../types/State";

type SearchBarProps = {
  query: string;
  setQuery: SetState<string>;
  submitQuery: (query: string) => void;
};
function SearchBar({ query, setQuery, submitQuery }: SearchBarProps) {
  const paddingStyles = { p: 1 };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <InputBase
        sx={{
          ...paddingStyles,
          flexGrow: 1,
        }}
        placeholder={dictionary.QUERY.SEARCH.PLACEHOLDER_TEXT}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        inputProps={{ "aria-label": "enter query" }}
        fullWidth
        multiline
      />
      <IconButton
        type="button"
        sx={paddingStyles}
        aria-label="search"
        onClick={(event) => submitQuery(query)}
      >
        <SearchIcon color="primary" />
      </IconButton>
    </Box>
  );
}
export default SearchBar;
