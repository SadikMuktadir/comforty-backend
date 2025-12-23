export interface IUser {
  image?: string;
  name?: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}
