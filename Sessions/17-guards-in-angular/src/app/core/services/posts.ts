import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { CreatePostPayload, Post } from '../models/post.model';

interface FirebasePost {
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}

interface FirebaseResponse {
  [key: string]: FirebasePost;
}

@Injectable({
  providedIn: 'root',
})
export class Posts {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://social-media-app-test-ng/api/posts.json';
  private readonly postsState = signal<Post[]>([]);

  readonly posts = this.postsState.asReadonly();

  getPosts(): Observable<Post[]> {
    return this.http.get<FirebaseResponse>(this.apiUrl).pipe(
      map((response) => this.transformFirebaseResponse(response)),
      tap((posts) => this.postsState.set(posts)),
    );
  }

  getPostById(id: string): Observable<Post | null> {
    const url = `https://social-media-app-test-ng/api/posts/${id}.json`;
    return this.http.get<FirebasePost | null>(url).pipe(
      map((response) => {
        if (!response) {
          return null;
        }
        return {
          id,
          ...response,
        };
      }),
    );
  }

  createPost(payload: CreatePostPayload): Observable<Post> {
    const normalizedTitle = payload.title.trim();
    const normalizedContent = payload.content.trim();

    if (!normalizedTitle || !normalizedContent) {
      throw new Error('Title and content are required.');
    }

    const newPostData: FirebasePost = {
      title: normalizedTitle,
      content: normalizedContent,
      authorName: payload.authorName,
      createdAt: new Date().toISOString(),
    };

    return this.http.post<{ name: string }>(this.apiUrl, newPostData).pipe(
      map((response) => ({
        id: response.name,
        ...newPostData,
      })),
      tap((newPost) => {
        this.postsState.update((posts) => [newPost, ...posts]);
      }),
    );
  }

  updatePost(id: string, payload: Partial<CreatePostPayload>): Observable<Post> {
    const url = `https://social-media-app-test-ng/api/posts/${id}.json`;
    const updateData: Partial<FirebasePost> = {};

    if (payload.title !== undefined) {
      updateData.title = payload.title.trim();
    }
    if (payload.content !== undefined) {
      updateData.content = payload.content.trim();
    }
    if (payload.authorName !== undefined) {
      updateData.authorName = payload.authorName;
    }

    return this.http.patch<FirebasePost>(url, updateData).pipe(
      map((response) => ({
        id,
        ...response,
      })),
      tap((updatedPost) => {
        this.postsState.update((posts) =>
          posts.map((post) => (post.id === id ? updatedPost : post)),
        );
      }),
    );
  }

  deletePost(id: string): Observable<void> {
    const url = `https://social-media-app-test-ng/api/posts/${id}.json`;
    return this.http.delete<null>(url).pipe(
      tap(() => {
        this.postsState.update((posts) => posts.filter((post) => post.id !== id));
      }),
      map(() => undefined),
    );
  }

  private transformFirebaseResponse(response: FirebaseResponse | null): Post[] {
    if (!response) {
      return [];
    }

    return Object.entries(response)
      .map(([id, post]) => ({
        id,
        ...post,
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}
