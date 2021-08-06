// React
import axios from "axios";

// Endpoints
import {
  ADVICE_DETAILS_URL,
  ALL_ADVICE_URL,
  BASE_URL,
  CREATE_ADVICE_URL,
} from "./root-endpoints";

// Registration service function
const createAdvice = async (
  heading,
  description,
  category,
  authorUsername,
  authorImageUrl
) => {
  const payload = {
    heading,
    description,
    category,
    authorUsername,
    authorImageUrl,
  };

  // Async/Await
  try {
    const res = await axios.post(BASE_URL + CREATE_ADVICE_URL, payload, {
      // Access 400 message object
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      },
    });

    // return response to action
    return res;
  } catch (error) {
    // Return error
    return error;
  }
};

// Get ALL advice full details from db
const fetchAdvices = async () => {
  try {
    const response = await axios.get(BASE_URL + ALL_ADVICE_URL);
    return response;
  } catch (error) {
    return error;
  }
};

// Get advice full details from db
const getAdviceDetails = async (adviceId) => {
  const payload = {
    adviceId,
  };
  try {
    const response = await axios.post(BASE_URL + ADVICE_DETAILS_URL, payload);
    return response;
  } catch (error) {
    return error;
  }
};

// Export object of service functions
const AdviceService = {
  createAdvice,
  getAdviceDetails,
  fetchAdvices,
};

export default AdviceService;
