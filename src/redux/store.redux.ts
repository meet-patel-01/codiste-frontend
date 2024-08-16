import { configureStore, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state.redux";
import { DELETE_USER, EDIT_USER, GET_USER, GET_USER_LIST, STATUS_UPDATE } from "../constant";

const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    [GET_USER_LIST]: (state, action) => {
      state.userList = action.payload;
    },
    [GET_USER]: (state, action) => {
      state.user = action.payload;
    },
    [STATUS_UPDATE]: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    [EDIT_USER]: (state, action) => {
      state.user = action.payload;
    },
    [DELETE_USER]: (state, action) => {
      state.userList.data = state.userList.data.filter((user) => user._id != action.payload.id)
    }
  },
});

export const actions = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});
