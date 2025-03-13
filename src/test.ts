// import {SubsquidClient} from "./client.js"
// @ts-ignore
import { gql,SubsquidClient } from './client.js';


const document =  gql`
 {
  shieldCommitments(limit: 10) {
    blockNumber
  }
}
`
async function main () {

    console.log("here");
    const client = new SubsquidClient();
    const data = await client.request(document);
    console.log(data);  
};

main();