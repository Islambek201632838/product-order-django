
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import {IProductInOrder } from '../types';
import { useCreateProductInOrder } from '../query/mutations';
import { useNavigate } from 'react-router-dom';
import { useGetOrders, useGetProducts } from '../query/queries';

const ProductInOrderForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IProductInOrder>({ mode: 'all' });
  const { data: products = [], isLoading: isLoadingProducts, isError: isErrorProducts } = useGetProducts();
  const { data: orders = [], isLoading: isLoadingOrders, isError: isErrorOrders } = useGetOrders();
  
  const mutation = useCreateProductInOrder();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IProductInOrder> = (data:IProductInOrder) => {
    mutation.mutate(data);
    
    setTimeout(() => {
      if(mutation.isSuccess) {navigate('/')};
    }, 1000);
  };
  
  return (
    
    <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex', flexDirection:'column'}}>
    <h1>Product In Order Form</h1>
    <TextField
        label="order"
        type = "number"
        {...register('order', { required: true })} 
        margin="normal"
        fullWidth
        error={!!errors.order}
        helperText={errors.order?.message || 'Поле обязательно для заполнения'} 
      />
    <TextField // Use Material UI TextField
      label="product"
      type="number"
      {...register('product', { required: true, min: 1 })}
      margin="normal"
      fullWidth
      error={!!errors.product} // Set error state based on validation
      helperText={errors.product?.message || 'Поле должно быть числом'}
    />
    <TextField 
      label="rental_price"
      type="number"
      {...register('rental_price', { required: true, min: 1 })}
      margin="normal"
      fullWidth
      error={!!errors.rental_price} // Set error state based on validation
      helperText={errors.rental_price?.message || 'Поле должно быть числом'}
    />

    <Button // Use Material UI Button
      type="submit"
      variant="contained"
      sx={{ mt: 2, mb: 2 }}
      disabled={!!Object.keys(errors).length} // Disable button if any errors exist
    >
        {(mutation.isPending) ? <CircularProgress size={20} style={{ color: 'white', width: '20px', height: '20px' }}/> :'Add product in Order'}
    </Button>
      {mutation.isError && <Typography>An error has occurred: {mutation.error.message}</Typography>}
      {mutation.isSuccess && <Typography color = "success.main">Successfully submitted!! </Typography>}
    </form>
    
  );
};

export default ProductInOrderForm