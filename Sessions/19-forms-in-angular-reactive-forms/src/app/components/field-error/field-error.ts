// field-error.component.ts
import { Component, input, computed, effect, signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export const FORM_ERRORS: Record<string, string> = {
  required: 'This field is required.',
  email: 'Please enter a valid email address.',
  minlength: 'Too short.',
  maxlength: 'Too long.',
  pattern: 'Invalid format.',
  whitespace: 'Cannot be empty or contain only whitespace.',
  url: 'Please enter a valid URL.',
};
@Component({
  selector: 'app-field-error',
  template: `
    @if (errorMessage()) {
      <div class="error">{{ errorMessage() }}</div>
    }
  `,
})
export class FieldErrorComponent {
  control = input.required<AbstractControl | null>();
  errorMessage = signal<string | null>(null);
  constructor() {
    effect((onCleanup) => {
      const ctrl = this.control();
      if (!ctrl) return;

      // 👇 handle initial state right away
      this.errorMessage.set(this.checkErrorMessage(ctrl));

      const sub = ctrl.statusChanges.subscribe(() => {
        this.errorMessage.set(this.checkErrorMessage(ctrl));
      });

      onCleanup(() => sub.unsubscribe());
    });
  }

  checkErrorMessage = (ctrl: AbstractControl) => {
    if (!ctrl || !ctrl.errors || !ctrl.touched) return null;

    // Return first matching error message
    const firstKey = Object.keys(ctrl.errors)[0];
    return FORM_ERRORS[firstKey] ?? `Validation error: ${firstKey}`;
  };
}
