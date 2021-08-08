import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  BOOKMARKED_ADVICE,
  OLDEST_ADVICE,
  RECENT_ADVICE,
  UPVOTED_ADVICE,
} from "../../../redux/types";
// import { dummyAdvice } from "../../home/advice/Advice";
import { Category } from "../category/Category";
import "./menu.css";
import { fetchAdvices } from "../../../redux/advice/actions/advice.actions";
import { Link, NavLink } from "react-router-dom";

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
            <NavLink
              className="no-decoration"
              to="/upvoted"
              activeClassName="active-sort"
            >
              <Button onClick={() => handleSelection(UPVOTED_ADVICE)}>
                Upvoted
              </Button>
            </NavLink>
            <NavLink
              className="no-decoration"
              activeClassName="active-sort"
              to="/recent"
            >
              <Button onClick={() => handleSelection(RECENT_ADVICE)}>
                Recent
              </Button>
            </NavLink>
            <NavLink
              className="no-decoration"
              activeClassName="active-sort"
              to="oldest"
            >
              <Button onClick={() => handleSelection(OLDEST_ADVICE)}>
                Oldest
              </Button>
            </NavLink>
            <NavLink
              className="no-decoration"
              activeClassName="active-sort"
              to="bookmarks"
            >
              <Button onClick={() => handleSelection(BOOKMARKED_ADVICE)}>
                Bookmarks
              </Button>
            </NavLink>
          </div>
          <Category />
        </section>
      </div>
    </React.Fragment>
  );
};
