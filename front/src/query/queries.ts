import { useQueries } from '@tanstack/react-query';
import { getOrder, getProduct, getProductInOrder } from '.';
export const useGetProducts = () => {
  const result = useQueries({
    queries: [
      {
        queryKey: ['products'],
        queryFn: getProduct,
      },
    ],
  });
  console.log(result);
  return result;
};

export const useGetOrders = () => {
  const result  = useQueries({
    queries: [
      {
        queryKey: ['orders'],
        queryFn: getOrder,
      },
    ],
  });

  return result;
};

export const useGetProductsInOrder = () => {
  const result = useQueries({
    queries: [
      {
        queryKey: ['productsInOrder'],
        queryFn: getProductInOrder,
      },
    ],
  });

  return result;
};
