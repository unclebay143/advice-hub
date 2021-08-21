import { FormControl, InputLabel, makeStyles, Select } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import "./category.css";

export const Category = () => {
  const history = useHistory();
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

  const handleChange = (event) => {
    const value = event.target.value;
    history.push("/" + value);
  };

  return (
    <React.Fragment>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-category-native-simple">
          Category
        </InputLabel>
        <Select
          native
          onChange={handleChange}
          inputProps={{
            name: "category",
            id: "filled-category-native-simple",
          }}
        >
          <option aria-label="None" value="" />
          <option value={"recent"}>All</option>
          <option value={"general"}>General</option>
          <option value={"web-development"}>Web development</option>
          <option value={"product-management"}>product management</option>
          <option value={"ui-ux"}>UI-UX</option>
          <option value={"soft-skills"}>Soft Skills</option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
};
