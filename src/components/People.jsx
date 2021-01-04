import {
  Container,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import { useKeycloak } from "@react-keycloak/web";
import React, { useState } from "react";

function People() {
  // const { keycloak } = useKeycloak();
  const [person, setPerson] = useState({
    uid: "0x7558",
    sub: null,
    name: "bharath",
    email: "bharath.chakravarthi@gmail.com",
    kcid: null,
    gender: "male",
    created_by: null,
    username: null,
    partners: [],
    parents: [],
    children: [],
    is_authenticated: false,
  });
  const handleSearch = (e) => {
    const axios = require("axios");
    axios.defaults.headers.common["Authorization"] = "Bearer sdfasd";
    axios
      .get("http://localhost:8088/v1/people/" + e.target.value)
      .then((result) => {
        setPerson(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <TextField id="searchPeople" variant="filled" onChange={handleSearch} />
      <List>
        <ListItem>
          <ListItemText>
            <Typography variant="h6">{person.name}</Typography>
          </ListItemText>
        </ListItem>
      </List>
    </Container>
  );
}

export default People;
