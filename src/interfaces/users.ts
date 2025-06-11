import type { SingleResponse, PaginatedResponse } from './common';

export interface User {
  id: number;
  external_id: string | null;
  uuid: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  language: string;
  root_admin: boolean;
  '2fa': boolean;
  created_at: string;
  updated_at: string;
}

export interface UserResponse extends SingleResponse<User> {}
export interface UsersResponse extends PaginatedResponse<UserResponse> {}

export interface CreateUserRequest {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  external_id?: string;
  password?: string;
  root_admin?: boolean;
  language?: string;
}

export interface UpdateUserRequest {
  email?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  external_id?: string;
  password?: string;
  root_admin?: boolean;
  language?: string;
}

export interface UserFilter {
  email?: string;
  uuid?: string;
  username?: string;
  external_id?: string;
}

export interface UserSort {
  sort?: 'id' | 'uuid';
}

export type UserInclude = 'servers' | null;
