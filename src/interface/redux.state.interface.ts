import { UserInterface } from "./user.interface";

export interface ReduxStateInterface {
  isUserLoggedIn: boolean;
  user: UserInterface | null;
  userList: { data: UserInterface[]; total: number };
  status: number /* 0 = initial, 1 = loading, 2 = success, 3 = failed */;
  message: string | null;
}
