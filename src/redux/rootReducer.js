import { combineReducers } from "redux";
import adviceReducer from "./advice/reducers/advice.reducers";
import appLayout from "./app_layout/reducers/app_layout.reducer";

const rootReducer = combineReducers({
  appLayout: appLayout,
  advices: adviceReducer,
});

export default rootReducer;
