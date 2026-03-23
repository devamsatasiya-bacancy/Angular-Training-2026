import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeForm } from './add-employee-form';

describe('AddEmployeeForm', () => {
  let component: AddEmployeeForm;
  let fixture: ComponentFixture<AddEmployeeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmployeeForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmployeeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
