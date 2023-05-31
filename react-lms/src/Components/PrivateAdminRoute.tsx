import { Navigate } from "react-router-dom";

const PrivateAdminRoute = ({children}: any) => {
    const isAdminAuthenticatedValue = localStorage.getItem('isAdminAuthenticated');
    const isAdminAuthenticated = isAdminAuthenticatedValue !== null ? JSON.parse(isAdminAuthenticatedValue) : false;

    return (
        <>
            {
                isAdminAuthenticated ? 
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

export default PrivateAdminRoute;