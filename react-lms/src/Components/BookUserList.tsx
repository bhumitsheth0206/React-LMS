import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, Modal, Table, TableCell, TablePagination, TableRow, Typography } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

import { UserContents } from '../Interfaces/AdminInterface';
import { HomeContents } from '../Interfaces/HomeInterface';

const BookUserList = (props: any) => {
    const [bookDataABC, setBookDataABC] = useState<any>(props.books.users);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // let booksUserList = props.books.users;
    // setBookData(() => props.books.users);

    const handleDeleteModalOpen = () => setOpenDeleteModal(true);
    const handleDeleteModalClose = () => setOpenDeleteModal(true);
    
    const updateUserStatus = () => {
        props.updateUserStatus();
    }

    const getUser = (item: UserContents) => {
        localStorage.setItem('DeleteBookUserData', JSON.stringify(item));
    }

    const removeUser = () => {
        const data = localStorage.getItem('DeleteBookUserData');
        const item = data !== null ? JSON.parse(data) : null;
        
        const booksUserList = bookDataABC.filter((i: UserContents) => i.status_id !== item.status_id);
        setBookDataABC(booksUserList);
        const bookData = localStorage.getItem('BookList');
        const bookList = bookData !== null ? JSON.parse(bookData) : null;
        const bookIndex = bookList.findIndex((i: HomeContents) => i.id === props.books.id);
        bookList[bookIndex].quantity += 1;
        bookList[bookIndex].users = booksUserList;
        localStorage.setItem('BookList', JSON.stringify(bookList));

        const userListValue = localStorage.getItem('UserList');
        const userList = userListValue !== null ? JSON.parse(userListValue) : [];
        const userIndex = userList.findIndex((i: UserContents) => i.id === item.id);
        userList[userIndex].books = userList[userIndex].books.filter((i: any) => i.status_id !== item.status_id);
        localStorage.setItem('UserList', JSON.stringify(userList));

        localStorage.removeItem('DeleteBookUserData');
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
            <Box component="main" style={{ padding: '32px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="h3" className="card-title">
                            Users List
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="submit" 
                            variant="contained"
                            className="add-book-btn"
                            onClick={updateUserStatus}
                        >
                            Back 
                        </Button>
                    </Grid>
                </Grid>

                <Table>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                    {  bookDataABC.length > 0
                        ?
                        (rowsPerPage > 0
                            ? bookDataABC.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : bookDataABC
                        ).map((i: UserContents) => {
                            return (
                                <TableRow key={i.id}>
                                    <TableCell>{i.firstName}</TableCell>
                                    <TableCell>{i.lastName}</TableCell>
                                    <TableCell>{i.email}</TableCell>
                                    <TableCell>
                                        <DeleteOutlineOutlinedIcon onClick={() =>{getUser(i); handleDeleteModalOpen();} }/>
                                    </TableCell>
                                    
                                </TableRow>
                            )
                        })
                        :<TableRow>No data</TableRow>
                    }
                </Table>
            </Box>
            <TablePagination
                component="div"
                onPageChange={handleChangePage}
                page={page}
                count={bookDataABC.length}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Modal open={openDeleteModal}
                onClose={handleDeleteModalClose}
                closeAfterTransition
            >
                <Box className="delete-book-modal">
                    <p>Are you sure you want to delete?</p>
                    <Button onClick={removeUser} type="submit" variant="contained" className="success-btn">Yes</Button> 
                    <Button onClick={handleDeleteModalClose} type="submit" variant="contained" className="error-btn">No</Button>
                </Box>
            </Modal>
        </Box>
    )
};

export default BookUserList;