import { BunactylClient } from '../client';
import type {
  NodeResponse,
  NodesResponse,
  NodeConfiguration,
  CreateNodeRequest,
  UpdateNodeRequest,
  NodeInclude
} from '../interfaces/nodes';

export class NodesResource {
  constructor(private client: BunactylClient) {}

  /**
   * List all nodes
   * 
   * @param include Optional resources to include
   */
  async list(include?: NodeInclude): Promise<NodesResponse> {
    const params: Record<string, string> = {};
    
    if (include) {
      params['include'] = include;
    }
    
    return await this.client.get<NodesResponse>('/nodes', { params });
  }

  /**
   * Get details for a specific node
   * 
   * @param id Node ID
   * @param include Optional resources to include
   */
  async getById(id: number | string, include?: NodeInclude): Promise<NodeResponse> {
    const params: Record<string, string> = {};
    
    if (include) {
      params['include'] = include;
    }
    
    return await this.client.get<NodeResponse>(`/nodes/${id}`, { params });
  }

  /**
   * Get node configuration
   * 
   * @param id Node ID
   */
  async getConfiguration(id: number | string): Promise<NodeConfiguration> {
    return await this.client.get<NodeConfiguration>(`/nodes/${id}/configuration`);
  }

  /**
   * Create a new node
   * 
   * @param nodeData Node data
   */
  async create(nodeData: CreateNodeRequest): Promise<NodeResponse> {
    return await this.client.post<NodeResponse>('/nodes', nodeData);
  }

  /**
   * Update an existing node
   * 
   * @param id Node ID
   * @param nodeData Node data
   */
  async update(id: number | string, nodeData: UpdateNodeRequest): Promise<NodeResponse> {
    return await this.client.patch<NodeResponse>(`/nodes/${id}`, nodeData);
  }

  /**
   * Delete a node
   * 
   * @param id Node ID
   */
  async delete(id: number | string): Promise<void> {
    await this.client.delete<void>(`/nodes/${id}`);
  }
}
