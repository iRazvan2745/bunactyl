import { BunactylClient } from './client';
import type { BunactylClientOptions } from './client';
import { UsersResource } from './resources/users';
import { NodesResource } from './resources/nodes';
import { LocationsResource } from './resources/locations';
import { AllocationsResource } from './resources/allocations';
import { ServersResource } from './resources/servers';

// Export all interfaces
export * from './interfaces/common';
export * from './interfaces/users';
export * from './interfaces/nodes';
export * from './interfaces/locations';
export * from './interfaces/allocations';
export * from './interfaces/servers';

// Main Pterodactyl SDK class
export class Bunactyl {
  private client: BunactylClient;

  // Resources
  public users: UsersResource;
  public nodes: NodesResource;
  public locations: LocationsResource;
  public servers: ServersResource;

  /**
   * Create a new Pterodactyl SDK instance
   * 
   * @param options Configuration options
   */
  constructor(options: BunactylClientOptions) {
    this.client = new BunactylClient(options);
    
    // Initialize resources
    this.users = new UsersResource(this.client);
    this.nodes = new NodesResource(this.client);
    this.locations = new LocationsResource(this.client);
    this.servers = new ServersResource(this.client);
  }
  
  /**
   * Get an allocations resource for a specific node
   * 
   * @param nodeId The node ID to get allocations for
   */
  public allocations(_nodeId: number | string): AllocationsResource {
    // nodeId is used by individual methods in AllocationsResource, not in its constructor
    return new AllocationsResource(this.client);
  }
}
