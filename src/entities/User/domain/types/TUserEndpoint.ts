export type TUserEndpoint = {
  id: number;
  name: string;
  last_name: string;
  username: string;
  email: string;
  online: boolean;
  last_seen: Date | null;
  email_verified_at: Date | null;
  password: string;
  remember_token: string | null;
  createdAt: Date;
  updatedAt: Date;
};
