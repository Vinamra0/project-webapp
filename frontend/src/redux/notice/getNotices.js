import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import { setNotices, setError, setLoading } from "./features/noticeSlice";
import { setCurrentUser } from "../userTeams/features/currentUserSlice";
const getNotices =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch(setError(""));
      dispatch(setLoading(true));
      const response = await axios.get(
        `${SERVER_ENDPOINT}/notice?page=${page}&limit=${limit}`,
        { headers: authHeader() }
      );
      dispatch(setLoading(false));
      dispatch(setNotices(response.data));
    } catch (err) {
      const errorResponse = err?.response?.data?.message || err.message || "";
      dispatch(setLoading(false));
      dispatch(setError(errorResponse));
      if (errorResponse === "Access Denied") {
        dispatch(setCurrentUser({}));
      }
    }
  };

export { getNotices };
