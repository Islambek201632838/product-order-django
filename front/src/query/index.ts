import axios from "axios";
import { IOrder, IProduct, IProductInOrder } from "../types";

const BASE_URL = "http://127.0.0.1:8000/api";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const fetchProducts = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/products/");
    return response.data;
  } catch (error) {
    throw new Error('Network response was not ok');
  }
};

//POST request to add a new product, order, productInOrder
export const addProduct = async (data: IProduct) => {
    await axiosInstance.post("products", data);
  };

export const addOrder = async (data: IOrder) => {
    await axiosInstance.post("orders", data);
  }; 

  export const addProductInOrder = async (data: IProductInOrder) => {
    await axiosInstance.post("productInOrder", data);
  };
