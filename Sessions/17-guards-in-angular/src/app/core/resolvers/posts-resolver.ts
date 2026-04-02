import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { Posts } from '../services/posts';

export const postsResolver: ResolveFn<Observable<Post[]>> = () => {
  return inject(Posts).getPosts();
};
