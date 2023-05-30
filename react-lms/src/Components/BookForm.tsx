import { Box, Button, FormLabel, TextField, makeStyles } from "@material-ui/core";
import { useFormik } from "formik";
import BookSchema from "../Schema/BookSchema";

const useStyles = makeStyles(() => ({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6255a5",
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6255a5",
        },
        "& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6255a5",
        },
    }
}));

const BookForm = (parentProps: any) => {
    const classes = useStyles();

    type BookDetails =  {
        id: number;
        title: string;
        description: string;
        quantity: string;
    }

    const bookFormInitialValues: BookDetails = {
        id: parentProps.formData.id ? parentProps.formData.id :  0,
        title: parentProps.formData.title ? parentProps.formData.title :  "",
        description: parentProps.formData.description ? parentProps.formData.description : "",
        quantity: parentProps.formData.quantity ? parentProps.formData.quantity : ""
    };

    const formik = useFormik({
        initialValues: bookFormInitialValues,
        validationSchema: BookSchema,
        onSubmit: (values, props) => {
            console.log('Values:', values);
            parentProps.onSaveData(values);
            props.resetForm({
                values: bookFormInitialValues,
            });
        },
    });

    return (
        <Box className="home-modal">
            <form onSubmit={formik.handleSubmit} className="login-form">
                <FormLabel className="label-text">Title</FormLabel>
                <TextField 
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    name="title"
                    id="title" 
                    variant="outlined" 
                    margin="dense" 
                    className={classes.root + ' input-text'}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />

                <FormLabel className="label-text">Description</FormLabel>
                <TextField 
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    name="description"
                    id="description" 
                    variant="outlined" 
                    margin="dense" 
                    className={classes.root + ' input-text'}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />

                <FormLabel className="label-text">Quantity</FormLabel>
                <TextField 
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    name="quantity"
                    id="quantity" 
                    variant="outlined" 
                    margin="dense" 
                    className={classes.root + ' input-text'}
                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                    helperText={formik.touched.quantity && formik.errors.quantity}
                />

                <Button type="submit" variant="contained" className="login-button">Submit</Button>
            </form>
        </Box>
    );

}

export default BookForm;