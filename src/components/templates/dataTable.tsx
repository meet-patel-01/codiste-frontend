import { Box, Button, Dialog, TextField } from '@mui/material';
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
import { UserEdit } from './user.crud';

export const DataTable = () => {
    const [paginationMeta, setPaginationMeta] = useState<{ pageSize: number, page: number }>({ pageSize: 10, page: 0 });
    const { userList } = useSelector(({ app }: { app: ReduxStateInterface }) => app);
    const [search, setSearch] = useState<string>('');
    const [action, setAction] = useState<{ show: boolean, selectedUser: UserInterface | null }>({ show: false, selectedUser: null })

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
                console.log('>> row', value)
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
                    <Button color='success' onClick={() => setAction({show: true, selectedUser: row.row})}>Edit</Button>
                    <Button color='error'>Delete</Button>
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
                <Dialog
                    open={action.show}
                    onClose={() => setAction({ ...action, show: false })}
                >
                    <UserEdit isEdit={true} user={action.selectedUser as unknown as UserInterface} />
                </Dialog>
            </div>
        </>
    );

}