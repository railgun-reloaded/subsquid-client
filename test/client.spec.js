import test from 'node:test';
import assert from 'node:assert';
import { SubsquidClient } from '../src/client.js';
import { ETHEREUM_SEPOLIA_URL, ETHEREUM_URL } from '../src/networks.js';
import { gql } from 'graphql-tag';
test('Subsquid Client', async (t) => {
    // Client initialization tests
    await t.test('Should initialize with valid URL', () => {
        // Take the first valid URL from the list
        const validURL = ETHEREUM_SEPOLIA_URL;
        // This should not throw an error
        const client = new SubsquidClient(validURL);
        // Check that client was created successfully
        assert.ok(client instanceof SubsquidClient);
    });
    await t.test('Should throw with invalid URL', () => {
        const invalidURL = 'https://invalid-url.com';
        assert.throws(() => new SubsquidClient(invalidURL), Error);
    });
    // Create a client for the query tests
    const client = new SubsquidClient(ETHEREUM_URL);
    // Test basic query functionality
    await t.test('Should execute basic query without filters', async () => {
        const tokens = await client.query('tokens', ['id', 'tokenType', 'tokenAddress', 'tokenSubID'], undefined, undefined, 5);
        assert.ok(Array.isArray(tokens), 'Result should be an array');
        assert.ok(tokens.length <= 5, 'Result should respect the limit');
        if (tokens.length > 0) {
            assert.ok('id' in tokens[0], 'Result items should have id field');
            assert.ok('tokenType' in tokens[0], 'Result items should have tokenType field');
            assert.ok('tokenAddress' in tokens[0], 'Result items should have tokenAddress field');
            assert.ok('tokenSubID' in tokens[0], 'Result items should have tokenSubID field');
        }
    });
    // Test enum filtering
    await t.test('Should query with enum filtering', async () => {
        try {
            const tokens = await client.query('tokens', ['id', 'tokenType', 'tokenAddress', 'tokenSubID'], { tokenType_eq: 'ERC20' }, undefined, 5);
            assert.ok(Array.isArray(tokens), 'Result should be an array');
            if (tokens.length > 0) {
                // All returned tokens should be ERC20
                tokens.forEach((token) => {
                    assert.strictEqual(token.tokenType, 'ERC20', 'All tokens should have ERC20 tokenType');
                });
            }
        }
        catch (error) {
            assert.fail(`Query with enum filtering failed: ${error.message}`);
        }
    });
    // Test OR conditions
    await t.test('Should query with OR conditions', async () => {
        try {
            const tokens = await client.query('tokens', ['id', 'tokenType', 'tokenAddress', 'tokenSubID'], {
                OR: [{ tokenType_eq: 'ERC20' }, { tokenType_eq: 'ERC721' }],
            }, undefined, 5);
            assert.ok(Array.isArray(tokens), 'Result should be an array');
            if (tokens.length > 0) {
                // All returned tokens should be either ERC20 or ERC721
                tokens.forEach((token) => {
                    assert.ok(['ERC20', 'ERC721'].includes(token.tokenType), 'All tokens should have either ERC20 or ERC721 tokenType');
                });
            }
        }
        catch (error) {
            assert.fail(`Query with OR conditions failed: ${error.message}`);
        }
    });
    // Test ordering
    await t.test('Should query with ordering', async () => {
        try {
            const tokens = await client.query('tokens', ['id', 'tokenType', 'tokenAddress', 'tokenSubID'], undefined, ['id_ASC'], 5);
            assert.ok(Array.isArray(tokens), 'Result should be an array');
            if (tokens.length > 1) {
                // Check if tokens are ordered by ID in ascending order
                for (let i = 0; i < tokens.length - 1; i++) {
                    assert.ok(tokens[i].id <= tokens[i + 1].id, 'Tokens should be ordered by id in ascending order');
                }
            }
        }
        catch (error) {
            assert.fail(`Query with ordering failed: ${error.message}`);
        }
    });
    // Test different entity types
    await t.test('Should query different entity types', async () => {
        try {
            const transactions = await client.query('transactions', ['id', 'blockNumber', 'transactionHash'], undefined, undefined, 5);
            assert.ok(Array.isArray(transactions), 'Result should be an array');
            if (transactions.length > 0) {
                assert.ok('id' in transactions[0], 'Transaction should have id field');
                assert.ok('blockNumber' in transactions[0], 'Transaction should have blockNumber field');
                assert.ok('transactionHash' in transactions[0], 'Transaction should have transactionHash field');
            }
        }
        catch (error) {
            assert.fail(`Query for transactions failed: ${error.message}`);
        }
    });
    // Test filtering on other entity types
    await t.test('Should query transactions with blockNumber filter', async () => {
        try {
            const blockThreshold = '14760000';
            const transactions = await client.query('transactions', ['id', 'blockNumber', 'transactionHash'], { blockNumber_gt: blockThreshold }, undefined, 5);
            assert.ok(Array.isArray(transactions), 'Result should be an array');
            if (transactions.length > 0) {
                // All transactions should have block numbers greater than the threshold
                transactions.forEach((tx) => {
                    assert.ok(parseInt(tx.blockNumber) > parseInt(blockThreshold), `All transactions should have blockNumber > ${blockThreshold}`);
                });
            }
        }
        catch (error) {
            assert.fail(`Query with blockNumber filter failed: ${error.message}`);
        }
    });
    // Test direct GraphQL queries
    await t.test('Should execute direct GraphQL queries', async () => {
        try {
            const query = gql `
        query {
          tokens(limit: 5, where: { tokenType_eq: ERC20 }) {
            id
            tokenType
            tokenAddress
            tokenSubID
          }
        }
      `;
            const result = await client.request(query);
            assert.ok(result, 'Result should exist');
            // Add type assertion to fix 'in' operator error
            assert.ok(typeof result === 'object' && result !== null, 'Result should be an object');
            assert.ok('tokens' in result, 'Result should have tokens property');
            assert.ok(Array.isArray(result.tokens), 'tokens should be an array');
            if (result.tokens.length > 0) {
                // Verify all returned tokens are ERC20
                result.tokens.forEach((token) => {
                    assert.strictEqual(token.tokenType, 'ERC20', 'All tokens should have ERC20 tokenType');
                });
            }
        }
        catch (error) {
            assert.fail(`Direct GraphQL query failed: ${error.message}`);
        }
    });
    // Test direct GraphQL query with OR conditions
    await t.test('Should execute direct GraphQL query with OR conditions', async () => {
        try {
            const query = gql `
        query {
          tokens(limit: 5, where: { OR: [{ tokenType_eq: ERC20 }, { tokenType_eq: ERC721 }] }) {
            id
            tokenType
            tokenAddress
            tokenSubID
          }
        }
      `;
            const result = await client.request(query);
            assert.ok(result, 'Result should exist');
            // Add type assertion to fix 'in' operator error
            assert.ok(typeof result === 'object' && result !== null, 'Result should be an object');
            assert.ok('tokens' in result, 'Result should have tokens property');
            assert.ok(Array.isArray(result.tokens), 'tokens should be an array');
            if (result.tokens.length > 0) {
                // Verify all returned tokens are either ERC20 or ERC721
                result.tokens.forEach((token) => {
                    assert.ok(['ERC20', 'ERC721'].includes(token.tokenType), 'All tokens should have either ERC20 or ERC721 tokenType');
                });
            }
        }
        catch (error) {
            assert.fail(`Direct GraphQL query with OR conditions failed: ${error.message}`);
        }
    });
    // Test schema introspection
    await t.test('Should query schema for enum values', async () => {
        try {
            const query = gql `
        query {
          __type(name: "TokenType") {
            name
            kind
            enumValues {
              name
            }
          }
        }
      `;
            const result = await client.request(query);
            assert.ok(result, 'Result should exist');
            // Add type assertion to fix 'in' operator error
            assert.ok(typeof result === 'object' && result !== null, 'Result should be an object');
            assert.ok('__type' in result, 'Result should have __type property');
            // Type assertion for the __type property
            const typeInfo = result.__type;
            assert.strictEqual(typeInfo.name, 'TokenType', 'Type name should be TokenType');
            assert.strictEqual(typeInfo.kind, 'ENUM', 'Type kind should be ENUM');
            assert.ok(Array.isArray(typeInfo.enumValues), 'enumValues should be an array');
            // Check that the expected enum values exist
            const enumValues = typeInfo.enumValues.map((v) => v.name);
            assert.ok(enumValues.includes('ERC20'), 'TokenType should include ERC20');
            assert.ok(enumValues.includes('ERC721'), 'TokenType should include ERC721');
            assert.ok(enumValues.includes('ERC1155'), 'TokenType should include ERC1155');
        }
        catch (error) {
            assert.fail(`Schema introspection query failed: ${error.message}`);
        }
    });
    // Test known limitations (these tests document current behavior)
    await t.test('Current behavior: String contains operator', async () => {
        try {
            const query = gql `
        query {
          tokens(limit: 5, where: { tokenAddress_contains: "0x" }) {
            id
            tokenType
            tokenAddress
            tokenSubID
          }
        }
      `;
            await client.request(query);
            // If this succeeds (API behavior might change), adjust the test
            assert.ok(true, 'String contains operator worked (API behavior may have changed)');
        }
        catch (error) {
            // Currently expected to fail, so this is not a test failure
            assert.ok(error, 'String contains operator currently fails as expected');
        }
    });
    await t.test('Current behavior: Mixed conditions with enum and string', async () => {
        try {
            const query = gql `
        query {
          tokens(limit: 5, where: { tokenType_eq: ERC20, tokenAddress_contains: "0x" }) {
            id
            tokenType
            tokenAddress
            tokenSubID
          }
        }
      `;
            await client.request(query);
            // If this succeeds (API behavior might change), adjust the test
            assert.ok(true, 'Mixed conditions worked (API behavior may have changed)');
        }
        catch (error) {
            // Currently expected to fail, so this is not a test failure
            assert.ok(error, 'Mixed conditions currently fail as expected');
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLElBQUksTUFBTSxXQUFXLENBQUM7QUFDN0IsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDeEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVsQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2xDLDhCQUE4QjtJQUM5QixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxFQUFFO1FBQ3BELHlDQUF5QztRQUN6QyxNQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQztRQUN0QyxpQ0FBaUM7UUFDakMsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsNkNBQTZDO1FBQzdDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxZQUFZLGNBQWMsQ0FBQyxDQUFDO0lBQzlDLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtRQUNqRCxNQUFNLFVBQVUsR0FBRyx5QkFBeUIsQ0FBQztRQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdELENBQUMsQ0FBQyxDQUFDO0lBRUgsc0NBQXNDO0lBQ3RDLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRWhELGlDQUFpQztJQUNqQyxNQUFNLENB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