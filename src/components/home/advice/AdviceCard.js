import React, { useState } from "react";
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

  // Handle Broken image
  const brokenImageAlt = () => {
    setIsImageBroken(true);
  };
  return (
    <React.Fragment>
      {heading ? (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to={`advice/${adviceId}`} className="no-decoration">
            <Card>
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
              {/* )} */}
              <p className="advice-category-tag">{category}</p>
              <CardHeader
                title={heading}
                // subheader={`Posted: ${timeAgo(createdTime)}`}
                subheader={`Given ${timeAgo(createdTime)}`}
                // subheader={timeAgo(createdTime)}
              />
              <CardActions disableSpacing>
                <div className="vote-wrap">
                  <ArrowUpwardOutlined />{" "}
                  <span className="vote-count">{upvotes}</span>
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
                  <span className="vote-count">{downvotes}</span>
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
