import { useQuery } from '@tanstack/react-query';
import { getOrder, getProduct, getProductInOrder } from '.';

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProduct, 
  });
}

export function useGetOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrder,
  });
}

export function useGetProductsInOrder() {
  return useQuery({
    queryKey: ["productsInOrder"],
    queryFn: getProductInOrder, 
  });
}
