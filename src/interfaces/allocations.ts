import type { SingleResponse, PaginatedResponse } from './common';

export interface Allocation {
  id: number;
  ip: string;
  alias: string | null;
  port: number;
  notes: string | null;
  assigned: boolean;
}

export interface AllocationResponse extends SingleResponse<Allocation> {}
export interface AllocationsResponse extends PaginatedResponse<AllocationResponse> {}

export interface CreateAllocationRequest {
  ip: string;
  ports: string[];
}

export type AllocationInclude = 'node' | 'server' | null;
