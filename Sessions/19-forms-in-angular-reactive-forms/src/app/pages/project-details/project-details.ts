import { Component, inject } from '@angular/core';
import { CompanyFormService } from '../../services/company-form';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-project-details',
  imports: [JsonPipe],
  templateUrl: './project-details.html',
  styleUrl: './project-details.sass',
})
export class ProjectDetails {

  private companyFormService = inject(CompanyFormService);


  get companyDetails() {
    return this.companyFormService.getCompanyDetails();
  }

}
 