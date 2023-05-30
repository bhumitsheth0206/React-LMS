import * as yup from "yup";

const SignUpSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required')
        .matches(/^[A-Za-z ]*$/, 'Please enter valid first name'),
    lastName: yup.string().required('Last Name is required')
        .matches(/^[A-Za-z ]*$/, 'Please enter valid last name'),
    email: yup.string().email().required('Email is required')
        .matches(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}(.[a-z{2,3}])?/g, "Invalid email"),
    password: yup.string().required('Password is required')
        .min(6).max(20)
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,20})/, "Password should have at-least one upper-case, lower-case, digit an special character"),
    confirmPassword: yup.string().required('Confirm Password is required')
        .oneOf([yup.ref('password')], 'Your passwords do not match.')    
});

export default SignUpSchema;