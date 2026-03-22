import { Component, signal } from '@angular/core';
import { ProductListing } from './components/product-listing/product-listing';

@Component({
  selector: 'app-root',
  imports: [ProductListing],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('12-directives-deep-dive');
}
