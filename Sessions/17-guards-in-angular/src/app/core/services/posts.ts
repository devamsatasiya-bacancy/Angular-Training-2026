import { Injectable, signal } from '@angular/core';
import { CreatePostPayload, Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class Posts {
  private readonly postsState = signal<Post[]>([
    {
      id: 1,
      title: 'Welcome Post',
      content: 'This is the first post in the social app.',
      authorName: 'System',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Angular Guards',
      content: 'Resolvers fetch data before a route loads, and guards protect access.',
      authorName: 'Admin',
      createdAt: new Date().toISOString(),
    },
  ]);

  readonly posts = this.postsState.asReadonly();

  getPosts(): Post[] {
    return [...this.postsState()];
  }

  createPost(payload: CreatePostPayload): Post {
    const normalizedTitle = payload.title.trim();
    const normalizedContent = payload.content.trim();

    if (!normalizedTitle || !normalizedContent) {
      throw new Error('Title and content are required.');
    }

    const newPost: Post = {
      id: this.postsState().length + 1,
      title: normalizedTitle,
      content: normalizedContent,
      authorName: payload.authorName,
      createdAt: new Date().toISOString(),
    };

    this.postsState.update((posts) => [newPost, ...posts]);

    return newPost;
  }
}
