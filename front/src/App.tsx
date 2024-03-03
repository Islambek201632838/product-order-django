import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Container } from '@mui/material'
import Table from './components/Table'
import {ProductForm} from './components/ProductForm'
import OrderForm from './components/OrderForm'
import ProductInOrderForm from './components/ProductInOrderForm'

const router = createBrowserRouter([
    {
      path: "/",
      element: <Table/>
    }, 

    {
      path: "/productForm",
      element: <ProductForm/>
    },

    {
      path: "/orderForm",
      element: <OrderForm/>
    },

    {
      path: "/productInOrderForm",
      element: <ProductInOrderForm/>
    }
])
const App = () => {
  return (
    <Container maxWidth="sm" sx={{display: 'flex', 
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  minHeight:'100vh'}}>
      <RouterProvider router = {router}>
      </RouterProvider>
    </Container>
  )
}

export default App
