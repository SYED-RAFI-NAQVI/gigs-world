import { Avatar, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userToken"));
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 10px 20px, rgba(0, 0, 0, 0.22) 0px 0px 10px",
        color: "#fff",
        position: "sticky",
        top: 0,
      }}
    >
      <Grid sx={{ margin: "16px 100px" }}>
        <Typography variant="h5">GIG World</Typography>
      </Grid>
      <Grid
        sx={{
          margin: "16px 100px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar alt={user.name} src={user.picture} />
        <Typography sx={{ margin: "10px auto" }}>{user.name}</Typography>
      </Grid>
      <Grid sx={{ margin: "16px 100px" }}>
        <Button
          variant="contained"
          style={{ color: "#fff" }}
          onClick={handleLogout}
          endIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  );
}

export default Navbar;
