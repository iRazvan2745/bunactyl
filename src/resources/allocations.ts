import { BunactylClient } from '../client';
import type { 
  AllocationsResponse,
  CreateAllocationRequest,
  AllocationInclude
} from '../interfaces/allocations';

export class AllocationsResource {
  constructor(private client: BunactylClient) {}

  /**
   * List allocations for a node
   * 
   * @param nodeId Node ID
   * @param include Optional resources to include
   */
  async list(nodeId: number | string, include?: AllocationInclude): Promise<AllocationsResponse> {
    const params: Record<string, string> = {};
    
    if (include) {
      params['include'] = include;
    }
    
    return await this.client.get<AllocationsResponse>(`/nodes/${nodeId}/allocations`, { params });
  }

  /**
   * Create allocations for a node
   * 
   * @param nodeId Node ID
   * @param allocationData Allocation data
   */
  async create(nodeId: number | string, allocationData: CreateAllocationRequest): Promise<void> {
    await this.client.post<void>(`/nodes/${nodeId}/allocations`, allocationData);
  }

  /**
   * Delete an allocation
   * 
   * @param nodeId Node ID
   * @param allocationId Allocation ID
   */
  async delete(nodeId: number | string, allocationId: number | string): Promise<void> {
    await this.client.delete<void>(`/nodes/${nodeId}/allocations/${allocationId}`);
  }
}
