import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { CreatePostPayload, Post } from '../models/post.model';

interface FirebasePost {
  title: string;
  content: string;
  likes: number;
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
  private readonly apiUrl = 'https://social-media-app-test-ng-default-rtdb.asia-southeast1.firebasedatabase.app/posts';
  private readonly postsState = signal<Post[]>([]);

  readonly posts = this.postsState.asReadonly();

  getPosts(): Observable<Post[]> {
    return this.http.get<FirebaseResponse>(`${this.apiUrl}.json`).pipe(
      map((response) => this.transformFirebaseResponse(response)),
      tap((posts) => this.postsState.set(posts)),
    );
  }

  updateLike(postId:string, likes: number): Observable<Post> {
    return this.http.patch<FirebasePost>(`${this.apiUrl}/${postId}.json`, { likes:likes }).pipe(
      map((response) => ({
        id: postId,
        ...response,  
      })),
      tap((updatedPost) => {
        this.postsState.update((posts) =>
          posts.map((post) => (post.id === postId ? updatedPost : post)),
        );
      }),
    );
  }
  
  getPostById(id: string): Observable<Post | null> {
    const url = `${this.apiUrl}/${id}.json`;
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
      likes: 0,
      authorName: payload.authorName,
      createdAt: new Date().toISOString(),
    };

    return this.http.post<{ name: string }>(`${this.apiUrl}.json`, newPostData).pipe(
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
    const url = `${this.apiUrl}/${id}.json`;
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
    const url = `${this.apiUrl}/${id}.json`;
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
