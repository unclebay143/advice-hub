import { LOAD_ADVICES } from "../../types";
import AdviceService from "../service/advice.services";

// Registration service function
export const createAdvice =
  ({ heading, description, category, authorUsername, authorImageUrl }) =>
  async (dispatch) => {
    try {
      const response = await AdviceService.createAdvice(
        heading,
        description,
        category,
        authorUsername,
        authorImageUrl
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
  console.log("here");
  try {
    const response = await AdviceService.upvoteAdviceCard(adviceId, username);
    return response;
  } catch (error) {
    return error;
  }
};
