export type LoginRequest = {
  username: string;
  password: number;
};

export type LoginResponse = {
  accessToken: string;
  username: string;
  roles: Array<string>;
};
