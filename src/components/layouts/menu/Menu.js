import { Button, Grid } from "@material-ui/core";
import React from "react";
import { Category } from "../category/Category";
import "./menu.css";

export const Menu = () => {
  return (
    <React.Fragment>
      <div className="menu">
        <section className="menu-card-grid">
          <div className="menu-btn">
            <Button>Popular</Button>
            <Button>Upvoted</Button>
            <Button>Recent</Button>
            <Button>Bookmarks</Button>
          </div>
          <Category />
        </section>
      </div>
    </React.Fragment>
  );
};
