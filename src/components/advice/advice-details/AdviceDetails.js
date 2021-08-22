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
  bookmarkAdviceCard,
  fetchBookmarkedAdvices,
  getAdviceDetails,
  removeAdviceCardFromBookmark,
  upvoteAdviceCard,
} from "../../../redux/advice/actions/advice.actions";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../../_helper/time/time";
import { BubbleLoader } from "../../layouts/loader/Loader";
import { handleUpvoteRendering } from "../../_helper/votes/voterendering";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export const AdviceDetails = () => {
  const dispatch = useDispatch();
  const { adviceId } = useParams();
  const [adviceDetails, setAdviceDetails] = useState(null);
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [numberOfUpvotes, setNumberOfUpvotes] = useState(0);
  const { bookMarked } = useSelector((state) => state.advices);
  const bookMarkedIDs = bookMarked.map((advice) => advice.id);
  const bookedMarkedStatus = bookMarkedIDs.includes(adviceDetails?.id);
  const [isBookedMarked, setIsBookedMarked] = useState(bookedMarkedStatus);

  // Get all bookmarks of the user to check if the current is bookmarked
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchBookmarkedAdvices(user.nickname));
    }
  }, [isAuthenticated, dispatch, user]);

  // Set bookmark status
  useEffect(() => {
    setIsBookedMarked(bookedMarkedStatus);
  }, [bookedMarkedStatus]);

  const {
    heading,
    description,
    category,
    author_id,
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
  }, [isAuthenticated, upvotes, user, authorUsername]);

  // Show loader when fetching
  if (adviceDetails === null) {
    return <BubbleLoader />;
  }

  const handleUpvote = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }

    // Prevent author from upvoting 🤷
    if (user.nickname === authorUsername) {
      return;
    }

    // Check if user has upvoted before
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
            <Link
              className="no-decoration"
              to={{
                pathname: `/profile/${authorUsername}`,
                state: { params: { author_id } },
              }}
            >
              <div className="author-image">
                <img
                  src={`${JSON.parse(authorImageUrl)}`}
                  alt={`${authorUsername}`}
                />
              </div>
              <cite className="author-name">By: {authorUsername}</cite>
            </Link>
          </section>

          <section className="advice-description">
            {description ? (
              <p className="advice-description--text">{description}</p>
            ) : (
              <p className="no-description">No description 😀</p>
            )}
          </section>

          <section className="advice-info">
            <Link className="no-decoration" to={`/${category}`}>
              <Button className="advice-tag">#{category}</Button>
            </Link>
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
              style={{
                opacity: `${
                  isAuthenticated && user.nickname === authorUsername && "0.8"
                }`,
              }}
            >
              <ArrowUpward /> &nbsp; upvote
            </Button>
            <Button className="advice-action--icon">
              <Comment /> &nbsp; Comment
            </Button>
            <abbr title="Bookmark Advice" className="no-decoration">
              {isBookedMarked ? (
                <Button
                  className={`advice-action--icon ${
                    isBookedMarked ? "bookmarked" : ""
                  }`}
                  onClick={() => {
                    setIsBookedMarked(false);
                    dispatch(
                      removeAdviceCardFromBookmark(adviceId, user.nickname)
                    );
                  }}
                >
                  <Bookmark /> &nbsp; bookmark
                </Button>
              ) : (
                <Button
                  className={`advice-action--icon ${
                    isBookedMarked ? "bookmarked" : ""
                  }`}
                  onClick={() => {
                    if(!isAuthenticated){
                      return loginWithRedirect()
                    }
                    setIsBookedMarked(true);
                    dispatch(bookmarkAdviceCard(adviceId, user.nickname));
                  }}
                >
                  <Bookmark /> &nbsp; bookmark
                </Button>
              )}
            </abbr>

            <Button
              className="downvote-icon advice-action--icon"
              style={{
                opacity: `${
                  isAuthenticated && user.nickname === authorUsername && "0.8"
                }`,
              }}
            >
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
