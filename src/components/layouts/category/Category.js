import { FormControl, InputLabel, makeStyles, Select } from "@material-ui/core";
import React from "react";
import "./category.css";

export const Category = () => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const [state, setState] = React.useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-category-native-simple">
          Category
        </InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: "age",
            id: "filled-category-native-simple",
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>HTML and CSS</option>
          <option value={20}>UI-UX</option>
          <option value={30}>Web development</option>
          <option value={30}>Soft Skills</option>
          <option value={30}>General</option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
};
