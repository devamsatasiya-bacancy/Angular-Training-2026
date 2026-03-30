import { Injectable } from '@angular/core';
import { Company } from '../models/FormsModel';

@Injectable({
  providedIn: 'root',
})
export class CompanyForm { 
  private companyDetals: Company | null = null;

  setCompanyDetails(details: Company) {
    this.companyDetals = details;
  }
}
