import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./new-advice-form.css";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function NewAdviceForm() {
  const classes = useStyles();

  return (
    <div className={classes.paper} id="new-advice-form-container">
      <h2 id="transition-modal-title">Create an Advice Card</h2>
      <p id="transition-modal-description">
        Share a short experience or tips with others.
      </p>

      <form className="new-advice-form">
        <div className="input-wrapper">
          <label>Select a Category</label>
          <select>
            <option>Choose</option>
            <option>Product management</option>
            <option>UI-UX</option>
            <option>Web development</option>
          </select>
        </div>
        <div className="input-wrapper">
          <label>Give A Short Advice</label>
          <input maxLength="60" placeholder="Advice title" type="text" />
        </div>
        <div className="input-wrapper">
          <label>
            Description <span className="optional-tag">(optional)</span>
          </label>
          <textarea
            type="text"
            placeholder="Give a descripton about the advice"
          />
        </div>
        <div className="input-wrapper btn-wrapper">
          <Button variant="contained" color="secondary">
            Git push
          </Button>
        </div>
      </form>
    </div>
  );
}
