import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Nav";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FactoryIcon from "@mui/icons-material/Factory";
import PublicIcon from "@mui/icons-material/Public";
import TimerIcon from "@mui/icons-material/Timer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

function Gig() {
  const location = useLocation();
  const GigInfo = location.state;

  return (
    <Grid>
      <Navbar />
      <Grid style={{ marginTop: "30px" }}>
        <Container>
          <Grid
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid>
              <Typography
                variant="h1"
                style={{ fontStyle: "bold" }}
                color={"text.accent"}
              >
                {GigInfo?.clientName}
              </Typography>
            </Grid>
            <Grid>
              <Grid
                style={{
                  marginTop: "4px",
                  marginRight: "10px",
                  alignItems: "center",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <LocationOnIcon fontSize="small" />
                <Typography variant="body1">
                  {GigInfo?.clientLocation.toUpperCase()}
                </Typography>
              </Grid>

              <Grid
                style={{
                  marginTop: "4px",
                  marginRight: "10px",
                  alignItems: "center",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <FactoryIcon fontSize="small" />
                <Typography variant="body1">
                  {GigInfo?.clientSector.toUpperCase()}
                </Typography>
              </Grid>
              <Grid
                style={{
                  marginTop: "4px",
                  marginRight: "10px",
                  alignItems: "center",
                  display: "flex",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <PublicIcon fontSize="small" />
                <Typography variant="body1">
                  <a
                    style={{ color: "#fff", textDecoration: "none" }}
                    href={`https://${GigInfo?.domain}`}
                  >
                    {GigInfo?.domain}
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid margin={"10px 0"}>
            <Typography
              variant="body2"
              style={{ fontSize: "22px" }}
              color={"text.gray"}
            >
              {GigInfo?.description}
            </Typography>
          </Grid>
          <Grid
            display={"flex"}
            justifyContent={"space-between"}
            marginTop={"40px"}
          >
            <Grid
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Grid display={"flex"} gap={"5px"} alignItems={"center"}>
                <Typography variant="h4" color={"text.accent"}>
                  {GigInfo?.companySize}
                </Typography>
                <PeopleAltIcon
                  fontSize={"large"}
                  style={{ color: "#ef7b45" }}
                />
              </Grid>
              <Grid>
                <Typography variant="h6" color={"text.gray"}>
                  Company Size
                </Typography>
              </Grid>
            </Grid>
            <Grid
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Grid display={"flex"} gap={"5px"} alignItems={"center"}>
                <Typography variant="h4" color={"text.accent"}>
                  {GigInfo?.projectSize}
                </Typography>
                <AttachMoneyIcon
                  fontSize={"large"}
                  style={{ color: "#ef7b45" }}
                />
              </Grid>
              <Grid>
                <Typography variant="h6" color={"text.gray"}>
                  Amount for Project
                </Typography>
              </Grid>
            </Grid>
            <Grid
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Grid display={"flex"} gap={"5px"} alignItems={"center"}>
                <Typography variant="h4" color={"text.accent"}>
                  {GigInfo?.requestedTime} Months
                </Typography>
                <TimerIcon fontSize={"large"} style={{ color: "#ef7b45" }} />
              </Grid>
              <Typography variant="h6" color={"text.gray"}>
                Deadline
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Gig;
