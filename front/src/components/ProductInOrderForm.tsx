
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, CircularProgress, MenuItem, Select, TextField, Typography } from '@mui/material';
import {IOrder, IProduct, IProductInOrder } from '../types';
import { useCreateProductInOrder } from '../query/mutations';
import { useNavigate } from 'react-router-dom';
import { useGetOrders, useGetProducts } from '../query/queries';
import { useState } from 'react';

const ProductInOrderForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IProductInOrder>({ mode: 'all' });
  const { data: products = []} = useGetProducts();
  const { data: orders = [] } = useGetOrders();  
  const [productId, setproductId] = useState(1);
  const [orderId, setorderId] = useState(1);
  
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
    <Select
      sx={{mb : 2}}
      labelId="product-select-label"
      {...register('product', { required: true })}
      id="id-product"
      value={productId}
      label="product"
      onChange={(event) => {
        // Find the order by the selected ID and set it
        const selectedproduct = products.find((product : IProduct) => product.id === event.target.value);
        setproductId(selectedproduct.id);
      }}
    >
      {products.map((item: IProduct) => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
    
    <Select
    labelId="order-select-label"
    
    {...register('order', { required: true })}
    id="id-order"
    value={orderId} 
    label="order"
    onChange={(event) => {
      // Find the order by the selected ID and set it
      const selectedOrder = orders.find((order : IOrder) => order.id === event.target.value);
      setorderId(selectedOrder.id);
    }}
  >
    {orders.map((item: IOrder) => (
      <MenuItem value={item.id}>{new Date(item.start_date)?.toDateString()} - {new Date(item.end_date)?.toDateString()}</MenuItem>

    ))}
  </Select>

    <TextField 
      label="rental_price"
      type="number"
      {...register('rental_price', { required: true, min: 1 })}
      margin="normal"
      fullWidth
      error={!!errors.rental_price} // Set error state based on validation
      helperText={errors.rental_price?.message || 'Поле должно быть числом'}
    />

<TextField 
      label="duration"
      type="number"
      {...register('duration', { required: true, min: 1 })}
      margin="normal"
      fullWidth
      error={!!errors.duration} // Set error state based on validation
      helperText={errors.duration?.message || 'Поле должно быть числом'}
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

export default ProductInOrderForm;