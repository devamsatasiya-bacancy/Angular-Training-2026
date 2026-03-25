import { Component } from '@angular/core';
import { ProductListComponent } from '../components/product-components/productlist/productlist';

@Component({
  selector: 'app-home',
  imports: [ProductListComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
