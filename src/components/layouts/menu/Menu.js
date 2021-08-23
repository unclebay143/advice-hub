import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import "./menu.css";

// Types
import {
  BOOKMARKED_ADVICE,
  OLDEST_ADVICE,
  RECENT_ADVICE,
  UPVOTED_ADVICE,
} from "../../../redux/types";

// Components
import { Button } from "@material-ui/core";
import { Category } from "../category/Category";

// Actions
import {
  fetchAdvices,
  fetchBookmarkedAdvices,
} from "../../../redux/advice/actions/advice.actions";

// Constant url
import { pageUrl } from "../../constant/pageurl";

export const Menu = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const handleSelection = (actionType) => {
    dispatch(fetchAdvices())
      .then(() => {
        dispatch({ type: actionType });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFetchBookmarks = (actionType) => {
    if (!isAuthenticated) {
      return loginWithRedirect();
    }
    dispatch(fetchBookmarkedAdvices(user.nickname))
      .then((res) => {
        dispatch({ type: actionType, payload: res.data });
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
              activeClassName="active-sort"
              to="/recent"
            >
              <Button
                className="menu-button"
                onClick={() => handleSelection(RECENT_ADVICE)}
              >
                Recent
              </Button>
            </NavLink>
            <NavLink
              className="no-decoration"
              activeClassName="active-sort"
              to="oldest"
            >
              <Button
                className="menu-button"
                onClick={() => handleSelection(OLDEST_ADVICE)}
              >
                Oldest
              </Button>
            </NavLink>
            <NavLink
              className="no-decoration"
              to="/upvoted"
              activeClassName="active-sort"
            >
              <Button
                className="menu-button"
                onClick={() => handleSelection(UPVOTED_ADVICE)}
              >
                Upvoted
              </Button>
            </NavLink>

            {isAuthenticated && (
              <NavLink
                className="no-decoration"
                activeClassName="active-sort"
                to={pageUrl.BOOKMARKS}
              >
                <Button
                  className="menu-button"
                  onClick={() => handleFetchBookmarks(BOOKMARKED_ADVICE)}
                >
                  Bookmarks
                </Button>
              </NavLink>
            )}
          </div>
          <Category />
        </section>
      </div>
    </React.Fragment>
  );
};
