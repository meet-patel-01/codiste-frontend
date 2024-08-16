import { Box, Button, Dialog, Fab, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReduxStateInterface } from '../../interface/redux.state.interface';
import { actions } from '../../redux/store.redux';
import { axiosInstance } from '../../axios/axios.instance';
import { USER_API_URL } from '../../constant';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { UserInterface } from '../../interface/user.interface';
import { UserDelete, UserEdit } from './user.crud';

export const DataTable = () => {
    const [paginationMeta, setPaginationMeta] = useState<{ pageSize: number, page: number }>({ pageSize: 10, page: 0 });
    const { userList } = useSelector(({ app }: { app: ReduxStateInterface }) => app);
    const [search, setSearch] = useState<string>('');
    const [action, setAction] = useState<{ show: boolean, selectedUser: UserInterface | null, isEdit: boolean }>({ show: false, selectedUser: null, isEdit: false })
    const [deleteAction, setDeleteAction] = useState<{ show: boolean, selectedUser: UserInterface | null }>()

    const dispatch = useDispatch();

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Full Name', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'email', headerName: 'Email', flex: 1, headerAlign: 'center', align: 'center' },
        {
            field: 'mobileNumber',
            headerName: 'Mobile Number',
            headerAlign: 'center',
            type: 'number',
            flex: 1,
            align: 'center'
        },
        {
            field: 'updatedAt',
            flex: 1,
            headerAlign: 'center',
            headerName: 'Last Updated Date',
            renderCell: (value) => {
                return <>
                    {moment(value.row.updatedAt).fromNow()}
                </>
            },
            align: 'center'
        },
        {
            headerName: 'Action',
            field: 'action',
            headerAlign: 'center',
            flex: 1,
            align: 'center',
            renderCell: (row) => {
                return <div className='action-cell'>
                    <Button color='success' onClick={() => setAction({ show: true, selectedUser: row.row, isEdit: true })}>Edit</Button>
                    <Button color='error' onClick={() => setDeleteAction({ show: true, selectedUser: row.row })}>Delete</Button>
                </div>
            }
        }
    ];

    const onPaginationChange = (data: any) => {
        setPaginationMeta({ ...paginationMeta, ...data })
    }

    const fetchUserList = () => {
        axiosInstance.get(USER_API_URL, {
            params: { ...paginationMeta, search },
        }).then(({ data }) => dispatch(actions.GET_USER_LIST(data)));
    }

    const handleSearch = () => {
        fetchUserList();
    }

    const handleClose = (data: any) => {
        console.log(data);
        setAction({ show: false, selectedUser: null, isEdit: false })
        fetchUserList();
    }

    const deleteHandleClose = (data: any) => {
        setDeleteAction({ show: false, selectedUser: null })
        if(data){
            fetchUserList();
        }
    }

    useEffect(() => {
        fetchUserList();
    }, [paginationMeta])

    return (
        <>
            <div style={{ height: 400, marginRight: 40 }}>
                <div className='search-box'>
                    <Box
                        component="form"
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4 }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch();
                        }}
                    >
                        <TextField
                            variant="outlined"
                            label="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ mr: 2, width: '300px' }}
                        />
                        <Button variant="contained" size='large' color="primary" onClick={handleSearch}>
                            Search
                        </Button>
                    </Box>
                </div>
                <DataGrid
                    disableColumnFilter
                    disableColumnMenu
                    disableColumnSorting
                    disableColumnSelector
                    disableVirtualization
                    style={{ width: '100%' }}
                    rows={userList && userList.data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    paginationMode="server"
                    onPaginationModelChange={onPaginationChange}
                    rowCount={userList.total}
                    pageSizeOptions={[10, 25, 50, 100]}
                />
            </div>
            <div className='dialog'>
                {
                    action.show && <Dialog
                        open={action.show}
                        onClose={() => setAction({ show: false, selectedUser: null, isEdit: false })}
                    >
                        <UserEdit isEdit={action.isEdit} handleClose={handleClose} user={action.selectedUser as unknown as UserInterface} />
                    </Dialog>
                }
            </div>

            <div className='dialog'>
                {
                    deleteAction?.show && <Dialog
                        open={deleteAction.show}
                        onClose={() => setDeleteAction({ show: false, selectedUser: null })}
                    >
                        <UserDelete handleClose={deleteHandleClose} user={deleteAction.selectedUser as unknown as UserInterface} />
                    </Dialog>
                }
            </div>

            <Fab variant="extended" color="primary" className="FAB" onClick={() => setAction({ show: true, selectedUser: null, isEdit: false })}>
                Add New User
            </Fab>
        </>
    );

}