import axios from "axios";
import { IOrder, IProduct, IProductInOrder } from "../types";

const BASE_URL = "http://127.0.0.1:8000/api";
const axiosInstance = axios.create({ baseURL: BASE_URL });


export const getProduct = async () => {
    return (await axiosInstance.get("products/"));
  };

export const getOrder = async () => {
return (await axiosInstance.get("orders/"));
};

export const getProductInOrder = async () => {
    return (await axiosInstance.get("productInOrder/"));
    };


//POST request to add a new product, order, productInOrder
export const addProduct = async (data: IProduct) => {
    await axiosInstance.post("products/", data);
  };

export const addOrder = async (data: IOrder) => {
    await axiosInstance.post("orders/", data);
  }; 

  export const addProductInOrder = async (data: IProductInOrder) => {
    await axiosInstance.post("productInOrder/", data);
  };
