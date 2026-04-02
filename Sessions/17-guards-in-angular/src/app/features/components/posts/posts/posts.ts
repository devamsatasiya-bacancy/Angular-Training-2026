import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '../../../../core/models/post.model';
import { Auth } from '../../../../core/services/auth';
import { Posts as PostsService } from '../../../../core/services/posts';
import { Toast } from '../../../../shared/services/toast';

@Component({
  selector: 'app-posts',
  imports: [RouterLink, DatePipe, ReactiveFormsModule],
  templateUrl: './posts.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Posts {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(Auth);
  private readonly postsService = inject(PostsService);
  private readonly toastService = inject(Toast);
  private readonly formBuilder = inject(FormBuilder);

  readonly posts = computed(() => (this.route.snapshot.data['posts'] as Post[] | undefined) ?? []);
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser = this.authService.currentUser;
  readonly editingPostId = signal<string | null>(null);

  readonly editForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
  });

  startEdit(post: Post): void {
    this.editingPostId.set(post.id);
    this.editForm.patchValue({
      title: post.title,
      content: post.content,
    });
  }

  cancelEdit(): void {
    this.editingPostId.set(null);
    this.editForm.reset();
  }

  saveEdit(postId: string): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      this.toastService.show('Title and content are required.', 'error');
      return;
    }

    const formValue = this.editForm.getRawValue();

    this.postsService.updatePost(postId, formValue).subscribe({
      next: () => {
        this.toastService.show('Post updated successfully.', 'success');
        this.editingPostId.set(null);
        this.editForm.reset();
        // Refresh posts
        this.postsService.getPosts().subscribe();
      },
      error: (error) => {
        const message = error instanceof Error ? error.message : 'Failed to update post.';
        this.toastService.show(message, 'error');
      },
    });
  }

  deletePost(postId: string): void {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    this.postsService.deletePost(postId).subscribe({
      next: () => {
        this.toastService.show('Post deleted successfully.', 'success');
        // Refresh posts
        this.postsService.getPosts().subscribe();
      },
      error: (error) => {
        const message = error instanceof Error ? error.message : 'Failed to delete post.';
        this.toastService.show(message, 'error');
      },
    });
  }

  isEditing(postId: string): boolean {
    return this.editingPostId() === postId;
  }
}
