export type ActivityType = {
  id: number | null;
  program_id: number;
  name: string;
  content: string;
  year: number;
  location: string;
  pic: string;
  created_at?: string;
  updated_at?: string;
};
