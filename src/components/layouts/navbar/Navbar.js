import { Button, Card } from "@material-ui/core";
import { Add, Brightness2, WbSunny } from "@material-ui/icons";
import React, { useState } from "react";
import "./navbar.css";

export const Navbar = () => {
  const [lightMode, setLightMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <header>
      <Card>
        <div className="brand">AdviceHub</div>

        <div className="nav-right">
          {isAuthenticated ? (
            <React.Fragment>
              <div className="new-advice-btn">
                <Add /> New Advice
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
                <Button>Join</Button>
                <Button>Login</Button>
              </div>
            </React.Fragment>
          )}
        </div>
      </Card>
    </header>
  );
};
