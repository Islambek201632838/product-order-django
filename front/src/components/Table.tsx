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
} from '@mui/material';
import { useGetOrders, useGetProducts, useGetProductsInOrder } from "../query/queries";
import { IOrder, IProduct, IProductInOrder } from '../types';

const DataTable = () => {
  const { data: products, isLoading: isLoadingProducts, isError: isErrorProducts } = useGetProducts();
  const { data: orders, isLoading: isLoadingOrders, isError: isErrorOrders } = useGetOrders();
  const { data: productsInOrders, isLoading: isLoadingProductsInOrder, isError: isErrorProductsInOrder } = useGetProductsInOrder();

  
  return (
    <div>
      <TableContainer component={Paper} sx={{ mb: 4, mt: 3 }}>
        <Table aria-label="products table" >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { products.map((product : IProduct) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoadingProducts && <CircularProgress />}
      {isErrorProducts && <Typography sx={{ my: 3}} color="error">Error while fetching products</Typography>}

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table aria-label="orders table" >
          <TableHead>
            <TableRow>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Total Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order : IOrder) => (
              <TableRow key={order.id}>
                <TableCell>{order.start_date.toDateString()}</TableCell>
                <TableCell>{order.end_date.toDateString()}</TableCell>
                <TableCell>{order.total_cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isLoadingOrders && <CircularProgress />}
      {isErrorOrders && <Typography sx={{ my: 3}} color="error">Error while fetching orders</Typography>}

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table aria-label="products in orders table" >
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Price Id</TableCell>
              <TableCell>Duration Days</TableCell>
              <TableCell>Rental Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsInOrders.map((productInOrder : IProductInOrder) => (
              <TableRow key={productInOrder.order}>
                <TableCell>{productInOrder.order}</TableCell>
                <TableCell>{productInOrder.product}</TableCell>
                <TableCell>{productInOrder.durationDays}</TableCell>
                <TableCell>{productInOrder.rental_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isLoadingProductsInOrder && <CircularProgress />}
      {isErrorProductsInOrder && <Typography sx={{ my: 3}} color="error">Error while fetching products in order</Typography>}
    </div>
  );
};

export default DataTable;
