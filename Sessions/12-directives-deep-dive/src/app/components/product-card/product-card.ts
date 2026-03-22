import { Component, EventEmitter, Input, input, Output, signal } from '@angular/core';
import { ProductModel } from '../../models/ProductModel';
import { NgClass } from '@angular/common';
import { HighlightDiscount } from '../../directives/highlight-discount';
import { StatusBorder } from "../../directives/status-border";
import { Loading } from '../../directives/loading';
import { CustomIf } from '../../directives/custom-if';
import { CustomFor } from "../../directives/custom-for";

@Component({
  selector: 'app-product-card',
  imports: [NgClass, HighlightDiscount, StatusBorder, Loading, CustomIf, CustomFor],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() index: number | null = null;
  @Input() product: ProductModel | null = null;
  @Output() productAdded = new EventEmitter<number>();
  addcartProcessing = signal<boolean>(false);

  sendCardIndex(){
    this.addcartProcessing.set(true);
    this.productAdded.emit(this.index!);
    setInterval(() => {
      this.addcartProcessing.set(false);
    }, 2000);
  }
  getReviews(): string[]  {

    let reviews = [];
    for(let i=1; i<= 5; i++){
      if (i<=this.product!.review) {
        reviews.push('★');
      }
      else{
        reviews.push('☆');
      }

      }
      console.log(reviews)
      return reviews;
    }
  
  getDiscountedPrice(): number {
    if (this.product && this.product.discount) {
      return this.product.price - (this.product.price * this.product.discount / 100);
    }
    return this.product ? this.product.price : 0;
  }
}
