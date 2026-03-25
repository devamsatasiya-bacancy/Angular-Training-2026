import { Component } from '@angular/core';
import { ProductListComponent } from './components/product-components/productlist/productlist';

import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  imports: [ProductListComponent, Header, Footer],
})
export class App {
  title = 'Product Billing System';
}
