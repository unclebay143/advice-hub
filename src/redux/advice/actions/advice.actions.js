import { BOOKMARKED_ADVICE, LOAD_ADVICES } from "../../types";
import AdviceService from "../service/advice.services";

// Registration service function
export const createAdvice =
  ({
    heading,
    description,
    category,
    authorUsername,
    authorImageUrl,
    author_id,
  }) =>
  async (dispatch) => {
    try {
      const response = await AdviceService.createAdvice(
        heading,
        description,
        category,
        authorUsername,
        authorImageUrl,
        author_id
      );

      return response;
    } catch (error) {
      return error;
    }
  };

// Get advice full details
export const fetchAdvices = (page, limit) => async (dispatch) => {
  try {
    const { data } = await AdviceService.fetchAdvices(page, limit);
    dispatch({ type: LOAD_ADVICES, payload: data.advices });

    return data;
  } catch (error) {
    return error;
  }
};

// Get advice full details
export const getAdviceDetails = (adviceId) => async (dispatch) => {
  try {
    const response = await AdviceService.getAdviceDetails(adviceId);
    return response;
  } catch (error) {
    return error;
  }
};

// Upvote function
export const upvoteAdviceCard = (adviceId, username) => async (dispatch) => {
  try {
    const response = await AdviceService.upvoteAdviceCard(adviceId, username);
    return response;
  } catch (error) {
    return error;
  }
};

// Downvote function
export const downvoteAdviceCard = (adviceId, username) => async (dispatch) => {
  try {
    const response = await AdviceService.downvoteAdviceCard(adviceId, username);
    return response;
  } catch (error) {
    return error;
  }
};

// Bookmark function
export const bookmarkAdviceCard = (adviceId, username) => async (dispatch) => {
  try {
    const response = await AdviceService.bookmarkAdviceCard(adviceId, username);
    return response;
  } catch (error) {
    return error;
  }
};

// Remove Bookmark
export const removeAdviceCardFromBookmark =
  (adviceId, username) => async (dispatch) => {
    try {
      const response = await AdviceService.removeAdviceCardFromBookmark(
        adviceId,
        username
      );
      return response;
    } catch (error) {
      return error;
    }
  };

// Bookmark function
export const fetchBookmarkedAdvices = (username) => async (dispatch) => {
  try {
    const response = await AdviceService.getBookmarkAdviceCard(username);
    dispatch({ type: BOOKMARKED_ADVICE, payload: response.data });
    return response;
  } catch (error) {
    return error;
  }
};

// User profile
export const fetchUserProfile = (userName) => async (dispatch) => {
  try {
    const response = await AdviceService.fetchUserProfile(userName);
    return response;
  } catch (error) {
    return error;
  }
};
