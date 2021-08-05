import React from "react";
import { Menu } from "../layouts/menu/Menu";
import { Advice } from "./advice/Advice";
import "./homepage.css";

export const HomePage = () => {
  return (
    <React.Fragment>
      <Menu />
      <Advice />
      <a
        href="https://www.buymeacoffee.com/unclebigbay"
        target="_blank"
        rel="noreferrer"
        className="bma-wrapper"
      >
        <img
          src="https://cdn.buymeacoffee.com/widget/assets/coffee%20cup.svg"
          className="bma-img"
          alt="buy me a coffe logo"
        />
      </a>
    </React.Fragment>
  );
};
