import { inject, Injectable } from '@angular/core';
import { DepartmentService } from './department-service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  dptService = inject(DepartmentService);
  
  addEmployeeToDepartment(departmentId: number, employeeName: string) {
    console.log("Adding Employee" + employeeName + " to Department ID: " + departmentId);
    this.dptService.addEmployeeToDepartment(departmentId, employeeName);
    // Logic to add employee to the specified department
  }
}
