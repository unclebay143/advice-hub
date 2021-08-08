import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import { Grid } from "@material-ui/core";
import "./advice-card.css";
import {
  ArrowDownwardRounded,
  ArrowUpwardOutlined,
  BookmarkBorderOutlined,
  Chat,
  ChatBubbleOutlineOutlined,
  CommentRounded,
  CommentSharp,
  ModeComment,
  ShareOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { timeAgo } from "../../_helper/time/time";
import { handleVotes } from "../../_helper/votes/voterendering";
import { useAuth0 } from "@auth0/auth0-react";
import { upvoteAdviceCard } from "../../../redux/advice/actions/advice.actions";
import { useDispatch } from "react-redux";

/* Removed the author username from upvotes -add to have 1 upvote for every new advice */

export function AdviceCard({
  createdTime,
  heading,
  upvotes,
  downvotes,
  category,
  authorImageUrl,
  authorUsername,
  adviceId,
}) {
  const bookmarked = false; // keep the id of the user bookmarks advice then check it here and use boolean
  const [isImageBroken, setIsImageBroken] = useState(false);
  const theAuthorUpvote = 1;
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [numberOfUpvotes, setNumberOfUpvotes] = useState(0);
  const dispatch = useDispatch();

  // Handle Broken image
  const brokenImageAlt = () => {
    setIsImageBroken(true);
  };

  const shareAdviceCardMessage = `${heading} -By: ${authorUsername}`;

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

  const handleUpvote = () => {
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

  // Upvote count message
  function upvoterCounter() {
    if (user) {
      const withoutCurrentUser = upvotes.filter(
        (voters) => voters !== user.nickname
      );
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

        case upvotes.length === 1:
          return `upvoted by ${upvotes[0]}`;
        default:
          return `upvoted by ${upvotes[0] || upvotes[1]} and ${
            upvotes.length - 1
          } others`;
      }
    }
  }

  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <section className="img-bookmark">
            <Avatar
              aria-label="recipe"
              style={{
                margin: "1rem 1rem 0.45rem 1rem",
                background: `${isImageBroken ? "red" : ""}`,
              }}
            >
              {isImageBroken ? (
                "R"
              ) : (
                <img
                  src={`${JSON.parse(authorImageUrl)}`}
                  alt={authorUsername.slice(0, 1)}
                  width="100%"
                  height="100%"
                  onError={brokenImageAlt}
                />
              )}
            </Avatar>
            <abbr title="Bookmark Advice">
              <div className="bookmark-icon">
                {/* bookmark icon */}
                <BookmarkBorderOutlined
                  className={`${bookmarked ? "bookmarked" : ""}`}
                />
              </div>
            </abbr>
          </section>
          <p className="advice-category-tag">{category}</p>
          <Link to={`advice/${adviceId}`} className="no-decoration">
            <CardHeader
              title={`${heading.toString().slice(0, 50)}${
                heading.length > 50 ? "..." : ""
              }`}
              subheader={`Given ${timeAgo(createdTime)}`}
            />
          </Link>

          <CardActions disableSpacing>
            <abbr title="Upvote Advice">
              <div
                className={`vote-wrap ${hasUpvoted ? "upvoted" : ""}`}
                onClick={() => handleUpvote()}
              >
                <ArrowUpwardOutlined className="icon" />{" "}
                {/* Show the upvoters on hover */}
                <abbr title={upvoterCounter()}>
                  <span className="vote-count">
                    {handleVotes(numberOfUpvotes)}
                  </span>
                </abbr>
              </div>
            </abbr>
            {/* comment icon */}
            <abbr title="Comment on this Advice">
              <div className="comment-wrap">
                <Chat className="comment-icon" />
              </div>
            </abbr>
            {/* share icon */}
            <abbr title="Share to Twitter" className="no-decoration">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareAdviceCardMessage}`}
                rel="noreffer"
                target="_blank"
                className="no-decoration"
              >
                <div className="vote-wrap">
                  <ShareOutlined />
                  <span className="vote-count">&nbsp;</span>
                </div>
              </a>
            </abbr>
            <div
              className={`vote-wrap ${
                upvotes.length - theAuthorUpvote > 0 ? "downvoted" : ""
              }`}
            >
              <ArrowDownwardRounded className="icon" />{" "}
              <span className="vote-count">
                {handleVotes(downvotes.length)}
              </span>
            </div>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
