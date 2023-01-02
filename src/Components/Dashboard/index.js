import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { useNavigate } from "react-router-dom";
import ClientForm from "../ClientForm";
import Navbar from "../Nav";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #fff",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

function Dashboard() {
  const [gigData, setGigData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const getData = async () => {
    const user = JSON.parse(localStorage.getItem("userToken"));
    try {
      const data = await axios.get("http://localhost:8000/getinfo", {
        params: { user: user },
      });
      setGigData(data.data);
    } catch (err) {
      console(err);
    }
  };

  const handleGig = (item) => {
    navigate(`/dashboard/${item.domain}`, { state: item });
  };

  useEffect(() => {
    getData();
  }, [gigData]);

  return (
    <Grid>
      <Navbar />
      <Container>
        <Grid
          mt={5}
          mb={5}
          display="flex"
          justifyContent={"space-between"}
          color="#fff"
        >
          <Typography variant="h3">Dashboard</Typography>
          <Button
            variant="contained"
            style={{ borderRadius: "10px", color: "#fff" }}
            endIcon={<AddLinkIcon />}
            onClick={handleOpen}
          >
            Add GIG
          </Button>
        </Grid>
        {gigData ? (
          <Grid container spacing={2}>
            {gigData.map((item) => (
              <Grid item xs={3} md={3}>
                <Card sx={{ maxWidth: 345 }} onClick={() => handleGig(item)}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        color="text.accent"
                        gutterBottom
                        variant="h4"
                        component="div"
                      >
                        {item.clientName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description.slice(0, 100)}.....
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid textAlign={"center"}>
            <Typography color={"#fff"}>No Gig Found</Typography>
            <Button
              variant="outlined"
              style={{ borderRadius: "10px", color: "#fff" }}
              endIcon={<AddLinkIcon />}
              onClick={handleOpen}
            >
              Add GIG
            </Button>
          </Grid>
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              textAlign={"center"}
              color="text.secondary"
            >
              GIG INFO
            </Typography>
            <ClientForm setOpen={setOpen} />
          </Box>
        </Modal>
      </Container>
    </Grid>
  );
}

export default Dashboard;
