export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface BillItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Bill {
  items: BillItem[];
  grandTotal: number;
  generatedAt: Date;
}
