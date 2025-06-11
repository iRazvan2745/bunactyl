import type { SingleResponse, PaginatedResponse } from './common';

export interface Node {
  id: number;
  uuid: string;
  public: boolean;
  name: string;
  description: string | null;
  location_id: number;
  fqdn: string;
  scheme: string;
  behind_proxy: boolean;
  maintenance_mode: boolean;
  memory: number;
  memory_overallocate: number;
  disk: number;
  disk_overallocate: number;
  upload_size: number;
  daemon_listen: number;
  daemon_sftp: number;
  daemon_base: string;
  created_at: string;
  updated_at: string;
  allocated_resources?: {
    memory: number;
    disk: number;
  };
}

export interface NodeConfiguration {
  debug: boolean;
  uuid: string;
  token_id: string;
  token: string;
  api: {
    host: string;
    port: number;
    ssl: {
      enabled: boolean;
      cert: string;
      key: string;
    };
    upload_limit: number;
  };
  system: {
    data: string;
    sftp: {
      bind_port: number;
    };
  };
  remote: string;
}

export interface NodeResponse extends SingleResponse<Node> {}
export interface NodesResponse extends PaginatedResponse<NodeResponse> {}

export interface CreateNodeRequest {
  name: string;
  location_id: number;
  fqdn: string;
  scheme: string;
  memory: number;
  memory_overallocate?: number;
  disk: number;
  disk_overallocate?: number;
  upload_size: number;
  daemon_sftp: number;
  daemon_listen: number;
  description?: string;
  behind_proxy?: boolean;
  maintenance_mode?: boolean;
}

export interface UpdateNodeRequest extends CreateNodeRequest {}

export type NodeInclude = 'allocations' | 'location' | 'servers' | null;
