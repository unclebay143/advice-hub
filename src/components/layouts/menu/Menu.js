import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BOOKMARKED_ADVICE,
  POPULAR_ADVICE,
  RECENT_ADVICE,
  UPVOTED_ADVICE,
} from "../../../redux/types";
import { dummyAdvice } from "../../home/advice/Advice";
import { Category } from "../category/Category";
import "./menu.css";

export const Menu = () => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div className="menu">
        <section className="menu-card-grid">
          <div className="menu-btn">
            <Button
              onClick={() =>
                dispatch({ type: POPULAR_ADVICE, payload: dummyAdvice })
              }
            >
              Popular
            </Button>
            <Button
              onClick={() =>
                dispatch({ type: UPVOTED_ADVICE, payload: dummyAdvice })
              }
            >
              Upvoted
            </Button>
            <Button
              onClick={() =>
                dispatch({ type: RECENT_ADVICE, payload: dummyAdvice })
              }
            >
              Recent
            </Button>
            <Button
              onClick={() =>
                dispatch({ type: BOOKMARKED_ADVICE, payload: dummyAdvice })
              }
            >
              Bookmarks
            </Button>
          </div>
          <Category />
        </section>
      </div>
    </React.Fragment>
  );
};
