import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Navbar from '../Components/Navbar';
import { Button, Modal, Table, TableCell, TablePagination, TableRow, Typography } from '@material-ui/core';

import { BookStatusContents, UserContents } from '../Interfaces/AdminInterface';
import { HomeContents } from '../Interfaces/HomeInterface';


const AdminBookStatus = () => {
    const bookStatusListValue = localStorage.getItem('BookStatusList');
    let bookStatusList = bookStatusListValue !== null ? JSON.parse(bookStatusListValue) : [];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDeleteModalOpen = () => setOpenDeleteModal(true);
    const handleDeleteModalClose = () => setOpenDeleteModal(false);

    const getBook = (item: BookStatusContents) => {
        localStorage.setItem('BookStatusData', JSON.stringify(item));
    }

    const changeQuantity = () => {
        const data = localStorage.getItem('BookStatusData');
        const item = data !== null ? JSON.parse(data) : null;
        const bookDataIndex = bookStatusList.findIndex((i: BookStatusContents) => i.id === item.id);
        localStorage.removeItem('BookStatusData');

        if(bookDataIndex >= 0 ) {
            bookStatusList = bookStatusList.filter((i: BookStatusContents) => i.id !== item.id);
            localStorage.setItem('BookStatusList', JSON.stringify(bookStatusList));
        }
        const bookData = localStorage.getItem('BookList');
        const bookList = bookData !== null ? JSON.parse(bookData) : null;
        const bookIndex = bookList.findIndex((i: HomeContents) => i.id === item.id);
        
        if (bookIndex >=0) {
            const statusId = Math.random();
            bookList[bookIndex].quantity -= 1;
            const user = localStorage.getItem('User');
            const userData = user !== null ? JSON.parse(user) : null;
            bookList[bookIndex].users = [...bookList[bookIndex].users,{...userData, status_id: statusId }];
            localStorage.setItem('BookList', JSON.stringify(bookList));

            const userListValue = localStorage.getItem('UserList');
            const userList = userListValue !== null ? JSON.parse(userListValue) : [];
            const userIndex = userList.findIndex((i: UserContents) => i.email === userData.email);
            userList[userIndex].books = [...userList[userIndex].books,{...bookList[bookIndex], status_id: statusId }];
            localStorage.setItem('UserList', JSON.stringify(userList));
        }
        setOpen(false);
    }

    const removeBookStatusData = () => {
        const data = localStorage.getItem('BookStatusData');
        const item = data !== null ? JSON.parse(data) : null;
        localStorage.removeItem('BookStatusData');
        const bookDataIndex = bookStatusList.findIndex((i: BookStatusContents) => i.id === item.id);
        if(bookDataIndex >= 0 ) {
            bookStatusList = bookStatusList.filter((i: BookStatusContents) => i.id !== item.id);
            localStorage.setItem('BookStatusList', JSON.stringify(bookStatusList));
        }
        setOpenDeleteModal(false);
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box>
            <Navbar />
            <Box component="main" style={{ padding: '32px' }}>
                <Toolbar />
                <Typography gutterBottom variant="h3" className="card-title">
                    Library Management System - Book Status
                </Typography>
                <Table>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                    { bookStatusList.length > 0
                        ?
                        (rowsPerPage > 0
                            ? bookStatusList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : bookStatusList
                        ).map((i: BookStatusContents) => {
                            if(i.status === 'pending') {
                                return (
                                    <TableRow key={i.id}>
                                        <TableCell>{i.title}</TableCell>
                                        <TableCell>{i.description}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => {handleOpen(); getBook(i);} } type="submit" variant="contained" className="success-btn">Accept</Button> 
                                            <Button onClick={() => {handleDeleteModalOpen(); getBook(i); }} type="submit" variant="contained" className="error-btn">Reject</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        }).sort((a: BookStatusContents, b: BookStatusContents) => {
                            return b.requestDate > a.requestDate;
                        })
                        :<TableRow>No data</TableRow>
                    }
                </Table>
                <TablePagination
                    component="div"
                    onPageChange={handleChangePage}
                    page={page}
                    count={bookStatusList.length}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Modal open={open}
                    onClose={handleClose}
                    closeAfterTransition
                >
                    <Box className="home-modal">
                        <p>Are you sure you want to accept the book-request?</p>
                        <Button onClick={changeQuantity} type="submit" variant="contained" className="success-btn">Yes</Button> 
                        <Button onClick={handleClose} type="submit" variant="contained" className="error-btn">No</Button>
                    </Box>
                </Modal>
                <Modal open={openDeleteModal}
                    onClose={handleDeleteModalClose}
                    closeAfterTransition
                >
                    <Box className="home-modal">
                        <p>Are you sure you want to reject the book-request?</p>
                        <Button onClick={removeBookStatusData} type="submit" variant="contained" className="success-btn">Yes</Button> 
                        <Button onClick={handleDeleteModalClose} type="submit" variant="contained" className="error-btn">No</Button>
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default AdminBookStatus;