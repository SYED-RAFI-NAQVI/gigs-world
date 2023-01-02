import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import AutocompleteSearch from "../Common/Search";
import axios from "axios";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";

function Input({ type, label, name, handleChange }) {
  return (
    <Grid>
      <TextField
        type={type}
        label={label}
        variant="standard"
        onChange={(e) => handleChange(e, name)}
        required="true"
        fullWidth
        sx={{
          margin: "12px auto",
          "& .MuiInputBase-root": {
            color: "#000",
          },
        }}
      />
    </Grid>
  );
}

function ClientForm({ setOpen }) {
  const navigate = useNavigate();
  const [clientFormData, setClientFormData] = useState({});
  const [domain, setDomain] = useState("");
  const form = [
    {
      type: "text",
      label: "Client Name",
      name: "clientName",
    },
    {
      type: "text",
      label: "Description",
      name: "description",
    },
    {
      type: "number",
      label: "Company Size",
      name: "companySize",
    },
    {
      type: "number",
      label: "Amount for Project in $",
      name: "projectSize",
    },
    {
      type: "text",
      label: "Client Location",
      name: "clientLocation",
    },
    {
      type: "text",
      label: "Client Sector",
      name: "clientSector",
    },
    {
      type: "number",
      label: "Requested Delivery Time in Months",
      name: "requestedTime",
    },
  ];

  const handleChange = (e, name) => {
    setClientFormData({ ...clientFormData, [name]: e.target.value });
  };

  const handleClick = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userToken"));
      if (domain.length > 0) {
        setClientFormData({ ...clientFormData, domain: domain });
        const domainData = await axios.post(
          "http://localhost:8000/clientinfo",
          {
            ...clientFormData,
            domain: domain,
            email: user.email,
            username: user.name,
          }
        );
        if (domainData.data.saved) {
          navigate("/dashboard");
          setOpen(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>
      <AutocompleteSearch label={"Domain"} setDomain={setDomain} />
      {form.map((item) => (
        <Input
          type={item.type}
          label={item.label}
          name={item.name}
          handleChange={handleChange}
        />
      ))}
      <Grid style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          onClick={handleClick}
          variant="contained"
          style={{ color: "#fff" }}
          endIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
}

export default ClientForm;
