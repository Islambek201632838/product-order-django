import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Container,
} from '@mui/material';
import { useGetOrders, useGetProducts, useGetProductsInOrder } from "../query/queries";
import { IOrder, IProduct, IProductInOrder } from '../types';

const DataTable = () => {
  const { data: products = [], isLoading: isLoadingProducts, isError: isErrorProducts } = useGetProducts();
  const { data: orders = [], isLoading: isLoadingOrders, isError: isErrorOrders } = useGetOrders();
  const { data: productsInOrders = [], isLoading: isLoadingProductsInOrder, isError: isErrorProductsInOrder } = useGetProductsInOrder();

  
  return (
    <Container>
      { products ? (<>
      <h2> Product Table</h2>
      <TableContainer component={Paper} sx={{ mb: 4, mt: 3 }}>
        <Table sx={{ minWidth: 200, '& .MuiTableCell-root': { border: '1px solid rgba(224, 224, 224, 1)' } }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { products.map((product : IProduct) => (
              <TableRow key={product.id}>
                <TableCell align='center'>{product.name}</TableCell>
                <TableCell align='center'>{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> </>) : null }
      {isLoadingProducts && <CircularProgress />}
      {isErrorProducts && <Typography sx={{ my: 3}} color="error">Error while fetching products</Typography>}

      {orders ? (<>
      <h2> Order Table</h2>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table sx ={{minWidth: 200}} aria-label="orders table" >
          <TableHead>
            <TableRow>
              <TableCell align='center'>Start Date</TableCell>
              <TableCell align='center'>End Date</TableCell>
              <TableCell align='center'>Total Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order : IOrder) => (
              <TableRow key={order.id}>
                <TableCell align='center'>start date</TableCell>
                <TableCell align='center'>end date</TableCell>
                <TableCell align='center'>{order.total_cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> </>) : null }

      {isLoadingOrders && <CircularProgress />}
      {isErrorOrders && <Typography sx={{ my: 3}} color="error">Error while fetching orders</Typography>}
      
      {productsInOrders ? (<>
      <h2> Product in Order Table</h2>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table sx ={{minWidth: 200}} aria-label="products in orders table" >
          <TableHead>
            <TableRow>
              <TableCell align='center'>Order Id</TableCell>
              <TableCell align='center'>Price Id</TableCell>
              <TableCell align='center'>Duration Days</TableCell>
              <TableCell align='center'>Rental Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsInOrders.map((productInOrder : IProductInOrder) => (
              <TableRow key={productInOrder.order}>
                <TableCell align='center'>{productInOrder.order}</TableCell>
                <TableCell align='center'>{productInOrder.product}</TableCell>
                <TableCell align='center'>{productInOrder.durationDays}</TableCell>
                <TableCell align='center'>{productInOrder.rental_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> </>) : null }
      {isLoadingProductsInOrder && <CircularProgress />}
      {isErrorProductsInOrder && <Typography sx={{ my: 3}} color="error">Error while fetching products in order</Typography>}
    </Container>
  );
};

export default DataTable;
