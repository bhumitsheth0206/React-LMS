import Box from '@mui/material/Box';
import { Button, Grid, Table, TableCell, TableRow, Typography } from '@material-ui/core';

import { BookContents } from '../Interfaces/AdminInterface';

const MyBooks = (props: any) => {
    const updateUserStatus = () => {
        props.updateUserStatus();
    }

    return (
        <Box>
            <Box component="main" style={{ padding: '32px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="h3" className="card-title">
                            Books Rented
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
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                    {  props.books.books.length > 0
                        ?
                        props.books.books.map((i: BookContents) => {
                            return (
                                <TableRow key={i.id}>
                                    <TableCell>{i.title}</TableCell>
                                    <TableCell>{i.description}</TableCell>
                                </TableRow>
                            )
                        })
                        :<TableRow>No data</TableRow>
                    }
                </Table>
            </Box>
        </Box>
    )
};

export default MyBooks;