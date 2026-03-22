import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCart } from './products-cart';

describe('ProductsCart', () => {
  let component: ProductsCart;
  let fixture: ComponentFixture<ProductsCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsCart],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsCart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
