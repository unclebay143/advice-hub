import React, { lazy } from "react";
import { Menu } from "../layouts/menu/Menu";
const Advice = lazy(() => import("./advice/Advice"));
const HomePage = () => {
  return (
    <React.Fragment>
      <Menu />
      <Advice />

      {/* css in loader.css */}
      <a
        href="https://www.buymeacoffee.com/unclebigbay"
        target="_blank"
        rel="preconnect noreferrer"
        className="bma-wrapper"
      >
        <img
          src="https://cdn.buymeacoffee.com/widget/assets/coffee%20cup.svg"
          className="bma-img"
          alt="buy me a coffe logo"
          loading="lazy"
          rel="preconnect"
        />
      </a>
    </React.Fragment>
  );
};

export default HomePage;
