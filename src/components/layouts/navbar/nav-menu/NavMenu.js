import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";
import { Person, PowerSettingsNew } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NAV_MENU_TOGGLE } from "../../../../redux/types";
import "./nav-menu.css";

export const NavMenu = () => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const { nav_menu_open } = useSelector((state) => state.appLayout);

  return (
    <React.Fragment>
      <section
        className={`nav-menu--shadow ${nav_menu_open ? "" : "close"}`}
        onClick={() => dispatch({ type: NAV_MENU_TOGGLE })}
      >
        <div className="nav-menu">
          <Link to="/" className="nav-menu--item profile-link">
            <Person /> <span>Profile</span>
          </Link>

          <p
            className="nav-menu--item profile-link"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            <PowerSettingsNew />
            Logout
          </p>
          <a
            href="https://www.buymeacoffee.com/unclebigbay"
            target="_blank"
            rel="noreferrer"
            className="no-decoration"
          >
            <Button className="nav-menu--item logout-btn">Support</Button>
          </a>
          <div className="nav-menu--bma">
            <a
              href="https://www.buymeacoffee.com/unclebigbay"
              target="_blank"
              rel="noreferrer"
              className="bma-wrapper "
            >
              <img
                src="https://cdn.buymeacoffee.com/widget/assets/coffee%20cup.svg"
                className="bma-img"
                alt="buy me a coffe logo"
              />
            </a>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};