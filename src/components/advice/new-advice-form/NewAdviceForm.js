import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./new-advice-form.css";
import { Button } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { pageUrl } from "../../constant/pageurl";
import { useHistory } from "react-router";
import {
  createAdvice,
  fetchAdvices,
} from "../../../redux/advice/actions/advice.actions";
import { useDispatch } from "react-redux";

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
  const { user, isAuthenticated, isLoading } = useAuth0();
  const history = useHistory();
  const dispatch = useDispatch();
  const [submittingStatus, setsubmittingStatus] = useState("Git push");

  const [newAdvice, setNewAdvice] = useState({
    category: "",
    heading: "",
    description: "",
    authorUsername: null,
    authorImageUrl: null,
    author_id: null,
  });

  useEffect(() => {
    if (isAuthenticated) {
      setNewAdvice({
        ...newAdvice,
        authorUsername: user.nickname,
        authorImageUrl: JSON.stringify(user.picture),
        author_id: user.sub,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Only authenticated user can post
  if (!isLoading && !isAuthenticated) {
    history.push(pageUrl.HOMEPAGE);
  }

  const handleChange = (event) => {
    const { value, name } = event.target;
    return setNewAdvice({ ...newAdvice, [name]: value });
  };

  // Form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Ensure user selects from the right options and does not submit an empty form
    if (
      newAdvice.category.toLowerCase() === "choose" ||
      newAdvice.category.toLowerCase() === ""
    ) {
      document.querySelector("#category").style.borderColor = "yellow";
      setsubmittingStatus("Resolve conflict");

      return;
    } else if (!newAdvice.heading) {
      document.querySelector("#heading").style.borderColor = "yellow";
      setsubmittingStatus("Resolve conflict");

      return;
    } else {
      document.querySelector("#category").style.borderColor = "none";
      setsubmittingStatus("Enumerating Objects 61%, done");

      // Send to backend
      dispatch(createAdvice(newAdvice))
        .then(({ data }) => {
          const { message, id } = data;
          if (message === "success") {
            dispatch(fetchAdvices())
              .then((res) => {
                history.push(`/advice/${id}`);
              })
              .catch((error) => console.log(error));
          }
          setsubmittingStatus("Done, 100%");

          // setsubmittingStatus("Git push");
        })
        .catch((error) => {
          console.log(error);
          setsubmittingStatus("Git push");
        });
    }
  };

  return (
    <div className={classes.paper} id="new-advice-form-container">
      <h2 id="transition-modal-title">Create an Advice Card</h2>
      <p id="transition-modal-description">
        Share a short experience or tips with others.
      </p>

      <form className="new-advice-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label>Select a Category</label>
          <select
            onChange={handleChange}
            value={newAdvice.category}
            name="category"
            id="category"
            required
          >
            <option value="choose">Choose</option>
            <option value="general">General</option>
            <option value="product-management">Product management</option>
            <option value="ui-ux">UI-UX</option>
            <option value="web-development">Web development</option>
            <option value="soft-skills">Soft Skills</option>
          </select>
        </div>
        <div className="input-wrapper">
          <label>Give A Short Advice</label>
          <input
            // maxLength="60"
            placeholder="Advice title"
            type="text"
            name="heading"
            id="heading"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-wrapper">
          <label>
            Description <span className="optional-tag">(optional)</span>
          </label>
          <textarea
            type="text"
            name="description"
            placeholder="Give a descripton about the advice"
            onChange={handleChange}
          />
        </div>
        <div className="input-wrapper btn-wrapper">
          <Button variant="contained" color="secondary" type="submit">
            {submittingStatus}
          </Button>
        </div>
      </form>
    </div>
  );
}
