import { Status } from "./todo.types";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: Status;
}
