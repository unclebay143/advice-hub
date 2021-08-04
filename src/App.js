import "./App.css";
import { AdviceDetails } from "./components/advice/advice-details/AdviceDetails";
import NewAdviceForm from "./components/advice/new-advice-form/NewAdviceForm";
import { HomePage } from "./components/home/HomePage";
import { Navbar } from "./components/layouts/navbar/Navbar";
import { pageUrl } from "./components/constant/pageurl";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App dar">
      <Navbar />
      <Switch>
        <Route exact path={pageUrl.ADVICE_DETAILS} component={AdviceDetails} />
        <Route exact path={pageUrl.ADVICE_FORM} component={NewAdviceForm} />
        <Route exact path={pageUrl.HOMEPAGE} component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
