import { Injectable } from '@angular/core';
import { Company } from '../models/FormsModel';

@Injectable({
  providedIn: 'root',
})
export class CompanyFormService { 
  private companyDetals: Company[] | null = null;

  setCompanyDetails(details: Company) {
    this.companyDetals = this.companyDetals || [];
    this.companyDetals.push(details);
  }

  getCompanyDetails(): Company[] | null {
    return this.companyDetals;
  }
}
