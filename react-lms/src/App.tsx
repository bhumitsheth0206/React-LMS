import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import LogIn from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from "./Pages/Home";
import AdminUser from "./Pages/AdminUser";
import AdminBooks from "./Pages/Adminbook";
import AdminBookStatus from "./Pages/AdminBookStatus";


function App() {
  const isAdminAuthenticatedValue = localStorage.getItem('isAdminAuthenticated');
  const isAdminAuthenticated = isAdminAuthenticatedValue !== null ? JSON.parse(isAdminAuthenticatedValue) : false;

  const isAuthenticatedValue = localStorage.getItem('isAuthenticated');
  const isAuthenticated = isAuthenticatedValue !== null ? JSON.parse(isAuthenticatedValue) : false;
  
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
              <Route path="/admin/user" element={isAdminAuthenticated? <AdminUser /> : <LogIn />}/>
              <Route path="/admin/book" element={isAdminAuthenticated? <AdminBooks /> : <LogIn />}/>
              <Route path="/admin/book-status" element={isAdminAuthenticated? <AdminBookStatus /> : <LogIn />}/>
            </>
          ) :
          (
            <>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/home" element={ isAuthenticated ? <Home /> : <LogIn />} />
            </>
          ) }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
