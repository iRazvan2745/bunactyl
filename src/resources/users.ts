import { BunactylClient } from '../client';
import type { 
  UserResponse, 
  UsersResponse, 
  CreateUserRequest,
  UpdateUserRequest,
  UserFilter,
  UserSort,
  UserInclude
} from '../interfaces/users';

export class UsersResource {
  constructor(private client: BunactylClient) {}

  /**
   * List all users
   * 
   * @param include Optional resources to include
   * @param filter Optional filters to apply
   * @param sort Optional sort parameter
   */
  async list(
    include?: UserInclude, 
    filter?: UserFilter, 
    sort?: UserSort
  ): Promise<UsersResponse> {
    const params: Record<string, string> = {};
    
    // Add include if specified
    if (include) {
      params['include'] = include;
    }
    
    // Add filters if specified
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value) {
          params[`filter[${key}]`] = value;
        }
      });
    }
    
    // Add sort if specified
    if (sort && sort.sort) {
      params['sort'] = sort.sort;
    }
    
    return await this.client.get<UsersResponse>('/users', { params });
  }

  /**
   * Get details for a specific user by ID
   * 
   * @param id User ID
   * @param include Optional resources to include
   */
  async getById(id: number | string, include?: UserInclude): Promise<UserResponse> {
    const params: Record<string, string> = {};
    if (include) {
      params['include'] = include;
    }
    
    return await this.client.get<UserResponse>(`/users/${id}`, { params });
  }

  /**
   * Get details for a specific user by external ID
   * 
   * @param externalId External user ID
   * @param include Optional resources to include
   */
  async getByExternalId(externalId: string, include?: UserInclude): Promise<UserResponse> {
    const params: Record<string, string> = {};
    if (include) {
      params['include'] = include;
    }
    
    return await this.client.get<UserResponse>(`/users/external/${externalId}`, { params });
  }

  /**
   * Create a new user
   * 
   * @param userData User data
   */
  async create(userData: CreateUserRequest): Promise<UserResponse> {
    return await this.client.post<UserResponse>('/users', userData);
  }

  /**
   * Update an existing user
   * 
   * @param id User ID
   * @param userData User data to update
   */
  async update(id: number | string, userData: UpdateUserRequest): Promise<UserResponse> {
    return await this.client.patch<UserResponse>(`/users/${id}`, userData);
  }

  /**
   * Delete a user
   * 
   * @param id User ID
   */
  async delete(id: number | string): Promise<void> {
    await this.client.delete<void>(`/users/${id}`);
  }
}
