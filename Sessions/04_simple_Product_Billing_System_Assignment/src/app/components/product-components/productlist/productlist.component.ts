import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface BillItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
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
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 79 },
  ];

  // Quantity inputs for each product
  quantities: Record<number, number> = { 1: 1, 2: 1, 3: 1 };

  billItems = signal<BillItem[]>([]);


  grandTotal = computed(() =>
    this.billItems().reduce((sum, item) => sum + item.total, 0)
  );


  generateBill() {
    const items: BillItem[] = this.products
      .filter((p) => this.quantities[p.id] > 0)
      .map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: this.quantities[p.id],
        total: p.price * this.quantities[p.id],
      }));

    this.billItems.set(items);
  }
}
