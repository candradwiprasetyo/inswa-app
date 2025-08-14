export interface ArticleType {
  id: number | null;
  title: string;
  slug: string;
  content: string;
  author_id?: number;
  created_at?: string;
  updated_at?: string;
  images: string;
  type: string;
  video_url?: string;
  author_name?: string;
}
