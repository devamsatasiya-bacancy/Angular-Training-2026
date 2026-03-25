import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EmployeeModel } from '../models/EmployeeModel';

@Injectable()
export class EmployeeService implements OnDestroy {
  private static readonly allEmployeesSubject = new BehaviorSubject<EmployeeModel[]>(
    [],
  );

  private readonly allEmployeesSubscription: Subscription;
  private departmentId: number | null = null;

  readonly employees$ = new BehaviorSubject<EmployeeModel[]>([]);

  constructor() {
    this.allEmployeesSubscription = EmployeeService.allEmployeesSubject.subscribe(
      () => {
        this.updateDepartmentEmployees();
      },
    );
  }

  setDepartmentId(departmentId: number) {
    this.departmentId = departmentId;
    this.updateDepartmentEmployees();
  }

  addEmployee(employeeName: string) {
    const name = employeeName.trim();

    if (!this.departmentId || !name) {
      return;
    }

    EmployeeService.allEmployeesSubject.next([
      ...EmployeeService.allEmployeesSubject.value,
      {
        id: Date.now(),
        departmentId: this.departmentId,
        name,
      },
    ]);
  }

  ngOnDestroy() {
    this.allEmployeesSubscription.unsubscribe();
  }

  private updateDepartmentEmployees() {
    if (!this.departmentId) {
      this.employees$.next([]);
      return;
    }

    this.employees$.next(
      EmployeeService.allEmployeesSubject.value.filter(
        (employee) => employee.departmentId === this.departmentId,
      ),
    );
  }
}
