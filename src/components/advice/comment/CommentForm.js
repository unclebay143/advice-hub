import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../../redux/advice/service/root-endpoints";
import "./comment-form.css";

const CommentForm = (props) => {
  const { commentAuthor, commentAuthor_image, adviceId } = props;
  const [newComment, setNewComment] = useState({
    adviceId,
    commentAuthor,
    commentAuthor_image: JSON.stringify(commentAuthor_image),
    commentText: "",
  });

  //
  const handleChange = (event) => {
    const { value, name } = event.target;
    return setNewComment({ ...newComment, [name]: value });
  };

  // Form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newComment.commentText) {
      return;
    }

    try {
      const { data } = await axios.post(
        BASE_URL + "/comments/new_comment",
        newComment
      );

      // Note: find a way to notify the commentcard component that there's a new comment
      if (data.status.toLowerCase() === "success") {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <section className="comment-form-wrapper">
        <form className="comment-form" onSubmit={handleSubmit}>
          <div>
            <textarea
              type="text"
              name="commentText"
              placeholder="Comment"
              className="comment-textinput"
              onChange={handleChange}
            />
          </div>
          <div>
            <Button variant="contained" color="secondary" type="submit">
              Comment
            </Button>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
};

export default CommentForm;
