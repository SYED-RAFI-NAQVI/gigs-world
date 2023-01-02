import axios from "axios";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function AutocompleteSearch({ label, setDomain }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");

  const handleDomainClick = (domain) => {
    setSelectedDomain(domain);
    setDomain(domain);
    setSearchTerm(null);
  };

  useEffect(() => {
    const handleChange = async () => {
      const response = await axios.get(
        `https://suggestions.semrush.com/?type=domain&q=${searchTerm}`
      );
      setSearchResults(response.data.results);
    };
    handleChange();
  }, [searchTerm]);

  return (
    <div>
      <TextField
        label={label}
        value={selectedDomain ? selectedDomain : searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        fullWidth
        variant="standard"
        required
        sx={{
          "& .MuiInputBase-root": {
            color: "#000",
          },
        }}
      />
      {searchTerm &&
        searchResults.slice(0, 2)?.map(
          (result) =>
            searchResults && (
              <MenuItem
                value={result.value}
                style={{ display: "flex", justifyContent: "space-between" }}
                onClick={() => handleDomainClick(result.value)}
              >
                <Typography color={"text.secondary"}>{result.value}</Typography>
                <Grid
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "right",
                  }}
                >
                  <Typography color={"text.secondary"} variant="body-2">
                    Score:
                  </Typography>
                  <Typography
                    color={"text.secondary"}
                    style={{ width: "90px" }}
                  >
                    {result.score}
                  </Typography>
                </Grid>
              </MenuItem>
            )
        )}
    </div>
  );
}
export default AutocompleteSearch;
