import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule, FormsModule   ],
  templateUrl: './project-form.html',
  styleUrl: './project-form.sass',
})
export class ProjectForm {

  @Input() projectIndex!: number;
  @Input() projectGroup!: AbstractControl | null;
  @Output() clearProjectFormEvent = new EventEmitter<number>();
  @Output() removeProjectFormEvent = new EventEmitter<number>();


  clearProjectForm(index: number) {
    //console.log(this.projectGroup)
    this.clearProjectFormEvent.emit(index);
  }
  removeProjectForm(index: number) {
    this.removeProjectFormEvent.emit(index);
  }
}
