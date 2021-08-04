import React from "react";
import NewAdviceForm from "../advice/NewAdviceForm";
import { Menu } from "../layouts/menu/Menu";
import { Advice } from "./advice/Advice";

export const HomePage = () => {
  return (
    <React.Fragment>
      <NewAdviceForm />
      <Menu />
      <Advice />
    </React.Fragment>
  );
};
