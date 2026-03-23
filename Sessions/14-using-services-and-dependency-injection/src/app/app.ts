import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DepartmentSelectForm } from './components/department-select-form/department-select-form';
import { AddEmployeeForm } from './components/add-employee-form/add-employee-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , DepartmentSelectForm , AddEmployeeForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('14-using-services-and-dependency-injection');
}
