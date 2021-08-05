import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import { Grid } from "@material-ui/core";
import "./advice-card.css";
import { CardSkeleton } from "../../layouts/skeleton/CardSkeleton";
import {
  ArrowDownwardRounded,
  ArrowUpwardOutlined,
  BookmarkBorderOutlined,
  ShareOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { timeAgo } from "../../_helper/time/time";

export function AdviceCard({
  adviceHeading,
  adviceDate,
  adviceUpvote,
  adviceDownvote,
  adviceCategory,
  bookmarked,
}) {
  return (
    <React.Fragment>
      {adviceHeading ? (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to={`advice/something`} className="no-decoration">
            <Card>
              <Avatar
                aria-label="recipe"
                style={{ margin: "1rem 1rem 0.45rem 1rem" }}
              >
                <img
                  src="https://www.github.com/unclebay143.png"
                  alt="advicer-avatar"
                  width="100%"
                  height="100%"
                />
              </Avatar>
              <p className="advice-category-tag">{adviceCategory}</p>

              <CardHeader
                title={adviceHeading}
                subheader={`Posted: ${timeAgo(adviceDate)}`}
                subheader={timeAgo(adviceDate)}
              />
              <CardActions disableSpacing>
                <div className="vote-wrap">
                  <ArrowUpwardOutlined />{" "}
                  <span className="vote-count">{adviceUpvote}</span>
                </div>
                {/* share icon */}
                <div className="vote-wrap">
                  <ShareOutlined />
                  <span className="vote-count">&nbsp;</span>
                </div>
                {/* bookmark icon */}
                <div className="bookmark-wrap">
                  <BookmarkBorderOutlined
                    className={`${bookmarked ? "bookmarked" : ""}`}
                  />
                  <span className="vote-count">&nbsp;</span>
                </div>
                <div className="vote-wrap">
                  <ArrowDownwardRounded />{" "}
                  <span className="vote-count">{adviceDownvote}</span>
                </div>
              </CardActions>
            </Card>
          </Link>
        </Grid>
      ) : (
        <CardSkeleton />
      )}
    </React.Fragment>
  );
}
