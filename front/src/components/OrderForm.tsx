// src/FormComponent.tsx
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { IOrder } from '../types';
import { useCreateOrder } from '../query/mutations';
import { useNavigate } from 'react-router-dom';

const OrderForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IOrder>({ mode: 'all' });
  const mutation = useCreateOrder();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IOrder> = (data:IOrder) => {
    mutation.mutate(data);
    setTimeout(() => {
     if(mutation.isSuccess) {navigate('/')};
    }, 1000);
  };
  
  return (
    
    <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex', flexDirection:'column'}}>
    <h1>Order Form</h1>
    <TextField
        label="start_date"
        type='date'
        {...register('start_date', { required: true })} 
        margin="normal"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          '.MuiInputBase-input::-webkit-calendar-picker-indicator': {
            display: 'none',
          },
          '&:focus-within .MuiInputBase-input::-webkit-calendar-picker-indicator': {
            display: 'block',
          },
          '& .MuiInputBase-input': {
            paddingRight: '0px !important',
          }
        }}
        error={!!errors.start_date}
        helperText={errors.start_date?.message || 'Поле обязательно для заполнения'} 
      />

    <TextField
          label="end_date"
          type='date'
          {...register('end_date', { required: true })} 
          margin="normal"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            '.MuiInputBase-input::-webkit-calendar-picker-indicator': {
              display: 'none',
            },
            '&:focus-within .MuiInputBase-input::-webkit-calendar-picker-indicator': {
              display: 'block',
            },
            '& .MuiInputBase-input': {
              paddingRight: '0px !important',
            }
          }}
          error={!!errors.end_date}
          helperText={errors.end_date?.message || 'Поле обязательно для заполнения'} 
        />
    <TextField 
      label="total_cost"
      type="number"
      {...register('total_cost', { required: true, min: 1 })}
      margin="normal"
      fullWidth
      error={!!errors.total_cost} // Set error state based on validation
      helperText={errors.total_cost?.message || 'Поле должно быть числом'}
    />

      <Button // Use Material UI Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
        disabled={!!Object.keys(errors).length} // Disable button if any errors exist
      >
          {(mutation.isPending) ? <CircularProgress size={20} style={{ color: 'white', width: '20px', height: '20px' }}/> :'Appoint Order'}
      </Button>
      
      {mutation.isError && <Typography>An error has occurred: {mutation.error.message}</Typography>}
      {mutation.isSuccess && <Typography color="success.main">Successfully submitted!! </Typography>}
  
    </form>
    
  );
};


export default OrderForm;
