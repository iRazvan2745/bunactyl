import type { SingleResponse, PaginatedResponse } from './common';

export interface Location {
  id: number;
  short: string;
  long: string;
  created_at: string;
  updated_at: string;
}

export interface LocationResponse extends SingleResponse<Location> {}
export interface LocationsResponse extends PaginatedResponse<LocationResponse> {}

export interface CreateLocationRequest {
  short: string;
  long?: string;
}

export interface UpdateLocationRequest {
  short?: string;
  long?: string;
}

export type LocationInclude = 'nodes' | 'servers' | null;
