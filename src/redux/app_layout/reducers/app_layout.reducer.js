import { NAV_MENU_TOGGLE, THEME_SWITCHER } from "../../types";

// Last Game Record
const INITIAL_STATE = {
  nav_menu_open: false,
  theme: localStorage.getItem("theme"),
};

// redux reducer function
const appLayout = (state = INITIAL_STATE, action) => {
  // Destructure type and payload from action
  const { type, payload } = action;

  switch (type) {
    case THEME_SWITCHER:
      localStorage.setItem("theme", payload);
      return {
        ...state,
        theme: payload === "dark" ? "dark" : "light",
      };
    case NAV_MENU_TOGGLE:
      return {
        ...state,
        nav_menu_open: !state.nav_menu_open,
      };

    default:
      // return the state by default else react will shout
      return state;
  }
};

export default appLayout;
