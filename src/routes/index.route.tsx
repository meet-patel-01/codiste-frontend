import { RouteObject } from "react-router-dom";
import { Login } from "../components/page/login";
import { AppLayout } from "../components/layout/app.layout";
import { UserList } from "../components/page/user.list";

export const routeList: RouteObject[] = [
        {
            path: '',
            element: <AppLayout />,
            children: [
                {
                    path: '',
                    element: <UserList />
                },
                {
                    path: 'Login',
                    element: <Login />
                },
            ]
        }
]

