import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: {},
  error: "",
};

export const currentUserSlice = createSlice({
  name: "teamNames",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      if (Object.keys(action.payload).length === 0) {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentUserId");
        localStorage.removeItem("currentUserEmail");
      }
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrentUser, setError, setLoading } =
  currentUserSlice.actions;
export default currentUserSlice.reducer;
