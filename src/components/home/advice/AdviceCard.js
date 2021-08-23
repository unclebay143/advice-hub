import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./../advice/advice-card.css";

// Icons
import {
  ArrowDownwardRounded,
  ArrowUpwardOutlined,
  BookmarkBorderOutlined,
  Chat,
  ShareOutlined,
} from "@material-ui/icons";

//  Helpers
import { timeAgo } from "../../_helper/time/time";
import { handleVotes } from "../../_helper/votes/voterendering";

// Actions
import {
  bookmarkAdviceCard,
  downvoteAdviceCard,
  removeAdviceCardFromBookmark,
  upvoteAdviceCard,
} from "../../../redux/advice/actions/advice.actions";

// Components
import Card from "@material-ui/core/Card";
import { useDispatch } from "react-redux";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import { Grid } from "@material-ui/core";

export default function AdviceCard({
  createdTime,
  heading,
  upvotes,
  downvotes,
  category,
  author_id,
  authorImageUrl,
  authorUsername,
  adviceId,
  bookMarked,
}) {
  const dispatch = useDispatch();
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [numberOfUpvotes, setNumberOfUpvotes] = useState(0);
  const [numberOfDownvotes, setNumberOfDownvotes] = useState(0);
  const [isBookedMarked, setIsBookMarked] = useState(bookMarked);
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [isImageBroken, setIsImageBroken] = useState(false);

  // Handle Broken image - this replace image with username first letter
  const brokenImageAlt = () => {
    setIsImageBroken(true);
  };

  // Abbr text on hover
  const shareAdviceCardMessage = `${heading} -By: ${authorUsername}`;

  // Check if the user has upvoted the post -author not included
  useEffect(() => {
    if (user && upvotes) {
      // if the author username is the same as the current user, it cannot be upvoted -return false
      const hasUpvotedStatus =
        isAuthenticated &&
        authorUsername !== user.nickname &&
        upvotes.includes(user.nickname);
      //set user upvote status
      setHasUpvoted(hasUpvotedStatus);
    }
    // the length of upvoters is the number of upvotes 🤟
    setNumberOfUpvotes(upvotes.length);

    if (user && downvotes) {
      // if the author username is the same as the current user, it cannot be upvoted -return false
      const hasDownvotedStatus =
        isAuthenticated &&
        authorUsername !== user.nickname &&
        downvotes.includes(user.nickname);

      //set user downvote status
      setHasDownvoted(hasDownvotedStatus);
    }

    // the length of downvoters is the number of upvotes 🤟
    setNumberOfDownvotes(downvotes.length);
  }, [isAuthenticated, upvotes, downvotes, user, authorUsername]);

  // Upvote function
  const handleUpvote = () => {
    // Login before upvoting
    if (!isAuthenticated) {
      return loginWithRedirect();
    }

    // Prevent author from upvoting 🤷‍♀️
    if (user.nickname === authorUsername) {
      return;
    }

    // 👍
    if (hasUpvoted) {
      // Get user index
      const userIndex = upvotes.indexOf(user.nickname);
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

  // DownVote function
  const handleDownvote = () => {
    if (!isAuthenticated) {
      return loginWithRedirect();
    }

    // Prevent author from downvoting 🤷‍♂️
    if (user.nickname === authorUsername) {
      return;
    }

    // 👎
    if (hasDownvoted) {
      // Get user index
      const userIndex = downvotes.indexOf(user.nickname);
      if (userIndex > -1) {
        // Remove user from downvoters
        downvotes.splice(userIndex, 1);
      }
      // Update the number of downvotes
      setNumberOfDownvotes(downvotes.length);
      setHasDownvoted(false);
      user
        ? dispatch(downvoteAdviceCard(adviceId, user.nickname))
        : loginWithRedirect();
    } else {
      // Push the username into the downvoters array
      downvotes.push(user.nickname);
      // Update the number of downvotes
      setNumberOfDownvotes(downvotes.length);
      setHasDownvoted(true);
      user
        ? dispatch(downvoteAdviceCard(adviceId, user.nickname))
        : loginWithRedirect();
    }
  };

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
        return `you, ${withoutCurrentUser[0]} and ${
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
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <abbr
          title={`Created by ${authorUsername.toUpperCase()}`}
          className="no-decoration"
        >
          <Card>
            <section className="img-bookmark">
              <Link
                to={{
                  pathname: `/profile/${authorUsername}`,
                  state: { params: { author_id } },
                }}
                className="no-decoration"
                aria-label={heading}
              >
                <Avatar
                  aria-label="recipe"
                  style={{
                    margin: "1rem 1rem 0.45rem 1rem",
                    background: `${isImageBroken ? "red" : ""}`,
                  }}
                >
                  {isImageBroken ? (
                    authorUsername.slice(0, 1)
                  ) : (
                    <abbr title={`${authorUsername}`}>
                      <img
                        src={`${JSON.parse(authorImageUrl)}`}
                        alt={authorUsername.slice(0, 1)}
                        width="100%"
                        height="100%"
                        onError={brokenImageAlt}
                        loading="lazy"
                      />
                    </abbr>
                  )}
                </Avatar>
              </Link>
              <abbr title="Bookmark Advice" className="no-decoration">
                {isBookedMarked ? (
                  <div
                    className="bookmark-icon"
                    onClick={() => {
                      setIsBookMarked(false);
                      dispatch(
                        removeAdviceCardFromBookmark(adviceId, user.nickname)
                      );
                    }}
                  >
                    <BookmarkBorderOutlined
                      className={`${isBookedMarked ? "bookmarked" : ""}`}
                    />
                  </div>
                ) : (
                  <div
                    className="bookmark-icon"
                    onClick={() => {
                      if (!isAuthenticated) {
                        return loginWithRedirect();
                      }
                      setIsBookMarked(true);
                      dispatch(bookmarkAdviceCard(adviceId, user.nickname));
                    }}
                  >
                    <BookmarkBorderOutlined
                      className={`${isBookedMarked ? "bookmarked" : ""}`}
                    />
                  </div>
                )}
              </abbr>
            </section>
            <p className="advice-category-tag">{category}</p>
            <Link
              to={`/advice/${adviceId}`}
              className="no-decoration"
              aria-label={heading}
            >
              <CardHeader
                title={`${heading.toString().slice(0, 50)}${
                  heading.length > 50 ? "..." : ""
                }`}
                subheader={`Given ${timeAgo(createdTime)}`}
              />
            </Link>

            <CardActions disableSpacing>
              <abbr title="Upvote Advice" className="no-decoration">
                <div
                  className={`vote-wrap ${hasUpvoted ? "upvoted" : ""}`}
                  onClick={() => handleUpvote()}
                >
                  <ArrowUpwardOutlined className="icon" />{" "}
                  {/* Show the upvoters on hover */}
                  <abbr title={upvoterCounter()} className="no-decoration">
                    <span className="vote-count">
                      {handleVotes(numberOfUpvotes)}
                    </span>
                  </abbr>
                </div>
              </abbr>
              {/* comment icon */}
              <abbr title="Comment on this Advice" className="no-decoration">
                <div className="comment-wrap">
                  <Chat className="comment-icon" />
                </div>
              </abbr>
              {/* share icon */}
              <abbr title="Share to Twitter" className="no-decoration">
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareAdviceCardMessage}`}
                  rel="noreferrer"
                  target="_blank"
                  className="no-decoration"
                  aria-label={`twitter handle share - ${shareAdviceCardMessage}`}
                >
                  <div className="vote-wrap">
                    <ShareOutlined />
                    <span className="vote-count">&nbsp;</span>
                  </div>
                </a>
              </abbr>
              <div
                className={`vote-wrap ${hasDownvoted > 0 ? "downvoted" : ""}`}
                onClick={() => handleDownvote()}
              >
                <ArrowDownwardRounded className="icon" />{" "}
                <span className="vote-count">
                  {handleVotes(numberOfDownvotes)}
                </span>
              </div>
            </CardActions>
          </Card>
        </abbr>
      </Grid>
    </React.Fragment>
  );
}
