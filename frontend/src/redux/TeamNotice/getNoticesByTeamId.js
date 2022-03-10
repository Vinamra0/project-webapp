import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import {
  setTeamNotices,
  setLoading,
  setError,
} from "../TeamNotice/features/teamNoticesSlice";

const getNoticesByTeamId =
  (teamId, page = 1, limit = 10) =>
  (dispatch) => {
    try {
      dispatch(setError(""));
      dispatch(setLoading(true));

      const response = await axios.get(
        `${SERVER_ENDPOINT}/notice/team/${teamId}?page=${page}&lim=${limit}`,
        {
          headers: authHeader(),
        }
      );
      dispatch(setLoading(false));
      dispatch(setTeamNotices(response.data));
    } catch (error) {
      const errorResponse =
        error?.response?.data?.message || errror.message || "";
      dispatch(setLoading(false));
      dispatch(setError(errorResponse));
    }
  };

export { getNoticesByTeamId };
