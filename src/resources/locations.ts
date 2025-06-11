import { BunactylClient } from '../client';
import type { 
  LocationsResponse,
  CreateLocationRequest,
  UpdateLocationRequest,
  LocationInclude,
  LocationResponse
} from '../interfaces/locations';

export class LocationsResource {
  constructor(private client: BunactylClient) {}

  /**
   * List all locations
   * 
   * @param include Optional resources to include
   */
  async list(include?: LocationInclude): Promise<LocationsResponse> {
    const params: Record<string, string> = {};
    
    if (include) {
      params['include'] = include;
    }
    
    return await this.client.get<LocationsResponse>('/locations', { params });
  }

  /**
   * Get details for a specific location
   * 
   * @param id Location ID
   * @param include Optional resources to include
   */
  async getById(id: number | string, include?: LocationInclude): Promise<LocationResponse> {
    const params: Record<string, string> = {};
    
    if (include) {
      params['include'] = include;
    }
    
    return await this.client.get<LocationResponse>(`/locations/${id}`, { params });
  }

  /**
   * Create a new location
   * 
   * @param locationData Location data
   */
  async create(locationData: CreateLocationRequest): Promise<LocationResponse> {
    return await this.client.post<LocationResponse>('/locations', locationData);
  }

  /**
   * Update an existing location
   * 
   * @param id Location ID
   * @param locationData Location data
   */
  async update(id: number | string, locationData: UpdateLocationRequest): Promise<LocationResponse> {
    return await this.client.patch<LocationResponse>(`/locations/${id}`, locationData);
  }

  /**
   * Delete a location
   * 
   * @param id Location ID
   */
  async delete(id: number | string): Promise<void> {
    await this.client.delete<void>(`/locations/${id}`);
  }
}
