import { Card } from "@material-ui/core";
import React from "react";
import "./navbar.css";

export const Navbar = () => {
  return (
    <header>
      <Card>
        <div className="brand">AdviceHub</div>

        <div className="nav-right">
          <div className="nav-right--img">
            <img src="https://www.github.com/unclebay143.png" width="100%" />
          </div>
        </div>
      </Card>
    </header>
  );
};
