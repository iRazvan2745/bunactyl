import { BunactylClient } from '../client';
import type { 
  ServerResponse,
  ServersResponse,
  CreateServerRequest,
  UpdateServerDetails,
  UpdateServerBuild,
  UpdateServerStartup,
  ServerInclude
} from '../interfaces/servers';

export class ServersResource {
  constructor(private client: BunactylClient) {}

  /**
   * List all servers
   * 
   * @param include Optional resources to include
   */
  async list(include?: ServerInclude): Promise<ServersResponse> {
    const params: Record<string, string> = {};
    
    if (include) {
      params['include'] = include;
    }
    
    return await this.client.get<ServersResponse>('/servers', { params });
  }

  /**
   * Get details for a specific server by ID
   * 
   * @param id Server ID
   * @param include Optional resources to include
   */
  async getById(id: number | string, include?: ServerInclude): Promise<ServerResponse> {
    const params: Record<string, string> = {};
    
    if (include) {
      params['include'] = include;
    }
    
    return await this.client.get<ServerResponse>(`/servers/${id}`, { params });
  }

  /**
   * Get details for a specific server by external ID
   * 
   * @param externalId External server ID
   * @param include Optional resources to include
   */
  async getByExternalId(externalId: string, include?: ServerInclude): Promise<ServerResponse> {
    const params: Record<string, string> = {};
    
    if (include) {
      params['include'] = include;
    }
    
    return await this.client.get<ServerResponse>(`/servers/external/${externalId}`, { params });
  }

  /**
   * Create a new server
   * 
   * @param serverData Server data
   */
  async create(serverData: CreateServerRequest): Promise<ServerResponse> {
    return await this.client.post<ServerResponse>('/servers', serverData);
  }

  /**
   * Update server details
   * 
   * @param id Server ID
   * @param details Server details
   */
  async updateDetails(id: number | string, details: UpdateServerDetails): Promise<ServerResponse> {
    return await this.client.patch<ServerResponse>(`/servers/${id}/details`, details);
  }

  /**
   * Update server build configuration
   * 
   * @param id Server ID
   * @param buildConfig Server build configuration
   */
  async updateBuild(id: number | string, buildConfig: UpdateServerBuild): Promise<ServerResponse> {
    return await this.client.patch<ServerResponse>(`/servers/${id}/build`, buildConfig);
  }

  /**
   * Update server startup configuration
   * 
   * @param id Server ID
   * @param startupConfig Server startup configuration
   */
  async updateStartup(id: number | string, startupConfig: UpdateServerStartup): Promise<ServerResponse> {
    return await this.client.patch<ServerResponse>(`/servers/${id}/startup`, startupConfig);
  }

  /**
   * Delete a server
   * 
   * @param id Server ID
   */
  async delete(id: number | string): Promise<void> {
    await this.client.delete<void>(`/servers/${id}`);
  }
}
