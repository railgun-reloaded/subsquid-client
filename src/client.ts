// @ts-ignore
import {gql,GraphQLClient} from 'graffle'
import {ETHEREUM_URL} from './networks.js'

const document =  gql`
 {
  shieldCommitments(limit: 10) {
    blockNumber
  }
}
`
const client = new GraphQLClient(ETHEREUM_URL);
// export const result = await client.request(document);

export class SubsquidClient {
    private client: GraphQLClient;

    constructor(){
        this.client = new GraphQLClient(ETHEREUM_URL);
    }
    request = async (document:string):Promise<any> =>{
        return this.client.request(document);
    }
  }
