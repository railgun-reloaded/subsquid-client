import type { CodegenConfig } from '@graphql-codegen/cli';
import path from 'path';

const schemaFile = path.join(__dirname, 'src/graphql/schema.graphql');

const config: CodegenConfig = {
  generates: {
    // Generate base types
    [path.join(__dirname, 'src/generated/types.ts')]: {
      schema: schemaFile,
      plugins: ['typescript', path.join(__dirname, 'src/generate-types.ts')],
      config: {
        scalars: {
          BigInt: 'string',
          Bytes: 'string',
        },
        constEnums: true,
      },
    },
  }
};

export default config;
