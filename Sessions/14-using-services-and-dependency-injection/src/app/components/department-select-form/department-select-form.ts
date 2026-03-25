import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DepartmentModel } from '../../models/department.model';
import { DepartmentService } from '../../services/department-service';

@Component({
  selector: 'app-department-select-form',
  imports: [FormsModule],
  templateUrl: './department-select-form.html',
  styleUrl: './department-select-form.scss',
})
export class DepartmentSelectForm implements OnInit, OnDestroy {
  private readonly dptService = inject(DepartmentService);
  private departmentsSubscription?: Subscription;

  protected allDepartments: DepartmentModel[] = [];
  protected selectedDepartment = '';

  ngOnInit() {
    this.departmentsSubscription = this.dptService.departments$.subscribe(
      (departments) => {
        this.allDepartments = departments;
      },
    );
  }

  onSubmit() {
    const departmentName = this.selectedDepartment.trim();

    if (!departmentName) {
      return;
    }

    this.dptService.addDepartment(departmentName);
    this.selectedDepartment = '';
  }

  ngOnDestroy() {
    this.departmentsSubscription?.unsubscribe();
  }
}
