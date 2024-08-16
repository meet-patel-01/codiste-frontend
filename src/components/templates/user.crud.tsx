import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { UserInterface } from "../../interface/user.interface"
import * as yup from 'yup'
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { actions } from "../../redux/store.redux"
import { axiosInstance } from "../../axios/axios.instance"
import { USER_API_URL } from "../../constant"

const initialValue: UserInterface = {
    email: '',
    mobileNumber: '',
    name: '',
}

const validationSchema = {
    name: yup
        .string()
        .required('Name is required'),
    mobileNumber: yup.string().required('mobile number required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .matches(/^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, 'Password should contain at least one spacial character'),
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
}

const editUserValidationSchema = yup.object({
    name: validationSchema.name,
    email: validationSchema.email,
    mobileNumber: validationSchema.mobileNumber,
    password: validationSchema.password,
});

type userEditProps =
    | { isEdit: true; user: UserInterface }
    | { isEdit: false; user?: undefined | null };

export const UserEdit = ({ user, isEdit }: userEditProps) => {
    const dispatch = useDispatch()

    const formikForm = useFormik({
        initialValues: {
            name: (isEdit ? user : initialValue).name,
            email: (isEdit ? user : initialValue).email,
            mobileNumber: (isEdit ? user : initialValue).mobileNumber,
            password: '',
        },
        validationSchema: editUserValidationSchema,
        onSubmit: (values) => {
            if (formikForm.isValid) {
                axiosInstance.patch(USER_API_URL + user?._id as unknown as string, values).then((response) => {
                    console.log('>> response', response)
                });
            }
        },
    });

    return <Box sx={{ mt: 4, p: 2 }}>
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>
            {isEdit ? 'Edit' : 'Add'} User Information
        </Typography>
        <form onSubmit={formikForm.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="Name"
                        name="name"
                        fullWidth
                        value={formikForm.values.name}
                        onChange={formikForm.handleChange}
                        onBlur={formikForm.handleBlur}
                        error={formikForm.touched.name && Boolean(formikForm.errors.name)}
                        helperText={formikForm.touched.name && formikForm.errors.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        value={formikForm.values.email}
                        onChange={formikForm.handleChange}
                        onBlur={formikForm.handleBlur}
                        error={formikForm.touched.email && Boolean(formikForm.errors.email)}
                        helperText={formikForm.touched.email && formikForm.errors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="Mobile Number"
                        name="mobileNumber"
                        fullWidth
                        value={formikForm.values.mobileNumber}
                        onChange={formikForm.handleChange}
                        onBlur={formikForm.handleBlur}
                        error={formikForm.touched.mobileNumber && Boolean(formikForm.errors.mobileNumber)}
                        helperText={formikForm.touched.mobileNumber && formikForm.errors.mobileNumber}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="New Password"
                        name="password"
                        fullWidth
                        value={formikForm.values.password}
                        onChange={formikForm.handleChange}
                        onBlur={formikForm.handleBlur}
                        error={formikForm.touched.password && Boolean(formikForm.errors.password)}
                        helperText={formikForm.touched.password && formikForm.errors.password}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" size="large" disabled={!formikForm.isValid} variant="contained" color="primary" fullWidth>
                        {isEdit ? 'Save Changes' : 'Create User'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Box>
}

export const UserDelete = () => { }