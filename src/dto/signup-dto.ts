export interface CreateUserInput {
  name: string;
  username: string;
  email: string;
  password: string;
  profile_picture_url?: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}
