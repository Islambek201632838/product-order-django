import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrder, addProduct, addProductInOrder } from ".";
import { IOrder, IProduct, IProductInOrder } from "../types";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IProduct) => addProduct(data),
    onMutate: () => {
      console.log("mutate");
    },

    onError: () => {
      console.log("error");
    },

    onSuccess: () => {
      console.log("success");
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    },
  });
}

export function useCreateOrder() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data: IOrder) => addOrder(data),
      onMutate: () => {
        console.log("mutate");
      },
  
      onError: () => {
        console.log("error");
      },
  
      onSuccess: () => {
        console.log("success");
      },
  
      onSettled: async (_, error) => {
        console.log("settled");
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["orders"] });
        }
      },
    });
  }

  
  export function useCreateProductInOrder() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data: IProductInOrder) => addProductInOrder(data),
      onMutate: () => {
        console.log("mutate");
      },
  
      onError: () => {
        console.log("error");
      },
  
      onSuccess: () => {
        console.log("success");
      },
  
      onSettled: async (_, error) => {
        console.log("settled");
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["productInOrder"] });
        }
      },
    });
  }
  
