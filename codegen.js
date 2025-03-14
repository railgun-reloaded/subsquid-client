// Single schema file for all networks
const schemaFile = './src/graphql/schema.graphql';
const config = {
    generates: {
        // Generate base types
        'src/generated/types.ts': {
            schema: schemaFile,
            plugins: ['typescript'],
            config: {
                scalars: {
                    BigInt: 'string',
                    Bytes: 'string',
                },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZWdlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvZGVnZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsc0NBQXNDO0FBQ3RDLE1BQU0sVUFBVSxHQUFHLDhCQUE4QixDQUFDO0FBRWxELE1BQU0sTUFBTSxHQUFrQjtJQUM1QixTQUFTLEVBQUU7UUFDVCxzQkFBc0I7UUFDdEIsd0JBQXdCLEVBQUU7WUFDeEIsTUFBTSxFQUFFLFVBQVU7WUFDbEIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLE1BQU0sRUFBRTtnQkFDTixPQUFPLEVBQUU7b0JBQ1AsTUFBTSxFQUFFLFFBQVE7b0JBQ2hCLEtBQUssRUFBRSxRQUFRO2lCQUNoQjthQUNGO1NBQ0Y7UUFDRCx1REFBdUQ7UUFDdkQsNkJBQTZCLEVBQUU7WUFDN0IsTUFBTSxFQUFFLFVBQVU7WUFDbEIsT0FBTyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsNEJBQTRCLENBQUM7WUFDaEUsTUFBTSxFQUFFO2dCQUNOLE9BQU8sRUFBRTtvQkFDUCxNQUFNLEVBQUUsUUFBUTtvQkFDaEIsS0FBSyxFQUFFLFFBQVE7aUJBQ2hCO2FBQ0Y7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVGLGVBQWUsTUFBTSxDQUFDIn0=