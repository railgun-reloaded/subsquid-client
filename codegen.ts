import type { CodegenConfig } from '@graphql-codegen/cli';
import * as path from 'path';
import { glob } from 'glob';

// Find all schema files
const schemaFiles = glob.sync('./src/graphql/schemas/**/*.graphql');

// Create network-specific config for each schema file
const networkConfigs: Record<string, any> = {};

schemaFiles.forEach((schemaFile) => {
  // Extract network name from file path
  const networkName = path.basename(schemaFile, '.graphql');

  // Generate types for this network
  networkConfigs[`src/generated/${networkName}/types.ts`] = {
    schema: schemaFile,
    plugins: ['typescript'],
    config: {
      scalars: {
        BigInt: 'string',
        Bytes: 'string',
      },
    },
  };

  // Generate operations for this network
  networkConfigs[`src/generated/${networkName}/operations.ts`] = {
    schema: schemaFile,
    plugins: ['typescript-operations', 'typescript-graphql-request'],
    config: {
      scalars: {
        BigInt: 'string',
        Bytes: 'string',
      },
    },
  };
});

// Add a combined types file with all schemas
networkConfigs['src/generated/all-types.ts'] = {
  schema: schemaFiles,
  plugins: ['typescript'],
  config: {
    scalars: {
      BigInt: 'string',
      Bytes: 'string',
    },
  },
};

const config: CodegenConfig = {
  generates: networkConfigs,
};

export default config;
