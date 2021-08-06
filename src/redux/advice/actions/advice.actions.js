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
export const fetchAdvices = () => async (dispatch) => {
  try {
    const { data } = await AdviceService.fetchAdvices();
    if (data) {
      dispatch({ type: LOAD_ADVICES, payload: data.data });
    }
    return data.data;
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
