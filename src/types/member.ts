export type MemberType = {
  id: number | null;
  role: string;
  name: string;
  email: string;
  password?: string;
  whatsapp: string;
  active_status: boolean;
  activate_email_status: boolean;
  created_at?: string;
  updated_at?: string;
};
