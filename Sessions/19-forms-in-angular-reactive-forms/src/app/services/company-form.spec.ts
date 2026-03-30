import { TestBed } from '@angular/core/testing';

import { CompanyForm } from './company-form';

describe('CompanyForm', () => {
  let service: CompanyForm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyForm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
