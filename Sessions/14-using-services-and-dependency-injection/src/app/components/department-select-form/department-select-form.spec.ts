import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSelectForm } from './department-select-form';

describe('DepartmentSelectForm', () => {
  let component: DepartmentSelectForm;
  let fixture: ComponentFixture<DepartmentSelectForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentSelectForm],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentSelectForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
