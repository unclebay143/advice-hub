import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  BOOKMARKED_ADVICE,
  POPULAR_ADVICE,
  RECENT_ADVICE,
  UPVOTED_ADVICE,
} from "../../../redux/types";
// import { dummyAdvice } from "../../home/advice/Advice";
import { Category } from "../category/Category";
import "./menu.css";
import { fetchAdvices } from "../../../redux/advice/actions/advice.actions";

export const Menu = () => {
  const dispatch = useDispatch();
  const { advices } = useSelector((state) => state.advices);

  const handleSelection = (actionType) => {
    dispatch(fetchAdvices())
      .then((res) => {
        dispatch({ type: actionType });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <div className="menu">
        <section className="menu-card-grid">
          <div className="menu-btn">
            <Button onClick={() => handleSelection(POPULAR_ADVICE)}>
              Popular
            </Button>
            <Button onClick={() => handleSelection(UPVOTED_ADVICE)}>
              Upvoted
            </Button>
            <Button onClick={() => handleSelection(RECENT_ADVICE)}>
              Recent
            </Button>
            <Button onClick={() => handleSelection(BOOKMARKED_ADVICE)}>
              Bookmarks
            </Button>
          </div>
          <Category />
        </section>
      </div>
    </React.Fragment>
  );
};
