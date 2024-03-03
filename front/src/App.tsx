import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import { Container } from '@mui/material';
import ProductForm from './components/ProductForm';
import OrderForm from './components/OrderForm';
import ProductInOrderForm from './components/ProductInOrderForm';
import Header from './components/Header';
import DataTable from './components/Table';


const App = () => {
  return (
  
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <BrowserRouter basename="/">
      <Header/>
      <Routes>
          <Route path="/" element = {<DataTable/>}/>
          <Route path="/orderForm" element = {<OrderForm/>}/>
          <Route path="/productForm" element = {<ProductForm/>}/>
          <Route path="/productInOrderForm" element = {<ProductInOrderForm/>}/>
      </Routes>
    </BrowserRouter>
    </Container>
    
  );
};

export default App;
