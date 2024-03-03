
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, CircularProgress, TextField } from '@mui/material';
import { IProduct } from '../types';
import { useCreateProduct } from '../query/mutations';

export const ProductForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IProduct>({ mode: 'all' });
  const mutation = useCreateProduct();

  const onSubmit: SubmitHandler<IProduct> = (data:IProduct) => {
    mutation.mutate(data);
  };
  
  return (
    
    <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex', flexDirection:'column'}}>
    <h1>Product Form</h1>
    <TextField
        label="name"
        {...register('name', { required: true })} 
        margin="normal"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message || 'Поле обязательно для заполнения'} 
      />
      <TextField // Use Material UI TextField
        label="price"
        type="number"
        {...register('price', { required: true, min: 1 })}
        margin="normal"
        fullWidth
        error={!!errors.price} // Set error state based on validation
        helperText={errors.price?.message || 'Поле должно быть числом'}
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
