import "./App.css";
import { AdviceDetails } from "./components/advice/advice-details/AdviceDetails";
import NewAdviceForm from "./components/advice/new-advice-form/NewAdviceForm";
import { HomePage } from "./components/home/HomePage";
import { Navbar } from "./components/layouts/navbar/Navbar";
import { pageUrl } from "./components/constant/pageurl";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const { theme, nav_menu_open } = useSelector((state) => state.appLayout);

  if (nav_menu_open) {
    document.querySelector("body").classList.add("hide-overflow");
  } else {
    document.querySelector("body").classList.remove("hide-overflow");
  }

  return (
    <div
      className={`App ${theme === "light" ? "light" : "default--dark-mode"}
      }`}
    >
      <Navbar />
      <Switch>
        <Route exact path={pageUrl.ADVICE_DETAILS} component={AdviceDetails} />
        <Route exact path={pageUrl.ADVICE_FORM} component={NewAdviceForm} />
        <Route exact path={pageUrl.HOMEPAGE_SORTING} component={HomePage} />
        <Route exact path={pageUrl.HOMEPAGE} component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
