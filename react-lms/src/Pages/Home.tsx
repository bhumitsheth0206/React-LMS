import { useEffect, useMemo, useState } from "react";
import { Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogTitle, Grid,  InputAdornment, Modal, TextField, Tooltip, Typography, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import debounce from "lodash.debounce";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

import "../Assests/Home.css";
import waveImg from "../Assests/images/1.jpg";
import { HomeContents } from "../Interfaces/HomeInterface";
import { UserContents } from "../Interfaces/AdminInterface";
import MyBooks from "../Components/MyBooks";

const useStyles = makeStyles(() => ({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0,0,0,.125)",
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0,0,0,.125)",
        },
        "& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0,0,0,.125)",
        }
    }
}));

const Home = () => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [showBookList, setShowBookList] = useState<UserContents | null>(null);
    const navigate = useNavigate();
    const [openDialogBox, setOpenDialogBox] = useState(false);

    const bookListValue = localStorage.getItem('BookList');
    let bookList = bookListValue !== null ? JSON.parse(bookListValue) : [];

    const user = localStorage.getItem('User');
    const userData = user !== null ? JSON.parse(user) : null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(e.target.value);
    };

    if (searchTerm !== "") {
        bookList = bookList.filter((i: HomeContents) => {
            if(i.title.toLowerCase().includes(searchTerm) || i.description.toLowerCase().includes(searchTerm)) {
                return i;
            }
        });
    }

    const debouncedResults = useMemo(() => {
        return debounce(handleChange, 300);
    }, []);
    
    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenDialogBox = () => setOpenDialogBox(true);
    const handleCloseDialogBox = () => setOpenDialogBox(false);

    const bookData = (i: HomeContents) => {
        localStorage.setItem('BookData', JSON.stringify(i)); 
    }

    const addBookRequest = () => {
        const bookListValue = localStorage.getItem('BookStatusList');
        const bookStatusList = bookListValue !== null ? JSON.parse(bookListValue) : [];
        const bookData = localStorage.getItem('BookData');
        localStorage.removeItem('BookData');
        const bookDetails = bookData !== null ? JSON.parse(bookData) : null;
        const checkBookRequestExists = bookStatusList.find((i: any) => i.id === bookDetails.id && i.userId === userData.id);
        if (checkBookRequestExists) {
            toast.error("Request already added.");
        }
        else {
            bookDetails.requestDate = new Date();
            bookDetails.status = 'pending';
            const newBookStatusList = [...bookStatusList, { ...bookDetails, userId: userData.id }];
            localStorage.setItem('BookStatusList', JSON.stringify(newBookStatusList));
        }
        setOpen(false);
    }

    const handleLogout = () => {
        localStorage.setItem('isAuthenticated', JSON.stringify(false));
        navigate('/');
    };

    const viewBooks = () => {
        setShowBookList(userData);
    }

    return (
        <>
            {showBookList === null ?
            <Box className="content-box-lg">
                <Box className="home-title-heading">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <h3>Library Management System</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <Box style={{float: 'right'}}>
                                <Tooltip title="Your Rented Books" >
                                    <ListAltOutlinedIcon 
                                    style={{
                                        color: '#6255a5',
                                        marginTop: '10px'
                                    }}
                                    onClick={viewBooks}/>
                                </Tooltip>
                                <Tooltip title="Logout" >
                                    <PowerSettingsNewOutlinedIcon 
                                    style={{
                                        color: '#6255a5',
                                        marginTop: '10px'
                                    }}
                                    onClick={() => {handleOpenDialogBox();}}/>
                                </Tooltip>
                            </Box>
                        </Grid>
                    </Grid>

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

                <Box>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                id="search" 
                                variant="outlined"
                                placeholder="Search books here.."
                                className={classes.root  + ' input-text'} 
                                onChange={debouncedResults}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" className="search-icon">
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box className="card-content">
                    <Grid container>
                        {bookList.map((i: HomeContents) => {
                            if (i.quantity > 0) {
                                return (
                                    <Grid item md={4} key={i.id}>
                                        <Card className="cards">
                                            <CardMedia
                                                className="card-media"
                                                image={waveImg}
                                                style={{
                                                    backgroundSize: "100% 100%"
                                                }}
                                            />
                                            <CardContent className="card-contents">
                                                <Typography gutterBottom variant="h3" className="card-title">
                                                    {i.title}
                                                </Typography>
                                                <Typography variant="body2" className="card-description" component="p">
                                                    {i.description}
                                                </Typography>
                                                <Typography variant="body2" className="card-quantity" component="p">
                                                    Quantity - {i.quantity}
                                                </Typography>
                                                <Button 
                                                    type="submit" 
                                                    variant="contained" 
                                                    className="home-buy-book-button"
                                                    onClick={() => {handleOpen(); bookData(i);}}
                                                >
                                                    Buy Book
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            } 
                        })}
                    </Grid>
                    <Modal open={open}
                        onClose={handleClose}
                        closeAfterTransition
                    >
                        <Box className="home-modal">
                            <p>Are you sure you want to rent the book?</p>
                            <Button onClick={addBookRequest} type="submit" variant="contained" className="success-btn">Yes</Button> 
                            <Button onClick={handleClose} type="submit" variant="contained" className="error-btn">No</Button>
                        </Box>
                    </Modal>
                </Box>
            </Box> : <MyBooks books={showBookList} updateUserStatus={() => setShowBookList(null)} />
            }
        </>
    );
}

export default Home;