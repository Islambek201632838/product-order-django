
export interface IProduct {
    id?: number;
    name: string;
    price: number;
  }
  
  export interface IOrder {
    id?: number;
    start_date: Date;
    end_date: Date;
    total_cost: number;
  }
  
  export interface IProductInOrder {
    product: number;
    order: number;
    rental_price: number;
    duration: number;
  }
  