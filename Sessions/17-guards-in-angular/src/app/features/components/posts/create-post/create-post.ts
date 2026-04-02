import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PendingChangesComponent } from '../../../../core/guards/pending-changes-guard';
import { Auth } from '../../../../core/services/auth';
import { Posts } from '../../../../core/services/posts';
import { Toast } from '../../../../shared/services/toast';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-post.html',
  styleUrl: './create-post.scss',
})
export class CreatePost implements PendingChangesComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly postsService = inject(Posts);
  private readonly authService = inject(Auth);
  private readonly toastService = inject(Toast);
  private readonly router = inject(Router);

  private hasSaved = false;

  readonly createPostForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
  });

  readonly currentUser = this.authService.currentUser;

  submit(): void {
    if (this.createPostForm.invalid) {
      this.createPostForm.markAllAsTouched();
      this.toastService.show('Title and content are required.', 'error');
      return;
    }

    const currentUser = this.currentUser();

    if (!currentUser) {
      this.toastService.show('You must be logged in to create a post.', 'error');
      void this.router.navigate(['/login']);
      return;
    }

    try {
      this.postsService.createPost({
        ...this.createPostForm.getRawValue(),
        authorName: currentUser.name,
      });

      this.hasSaved = true;
      this.createPostForm.markAsPristine();
      this.toastService.show('Post created successfully.', 'success');
      void this.router.navigate(['/posts']);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to create post.';
      this.toastService.show(message, 'error');
    }
  }

  canDeactivate(): boolean {
    if (!this.hasUnsavedChanges()) {
      return true;
    }

    return confirm('You have unsaved changes. Do you really want to leave this page?');
  }

  hasUnsavedChanges(): boolean {
    return this.createPostForm.dirty && !this.hasSaved;
  }
}
