import React from "react";
import "./loader.css";

// Icons
import { BubbleChart } from "@material-ui/icons";

const BubbleLoader = ({ text }) => {
  return (
    <React.Fragment>
      <div className="loader-container">
        <div className="bubble-loader--wrap">
          <BubbleChart className="bubble--loader" />
          <h3 className="loader-text--loading">{text ? text : "Loading..."}</h3>

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
        </div>
      </div>
    </React.Fragment>
  );
};

export default BubbleLoader;
