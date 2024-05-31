export interface Post {
  id: string;
  content: string | null;
  createdAt: Date;
  authorName: string | null;
  authorUsername: string | null;
  authorImage: string | null;
}
