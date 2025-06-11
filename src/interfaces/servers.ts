import type { SingleResponse, PaginatedResponse } from './common';

export interface ServerLimits {
  memory: number;
  swap: number;
  disk: number;
  io: number;
  cpu: number;
  threads: number | null;
}

export interface ServerFeatureLimits {
  databases: number;
  allocations: number;
  backups: number;
}

export interface ServerContainer {
  startup_command: string;
  image: string;
  installed: boolean;
  environment: Record<string, string>;
}

export interface Server {
  id: number;
  external_id: string | null;
  uuid: string;
  identifier: string;
  name: string;
  description: string | null;
  suspended: boolean;
  limits: ServerLimits;
  feature_limits: ServerFeatureLimits;
  user: number;
  node: number;
  allocation: number;
  nest: number;
  egg: number;
  pack: number | null;
  container: ServerContainer;
  updated_at: string;
  created_at: string;
}

export interface ServerDatabase {
  id: number;
  server: number;
  host: number;
  database: string;
  username: string;
  remote: string;
  max_connections: number;
  created_at: string;
  updated_at: string;
}

export interface ServerRelationships {
  databases?: {
    object: string;
    data: {
      object: string;
      attributes: ServerDatabase;
    }[];
  };
}

export interface ServerAttributes extends Server {
  relationships?: ServerRelationships;
}

export interface ServerResponse extends SingleResponse<ServerAttributes> {}
export interface ServersResponse extends PaginatedResponse<ServerResponse> {}

export interface CreateServerRequest {
  name: string;
  user: number;
  egg: number;
  docker_image: string;
  startup: string;
  environment: Record<string, string>;
  limits: Partial<ServerLimits>;
  feature_limits: Partial<ServerFeatureLimits>;
  allocation: {
    default: number;
    additional: number[];
  };
  external_id?: string;
  description?: string;
  skip_scripts?: boolean;
  oom_disabled?: boolean;
}

export interface UpdateServerDetails {
  name?: string;
  user?: number;
  external_id?: string | null;
  description?: string | null;
}

export interface UpdateServerBuild {
  allocation?: number;
  limits?: Partial<ServerLimits>;
  feature_limits?: Partial<ServerFeatureLimits>;
  add_allocations?: number[];
  remove_allocations?: number[];
  oom_disabled?: boolean;
}

export interface UpdateServerStartup {
  startup?: string;
  environment?: Record<string, string>;
  egg?: number;
  docker_image?: string;
  skip_scripts?: boolean;
}

export type ServerInclude = 
  | 'allocations' 
  | 'user' 
  | 'subusers' 
  | 'pack' 
  | 'nest' 
  | 'egg' 
  | 'variables' 
  | 'location' 
  | 'node' 
  | 'databases' 
  | null;
