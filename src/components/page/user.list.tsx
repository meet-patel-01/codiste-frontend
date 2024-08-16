import { Fab } from "@mui/material"
import { DataTable } from "../templates/dataTable"

export const UserList = () => {
    return (
        <div className="user-list">
            <div>
                <DataTable />
            </div>
            <Fab variant="extended" color="primary" className="FAB">
                Add New User
            </Fab>
        </div>
    )
}