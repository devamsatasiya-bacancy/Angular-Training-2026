import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmployeeModel } from '../../models/EmployeeModel';
import { DepartmentModel } from '../../models/department.model';
import { EmployeeService } from '../../services/employee-service';

@Component({
  selector: 'app-department-employee-card',
  imports: [FormsModule],
  providers: [EmployeeService],
  templateUrl: './department-employee-card.html',
  styleUrl: './department-employee-card.scss',
})
export class DepartmentEmployeeCard implements OnInit, OnDestroy {
  readonly department = input.required<DepartmentModel>();

  private readonly employeeService = inject(EmployeeService);
  private employeesSubscription?: Subscription;

  protected employeeName = '';
  protected employees: EmployeeModel[] = [];

  ngOnInit() {
    this.employeeService.setDepartmentId(this.department().id);
    this.employeesSubscription = this.employeeService.employees$.subscribe(
      (employees) => {
        this.employees = employees;
      },
    );
  }

  protected onSubmit() {
    const employeeName = this.employeeName.trim();

    if (!employeeName) {
      return;
    }

    this.employeeService.addEmployee(employeeName);
    this.employeeName = '';
  }

  ngOnDestroy() {
    this.employeesSubscription?.unsubscribe();
  }
}
