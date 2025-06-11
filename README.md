# Pterodactyl TypeScript SDK

A comprehensive TypeScript SDK for the Pterodactyl Panel API. This SDK provides a simple and intuitive interface to interact with the Pterodactyl API, making it easier to manage your Pterodactyl instance programmatically.

## Documentation can be found at https://bunactyl.irazz.lol

## Features

- Complete TypeScript definitions for the Pterodactyl API
- Promise-based API with async/await support
- Full coverage of the Pterodactyl Application API endpoints
- Built with Bun's fetch API
- Comprehensive documentation and examples

## Installation

```bash
# Using npm
npm install bunactyl

# Using Bun
bun add bunactyl
```

## Usage

### Initializing the Client

```typescript
import { Bunactyl } from 'bunactyl';

// Initialize the client
const ptero = new Bunactyl({
  url: 'https://your-pterodactyl-panel.com',
  apiKey: 'your-api-key-here'
});
```

### Examples

#### Working with Users

```typescript
// List all users
const users = await ptero.users.list();
console.log(users);

// Get a specific user
const user = await ptero.users.getById(1);
console.log(user);

// Create a new user
const newUser = await ptero.users.create({
  email: 'user@example.com',
  username: 'newuser',
  first_name: 'New',
  last_name: 'User'
});
console.log(newUser);

// Update a user
const updatedUser = await ptero.users.update(1, {
  first_name: 'Updated',
  last_name: 'Name'
});
console.log(updatedUser);

// Delete a user
await ptero.users.delete(1);
```

#### Working with Nodes

```typescript
// List all nodes
const nodes = await ptero.nodes.list();
console.log(nodes);

// Get a specific node
const node = await ptero.nodes.getById(1);
console.log(node);

// Get node configuration
const config = await ptero.nodes.getConfiguration(1);
console.log(config);

// Create a new node
const newNode = await ptero.nodes.create({
  name: 'New Node',
  location_id: 1,
  fqdn: 'node.example.com',
  scheme: 'https',
  memory: 8192,
  disk: 50000,
  upload_size: 100,
  daemon_sftp: 2022,
  daemon_listen: 8080
});
console.log(newNode);
```

#### Working with Servers

```typescript
// List all servers
const servers = await ptero.servers.list();
console.log(servers);

// Get a specific server
const server = await ptero.servers.getById(1);
console.log(server);

// Create a new server
const newServer = await ptero.servers.create({
  name: 'Test Server',
  user: 1,
  egg: 1,
  docker_image: 'ghcr.io/mcjars/pterodactyl-yolks:java_23',
  startup: 'java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}',
  environment: {
    SERVER_JARFILE: 'server.jar',
    VANILLA_VERSION: 'latest',
  },
  limits: {
    memory: 1024,
    swap: 0,
    disk: 5000,
    io: 500,
    cpu: 0
  },
  feature_limits: {
    databases: 5,
    allocations: 5,
    backups: 2
  },
  allocation: {
    default: 1,
    additional: []
  }
});
console.log(newServer);
```

#### Working with Allocations

```typescript
// List all allocations for a node
const allocations = await ptero.allocations(1).list();
console.log(allocations);

// Create new allocations
await ptero.allocations(1).create({
  ip: '10.0.0.1',
  ports: ['25565', '25566', '25567']
});

// Delete an allocation
await ptero.allocations(1).delete(5);
```

#### Working with Locations

```typescript
// List all locations
const locations = await ptero.locations.list();
console.log(locations);

// Create a new location
const newLocation = await ptero.locations.create({
  short: 'US',
  long: 'United States'
});
console.log(newLocation);
```

## API Reference

This SDK provides acess to the following Pterodactyl API endpoints:

### Users
- `users.list(include?, filter?, sort?)` - List all users
- `users.getById(id, include?)` - Get a specific user
- `users.getByExternalId(externalId, include?)` - Get a user by external ID
- `users.create(userData)` - Create a new user
- `users.update(id, userData)` - Update a user
- `users.delete(id)` - Delete a user

### Nodes
- `nodes.list(include?)` - List all nodes
- `nodes.getById(id, include?)` - Get a specific node
- `nodes.getConfiguration(id)` - Get node configuration
- `nodes.create(nodeData)` - Create a new node
- `nodes.update(id, nodeData)` - Update a node
- `nodes.delete(id)` - Delete a node

### Servers
- `servers.list(include?)` - List all servers
- `servers.getById(id, include?)` - Get a specific server
- `servers.getByExternalId(externalId, include?)` - Get a server by external ID
- `servers.create(serverData)` - Create a new server
- `servers.updateDetails(id, details)` - Update server details
- `servers.updateBuild(id, buildConfig)` - Update server build configuration
- `servers.updateStartup(id, startupConfig)` - Update server startup configuration
- `servers.delete(id)` - Delete a server

### Allocations
- `allocations(nodeId).list(include?)` - List allocations for a node
- `allocations(nodeId).create(allocationData)` - Create allocations for a node
- `allocations(nodeId).delete(allocationId)` - Delete an allocation

### Locations
- `locations.list(include?)` - List all locations
- `locations.getById(id, include?)` - Get a specific location
- `locations.create(locationData)` - Create a new location
- `locations.update(id, locationData)` - Update a location
- `locations.delete(id)` - Delete a location

## License

AGPL-3.0 License


# If something is not working correctly please notify me as soon as possible