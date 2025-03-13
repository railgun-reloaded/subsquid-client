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

const client = new SubsquidClient();
const data = client.request(document);


console.log(data);