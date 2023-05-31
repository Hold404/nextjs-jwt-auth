export type User = {
  auth: boolean;
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
  user: User | null;
};
