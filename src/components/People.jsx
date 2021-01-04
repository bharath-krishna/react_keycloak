import {
  Container,
  Grid,
  List,
  ListItem,
  makeStyles,
  Table,
  TableRow,
  TableCell,
  TextField,
  Toolbar,
  TableBody,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useState } from "react";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

function People() {
  const classes = useStyle();
  const { keycloak } = useKeycloak();
  const [people, setPeople] = useState({ people: [] });
  const [person, setPerson] = useState({});
  const searchPerson = (name) => {
    const axios = require("axios");
    axios.defaults.headers.common["Authorization"] = "Bearer " + keycloak.token;
    axios
      .get(`http://localhost:8088/v1/people/${name}`)
      .then((result) => {
        setPerson(result.data);
      })
      .catch((err) => {
        setPerson({});
      });
  };
  useEffect(() => {
    const axios = require("axios");
    axios.defaults.headers.common["Authorization"] = "Bearer " + keycloak.token;
    axios
      .get("http://localhost:8088/v1/people")
      .then((result) => {
        setPeople(result.data);
      })
      .catch((err) => {
        setPeople({});
      });
  }, []);

  return (
    <Container className={classes.container}>
      <Toolbar />
      <Grid container>
        <Grid item container direction="column" xs={12} md={6}>
          <Autocomplete
            onChange={(e, name) => {
              searchPerson(name);
            }}
            id="search"
            options={people.people.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                lebel="search"
                placeholder="Search Name"
                variant="outlined"
              />
            )}
          />
          <Grid item>
            {person.name ? (
              <Table>
                <TableBody>
                  {Object.entries(person).map(([key, value]) => {
                    return (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div>
                <Typography variant="h4">Please select the person</Typography>
              </div>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          Edit form
        </Grid>
      </Grid>
    </Container>
  );
}

export default People;
