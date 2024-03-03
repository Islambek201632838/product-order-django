// src/FormComponent.tsx
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, CircularProgress, TextField } from '@mui/material';
import { IOrder } from '../types';
import { useCreateOrder } from '../query/mutations';

export const OrderForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IOrder>({ mode: 'all' });
  const mutation = useCreateOrder();

  const onSubmit: SubmitHandler<IOrder> = (data:IOrder) => {
    mutation.mutate(data);
  };
  
  return (
    
    <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex', flexDirection:'column'}}>
    <h1>Product Form</h1>
    <TextField
        label="start_date"
        type='date'
        {...register('start_date', { required: true })} 
        margin="normal"
        fullWidth
        error={!!errors.start_date}
        helperText={errors.start_date?.message || 'Поле обязательно для заполнения'} 
      />

    <TextField
          label="end_date"
          type='date'
          {...register('end_date', { required: true })} 
          margin="normal"
          fullWidth
          error={!!errors.end_date}
          helperText={errors.end_date?.message || 'Поле обязательно для заполнения'} 
        />
    <TextField 
      label="total_cost"
      type="date"
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
          {(mutation.isPending) ? <CircularProgress size={20} style={{ color: 'white', width: '20px', height: '20px' }}/> :'Add product'}
      </Button>
    {mutation.isError && <div>An error has occurred: {mutation.error.message}</div>}
  
    </form>
    
  );
};
