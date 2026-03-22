import { Component, signal } from '@angular/core';
import { ProductModel } from '../../models/ProductModel';
import { ProductCard } from '../product-card/product-card';
import { HoverScale } from '../../directives/hover-scale';
import { ProductsCart } from "../products-cart/products-cart";

@Component({
  selector: 'app-product-listing',
  imports: [ProductCard, HoverScale, ProductsCart],
  templateUrl: './product-listing.html',
  styleUrl: './product-listing.scss',
})
export class ProductListing {

  productsCart= signal< ProductModel[]> ([]);
  productsList: ProductModel[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      description: 'Description for Product 1',
      stock: 10,
      stockStatus: 'In Stock',
      discount: 10,
      review:5,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      description: 'Description for Product 2',
      stock: 0,
      stockStatus: 'Out of Stock',
        review:5,
    },
    {
      id: 3,
      name: 'Product 3',
      price: 150,
      description: 'Description for Product 3',
      stock: 2,
      stockStatus: 'Limited Stock',  review:3,
    }
  ];


  addtoCard(index: number){
    const product = this.productsList[index]; 
    if(this.productsCart().length > 0){
      this.productsCart.update(cart => [...cart, product]);
    } else {
      this.productsCart.set([product]);
    }
  }
}
