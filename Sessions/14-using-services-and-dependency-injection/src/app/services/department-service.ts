import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DepartmentModel } from '../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private readonly departmentsSubject = new BehaviorSubject<DepartmentModel[]>([]);

  readonly departments$ = this.departmentsSubject.asObservable();

  addDepartment(department: string) {
    const departmentName = department.trim();

    if (!departmentName) {
      return;
    }

    const departmentList = this.departmentsSubject.value;

    if (
      departmentList.some(
        (dep) => dep.name.toLowerCase() === departmentName.toLowerCase(),
      )
    ) {
      return;
    }

    const newDepartment: DepartmentModel = {
      id: Date.now(),
      name: departmentName,
    };

    this.departmentsSubject.next([...departmentList, newDepartment]);
  }

  getDepartments() {
    return this.departmentsSubject.value;
  }
}
