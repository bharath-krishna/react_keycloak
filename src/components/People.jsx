import {
  Container,
  Grid,
  makeStyles,
  Table,
  TableRow,
  TableCell,
  TextField,
  Toolbar,
  TableBody,
  Typography,
  Avatar,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useState } from "react";

const useStyle = makeStyles((theme) => ({
  container: {},
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
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
            classes={{
              option: classes.option,
            }}
            onChange={(e, person) => {
              if (person) {
                searchPerson(person.name);
              } else {
                setPerson({});
              }
            }}
            id="search"
            autoHighlight
            options={people.people.map((option) => option)}
            getOptionLabel={(person) => person.name}
            renderOption={(person, state) => (
              <React.Fragment>
                <Avatar />
                <Typography variant="body1">{person.name}</Typography>
              </React.Fragment>
            )}
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
              <PersonTable person={person} />
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

function PersonTable({ person }) {
  return (
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
  );
}
