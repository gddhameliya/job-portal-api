export interface JwtToken {
  id: string;
  email: string;
  role?: Array<string>;
  is_verified?: boolean;
}
export interface AuthOptions {
  isTokenRequired?: boolean;
  usersAllowed?: string[];
}
export interface decoded {
  user: {
    _id: string;
    role: string;
  };
}
export interface sendEmailOptions {
  to: string;
  name: string;
}
