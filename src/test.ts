import { SubsquidClient, gql } from './client.js';

const document = gql`
 {
  shieldCommitments(limit: 10) {
    blockNumber
  }
}
`;

async function main() {
  try {
    console.log("Initializing SubsquidClient...");
    const client = new SubsquidClient();
    console.log("Sending request...");
    const data = await client.request(document);
    console.log("Response:", data);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

main().catch(console.error);