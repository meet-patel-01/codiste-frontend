import { AppBar, Container, IconButton, Toolbar, Typography, Link as MuiLink } from "@mui/material"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ReduxStateInterface } from "../../interface/redux.state.interface"

export const Header = () => {
    const { isUserLoggedIn, user } = useSelector(({ app }: { app: ReduxStateInterface }) => app)

    const loginUserView = <div className="header-item">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user && user.name}
        </Typography>
    </div>

    const logoutUser = <div className="header-item">
        <Link to='login'>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Login
            </Typography>
        </Link>
    </div>

    return <>
        <div className="header">
            <div className="header-body">
                <div className="header-item">
                    <Link to='/'>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Home
                        </Typography>
                    </Link>
                </div>
                {isUserLoggedIn ? loginUserView : logoutUser}
            </div>
        </div>

    </>
}