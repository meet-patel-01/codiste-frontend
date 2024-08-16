import { Outlet } from "react-router-dom"
import { AppStatus } from "../templates/app.status.component"
import { Header } from "../templates/app.header"

export const AppLayout = () => {
    return <>
        <Header />
        <AppStatus />
        <Outlet />
    </>
}