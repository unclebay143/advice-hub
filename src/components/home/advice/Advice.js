import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { AdviceCard } from "./AdviceCard";

const dummyAdvice = [
  {
    adviceHeading: "learn html, css and javascript basics before frameworks",
    adviceDate: "July 20, 2021",
    adviceUpvote: "12",
    adviceDownvote: "1",
    adviceCategory: "web development",
  },
  {
    adviceHeading: "Study data structure and algorithm",
    adviceDate: "December 20, 2021",
    adviceUpvote: "12",
    adviceDownvote: "1",
    adviceCategory: "data structure",
  },
  {
    adviceHeading: "learn html, css and javascript basics before frameworks",
    adviceDate: "July 20, 2021",
    adviceUpvote: "12",
    adviceDownvote: "1",
    adviceCategory: "html and css",
  },
  {
    adviceHeading: "network with lot of people as much as possible",
    adviceDate: "July 20, 2021",
    adviceUpvote: "12",
    adviceDownvote: "1",
    adviceCategory: "general",
  },
  {
    adviceHeading: "study color scheme",
    adviceDate: "July 20, 2021",
    adviceUpvote: "12",
    adviceDownvote: "1",
    adviceCategory: "UI-UX",
  },
  {
    adviceHeading: "learn communication skill",
    adviceDate: "July 20, 2021",
    adviceUpvote: "12",
    adviceDownvote: "1",
    adviceCategory: "product managment",
  },
  {
    adviceHeading: "don't bother about what you do not know",
    adviceDate: "July 20, 2021",
    adviceUpvote: "12",
    adviceDownvote: "1",
    adviceCategory: "general",
  },
  {
    adviceHeading: "Math is not a prerequisite to machine learning",
    adviceDate: "July 20, 2021",
    adviceUpvote: "12",
    adviceDownvote: "1",
    adviceCategory: "machine learning",
  },
];

export const Advice = () => {
  const fakeData = new Array(10).fill({});
  const [data, setData] = useState(fakeData);

  useEffect(() => {
    setTimeout(() => {
      setData(dummyAdvice);
    }, 3000);
  }, []);
  return (
    <React.Fragment>
      <div className="advice-card">
        <Grid
          container
          spacing={4}
          // justifyContent="space-around"
          className="advice-card-grid"
        >
          {data &&
            data.map(
              ({
                adviceHeading,
                adviceDate,
                adviceUpvote,
                adviceDownvote,
                adviceCategory,
              }) => {
                return (
                  <AdviceCard
                    adviceHeading={adviceHeading}
                    adviceDate={adviceDate}
                    adviceUpvote={adviceUpvote}
                    adviceDownvote={adviceDownvote}
                    adviceCategory={adviceCategory || ""}
                  />
                );
              }
            )}
        </Grid>
      </div>
    </React.Fragment>
  );
};
