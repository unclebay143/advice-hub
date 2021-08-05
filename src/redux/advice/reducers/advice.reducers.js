import {
  BOOKMARKED_ADVICE,
  LOAD_ADVICES,
  POPULAR_ADVICE,
  RECENT_ADVICE,
  UPVOTED_ADVICE,
} from "../../types/index";

const INITIAL_STATE = {
  advices: null,
};

// redux reducer function
const adviceReducer = (state = INITIAL_STATE, action) => {
  // Destructure type and payload from action
  const { type, payload } = action;

  switch (type) {
    case LOAD_ADVICES:
      return {
        // show popular advice
        ...state,
        advices: payload,
      };
    case POPULAR_ADVICE:
      return {
        ...state,
        advices: payload.sort((a, b) =>
          Number(b.adviceUpvote - a.adviceUpvote)
        ),
      };
    case UPVOTED_ADVICE:
      return {
        ...state,
        advices: payload.sort((a, b) =>
          Number(b.adviceUpvote - a.adviceUpvote)
        ),
      };
    case RECENT_ADVICE:
      return {
        ...state,
        advices: payload.sort((a, b) => b.adviceDate - a.adviceDate),
      };

    case BOOKMARKED_ADVICE:
      return {
        ...state,
        advices: payload.filter((advice) => advice.bookmarked === true),
      };

    default:
      // return the state by default else react will shout
      return state;
  }
};

export default adviceReducer;
