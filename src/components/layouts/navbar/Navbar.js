import { Button, Card } from "@material-ui/core";
import {
  Add,
  Brightness2,
  BubbleChart,
  ChatBubble,
  LinkedCameraOutlined,
  WbSunny,
} from "@material-ui/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pageUrl } from "../../constant/pageurl";
import "./navbar.css";

export const Navbar = () => {
  const [lightMode, setLightMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <header>
      <Card>
        <Link to={pageUrl.HOMEPAGE} className="brand no-decoration">
          {/* <LinkedCameraOutlined /> AdviceHub */}
          {/* <ChatBubble /> AdviceHub */}
          AdviceHub <BubbleChart />
          {/* <BubbleChart /> AdviceHub */}
        </Link>

        <div className="nav-right">
          {isAuthenticated ? (
            <React.Fragment>
              <div className="">
                <Link
                  className="no-decoration new-advice-btn"
                  to={pageUrl.ADVICE_FORM}
                >
                  <Add /> New Advice
                </Link>
              </div>
              <div className="theme-switcher">
                {lightMode ? (
                  // Default theme is dark mode
                  <WbSunny onClick={() => setLightMode(!lightMode)} />
                ) : (
                  <Brightness2 onClick={() => setLightMode(!lightMode)} />
                )}
              </div>
              <div className="nav-right--img">
                <img
                  src="https://www.github.com/unclebay143.png"
                  width="100%"
                  alt="user-profile-avatar"
                />
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="auth-btn">
                <Button>Signup</Button>
                <Button>Login</Button>
              </div>
            </React.Fragment>
          )}
        </div>
      </Card>
    </header>
  );
};
