import type { CodegenConfig } from '@graphql-codegen/cli';

// Single schema file for all networks
const schemaFile = './src/graphql/schema.graphql';

const config: CodegenConfig = {
  generates: {
    // Generate base types
    'src/generated/types.ts': {
      schema: schemaFile,
      plugins: ['typescript', './generate-types.ts'],
      config: {
        scalars: {
          BigInt: 'string',
          Bytes: 'string',
        },
        constEnums: true,
      },
    },
    // Generate operation types and GraphQL request helpers
    'src/generated/operations.ts': {
      schema: schemaFile,
      plugins: ['typescript-operations', 'typescript-graphql-request'],
      config: {
        scalars: {
          BigInt: 'string',
          Bytes: 'string',
        },
      },
    },
  },
};

export default config;
