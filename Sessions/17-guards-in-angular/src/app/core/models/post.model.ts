export interface Post {
  id: number;
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
