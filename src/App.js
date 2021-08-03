import { Skeleton } from "@material-ui/lab";
import "./App.css";
import { HomePage } from "./components/home/HomePage";
import { Navbar } from "./components/layouts/navbar/Navbar";
// import "@fontsource/roboto";

function App() {
  return (
    <div className="App dar">
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
