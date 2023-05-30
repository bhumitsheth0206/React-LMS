import { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, FormLabel, IconButton, InputAdornment, TextField, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useNavigate } from 'react-router-dom';

import "../Assests/SignUp.css";
import LoginSchema from "../Schema/LoginSchema";
import { LoginInterface } from '../Interfaces/LoginInterface';

const userEmail = 'bhumitsheth@gmail.com';
const userPassword = 'Bhumit@12345';

const useStyles = makeStyles(() => ({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6255a5",
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6255a5",
        },
        "& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6255a5",
        },
    }
}));

const LogIn = () => {
    const navigate = useNavigate();

    const loginInitialValues = {
        email: "",
        password: ""
    };

    const formik = useFormik({
        initialValues: loginInitialValues,
        validationSchema: LoginSchema,
        onSubmit: (values, props) => {
            const userListValue = localStorage.getItem('UserList');
            const userList = userListValue !== null ? JSON.parse(userListValue) : []; 
            const userData = userList.find((i: LoginInterface) => i.email === values.email && i.password === values.password);
            if (values.email === userEmail && values.password === userPassword) {
                toast.success("User logged-in successfully");
                localStorage.setItem('isAdminAuthenticated', JSON.stringify(true));
                navigate('/admin/user');
            } else if(userData){
                toast.success("User logged-in successfully");
                localStorage.setItem('isAuthenticated', JSON.stringify(true));
                localStorage.setItem('User', JSON.stringify(userData));
                navigate('/home', { replace: true });
            } else {
                toast.error("Invalid email or password.");
            }
            props.resetForm({
                values: loginInitialValues,
            });
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const classes = useStyles();

    return (
        <Box className="bg-image">
            <Box className="form-container">
                <form onSubmit={formik.handleSubmit} className="login-form">
                    <Box className="title-heading">
                        <h3>Login</h3>
                        <p>Enter your email address and password to login</p>
                    </Box>

                    <FormLabel className="label-text">Email</FormLabel>
                    <TextField 
                        value={formik.values.email} 
                        name="email" 
                        onChange={formik.handleChange} 
                        id="email" 
                        variant="outlined" 
                        margin="dense" 
                        className={classes.root + ' input-text'} 
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <FormLabel className="label-text">Password</FormLabel>
                    <TextField 
                        value={formik.values.password} 
                        name="password" 
                        onChange={formik.handleChange} 
                        id="password" 
                        type={showPassword ? "text" : "password"}
                        variant="outlined" 
                        margin="dense" 
                        className={classes.root + ' input-text'}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{ 
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                        }}
                    />

                    <Button type="submit" variant="contained" className="login-button">Login</Button>

                    <Box className="login-bottom label-text">
                        <p>Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default LogIn;