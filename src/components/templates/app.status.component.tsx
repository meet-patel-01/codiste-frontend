import { useSelector } from "react-redux"
import { ReduxStateInterface } from "../../interface/redux.state.interface"
import { Alert, CircularProgress } from "@mui/material";

export const AppStatus = () => {
    const { message, status } = useSelector(({ app }: { app: ReduxStateInterface }) => app);

    const appStatus = {
        success: <Alert severity="success">{message}</Alert>,
        error: <Alert severity="error">{message}</Alert>,
        loading: <CircularProgress />
    }

    const applyStatus = () => {
        switch (status) {
            case 1:
                return appStatus.loading;
            case 2:
                return appStatus.success;
            case 3:
                return appStatus.error;

            default:
                return <></>
        }
    }

    return applyStatus();
} 