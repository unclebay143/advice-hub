import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_ADVICES } from "../../../redux/types";
import { AdviceCard } from "./AdviceCard";

function randomDate(start = new Date(2012, 0, 1, 23), end = new Date()) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export const dummyAdvice = [
  {
    adviceHeading:
      "learn html, css and javascript basics before any frameworks",
    adviceDate: randomDate(),
    adviceUpvote: "12",
    adviceDownvote: "1",
    adviceCategory: "web development",
    bookmarked: true,
  },
  {
    adviceHeading: "Study data structure and algorithm",
    adviceDate: randomDate(),
    adviceUpvote: "12",
    adviceDownvote: "1",
    adviceCategory: "data structure",
    bookmarked: false,
  },
  {
    adviceHeading: "learn html, css and javascript basics before frameworks",
    adviceDate: randomDate(),
    adviceUpvote: "12",
    adviceDownvote: "1",
    adviceCategory: "html and css",
    bookmarked: true,
  },
  {
    adviceHeading: "network with lot of people as much as possible",
    adviceDate: 9999988887,
    adviceUpvote: "0",
    adviceDownvote: "0",
    adviceCategory: "general",
    bookmarked: false,
  },
  {
    adviceHeading: "study color scheme",
    adviceDate: randomDate(),
    adviceUpvote: "12",
    adviceDownvote: "1",
    adviceCategory: "UI-UX",
    bookmarked: true,
  },
  {
    adviceHeading: "learn communication skill",
    adviceDate: randomDate(),
    adviceUpvote: "121",
    adviceDownvote: "1",
    adviceCategory: "product managment",
    bookmarked: false,
  },
  {
    adviceHeading: "don't bother about what you do not know",
    adviceDate: randomDate(),
    adviceUpvote: "0",
    adviceDownvote: "0",
    adviceCategory: "general",
    bookmarked: false,
  },
  {
    adviceHeading: "Math is not a prerequisite to machine learning",
    adviceDate: randomDate(),
    adviceUpvote: "12",
    adviceDownvote: "1",
    adviceCategory: "machine learning",
    bookmarked: true,
  },
];

export const Advice = () => {
  const fakeData = new Array(10).fill({});
  const [data, setData] = useState(fakeData);
  const { advices } = useSelector((state) => state.advices);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch
    dispatch({ type: LOAD_ADVICES, payload: dummyAdvice });
    return () => {
      // Drop fetch
      dispatch({ type: LOAD_ADVICES, payload: null });
    };
  }, [dispatch]);

  useEffect(() => {
    setData(advices);
  }, [advices]);
  return (
    <React.Fragment>
      <div className="advice-card">
        <Grid container spacing={4} className="advice-card-grid">
          {data &&
            data.map(
              (
                {
                  adviceHeading,
                  adviceDate,
                  adviceUpvote,
                  adviceDownvote,
                  adviceCategory,
                  bookmarked,
                },
                index
              ) => {
                return (
                  <AdviceCard
                    key={index}
                    adviceHeading={adviceHeading}
                    adviceDate={adviceDate}
                    adviceUpvote={adviceUpvote}
                    adviceDownvote={adviceDownvote}
                    adviceCategory={adviceCategory || ""}
                    bookmarked={bookmarked}
                  />
                );
              }
            )}
        </Grid>
      </div>
    </React.Fragment>
  );
};
