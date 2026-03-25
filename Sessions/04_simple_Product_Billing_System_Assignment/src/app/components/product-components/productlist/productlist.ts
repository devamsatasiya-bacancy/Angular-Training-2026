import { Component, signal, computed, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './productlist.html',
  styleUrl: './productlist.scss',
  imports: [CommonModule, FormsModule],
})
export class ProductListComponent {
  // Product data
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25},
    { id: 3, name: 'Keyboard', price: 79 },
    
  ];


  // Quantity inputs for each product
  quantities = signal<Record<number, number>>({ 1: 1, 2: 1, 3: 1 });

  // component.ts
updateQty(id: number, qty: number) {
  if (isNaN(qty)) {
    return this.quantities.update(q => ( {...q, [id]: 0 }));
  }
  else{
    this.quantities.update(q => ( {...q, [id]: qty }));
  }
    
}

  
  productItems = signal<Product[]>(this.products);

  grandTotal = computed(() => {
    return this.productItems().reduce((sum, item) => sum + item.price * this.quantities()[item.id], 0);

  });
}
