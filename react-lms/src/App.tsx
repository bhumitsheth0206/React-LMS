import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import LogIn from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from "./Pages/Home";
import AdminUser from "./Pages/AdminUser";
import AdminBooks from "./Pages/Adminbook";
import AdminBookStatus from "./Pages/AdminBookStatus";
import PrivateUserRoute from "./Components/PrivateUserRoute";
import PrivateAdminRoute from "./Components/PrivateAdminRoute";


function App() {
  const isAdminAuthenticatedValue = localStorage.getItem('isAdminAuthenticated');
  const isAdminAuthenticated = isAdminAuthenticatedValue !== null ? JSON.parse(isAdminAuthenticatedValue) : false;

  return (
    <div className="App">
      <ToastContainer
        autoClose={4000}
        position="top-right"
        className="toast-container"
        toastClassName="dark-toast"
      />
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          {isAdminAuthenticated ?
          (
            <>
              <Route path="/admin/user" element={
                <PrivateAdminRoute>
                  <AdminUser />
                </PrivateAdminRoute>
                }
              />
              <Route path="/admin/book" element={
                <PrivateAdminRoute>
                  <AdminBooks />
                </PrivateAdminRoute>
                }
              />
              <Route path="/admin/book-status" element={
                <PrivateAdminRoute>
                  <AdminBookStatus />
                </PrivateAdminRoute>
                }
              />
            </>
          ) :
          (
            <>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/home" element={
                <PrivateUserRoute>
                  <Home />
                </PrivateUserRoute>
                }
              />
            </>
          ) }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
