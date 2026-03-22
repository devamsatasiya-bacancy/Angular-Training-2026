type ProductStatus = 'In Stock' | 'Out of Stock' | 'Limited Stock';


export interface ProductModel {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  stockStatus: ProductStatus;
  discount?: number; 
  review:number;
}
