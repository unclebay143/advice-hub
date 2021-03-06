import React, { useState } from "react";
import { Skeleton } from "@material-ui/lab";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  Chat,
  ShareOutlined,
} from "@material-ui/icons";

const CardSkeleton = ({ num = 8 }) => {
  const fakeArray = new Array(num).fill({});
  const [fakeAdvices, setFakeAdvices] = useState(fakeArray);
  return (
    <React.Fragment>
      {fakeAdvices.map((advices) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={Math.random()}>
            <Card>
              <Skeleton
                animation="wave"
                variant="circle"
                width={40}
                height={40}
                style={{ margin: "1rem 1rem 0.45rem 1rem" }}
              />
              <p className="advice-category-tag">
                <Skeleton animation="wave" height={10} width="40%" />
              </p>

              <CardHeader
                title={
                  <Skeleton
                    animation="wave"
                    height={70}
                    width="80%"
                    style={{ margin: "0rem 1rem 0.45rem 0rem" }}
                  />
                }
                subheader={
                  <>
                    <Skeleton animation="wave" height={10} width="80%" />
                    <Skeleton
                      animation="wave"
                      height={10}
                      style={{ marginBottom: 6 }}
                    />
                  </>
                }
              />

              <CardActions disableSpacing>
                <IconButton aria-label="upvote" className="upvote-wrap">
                  <ArrowUpwardOutlined /> <span className="vote-count"></span>
                </IconButton>
                <IconButton aria-label="bookmark">
                  <Chat />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareOutlined />
                </IconButton>
                <IconButton aria-label="downvote">
                  <ArrowDownwardOutlined /> <span className="vote-count"></span>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default CardSkeleton;
