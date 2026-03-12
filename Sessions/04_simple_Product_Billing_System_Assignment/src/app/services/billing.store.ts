import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';
import { Product, BillItem, Bill } from '../models/product.interface';

@Injectable({ providedIn: 'root' })
export class BillingStore {
  // Signals for state management
  private products = signal<Product[]>([
    {
      id: '1',
      name: 'Laptop',
      price: 999.99,
      description: 'High performance laptop for work',
    },
    {
      id: '2',
      name: 'Mouse',
      price: 25.99,
      description: 'Wireless ergonomic mouse',
    },
    {
      id: '3',
      name: 'Keyboard',
      price: 79.99,
      description: 'Mechanical keyboard',
    },
    {
      id: '4',
      name: 'Monitor',
      price: 299.99,
      description: '27 inch 4K monitor',
    },
  ]);

  private billItems = signal<BillItem[]>([]);

  // Computed signals for derived state
  grandTotal = computed(() => {
    return this.billItems().reduce((sum, item) => sum + item.total, 0);
  });

  // Public accessors
  getProducts() {
    return this.products();
  }

  getBillItems() {
    return this.billItems();
  }

  addToBill(product: Product, quantity: number) {
    if (quantity <= 0) return;

    const existingItem = this.billItems().find((item) => item.productId === product.id);

    if (existingItem) {
      const updatedItems = this.billItems().map((item) =>
        item.productId === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
              total: (item.quantity + quantity) * item.price,
            }
          : item,
      );
      this.billItems.set(updatedItems);
    } else {
      const newItem: BillItem = {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
        total: product.price * quantity,
      };
      this.billItems.set([...this.billItems(), newItem]);
    }
  }

  removeBillItem(productId: string) {
    this.billItems.set(this.billItems().filter((item) => item.productId !== productId));
  }

  clearBill() {
    this.billItems.set([]);
  }

  generateBill(): Bill {
    return {
      items: this.billItems(),
      grandTotal: this.grandTotal(),
      generatedAt: new Date(),
    };
  }
}
