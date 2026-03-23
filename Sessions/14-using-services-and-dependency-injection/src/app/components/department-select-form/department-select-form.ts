import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee-service';
import { DepartmentService } from '../../services/department-service';

@Component({
  selector: 'app-department-select-form',
  imports: [FormsModule],
  templateUrl: './department-select-form.html',
  styleUrl: './department-select-form.scss',
})
export class DepartmentSelectForm {
  dptService = inject(DepartmentService);

    
  allDepartments() {
    return this.dptService.getDepartments();
  }
  selectedDepartment: string = '';


  onSubmit() {
    if (!this.selectedDepartment.trim()) {
      console.log('Please enter a department name');
      return;
    }
    console.log("Adding Department" + this.selectedDepartment);
    this.dptService.addDepartment(this.selectedDepartment);
    this.selectedDepartment = '';
  }

}
