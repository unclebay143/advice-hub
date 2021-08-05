import { Button } from "@material-ui/core";
import {
  ArrowDownward,
  ArrowUpward,
  Bookmark,
  Comment,
} from "@material-ui/icons";
import React from "react";
import { useParams } from "react-router";
import "./advice-details.css";

export const AdviceDetails = () => {
  const hasDescription = true;
  const { adviceId } = useParams();
  return (
    <React.Fragment>
      <div className="advice-details-container">
        <article className="advice-details">
          <div className="advice-heading">
            <h1>
              learn html, css and javascript basics before frameworks -{" "}
              {adviceId}
            </h1>
          </div>
          <section className="author-info">
            <div className="author-image">
              <img
                src="https://www.github.com/unclebay143.png"
                alt="author avatar"
              />
            </div>
            <cite className="author-name">By: unclebigbay</cite>
          </section>

          <section className="advice-description">
            {hasDescription ? (
              <p className="advice-description--text">
                I am saying that you need to study html, css and javascript
                basic to the fullest in order to have a better shift to
                frameworks, check this link and study math too www.google.com I
                am saying that you need to study html, css and javascript basic
                to the fullest in order to have a better shift to frameworks,
                check this link and study math too www.google.com am saying that
                {/* you need to study html, css and javascript basic to the fullest
                in order to have a better shift to frameworks, check this link
                and study math too www.google.com am saying that you need to
                study html, css and javascript basic to the fullest in order to
                have a better shift to frameworks, check this link and study
                math too www.google.com */}
              </p>
            ) : (
              <p className="no-description">No description 😀</p>
            )}
          </section>

          <section className="advice-info">
            <Button className="advice-tag">#Web development</Button>
            <Button className="posted-date">Posted: July 20, 2021</Button>
          </section>

          <section className="advice-upvote-counter">10 upvotes</section>

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
