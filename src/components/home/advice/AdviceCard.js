import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import "./advice-card.css";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  BookmarkBorderOutlined,
  ShareOutlined,
} from "@material-ui/icons";

export function AdviceCard({
  adviceHeading,
  adviceDate,
  adviceUpvote,
  adviceDownvote,
  adviceCategory,
}) {
  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4} lg={3}>
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
          <CardHeader title={adviceHeading} subheader={adviceDate} />
          <CardActions disableSpacing>
            <IconButton aria-label="upvote" className="upvote-wrap">
              <ArrowUpwardOutlined />{" "}
              <span className="upvote-count">{adviceUpvote}</span>
            </IconButton>
            <IconButton aria-label="share">
              <ShareOutlined />
            </IconButton>
            <IconButton aria-label="bookmark">
              <BookmarkBorderOutlined />
            </IconButton>
            <IconButton aria-label="downvote">
              <ArrowDownwardOutlined />{" "}
              <span className="upvote-count">{adviceDownvote}</span>
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
