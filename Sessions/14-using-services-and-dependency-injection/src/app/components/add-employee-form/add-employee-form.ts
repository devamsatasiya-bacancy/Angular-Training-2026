import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../services/department-service';
import { DepartmentEmployeesModel } from '../../models/EmployeeModel';
import { EmployeeService } from '../../services/employee-service';

@Component({
  selector: 'app-add-employee-form',
  imports: [FormsModule],
  templateUrl: './add-employee-form.html',
  styleUrl: './add-employee-form.scss',
})
export class AddEmployeeForm {
    dptService = inject(DepartmentService);
    empService = inject(EmployeeService);
    employeeName: string = '';
    allDepartmentsList = signal<DepartmentEmployeesModel[]>(this.dptService.getDepartments());
    
  onSubmit(deptId: number ) {

    this.empService.addEmployeeToDepartment(deptId, this.employeeName);
    // console.log(deptId)
    // console.log(this.employeeName);
  }

}
