import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Post } from '../models/post.model';
import { Posts } from '../services/posts';

export const postsResolver: ResolveFn<Post[]> = () => {
  return inject(Posts).getPosts();
};
