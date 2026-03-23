import { Injectable } from '@angular/core';
import { DepartmentEmployeesModel } from '../models/EmployeeModel';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  private departmentList:  DepartmentEmployeesModel[] = [];

  addDepartment(department: string) {
    if (this.departmentList.some((dep) => dep.name.toLowerCase() === department.toLowerCase())) {
      console.log('Department already exists');
      return;
    }
    const newDepartment: DepartmentEmployeesModel = {
      id: Date.now(),
      name: department,
      employees: [],
    };

    this.departmentList.push(newDepartment);
    console.log('Department added successfully');
  }

  addEmployeeToDepartment(departmentId: number, employeeName: string) {
    const department = this.departmentList.find((dep) => dep.id === departmentId);
    if (!department) {
      console.log('Department not found');
      return;
    }
    const newEmployee = {
      id: Date.now(),
      name: employeeName,
      position: 'Employee',
    };
    department.employees.push(newEmployee);
    console.log('Employee added successfully to the department');
  }


  getDepartments() {
    return this.departmentList;
  }
}
