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
import { getAdviceDetails } from "../../../redux/advice/actions/advice.actions";
import { useDispatch } from "react-redux";
import { timeAgo } from "../../_helper/time/time";
import { BubbleLoader } from "../../layouts/loader/Loader";

export const AdviceDetails = () => {
  const { adviceId } = useParams();
  const [adviceDetails, setAdviceDetails] = useState(null);
  const dispatch = useDispatch();

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

  // Show loader when fetching
  if (adviceDetails === null) {
    return <BubbleLoader />;
  }

  const {
    heading,
    description,
    category,
    authorUsername,
    authorImageUrl,
    __createdtime__,
    upvotes,
    downvotes,
  } = adviceDetails || {};

  const handleUpvoteRendering = (upvotes) => {
    switch (upvotes) {
      case 0:
        return "No upvotes";
      case 1:
        return `${upvotes} upvote`;
      case upvotes > 1:
        return `${upvotes} upvotes`;
      default:
        return "No upvotes";
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
            {handleUpvoteRendering(upvotes)}
          </section>

          <section className="advice-action">
            <Button className="advice-action--icon">
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
