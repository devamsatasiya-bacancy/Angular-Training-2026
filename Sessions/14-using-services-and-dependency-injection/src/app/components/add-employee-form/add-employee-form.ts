import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DepartmentModel } from '../../models/department.model';
import { DepartmentService } from '../../services/department-service';
import { DepartmentEmployeeCard } from '../department-employee-card/department-employee-card';

@Component({
  selector: 'app-add-employee-form',
  imports: [DepartmentEmployeeCard],
  templateUrl: './add-employee-form.html',
  styleUrl: './add-employee-form.scss',
})
export class AddEmployeeForm implements OnInit, OnDestroy {
  private readonly dptService = inject(DepartmentService);
  private departmentsSubscription?: Subscription;

  protected allDepartmentsList: DepartmentModel[] = [];

  ngOnInit() {
    this.departmentsSubscription = this.dptService.departments$.subscribe(
      (departments) => {
        this.allDepartmentsList = departments;
      },
    );
  }

  ngOnDestroy() {
    this.departmentsSubscription?.unsubscribe();
  }
}
