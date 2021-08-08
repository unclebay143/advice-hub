import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "@material-ui/core";
import {
  ArrowDownward,
  ArrowUpward,
  Bookmark,
  Comment,
} from "@material-ui/icons";
import "./advice-details.css";
import {
  getAdviceDetails,
  upvoteAdviceCard,
} from "../../../redux/advice/actions/advice.actions";
import { useDispatch } from "react-redux";
import { timeAgo } from "../../_helper/time/time";
import { BubbleLoader } from "../../layouts/loader/Loader";
import { handleUpvoteRendering } from "../../_helper/votes/voterendering";
import { useAuth0 } from "@auth0/auth0-react";

export const AdviceDetails = () => {
  const dispatch = useDispatch();
  const { adviceId } = useParams();
  const [adviceDetails, setAdviceDetails] = useState(null);
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [numberOfUpvotes, setNumberOfUpvotes] = useState(0);

  const {
    heading,
    description,
    category,
    authorUsername,
    authorImageUrl,
    __createdtime__,
    upvotes,
    // downvotes,
  } = adviceDetails || {};

  // Get advice info
  useEffect(() => {
    dispatch(getAdviceDetails(adviceId))
      .then(({ data }) => {
        setAdviceDetails(data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      setAdviceDetails(null);
    };
  }, [adviceId, dispatch]);

  // Check if the user has upvoted the post -author not included
  useEffect(() => {
    if (user && upvotes) {
      // if the author username is the same as the current user, it cannot be upvoted -return false
      const hasUpvotedStatus =
        isAuthenticated &&
        authorUsername !== user.nickname &&
        upvotes.includes(user.nickname);

      setNumberOfUpvotes(upvotes.length);

      setHasUpvoted(hasUpvotedStatus);
    }
  }, [isAuthenticated, upvotes, user]);

  // Show loader when fetching
  if (adviceDetails === null) {
    return <BubbleLoader />;
  }

  const handleUpvote = () => {
    if (hasUpvoted) {
      // Get user index
      const userIndex = adviceDetails.upvotes.indexOf(user.nickname);
      if (userIndex > -1) {
        // Remove user from upvoters
        upvotes.splice(userIndex, 1);
      }
      // Update the number of upvotes
      setNumberOfUpvotes(upvotes.length);
      setHasUpvoted(false);
      user
        ? dispatch(upvoteAdviceCard(adviceId, user.nickname))
        : loginWithRedirect();
    } else {
      // Push the username into the upvoters array
      upvotes.push(user.nickname);
      // Update the number of upvotes
      setNumberOfUpvotes(upvotes.length);
      setHasUpvoted(true);
      user
        ? dispatch(upvoteAdviceCard(adviceId, user.nickname))
        : loginWithRedirect();
    }
  };

  return (
    <React.Fragment>
      <div className="advice-details-container">
        <article className="advice-details">
          <div className="advice-heading">
            <h1>{heading}</h1>
          </div>
          <section className="author-info">
            <div className="author-image">
              <img
                src={`${JSON.parse(authorImageUrl)}`}
                alt={`${authorUsername}`}
              />
            </div>
            <cite className="author-name">By: {authorUsername}</cite>
          </section>

          <section className="advice-description">
            {description ? (
              <p className="advice-description--text">{description}</p>
            ) : (
              <p className="no-description">No description 😀</p>
            )}
          </section>

          <section className="advice-info">
            <Button className="advice-tag">#{category}</Button>
            <Button className="posted-date">
              Posted: {timeAgo(__createdtime__)}
            </Button>
          </section>

          <section className="advice-upvote-counter">
            {handleUpvoteRendering(numberOfUpvotes)}
          </section>

          <section className="advice-action">
            <Button
              className={`advice-action--icon ${hasUpvoted ? "upvoted" : ""}`}
              onClick={() => handleUpvote()}
            >
              <ArrowUpward /> &nbsp; upvote
            </Button>
            <Button className="advice-action--icon">
              <Comment /> &nbsp; Comment
            </Button>
            <Button className="advice-action--icon">
              <Bookmark /> &nbsp; Bookmark
            </Button>
            <Button className="downvote-icon advice-action--icon">
              <ArrowDownward /> &nbsp; downvote
            </Button>
          </section>

          <section className="advice-comment-container">
            <p className="no-comment">No comment yet</p>
          </section>
        </article>
      </div>
    </React.Fragment>
  );
};
