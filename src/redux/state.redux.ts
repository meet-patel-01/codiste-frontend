import { ReduxStateInterface } from "../interface/redux.state.interface";

export const initialState: ReduxStateInterface = {
  isUserLoggedIn: false,
  user: null,
  userList: [],
  status: 0,
  message: null,
};
