import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BubbleLoader } from "../../layouts/loader/Loader";
import { AdviceCard } from "./AdviceCard";
import { fetchAdvices } from "./../../../redux/advice/actions/advice.actions";
import { pageUrl } from "../../constant/pageurl";
import { Link } from "react-router-dom";

function randomDate(start = new Date(2012, 0, 1, 23), end = new Date()) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export const dummyAdvice = [
  {
    adviceHeading:
      "learn html, css and javascript basics before any frameworks",
    createdTime: randomDate(),
    adviceUpvote: "12",
    adviceDownvote: "1",
    adviceCategory: "web development",
    bookmarked: true,
  },
];

export const Advice = () => {
  // const fakeData = new Array(10).fill({});
  // const [data, setData] = useState([]);
  const { advices } = useSelector((state) => state.advices);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdvices());
  }, [dispatch]);

  // useEffect(() => {
  //   setData(advices);
  // }, [advices]);

  if (advices === null) {
    return <BubbleLoader text={"welcome... 👋"} />;
  }

  if (advices.length === 0) {
    return (
      <div className="first-contributor--alert">
        <p>
          Be the first to{" "}
          <Link to={pageUrl.ADVICE_FORM} className="link-to-form no-decoration">
            git push
          </Link>{" "}
          an advice card
        </p>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className="advice-card">
        <Grid container spacing={4} className="advice-card-grid">
          {advices &&
            advices.map(
              (
                {
                  heading,
                  description,
                  __createdtime__,
                  upvotes,
                  downvotes,
                  category,
                  authorImageUrl,
                  authorUsername,
                  id,
                },
                index
              ) => {
                return (
                  <AdviceCard
                    key={index}
                    heading={heading}
                    desciption={description}
                    createdTime={__createdtime__}
                    upvotes={upvotes}
                    downvotes={downvotes}
                    category={category || "Others"}
                    authorImageUrl={authorImageUrl}
                    authorUsername={authorUsername}
                    adviceId={id}
                  />
                );
              }
            )}
        </Grid>
      </div>
    </React.Fragment>
  );
};
