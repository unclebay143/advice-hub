import { FormControl, InputLabel, Select } from "@material-ui/core";
import React from "react";
import "./choice.css";
export const Choice = () => {
  return (
    <React.Fragment>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">Age</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: "age",
            id: "filled-age-native-simple",
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
};
