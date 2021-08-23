import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";

// Layouts
import { Navbar } from "./components/layouts/navbar/Navbar";
import { pageUrl } from "./components/constant/pageurl";

// components
import BubbleLoader from "./components/layouts/loader/Loader";
const Profile = lazy(() => import("./components/profile/Profile"));
const HomePage = lazy(() => import("./components/home/HomePage"));
const AdviceDetails = lazy(() =>
  import("./components/advice/advice-details/AdviceDetails")
);
const NewAdviceForm = lazy(() =>
  import("./components/advice/new-advice-form/NewAdviceForm")
);

function App() {
  const { theme, nav_menu_open } = useSelector((state) => state.appLayout);

  if (nav_menu_open) {
    document.querySelector("body").classList.add("hide-overflow");
  } else {
    document.querySelector("body").classList.remove("hide-overflow");
  }

  return (
    <Suspense fallback={<BubbleLoader />}>
      <div
        className={`App ${theme === "light" ? "light" : "default--dark-mode"}
    }`}
      >
        <Navbar />
        <Switch>
          <Route
            exact
            path={pageUrl.ADVICE_DETAILS}
            component={AdviceDetails}
          />
          <Route exact path={pageUrl.ADVICE_FORM} component={NewAdviceForm} />
          <Route exact path={pageUrl.ADVICE_SORTING} component={HomePage} />
          <Route exact path={pageUrl.PROFILE_PAGE} component={Profile} />
          <Route exact path={pageUrl.HOMEPAGE} component={HomePage} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
