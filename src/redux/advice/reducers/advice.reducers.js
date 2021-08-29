import _ from "lodash";
import {
  BOOKMARKED_ADVICE,
  LOAD_ADVICES,
  OLDEST_ADVICE,
  RECENT_ADVICE,
  UPVOTED_ADVICE,
} from "../../types/index";

const INITIAL_STATE = {
  advices: [],
  sortBy: "recent",
  bookMarked: null,
};

// redux reducer function
const adviceReducer = (state = INITIAL_STATE, action) => {
  // Destructure type and payload from action
  const { type, payload } = action;

  switch (type) {
    case LOAD_ADVICES:
      return {
        ...state,
        advices: _.uniqBy([...state.advices, ...payload], "id"), // remove weird duplicates
        // advices: [...state.advices, ...payload],
      };
    case RECENT_ADVICE:
      return {
        ...state,
        sortBy: "recent",
      };
    case OLDEST_ADVICE:
      return {
        ...state,
        sortBy: "oldest",
      };
    case UPVOTED_ADVICE:
      return {
        ...state,
        sortBy: "upvotes",
      };

    case BOOKMARKED_ADVICE:
      return {
        ...state,
        bookMarked: payload,
      };

    default:
      // return the state by default else react will shout
      return state;
  }
};

export default adviceReducer;
