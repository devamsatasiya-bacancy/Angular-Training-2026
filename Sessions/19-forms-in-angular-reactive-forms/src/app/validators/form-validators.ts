import { AbstractControl, ValidationErrors , AsyncValidatorFn, ValidatorFn, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Project } from '../models/FormsModel';


export function dateValidator(control:AbstractControl): ValidationErrors | null {
  const startDate = control.get('startDate')?.value;
  const endDate = control.get('endDate')?.value;

  const isInvalid = startDate && endDate && new Date(startDate) > new Date(endDate);
  
  return isInvalid ? { 'invalidDateRange': true } : null;
}

export function uniqueProjectNameValidator(
  getProjects: () => any[], 
  getIndex: () => number
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null);

    const normalize = (val: string) => val.trim().toLowerCase();
    const inputValue = normalize(control.value);

    return of(null).pipe(
      delay(300),
      map(() => {
        const projects = getProjects();
        const currentIndex = getIndex();
        
        //console.log('🔍 Validating:', inputValue, '| My index:', currentIndex, '| Total projects:', projects.length);

        const exists = projects.some((proj, index) => {
          if (index === currentIndex) {
            //console.log('  ⏭️  Skipping index', index, '(self)');
            return false;
          }
          
          const projName = proj.name ? normalize(proj.name) : '';
          const matches = projName === inputValue;
          
          if (matches) {
            //console.log('  ❌ Duplicate found at index', index, ':', proj.name);
          }
          
          return matches;
        });

        //console.log('  ➡️  Result:', exists ? 'DUPLICATE' : 'UNIQUE');
        return exists ? { projectNameExists: true } : null;
      })
    );
  };
}

// a general phone number validator for 10 digit numbers, can be enhanced to include country codes, different formats, etc. 
export function indiaPhoneValidator() : ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) return null;

        const regex = /^\+91[6-9]\d{9}$/;
        return regex.test(value) ? null : { invalidPhone: true };
    };
}

// validator to check for empty or whitespace-only values in form controls
export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (typeof value === 'string' && value.trim().length === 0) {
        return { whitespace: true };
    } else {
        return null;
    }
}