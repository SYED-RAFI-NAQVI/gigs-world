import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  function handleCallbackResponse(response) {
    const userObject = jwt_decode(response.credential);
    localStorage.setItem("userToken", JSON.stringify(userObject));
    navigate("/dashboard");
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "832520484394-9ckm81a9hfqbeq81dd8n12n4qpad2v2j.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "medium",
      }
    );
  }, []);

  return (
    <Grid
      display={"flex"}
      justifyContent={"center"}
      mt={"100px"}
      bgcolor={"042a2b"}
    >
      <Paper
        style={{
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#042a2b",
          color: "#fff",
        }}
        elevation={22}
      >
        <Grid m={"20px"}>
          <Typography variant="h4">Welcome to GIG World</Typography>
        </Grid>
        <Grid id="signInDiv"></Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
