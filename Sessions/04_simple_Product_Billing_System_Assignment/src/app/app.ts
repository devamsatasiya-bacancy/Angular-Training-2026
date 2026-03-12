import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-components/productlist/productlist.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  imports: [HeaderComponent, ProductListComponent, FooterComponent],
})
export class App {
  title = 'Product Billing System';
}
