import React from "react";
import { Link } from "react-router-dom";
import { pageUrl } from "../../constant/pageurl";
import { NavMenu } from "./nav-menu/NavMenu";
import { NAV_MENU_TOGGLE, THEME_SWITCHER } from "../../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import "./navbar.css";
import { Add, Brightness2, BubbleChart, WbSunny } from "@material-ui/icons";

export const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const { loginWithRedirect } = useAuth0();
  const { theme } = useSelector((state) => state.appLayout);

  return (
    <header>
      <Card>
        <Link to={"/recent"} className="brand no-decoration">
          AdviceHub <BubbleChart />{" "}
          {theme === "light" && <p>Light mode (beta)</p>}
        </Link>

        <div className="nav-right">
          {isAuthenticated && !isLoading ? (
            <React.Fragment>
              <NavMenu />

              <div className="">
                <Link
                  className="no-decoration new-advice-btn"
                  to={pageUrl.ADVICE_FORM}
                >
                  <Add /> New Advice
                </Link>
              </div>
              <div className="theme-switcher">
                {theme === "light" ? (
                  // Default theme is dark mode
                  <WbSunny
                    onClick={() =>
                      dispatch({ type: THEME_SWITCHER, payload: "dark" })
                    }
                  />
                ) : (
                  <Brightness2
                    onClick={() =>
                      dispatch({ type: THEME_SWITCHER, payload: "light" })
                    }
                  />
                )}
              </div>
              <div
                className="nav-right--img"
                onClick={() => dispatch({ type: NAV_MENU_TOGGLE })}
              >
                <img
                  src={user.picture}
                  width="100%"
                  alt={`${user.name} avatar`}
                />
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="auth-btn">
                <Button onClick={() => loginWithRedirect()}>Signup</Button>
                <Button onClick={() => loginWithRedirect()}>Login</Button>
              </div>
            </React.Fragment>
          )}
        </div>
      </Card>
    </header>
  );
};
