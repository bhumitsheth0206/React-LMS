import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from 'react-router-dom';

import "../Assests/Navbar.css";
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

const drawerWidth = 240;

const Navbar = () => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDialogBox, setOpenDialogBox] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleOpenDialogBox = () => setOpenDialogBox(true);
    const handleCloseDialogBox = () => setOpenDialogBox(false);

    const handleLogout = () => {
        localStorage.setItem('isAdminAuthenticated', JSON.stringify(false));
        navigate('/');
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            ADMIN
          </Typography>
          <Divider />
          <List>
            <Link to="/admin/user" className='mobile-menu-link'>
                User
            </Link>
            <Link to="/admin/book" className='mobile-menu-link'>
                Book
            </Link>
            <Link to="/admin/book-status" className='mobile-menu-link'>
                Book-Status
            </Link>
            {/* <Link to="/" className="mobile-menu-link"> */}
                <Button type="submit" 
                    variant="contained"
                    className="mobile-menu-log-out-btn"
                    onClick={handleOpenDialogBox}
                >
                    Log out
                </Button>
            {/* </Link> */}
          </List>
           <Dialog
                open={openDialogBox}
                onClose={handleCloseDialogBox}
            >
                <DialogTitle>
                {"Are you sure you want to logout?"}
                </DialogTitle>
                <DialogActions>
                    <Button type="submit" variant="contained" className="success-btn" onClick={handleLogout}>
                        Yes
                    </Button>
                    <Button type="submit" variant="contained" className="error-btn" onClick={handleCloseDialogBox} >
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" style={{backgroundColor: "#6255a5"}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                       ADMIN
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Link to="/admin/user" className="link">
                            User
                        </Link>
                        <Link to="/admin/book" className="link">
                            Book
                        </Link>
                        <Link to="/admin/book-status" className='link'>
                            Book-Status
                        </Link>
                        {/* <Link to="/" className="link"> */}
                            <Button type="submit" 
                                variant="contained"
                                className="log-out-btn"
                                onClick={handleOpenDialogBox}
                            >
                                Log out
                            </Button>
                        {/* </Link> */}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                >
                {drawer}
                </Drawer>
            </Box>
            <Dialog
                open={openDialogBox}
                onClose={handleCloseDialogBox}
            >
                <DialogTitle>
                    {"Are you sure you want to logout?"}
                </DialogTitle>
                <DialogActions>
                    <Button type="submit" variant="contained" className="success-btn" onClick={handleLogout}>
                        Yes
                    </Button>
                    <Button type="submit" variant="contained" className="error-btn" onClick={handleCloseDialogBox} >
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Navbar;