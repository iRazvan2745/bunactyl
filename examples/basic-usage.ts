import { Bunactyl } from '../src';

// Initialize the SDK
const ptero = new Bunactyl({
  url: process.env.API_URL,
  apiKey: process.env.API_KEY,
  userAgent: process.env.USER_AGENT
});

// Example async function to demonstrate the SDK usage
async function demoSDK() {
  try {
    console.log('==== Pterodactyl TypeScript SDK Demo ====');

    // List all users
    console.log('\n--- Listing Users ---');
    const users = await ptero.users.list();
    console.log(`Found ${users.meta.pagination.total} users`);
    
    // List all nodes
    console.log('\n--- Listing Nodes ---');
    const nodes = await ptero.nodes.list();
    console.log(`Found ${nodes.meta.pagination.total} nodes`);
    
    // List all locations
    console.log('\n--- Listing Locations ---');
    const locations = await ptero.locations.list();
    console.log(`Found ${locations.meta.pagination.total} locations`);
    
    // List all servers
    console.log('\n--- Listing Servers ---');
    const servers = await ptero.servers.list();
    console.log(`Found ${servers.meta.pagination.total} servers`);
    
    // Get details for the first node (if exists)
    if (nodes.data.length > 0) {
      const nodeId = nodes.data[0].attributes.id;
      console.log(`\n--- Getting Node ${nodeId} Details ---`);
      const node = await ptero.nodes.getById(nodeId);
      console.log(`Node Name: ${node.attributes.name}`);
      
      // List allocations for this node
      console.log(`\n--- Listing Allocations for Node ${nodeId} ---`);
      const allocations = await ptero.allocations(nodeId).list(nodeId);
      console.log(`Found ${allocations.meta.pagination.total} allocations`);
    }
    
  } catch (error) {
    console.error('Error running the demo:', error);
  }
}

// Run the demo
demoSDK();
