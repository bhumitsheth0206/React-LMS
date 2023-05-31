import { Navigate } from "react-router-dom";

const PrivateUserRoute = ({children}: any) => {
    const isAuthenticatedValue = localStorage.getItem('isAuthenticated');
    const isAuthenticated = isAuthenticatedValue !== null ? JSON.parse(isAuthenticatedValue) : false;

    return (
        <>
            {
                isAuthenticated ? 
                (
                    children
                )
                :
                (
                    <Navigate to="/" />
                )
            }
        </>
    );

}

export default PrivateUserRoute;