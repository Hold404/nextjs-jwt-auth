export type User = {
  login: string;
  email: string;
};

export type ApiUser = {
  id: number;
  login: string;
  email: string;
};

export type UserInitialState = {
  isLoading: boolean;
  auth: boolean;
  user: User;
};
