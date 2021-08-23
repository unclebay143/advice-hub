import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./editform.css";

const EditForm = (props) => {
  const { adviceId, heading, description, category } = props;
  const [updatedRecord, setUpdatedRecord] = useState({
    adviceId,
    heading,
    description,
    category,
  });

  //
  const handleChange = (event) => {
    const { value, name } = event.target;
    return setUpdatedRecord({ ...updatedRecord, [name]: value });
  };

  // submit function
  // Form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(updatedRecord);
  };
  return (
    <>
      <div className="edit-form-wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Update</h1>
          <div className="edit-input-wrapper">
            <label htmlFor="heading">Advice heading</label>
            <input
              value={heading}
              name="heading"
              id="heading"
              onChange={handleChange}
            />
          </div>
          <div className="edit-input-wrapper">
            <label htmlFor="description">Advice Description</label>

            <textarea
              value={description}
              name="description"
              id="description"
              onChange={handleChange}
            />
          </div>
          <Button variant="contained" color="secondary" type="submit">
            Update
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditForm;
