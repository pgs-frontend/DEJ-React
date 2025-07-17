import { useNavigate } from "@tanstack/react-router";
import axios from "axios";

// Global Axios Defaults
// axios.defaults.baseURL =
//   "https://2p8dfb2h29.execute-api.me-central-1.amazonaws.com/prod";
axios.defaults.baseURL = "https://web.devpgs.com/ai-jobs/api/en";
axios.defaults.headers.post["Content-Type"] = "application/json";

const useApi = () => {
  // Global API Functions
  const get = async (url, params = {}) => {
    try {
      const res = await axios.get(url, {
        params,
      });
      return res.data;
    } catch (error) {
      throw Error(error);
    }
  };

  const post = async (url, body) => {
    try {
      const res = await axios.post(url, body);

      return res.data;
    } catch (error) {
      throw Error(error);
    }
  };

  const update = async (url, body) => {
    try {
      const res = await axios.patch(url, body);

      return res.data;
    } catch (error) {
      throw Error(error);
    }
  };

  return {
    get,
    post,
    update,
  };
};

export default useApi;
