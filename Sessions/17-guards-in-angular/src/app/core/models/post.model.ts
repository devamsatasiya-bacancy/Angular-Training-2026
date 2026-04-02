export interface Post {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  authorName: string;
}
