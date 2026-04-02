import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post as PostModel } from '../../../../core/models/post.model';
import { Auth } from '../../../../core/services/auth';
import { Posts as PostsService } from '../../../../core/services/posts';
import { Toast } from '../../../../shared/services/toast';
import { Post } from '../social-post/post';

@Component({
  selector: 'app-social-posts',
  imports: [RouterLink, ReactiveFormsModule, Post],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Posts {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(Auth);
  private readonly postsService = inject(PostsService);
  private readonly toastService = inject(Toast);
  private readonly formBuilder = inject(FormBuilder);

  readonly posts = signal<PostModel[]>(this.route.snapshot.data['posts']);
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser = this.authService.currentUser;
  readonly editingPostId = signal<string | null>(null);

  readonly editForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
  });

  startEdit(post: PostModel): void {
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
        this.posts.update((posts) =>
          posts.map((post) => (post.id === postId ? { ...post, ...formValue } : post)),
        );
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

        this.posts.update((posts) => posts.filter((post) => post.id !== postId));
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

  handleLike(postId: string): void {
    const post = this.posts().find((p) => p.id === postId);
    if (!post) return;

    const newLikes = post.likes + 1;

    this.postsService.updateLike(postId, newLikes).subscribe({
      next: () => {
        this.posts.update((posts) =>
          posts.map((p) => (p.id === postId ? { ...p, likes: newLikes } : p)),
        );
      },
      error: (error) => {
        const message = error instanceof Error ? error.message : 'Failed to update likes.';
        this.toastService.show(message, 'error');
      },
    });
  }

  handleDislike(postId: string): void {
    const post = this.posts().find((p) => p.id === postId);
    if (!post) return;

    const newLikes = Math.max(0, post.likes - 1);

    this.postsService.updateLike(postId, newLikes).subscribe({
      next: () => {
        this.posts.update((posts) =>
          posts.map((p) => (p.id === postId ? { ...p, likes: newLikes } : p)),
        );
      },
      error: (error) => {
        const message = error instanceof Error ? error.message : 'Failed to update likes.';
        this.toastService.show(message, 'error');
      },
    });
  }
}
