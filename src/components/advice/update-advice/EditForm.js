import React, { useState } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import "./editform.css";
import { BASE_URL } from "../../../redux/advice/service/root-endpoints";

const EditForm = (props) => {
  const { adviceId, heading, description, category } = props;
  const [isLoading, setIsLoading] = useState(false);
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

  // Form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        BASE_URL + "/advice/edit",
        updatedRecord
      );

      if (data.status.toLowerCase() === "success") {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="edit-form-wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Update</h1>
          <div className="edit-input-wrapper">
            <label htmlFor="heading">Advice heading</label>
            <input
              defaultValue={heading}
              name="heading"
              id="heading"
              onChange={handleChange}
            />
          </div>
          <div className="edit-input-wrapper">
            <label htmlFor="description">Advice Description</label>

            <textarea
              defaultValue={description}
              name="description"
              id="description"
              onChange={handleChange}
            />
          </div>
          <Button variant="contained" color="secondary" type="submit">
            {isLoading ? "Please wait..." : "Update"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditForm;
