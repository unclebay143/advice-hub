import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";

// Icons
import {
  ArrowDownward,
  ArrowUpward,
  Bookmark,
  Comment,
  Delete,
  Edit,
} from "@material-ui/icons";
import "./advice-details.css";

// Actions
import {
  bookmarkAdviceCard,
  downvoteAdviceCard,
  fetchBookmarkedAdvices,
  getAdviceDetails,
  removeAdviceCardFromBookmark,
  upvoteAdviceCard,
} from "../../../redux/advice/actions/advice.actions";

// Helper
import { timeAgo } from "../../_helper/time/time";

// Loader
import BubbleLoader from "../../layouts/loader/Loader";

// Component
import { Button } from "@material-ui/core";
import { BASE_URL } from "../../../redux/advice/service/root-endpoints";
const EditForm = lazy(() => import("../update-advice/EditForm"));
const AdviceCommentCard = lazy(() => import("../comment/Comment"));
const CommentForm = lazy(() => import("../comment/CommentForm"));

const AdviceDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { adviceId } = useParams();
  const [adviceDetails, setAdviceDetails] = useState(null);
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const { bookMarked } = useSelector((state) => state.advices);
  const bookMarkedIDs = bookMarked?.map((advice) => advice.id);
  const bookedMarkedStatus = bookMarkedIDs?.includes(adviceDetails?.id);
  const [isBookedMarked, setIsBookedMarked] = useState(bookedMarkedStatus);

  const [editMode, setEditMode] = useState(false);

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
    downvotes,
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

      setHasUpvoted(hasUpvotedStatus);
    }

    if (user && downvotes) {
      // if the author username is the same as the current user, it cannot be upvoted -return false
      const hasDownvotedStatus =
        isAuthenticated &&
        authorUsername !== user.nickname &&
        downvotes.includes(user.nickname);

      //set user downvote status
      setHasDownvoted(hasDownvotedStatus);
    }
  }, [isAuthenticated, upvotes, downvotes, user, authorUsername]);

  // Show loader when fetching
  if (adviceDetails === null) {
    return <BubbleLoader />;
  }

  // Upvote function
  const handleUpvote = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }

    // Prevent author from upvoting ????
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
      setHasUpvoted(false);
      user
        ? dispatch(upvoteAdviceCard(adviceId, user.nickname))
        : loginWithRedirect();
    } else {
      // Push the username into the upvoters array
      upvotes.push(user.nickname);
      // Update the number of upvotes
      setHasUpvoted(true);
      user
        ? dispatch(upvoteAdviceCard(adviceId, user.nickname))
        : loginWithRedirect();
    }
  };

  // DownVote function
  const handleDownvote = () => {
    if (!isAuthenticated) {
      return loginWithRedirect();
    }

    // Prevent author from downvoting ?????????????
    if (user.nickname === authorUsername) {
      return;
    }

    // ????
    if (hasDownvoted) {
      // Get user index
      const userIndex = downvotes.indexOf(user.nickname);
      if (userIndex > -1) {
        // Remove user from downvoters
        downvotes.splice(userIndex, 1);
      }
      setHasDownvoted(false);
      user
        ? dispatch(downvoteAdviceCard(adviceId, user.nickname))
        : loginWithRedirect();
    } else {
      // Push the username into the downvoters array
      downvotes.push(user.nickname);
      setHasDownvoted(true);
      user
        ? dispatch(downvoteAdviceCard(adviceId, user.nickname))
        : loginWithRedirect();
    }
  };

  // delete advice
  const deleteAdvice = async () => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this advice?"
    );
    if (confirmDelete) {
      try {
        const { data } = await axios.post(BASE_URL + "/advice/delete", {
          adviceId,
        });

        if (data.status.toLowerCase() === "success") {
          history.push(`/profile/${authorUsername}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //
  const canEditAndDelete = user?.nickname === authorUsername;
  // const adviceNotFound = adviceDetails === undefined;

  if (adviceDetails === undefined) {
    return (
      <>
        <div className="advice-not-found">
          <h1>Advice Not Found ????</h1>
          <div>
            <Link to="/" className="no-decoration">
              Back to Advice Hub
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Upvote count message
  function upvoterCounter() {
    // Remove current user
    const withoutCurrentUser =
      user && upvotes.filter((voters) => voters !== user.nickname);

    //
    switch (true) {
      // you
      case hasUpvoted && upvotes.length === 1:
        return `upvoted by you`;

      // current_user and user_1
      case hasUpvoted && upvotes.length === 2:
        return `upvoted by you, and ${withoutCurrentUser[0]}`;

      // current_user , user_1 and user 2
      case hasUpvoted && upvotes.length > 2:
        return `upvoted by you, ${withoutCurrentUser[0]} and ${
          withoutCurrentUser.length - 1
        } others`;

      // Only upvoted by the current user
      case upvotes.length === 1:
        return `upvoted by ${upvotes[0]}`;

      default:
        return `upvoted by ${upvotes[0] || upvotes[1]} and ${
          upvotes.length - 1
        } others`;
    }
  }
  return (
    <React.Fragment>
      {editMode ? (
        <EditForm
          adviceId={adviceId}
          heading={heading}
          description={description}
          category={category}
        />
      ) : (
        <div className="advice-details-container">
          <article className="advice-details">
            <div className="advice-heading">
              <h1>{heading}</h1>
              {canEditAndDelete && (
                <section className="advice-action-wrapper">
                  <Edit
                    className="edit-icon"
                    onClick={() => setEditMode(true)}
                  />
                  <Delete className="delete-icon" onClick={deleteAdvice} />
                </section>
              )}
            </div>
            <section className="author-info">
              <Link
                className="no-decoration"
                aria-label={authorUsername}
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
                <p className="no-description">No description ????</p>
              )}
            </section>

            <section className="advice-info">
              <Link
                className="no-decoration"
                aria-label={heading}
                to={`/${category}`}
              >
                <Button className="advice-tag">#{category}</Button>
              </Link>
              <Button className="posted-date">
                Posted: {timeAgo(__createdtime__)}
              </Button>
            </section>

            <section className="advice-upvote-counter">
              {upvoterCounter()}
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
                      if (!isAuthenticated) {
                        return loginWithRedirect();
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
                style={{
                  opacity: `${
                    isAuthenticated && user.nickname === authorUsername && "0.8"
                  }`,
                }}
                className={`downvote-icon advice-action--icon ${
                  hasDownvoted > 0 ? "downvoted" : ""
                }`}
                onClick={() => handleDownvote()}
              >
                <ArrowDownward /> &nbsp; downvote
              </Button>
            </section>
          </article>

          {/* Comment form */}
          <section className="advice-comment-form">
            {isAuthenticated && (
              <CommentForm
                adviceId={adviceId}
                commentAuthor={user.nickname}
                commentAuthor_image={user.picture}
              />
            )}
          </section>

          {/* Comment section */}
          <section className="advice-comment-container">
            {adviceDetails && <AdviceCommentCard adviceId={adviceId} />}
          </section>
        </div>
      )}
    </React.Fragment>
  );
};

export default AdviceDetails;
