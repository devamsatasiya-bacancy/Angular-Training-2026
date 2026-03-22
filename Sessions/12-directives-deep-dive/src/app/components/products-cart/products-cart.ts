import { Component, Input } from '@angular/core';
import { ProductModel } from '../../models/ProductModel';

@Component({
  selector: 'app-products-cart',
  imports: [],
  templateUrl: './products-cart.html',
  styleUrl: './products-cart.scss',
})
export class ProductsCart {

  @Input() productsCart: ProductModel[] = [];

}
