import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Navbar from '../Components/Navbar';
import { Button, Grid, Modal, Table, TableCell, TablePagination, TableRow, Typography } from '@material-ui/core';
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

import "../Assests/Book.css";
import BookForm from '../Components/BookForm';
import { BookContents } from '../Interfaces/AdminInterface';
import BookUserList from '../Components/BookUserList';

const AdminBooks = () => {
    const [open, setOpen] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [data, setData] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showUserList, setShowUserList] = useState<BookContents | null>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setData({});
    } 

    const handleDeleteModalOpen = () => setOpenDeleteModal(true);
    const handleDeleteModalClose = () => setOpenDeleteModal(true);

    const bookListValue = localStorage.getItem('BookList');
    let bookList = bookListValue !== null ? JSON.parse(bookListValue) : [];

    const addBookHandler = (book: BookContents) => {
        handleClose();
        if (book.id) {
            const bookIndex = bookList.findIndex((i: BookContents) => i.id === book.id); 
            bookList[bookIndex] = book;
            localStorage.setItem('BookList', JSON.stringify(bookList));
        } else {
            const bookData = {
                id: Math.random(),
                title: book.title,
                description: book.description,
                quantity: parseInt(book.quantity),
                users: []
            }
            const newBookList = [...bookList, bookData];
            localStorage.setItem('BookList', JSON.stringify(newBookList));
        }
    }

    const getBook = (book: BookContents) => {
        localStorage.setItem('DeleteBookData', JSON.stringify(book));
    }
    
    const removeBook = () => {
        const bookData = localStorage.getItem('DeleteBookData');
        const bookId = bookData !== null ? JSON.parse(bookData).id : null;
        bookList = bookList.filter((i: BookContents) => i.id !== bookId);
        localStorage.setItem('BookList', JSON.stringify(bookList));
        localStorage.removeItem('DeleteBookData');
        setOpenDeleteModal(false);
    }

    const closeModal = () => {
        setOpenDeleteModal(false);
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const usersList = (item: BookContents) => {
        setShowUserList(item);
    }

    return ( 
        <Box>
            {showUserList === null ? 
            <>
                <Navbar />
                <Box component="main" style={{ padding: '32px' }}>
                    <Toolbar />
                    <Box className="book-title-heading">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography gutterBottom variant="h3" className="card-title">
                                    Library Management System - Books
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    type="submit" 
                                    variant="contained"
                                    className="add-book-btn"
                                    onClick={handleOpen}
                                >
                                    Add Book
                                </Button>
                            </Grid>
                        </Grid>
                        <Modal open={open}
                            onClose={handleClose}
                            closeAfterTransition
                        >
                            <BookForm onSaveData={addBookHandler} formData={data}/>
                        </Modal>
                    </Box>

                    <Box>
                        <Table className="book-table">
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                            { bookList.length > 0
                                ?
                                (rowsPerPage > 0
                                    ? bookList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : bookList
                                ).map((i: BookContents) => {
                                    return (
                                        <TableRow key={i.id}>
                                            <TableCell onClick={() =>  usersList(i)} >{i.title}</TableCell>
                                            <TableCell>{i.description}</TableCell>
                                            <TableCell>{i.quantity}</TableCell>
                                            <TableCell>
                                                <EditOutlinedIcon 
                                                    onClick={() => {handleOpen(); setData(i); }}/>
                                                <DeleteOutlineOutlinedIcon onClick={() =>{getBook(i);handleDeleteModalOpen();} }/>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                :<TableRow>No data</TableRow>
                            }
                        </Table>
                        <TablePagination
                            component="div"
                            onPageChange={handleChangePage}
                            page={page}
                            count={bookList.length}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                        <Modal open={openDeleteModal}
                            onClose={handleDeleteModalClose}
                            closeAfterTransition
                        >
                            <Box className="delete-book-modal">
                                <p>Are you sure you want to delete the book?</p>
                                <Button onClick={removeBook} type="submit" variant="contained" className="success-btn">Yes</Button> 
                                <Button onClick={closeModal} type="submit" variant="contained" className="error-btn">No</Button>
                            </Box>
                        </Modal>
                    </Box>
                </Box>
            </>
            : <BookUserList books={showUserList} updateUserStatus={() => setShowUserList(null)} />
            }
        </Box>
    );
}

export default AdminBooks;