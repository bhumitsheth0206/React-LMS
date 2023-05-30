import * as yup from "yup";

const BookSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    quantity: yup.string().required('Quantity is required')   
});

export default BookSchema;