/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Big number integer */
  BigInt: { input: any; output: any; }
  /** Binary data encoded as a hex string always prefixed with 0x */
  Bytes: { input: any; output: any; }
};

export type Ciphertext = {
  __typename?: 'Ciphertext';
  data: Array<Scalars['Bytes']['output']>;
  id: Scalars['String']['output'];
  iv: Scalars['Bytes']['output'];
  tag: Scalars['Bytes']['output'];
};

export type CiphertextEdge = {
  __typename?: 'CiphertextEdge';
  cursor: Scalars['String']['output'];
  node: Ciphertext;
};

export type CiphertextOrderByInput =
  | 'id_ASC'
  | 'id_ASC_NULLS_FIRST'
  | 'id_DESC'
  | 'id_DESC_NULLS_LAST'
  | 'iv_ASC'
  | 'iv_ASC_NULLS_FIRST'
  | 'iv_DESC'
  | 'iv_DESC_NULLS_LAST'
  | 'tag_ASC'
  | 'tag_ASC_NULLS_FIRST'
  | 'tag_DESC'
  | 'tag_DESC_NULLS_LAST';

export type CiphertextWhereInput = {
  AND?: InputMaybe<Array<CiphertextWhereInput>>;
  OR?: InputMaybe<Array<CiphertextWhereInput>>;
  data_containsAll?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  data_containsAny?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  data_containsNone?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  data_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  iv_eq?: InputMaybe<Scalars['Bytes']['input']>;
  iv_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  iv_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  tag_eq?: InputMaybe<Scalars['Bytes']['input']>;
  tag_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tag_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
};

export type CiphertextsConnection = {
  __typename?: 'CiphertextsConnection';
  edges: Array<CiphertextEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Commitment = {
  batchStartTreePosition: Scalars['Int']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  commitmentType: CommitmentType;
  hash: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  transactionHash: Scalars['Bytes']['output'];
  treeNumber: Scalars['Int']['output'];
  treePosition: Scalars['Int']['output'];
};

export type CommitmentBatchEventNew = {
  __typename?: 'CommitmentBatchEventNew';
  batchStartTreePosition: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  treeNumber: Scalars['BigInt']['output'];
};

export type CommitmentBatchEventNewEdge = {
  __typename?: 'CommitmentBatchEventNewEdge';
  cursor: Scalars['String']['output'];
  node: CommitmentBatchEventNew;
};

export type CommitmentBatchEventNewOrderByInput =
  | 'batchStartTreePosition_ASC'
  | 'batchStartTreePosition_ASC_NULLS_FIRST'
  | 'batchStartTreePosition_DESC'
  | 'batchStartTreePosition_DESC_NULLS_LAST'
  | 'id_ASC'
  | 'id_ASC_NULLS_FIRST'
  | 'id_DESC'
  | 'id_DESC_NULLS_LAST'
  | 'treeNumber_ASC'
  | 'treeNumber_ASC_NULLS_FIRST'
  | 'treeNumber_DESC'
  | 'treeNumber_DESC_NULLS_LAST';

export type CommitmentBatchEventNewWhereInput = {
  AND?: InputMaybe<Array<CommitmentBatchEventNewWhereInput>>;
  OR?: InputMaybe<Array<CommitmentBatchEventNewWhereInput>>;
  batchStartTreePosition_eq?: InputMaybe<Scalars['BigInt']['input']>;
  batchStartTreePosition_gt?: InputMaybe<Scalars['BigInt']['input']>;
  batchStartTreePosition_gte?: InputMaybe<Scalars['BigInt']['input']>;
  batchStartTreePosition_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  batchStartTreePosition_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  batchStartTreePosition_lt?: InputMaybe<Scalars['BigInt']['input']>;
  batchStartTreePosition_lte?: InputMaybe<Scalars['BigInt']['input']>;
  batchStartTreePosition_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  batchStartTreePosition_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  treeNumber_eq?: InputMaybe<Scalars['BigInt']['input']>;
  treeNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  treeNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  treeNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  treeNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  treeNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  treeNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  treeNumber_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  treeNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type CommitmentBatchEventNewsConnection = {
  __typename?: 'CommitmentBatchEventNewsConnection';
  edges: Array<CommitmentBatchEventNewEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CommitmentCiphertext = {
  __typename?: 'CommitmentCiphertext';
  annotationData: Scalars['Bytes']['output'];
  blindedReceiverViewingKey: Scalars['Bytes']['output'];
  blindedSenderViewingKey: Scalars['Bytes']['output'];
  ciphertext: Ciphertext;
  id: Scalars['String']['output'];
  memo: Scalars['Bytes']['output'];
};

export type CommitmentCiphertextEdge = {
  __typename?: 'CommitmentCiphertextEdge';
  cursor: Scalars['String']['output'];
  node: CommitmentCiphertext;
};

export type CommitmentCiphertextOrderByInput =
  | 'annotationData_ASC'
  | 'annotationData_ASC_NULLS_FIRST'
  | 'annotationData_DESC'
  | 'annotationData_DESC_NULLS_LAST'
  | 'blindedReceiverViewingKey_ASC'
  | 'blindedReceiverViewingKey_ASC_NULLS_FIRST'
  | 'blindedReceiverViewingKey_DESC'
  | 'blindedReceiverViewingKey_DESC_NULLS_LAST'
  | 'blindedSenderViewingKey_ASC'
  | 'blindedSenderViewingKey_ASC_NULLS_FIRST'
  | 'blindedSenderViewingKey_DESC'
  | 'blindedSenderViewingKey_DESC_NULLS_LAST'
  | 'ciphertext_id_ASC'
  | 'ciphertext_id_ASC_NULLS_FIRST'
  | 'ciphertext_id_DESC'
  | 'ciphertext_id_DESC_NULLS_LAST'
  | 'ciphertext_iv_ASC'
  | 'ciphertext_iv_ASC_NULLS_FIRST'
  | 'ciphertext_iv_DESC'
  | 'ciphertext_iv_DESC_NULLS_LAST'
  | 'ciphertext_tag_ASC'
  | 'ciphertext_tag_ASC_NULLS_FIRST'
  | 'ciphertext_tag_DESC'
  | 'ciphertext_tag_DESC_NULLS_LAST'
  | 'id_ASC'
  | 'id_ASC_NULLS_FIRST'
  | 'id_DESC'
  | 'id_DESC_NULLS_LAST'
  | 'memo_ASC'
  | 'memo_ASC_NULLS_FIRST'
  | 'memo_DESC'
  | 'memo_DESC_NULLS_LAST';

export type CommitmentCiphertextWhereInput = {
  AND?: InputMaybe<Array<CommitmentCiphertextWhereInput>>;
  OR?: InputMaybe<Array<CommitmentCiphertextWhereInput>>;
  annotationData_eq?: InputMaybe<Scalars['Bytes']['input']>;
  annotationData_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  annotationData_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  blindedReceiverViewingKey_eq?: InputMaybe<Scalars['Bytes']['input']>;
  blindedReceiverViewingKey_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blindedReceiverViewingKey_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  blindedSenderViewingKey_eq?: InputMaybe<Scalars['Bytes']['input']>;
  blindedSenderViewingKey_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blindedSenderViewingKey_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  ciphertext?: InputMaybe<CiphertextWhereInput>;
  ciphertext_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  memo_eq?: InputMaybe<Scalars['Bytes']['input']>;
  memo_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  memo_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
};

export type CommitmentCiphertextsConnection = {
  __typename?: 'CommitmentCiphertextsConnection';
  edges: Array<CommitmentCiphertextEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CommitmentEdge = {
  __typename?: 'CommitmentEdge';
  cursor: Scalars['String']['output'];
  node: Commitment;
};

export type CommitmentOrderByInput =
  | '_type_ASC'
  | '_type_DESC'
  | 'batchStartTreePosition_ASC'
  | 'batchStartTreePosition_ASC_NULLS_FIRST'
  | 'batchStartTreePosition_DESC'
  | 'batchStartTreePosition_DESC_NULLS_LAST'
  | 'blockNumber_ASC'
  | 'blockNumber_ASC_NULLS_FIRST'
  | 'blockNumber_DESC'
  | 'blockNumber_DESC_NULLS_LAST'
  | 'blockTimestamp_ASC'
  | 'blockTimestamp_ASC_NULLS_FIRST'
  | 'blockTimestamp_DESC'
  | 'blockTimestamp_DESC_NULLS_LAST'
  | 'commitmentType_ASC'
  | 'commitmentType_ASC_NULLS_FIRST'
  | 'commitmentType_DESC'
  | 'commitmentType_DESC_NULLS_LAST'
  | 'hash_ASC'
  | 'hash_ASC_NULLS_FIRST'
  | 'hash_DESC'
  | 'hash_DESC_NULLS_LAST'
  | 'id_ASC'
  | 'id_ASC_NULLS_FIRST'
  | 'id_DESC'
  | 'id_DESC_NULLS_LAST'
  | 'transactionHash_ASC'
  | 'transactionHash_ASC_NULLS_FIRST'
  | 'transactionHash_DESC'
  | 'transactionHash_DESC_NULLS_LAST'
  | 'treeNumber_ASC'
  | 'treeNumber_ASC_NULLS_FIRST'
  | 'treeNumber_DESC'
  | 'treeNumber_DESC_NULLS_LAST'
  | 'treePosition_ASC'
  | 'treePosition_ASC_NULLS_FIRST'
  | 'treePosition_DESC'
  | 'treePosition_DESC_NULLS_LAST';

export type CommitmentPreimage = {
  __typename?: 'CommitmentPreimage';
  id: Scalars['String']['output'];
  npk: Scalars['Bytes']['output'];
  token: Token;
  value: Scalars['BigInt']['output'];
};

export type CommitmentPreimageEdge = {
  __typename?: 'CommitmentPreimageEdge';
  cursor: Scalars['String']['output'];
  node: CommitmentPreimage;
};

export type CommitmentPreimageOrderByInput =
  | 'id_ASC'
  | 'id_ASC_NULLS_FIRST'
  | 'id_DESC'
  | 'id_DESC_NULLS_LAST'
  | 'npk_ASC'
  | 'npk_ASC_NULLS_FIRST'
  | 'npk_DESC'
  | 'npk_DESC_NULLS_LAST'
  | 'token_id_ASC'
  | 'token_id_ASC_NULLS_FIRST'
  | 'token_id_DESC'
  | 'token_id_DESC_NULLS_LAST'
  | 'token_tokenAddress_ASC'
  | 'token_tokenAddress_ASC_NULLS_FIRST'
  | 'token_tokenAddress_DESC'
  | 'token_tokenAddress_DESC_NULLS_LAST'
  | 'token_tokenSubID_ASC'
  | 'token_tokenSubID_ASC_NULLS_FIRST'
  | 'token_tokenSubID_DESC'
  | 'token_tokenSubID_DESC_NULLS_LAST'
  | 'token_tokenType_ASC'
  | 'token_tokenType_ASC_NULLS_FIRST'
  | 'token_tokenType_DESC'
  | 'token_tokenType_DESC_NULLS_LAST'
  | 'value_ASC'
  | 'value_ASC_NULLS_FIRST'
  | 'value_DESC'
  | 'value_DESC_NULLS_LAST';

export type CommitmentPreimageWhereInput = {
  AND?: InputMaybe<Array<CommitmentPreimageWhereInput>>;
  OR?: InputMaybe<Array<CommitmentPreimageWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  npk_eq?: InputMaybe<Scalars['Bytes']['input']>;
  npk_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  npk_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  token?: InputMaybe<TokenWhereInput>;
  token_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  value_eq?: InputMaybe<Scalars['BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  value_lt?: InputMaybe<Scalars['BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['BigInt']['input']>;
  value_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type CommitmentPreimagesConnection = {
  __typename?: 'CommitmentPreimagesConnection';
  edges: Array<CommitmentPreimageEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CommitmentType =
  | 'LegacyEncryptedCommitment'
  | 'LegacyGeneratedCommitment'
  | 'ShieldCommitment'
  | 'TransactCommitment';

export type CommitmentWhereInput = {
  AND?: InputMaybe<Array<CommitmentWhereInput>>;
  OR?: InputMaybe<Array<CommitmentWhereInput>>;
  batchStartTreePosition_eq?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_gt?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_gte?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  batchStartTreePosition_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  batchStartTreePosition_lt?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_lte?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_not_eq?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  commitmentType_eq?: InputMaybe<CommitmentType>;
  commitmentType_in?: InputMaybe<Array<CommitmentType>>;
  commitmentType_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  commitmentType_not_eq?: InputMaybe<CommitmentType>;
  commitmentType_not_in?: InputMaybe<Array<CommitmentType>>;
  hash_eq?: InputMaybe<Scalars['BigInt']['input']>;
  hash_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hash_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hash_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hash_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hash_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hash_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  transactionHash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  transactionHash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  treeNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treeNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  treeNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treePosition_eq?: InputMaybe<Scalars['Int']['input']>;
  treePosition_gt?: InputMaybe<Scalars['Int']['input']>;
  treePosition_gte?: InputMaybe<Scalars['Int']['input']>;
  treePosition_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treePosition_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  treePosition_lt?: InputMaybe<Scalars['Int']['input']>;
  treePosition_lte?: InputMaybe<Scalars['Int']['input']>;
  treePosition_not_eq?: InputMaybe<Scalars['Int']['input']>;
  treePosition_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type CommitmentsConnection = {
  __typename?: 'CommitmentsConnection';
  edges: Array<CommitmentEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LegacyCommitmentCiphertext = {
  __typename?: 'LegacyCommitmentCiphertext';
  ciphertext: Ciphertext;
  ephemeralKeys: Array<Scalars['Bytes']['output']>;
  id: Scalars['String']['output'];
  memo: Array<Scalars['Bytes']['output']>;
};

export type LegacyCommitmentCiphertextEdge = {
  __typename?: 'LegacyCommitmentCiphertextEdge';
  cursor: Scalars['String']['output'];
  node: LegacyCommitmentCiphertext;
};

export type LegacyCommitmentCiphertextOrderByInput =
  | 'ciphertext_id_ASC'
  | 'ciphertext_id_ASC_NULLS_FIRST'
  | 'ciphertext_id_DESC'
  | 'ciphertext_id_DESC_NULLS_LAST'
  | 'ciphertext_iv_ASC'
  | 'ciphertext_iv_ASC_NULLS_FIRST'
  | 'ciphertext_iv_DESC'
  | 'ciphertext_iv_DESC_NULLS_LAST'
  | 'ciphertext_tag_ASC'
  | 'ciphertext_tag_ASC_NULLS_FIRST'
  | 'ciphertext_tag_DESC'
  | 'ciphertext_tag_DESC_NULLS_LAST'
  | 'id_ASC'
  | 'id_ASC_NULLS_FIRST'
  | 'id_DESC'
  | 'id_DESC_NULLS_LAST';

export type LegacyCommitmentCiphertextWhereInput = {
  AND?: InputMaybe<Array<LegacyCommitmentCiphertextWhereInput>>;
  OR?: InputMaybe<Array<LegacyCommitmentCiphertextWhereInput>>;
  ciphertext?: InputMaybe<CiphertextWhereInput>;
  ciphertext_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  ephemeralKeys_containsAll?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  ephemeralKeys_containsAny?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  ephemeralKeys_containsNone?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  ephemeralKeys_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  memo_containsAll?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  memo_containsAny?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  memo_containsNone?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  memo_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LegacyCommitmentCiphertextsConnection = {
  __typename?: 'LegacyCommitmentCiphertextsConnection';
  edges: Array<LegacyCommitmentCiphertextEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LegacyEncryptedCommitment = Commitment & {
  __typename?: 'LegacyEncryptedCommitment';
  batchStartTreePosition: Scalars['Int']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  ciphertext: LegacyCommitmentCiphertext;
  commitmentType: CommitmentType;
  hash: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  transactionHash: Scalars['Bytes']['output'];
  treeNumber: Scalars['Int']['output'];
  treePosition: Scalars['Int']['output'];
};

export type LegacyEncryptedCommitmentEdge = {
  __typename?: 'LegacyEncryptedCommitmentEdge';
  cursor: Scalars['String']['output'];
  node: LegacyEncryptedCommitment;
};

export type LegacyEncryptedCommitmentOrderByInput =
  | 'batchStartTreePosition_ASC'
  | 'batchStartTreePosition_ASC_NULLS_FIRST'
  | 'batchStartTreePosition_DESC'
  | 'batchStartTreePosition_DESC_NULLS_LAST'
  | 'blockNumber_ASC'
  | 'blockNumber_ASC_NULLS_FIRST'
  | 'blockNumber_DESC'
  | 'blockNumber_DESC_NULLS_LAST'
  | 'blockTimestamp_ASC'
  | 'blockTimestamp_ASC_NULLS_FIRST'
  | 'blockTimestamp_DESC'
  | 'blockTimestamp_DESC_NULLS_LAST'
  | 'ciphertext_id_ASC'
  | 'ciphertext_id_ASC_NULLS_FIRST'
  | 'ciphertext_id_DESC'
  | 'ciphertext_id_DESC_NULLS_LAST'
  | 'commitmentType_ASC'
  | 'commitmentType_ASC_NULLS_FIRST'
  | 'commitmentType_DESC'
  | 'commitmentType_DESC_NULLS_LAST'
  | 'hash_ASC'
  | 'hash_ASC_NULLS_FIRST'
  | 'hash_DESC'
  | 'hash_DESC_NULLS_LAST'
  | 'id_ASC'
  | 'id_ASC_NULLS_FIRST'
  | 'id_DESC'
  | 'id_DESC_NULLS_LAST'
  | 'transactionHash_ASC'
  | 'transactionHash_ASC_NULLS_FIRST'
  | 'transactionHash_DESC'
  | 'transactionHash_DESC_NULLS_LAST'
  | 'treeNumber_ASC'
  | 'treeNumber_ASC_NULLS_FIRST'
  | 'treeNumber_DESC'
  | 'treeNumber_DESC_NULLS_LAST'
  | 'treePosition_ASC'
  | 'treePosition_ASC_NULLS_FIRST'
  | 'treePosition_DESC'
  | 'treePosition_DESC_NULLS_LAST';

export type LegacyEncryptedCommitmentWhereInput = {
  AND?: InputMaybe<Array<LegacyEncryptedCommitmentWhereInput>>;
  OR?: InputMaybe<Array<LegacyEncryptedCommitmentWhereInput>>;
  batchStartTreePosition_eq?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_gt?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_gte?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  batchStartTreePosition_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  batchStartTreePosition_lt?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_lte?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_not_eq?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ciphertext?: InputMaybe<LegacyCommitmentCiphertextWhereInput>;
  ciphertext_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  commitmentType_eq?: InputMaybe<CommitmentType>;
  commitmentType_in?: InputMaybe<Array<CommitmentType>>;
  commitmentType_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  commitmentType_not_eq?: InputMaybe<CommitmentType>;
  commitmentType_not_in?: InputMaybe<Array<CommitmentType>>;
  hash_eq?: InputMaybe<Scalars['BigInt']['input']>;
  hash_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hash_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hash_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hash_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hash_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hash_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  transactionHash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  transactionHash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  treeNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treeNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  treeNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treePosition_eq?: InputMaybe<Scalars['Int']['input']>;
  treePosition_gt?: InputMaybe<Scalars['Int']['input']>;
  treePosition_gte?: InputMaybe<Scalars['Int']['input']>;
  treePosition_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treePosition_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  treePosition_lt?: InputMaybe<Scalars['Int']['input']>;
  treePosition_lte?: InputMaybe<Scalars['Int']['input']>;
  treePosition_not_eq?: InputMaybe<Scalars['Int']['input']>;
  treePosition_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type LegacyEncryptedCommitmentsConnection = {
  __typename?: 'LegacyEncryptedCommitmentsConnection';
  edges: Array<LegacyEncryptedCommitmentEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LegacyGeneratedCommitment = Commitment & {
  __typename?: 'LegacyGeneratedCommitment';
  batchStartTreePosition: Scalars['Int']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  commitmentType: CommitmentType;
  encryptedRandom: Array<Scalars['Bytes']['output']>;
  hash: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  preimage: CommitmentPreimage;
  transactionHash: Scalars['Bytes']['output'];
  treeNumber: Scalars['Int']['output'];
  treePosition: Scalars['Int']['output'];
};

export type LegacyGeneratedCommitmentEdge = {
  __typename?: 'LegacyGeneratedCommitmentEdge';
  cursor: Scalars['String']['output'];
  node: LegacyGeneratedCommitment;
};

export type LegacyGeneratedCommitmentOrderByInput =
  | 'batchStartTreePosition_ASC'
  | 'batchStartTreePosition_ASC_NULLS_FIRST'
  | 'batchStartTreePosition_DESC'
  | 'batchStartTreePosition_DESC_NULLS_LAST'
  | 'blockNumber_ASC'
  | 'blockNumber_ASC_NULLS_FIRST'
  | 'blockNumber_DESC'
  | 'blockNumber_DESC_NULLS_LAST'
  | 'blockTimestamp_ASC'
  | 'blockTimestamp_ASC_NULLS_FIRST'
  | 'blockTimestamp_DESC'
  | 'blockTimestamp_DESC_NULLS_LAST'
  | 'commitmentType_ASC'
  | 'commitmentType_ASC_NULLS_FIRST'
  | 'commitmentType_DESC'
  | 'commitmentType_DESC_NULLS_LAST'
  | 'hash_ASC'
  | 'hash_ASC_NULLS_FIRST'
  | 'hash_DESC'
  | 'hash_DESC_NULLS_LAST'
  | 'id_ASC'
  | 'id_ASC_NULLS_FIRST'
  | 'id_DESC'
  | 'id_DESC_NULLS_LAST'
  | 'preimage_id_ASC'
  | 'preimage_id_ASC_NULLS_FIRST'
  | 'preimage_id_DESC'
  | 'preimage_id_DESC_NULLS_LAST'
  | 'preimage_npk_ASC'
  | 'preimage_npk_ASC_NULLS_FIRST'
  | 'preimage_npk_DESC'
  | 'preimage_npk_DESC_NULLS_LAST'
  | 'preimage_value_ASC'
  | 'preimage_value_ASC_NULLS_FIRST'
  | 'preimage_value_DESC'
  | 'preimage_value_DESC_NULLS_LAST'
  | 'transactionHash_ASC'
  | 'transactionHash_ASC_NULLS_FIRST'
  | 'transactionHash_DESC'
  | 'transactionHash_DESC_NULLS_LAST'
  | 'treeNumber_ASC'
  | 'treeNumber_ASC_NULLS_FIRST'
  | 'treeNumber_DESC'
  | 'treeNumber_DESC_NULLS_LAST'
  | 'treePosition_ASC'
  | 'treePosition_ASC_NULLS_FIRST'
  | 'treePosition_DESC'
  | 'treePosition_DESC_NULLS_LAST';

export type LegacyGeneratedCommitmentWhereInput = {
  AND?: InputMaybe<Array<LegacyGeneratedCommitmentWhereInput>>;
  OR?: InputMaybe<Array<LegacyGeneratedCommitmentWhereInput>>;
  batchStartTreePosition_eq?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_gt?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_gte?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  batchStartTreePosition_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  batchStartTreePosition_lt?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_lte?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_not_eq?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  commitmentType_eq?: InputMaybe<CommitmentType>;
  commitmentType_in?: InputMaybe<Array<CommitmentType>>;
  commitmentType_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  commitmentType_not_eq?: InputMaybe<CommitmentType>;
  commitmentType_not_in?: InputMaybe<Array<CommitmentType>>;
  encryptedRandom_containsAll?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  encryptedRandom_containsAny?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  encryptedRandom_containsNone?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  encryptedRandom_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hash_eq?: InputMaybe<Scalars['BigInt']['input']>;
  hash_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hash_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hash_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hash_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hash_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hash_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  preimage?: InputMaybe<CommitmentPreimageWhereInput>;
  preimage_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  transactionHash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  transactionHash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  treeNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treeNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  treeNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treePosition_eq?: InputMaybe<Scalars['Int']['input']>;
  treePosition_gt?: InputMaybe<Scalars['Int']['input']>;
  treePosition_gte?: InputMaybe<Scalars['Int']['input']>;
  treePosition_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treePosition_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  treePosition_lt?: InputMaybe<Scalars['Int']['input']>;
  treePosition_lte?: InputMaybe<Scalars['Int']['input']>;
  treePosition_not_eq?: InputMaybe<Scalars['Int']['input']>;
  treePosition_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type LegacyGeneratedCommitmentsConnection = {
  __typename?: 'LegacyGeneratedCommitmentsConnection';
  edges: Array<LegacyGeneratedCommitmentEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Nullifier = {
  __typename?: 'Nullifier';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  nullifier: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  treeNumber: Scalars['Int']['output'];
};

export type NullifierEdge = {
  __typename?: 'NullifierEdge';
  cursor: Scalars['String']['output'];
  node: Nullifier;
};

export type NullifierOrderByInput =
  | 'blockNumber_ASC'
  | 'blockNumber_ASC_NULLS_FIRST'
  | 'blockNumber_DESC'
  | 'blockNumber_DESC_NULLS_LAST'
  | 'blockTimestamp_ASC'
  | 'blockTimestamp_ASC_NULLS_FIRST'
  | 'blockTimestamp_DESC'
  | 'blockTimestamp_DESC_NULLS_LAST'
  | 'id_ASC'
  | 'id_ASC_NULLS_FIRST'
  | 'id_DESC'
  | 'id_DESC_NULLS_LAST'
  | 'nullifier_ASC'
  | 'nullifier_ASC_NULLS_FIRST'
  | 'nullifier_DESC'
  | 'nullifier_DESC_NULLS_LAST'
  | 'transactionHash_ASC'
  | 'transactionHash_ASC_NULLS_FIRST'
  | 'transactionHash_DESC'
  | 'transactionHash_DESC_NULLS_LAST'
  | 'treeNumber_ASC'
  | 'treeNumber_ASC_NULLS_FIRST'
  | 'treeNumber_DESC'
  | 'treeNumber_DESC_NULLS_LAST';

export type NullifierWhereInput = {
  AND?: InputMaybe<Array<NullifierWhereInput>>;
  OR?: InputMaybe<Array<NullifierWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  nullifier_eq?: InputMaybe<Scalars['Bytes']['input']>;
  nullifier_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  nullifier_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  transactionHash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  treeNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treeNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  treeNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NullifiersConnection = {
  __typename?: 'NullifiersConnection';
  edges: Array<NullifierEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  ciphertextById?: Maybe<Ciphertext>;
  /** @deprecated Use ciphertextById */
  ciphertextByUniqueInput?: Maybe<Ciphertext>;
  ciphertexts: Array<Ciphertext>;
  ciphertextsConnection: CiphertextsConnection;
  commitmentBatchEventNewById?: Maybe<CommitmentBatchEventNew>;
  /** @deprecated Use commitmentBatchEventNewById */
  commitmentBatchEventNewByUniqueInput?: Maybe<CommitmentBatchEventNew>;
  commitmentBatchEventNews: Array<CommitmentBatchEventNew>;
  commitmentBatchEventNewsConnection: CommitmentBatchEventNewsConnection;
  commitmentCiphertextById?: Maybe<CommitmentCiphertext>;
  /** @deprecated Use commitmentCiphertextById */
  commitmentCiphertextByUniqueInput?: Maybe<CommitmentCiphertext>;
  commitmentCiphertexts: Array<CommitmentCiphertext>;
  commitmentCiphertextsConnection: CommitmentCiphertextsConnection;
  commitmentPreimageById?: Maybe<CommitmentPreimage>;
  /** @deprecated Use commitmentPreimageById */
  commitmentPreimageByUniqueInput?: Maybe<CommitmentPreimage>;
  commitmentPreimages: Array<CommitmentPreimage>;
  commitmentPreimagesConnection: CommitmentPreimagesConnection;
  commitments: Array<Commitment>;
  commitmentsConnection: CommitmentsConnection;
  legacyCommitmentCiphertextById?: Maybe<LegacyCommitmentCiphertext>;
  /** @deprecated Use legacyCommitmentCiphertextById */
  legacyCommitmentCiphertextByUniqueInput?: Maybe<LegacyCommitmentCiphertext>;
  legacyCommitmentCiphertexts: Array<LegacyCommitmentCiphertext>;
  legacyCommitmentCiphertextsConnection: LegacyCommitmentCiphertextsConnection;
  legacyEncryptedCommitmentById?: Maybe<LegacyEncryptedCommitment>;
  /** @deprecated Use legacyEncryptedCommitmentById */
  legacyEncryptedCommitmentByUniqueInput?: Maybe<LegacyEncryptedCommitment>;
  legacyEncryptedCommitments: Array<LegacyEncryptedCommitment>;
  legacyEncryptedCommitmentsConnection: LegacyEncryptedCommitmentsConnection;
  legacyGeneratedCommitmentById?: Maybe<LegacyGeneratedCommitment>;
  /** @deprecated Use legacyGeneratedCommitmentById */
  legacyGeneratedCommitmentByUniqueInput?: Maybe<LegacyGeneratedCommitment>;
  legacyGeneratedCommitments: Array<LegacyGeneratedCommitment>;
  legacyGeneratedCommitmentsConnection: LegacyGeneratedCommitmentsConnection;
  nullifierById?: Maybe<Nullifier>;
  /** @deprecated Use nullifierById */
  nullifierByUniqueInput?: Maybe<Nullifier>;
  nullifiers: Array<Nullifier>;
  nullifiersConnection: NullifiersConnection;
  shieldCommitmentById?: Maybe<ShieldCommitment>;
  /** @deprecated Use shieldCommitmentById */
  shieldCommitmentByUniqueInput?: Maybe<ShieldCommitment>;
  shieldCommitments: Array<ShieldCommitment>;
  shieldCommitmentsConnection: ShieldCommitmentsConnection;
  squidStatus?: Maybe<SquidStatus>;
  tokenById?: Maybe<Token>;
  /** @deprecated Use tokenById */
  tokenByUniqueInput?: Maybe<Token>;
  tokens: Array<Token>;
  tokensConnection: TokensConnection;
  transactCommitmentById?: Maybe<TransactCommitment>;
  /** @deprecated Use transactCommitmentById */
  transactCommitmentByUniqueInput?: Maybe<TransactCommitment>;
  transactCommitments: Array<TransactCommitment>;
  transactCommitmentsConnection: TransactCommitmentsConnection;
  transactionById?: Maybe<Transaction>;
  /** @deprecated Use transactionById */
  transactionByUniqueInput?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  transactionsConnection: TransactionsConnection;
  unshieldById?: Maybe<Unshield>;
  /** @deprecated Use unshieldById */
  unshieldByUniqueInput?: Maybe<Unshield>;
  unshields: Array<Unshield>;
  unshieldsConnection: UnshieldsConnection;
  verificationHashById?: Maybe<VerificationHash>;
  /** @deprecated Use verificationHashById */
  verificationHashByUniqueInput?: Maybe<VerificationHash>;
  verificationHashes: Array<VerificationHash>;
  verificationHashesConnection: VerificationHashesConnection;
};


export type QueryCiphertextByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCiphertextByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryCiphertextsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CiphertextOrderByInput>>;
  where?: InputMaybe<CiphertextWhereInput>;
};


export type QueryCiphertextsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CiphertextOrderByInput>;
  where?: InputMaybe<CiphertextWhereInput>;
};


export type QueryCommitmentBatchEventNewByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCommitmentBatchEventNewByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryCommitmentBatchEventNewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CommitmentBatchEventNewOrderByInput>>;
  where?: InputMaybe<CommitmentBatchEventNewWhereInput>;
};


export type QueryCommitmentBatchEventNewsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CommitmentBatchEventNewOrderByInput>;
  where?: InputMaybe<CommitmentBatchEventNewWhereInput>;
};


export type QueryCommitmentCiphertextByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCommitmentCiphertextByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryCommitmentCiphertextsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CommitmentCiphertextOrderByInput>>;
  where?: InputMaybe<CommitmentCiphertextWhereInput>;
};


export type QueryCommitmentCiphertextsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CommitmentCiphertextOrderByInput>;
  where?: InputMaybe<CommitmentCiphertextWhereInput>;
};


export type QueryCommitmentPreimageByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCommitmentPreimageByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryCommitmentPreimagesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CommitmentPreimageOrderByInput>>;
  where?: InputMaybe<CommitmentPreimageWhereInput>;
};


export type QueryCommitmentPreimagesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CommitmentPreimageOrderByInput>;
  where?: InputMaybe<CommitmentPreimageWhereInput>;
};


export type QueryCommitmentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CommitmentOrderByInput>>;
  where?: InputMaybe<CommitmentWhereInput>;
};


export type QueryCommitmentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CommitmentOrderByInput>;
  where?: InputMaybe<CommitmentWhereInput>;
};


export type QueryLegacyCommitmentCiphertextByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLegacyCommitmentCiphertextByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLegacyCommitmentCiphertextsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LegacyCommitmentCiphertextOrderByInput>>;
  where?: InputMaybe<LegacyCommitmentCiphertextWhereInput>;
};


export type QueryLegacyCommitmentCiphertextsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LegacyCommitmentCiphertextOrderByInput>;
  where?: InputMaybe<LegacyCommitmentCiphertextWhereInput>;
};


export type QueryLegacyEncryptedCommitmentByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLegacyEncryptedCommitmentByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLegacyEncryptedCommitmentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LegacyEncryptedCommitmentOrderByInput>>;
  where?: InputMaybe<LegacyEncryptedCommitmentWhereInput>;
};


export type QueryLegacyEncryptedCommitmentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LegacyEncryptedCommitmentOrderByInput>;
  where?: InputMaybe<LegacyEncryptedCommitmentWhereInput>;
};


export type QueryLegacyGeneratedCommitmentByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLegacyGeneratedCommitmentByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLegacyGeneratedCommitmentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LegacyGeneratedCommitmentOrderByInput>>;
  where?: InputMaybe<LegacyGeneratedCommitmentWhereInput>;
};


export type QueryLegacyGeneratedCommitmentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LegacyGeneratedCommitmentOrderByInput>;
  where?: InputMaybe<LegacyGeneratedCommitmentWhereInput>;
};


export type QueryNullifierByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryNullifierByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryNullifiersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NullifierOrderByInput>>;
  where?: InputMaybe<NullifierWhereInput>;
};


export type QueryNullifiersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<NullifierOrderByInput>;
  where?: InputMaybe<NullifierWhereInput>;
};


export type QueryShieldCommitmentByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryShieldCommitmentByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryShieldCommitmentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ShieldCommitmentOrderByInput>>;
  where?: InputMaybe<ShieldCommitmentWhereInput>;
};


export type QueryShieldCommitmentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ShieldCommitmentOrderByInput>;
  where?: InputMaybe<ShieldCommitmentWhereInput>;
};


export type QueryTokenByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryTokenByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryTokensArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenOrderByInput>>;
  where?: InputMaybe<TokenWhereInput>;
};


export type QueryTokensConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<TokenOrderByInput>;
  where?: InputMaybe<TokenWhereInput>;
};


export type QueryTransactCommitmentByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryTransactCommitmentByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryTransactCommitmentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransactCommitmentOrderByInput>>;
  where?: InputMaybe<TransactCommitmentWhereInput>;
};


export type QueryTransactCommitmentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<TransactCommitmentOrderByInput>;
  where?: InputMaybe<TransactCommitmentWhereInput>;
};


export type QueryTransactionByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryTransactionByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryTransactionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransactionOrderByInput>>;
  where?: InputMaybe<TransactionWhereInput>;
};


export type QueryTransactionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<TransactionOrderByInput>;
  where?: InputMaybe<TransactionWhereInput>;
};


export type QueryUnshieldByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryUnshieldByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryUnshieldsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UnshieldOrderByInput>>;
  where?: InputMaybe<UnshieldWhereInput>;
};


export type QueryUnshieldsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<UnshieldOrderByInput>;
  where?: InputMaybe<UnshieldWhereInput>;
};


export type QueryVerificationHashByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryVerificationHashByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryVerificationHashesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VerificationHashOrderByInput>>;
  where?: InputMaybe<VerificationHashWhereInput>;
};


export type QueryVerificationHashesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<VerificationHashOrderByInput>;
  where?: InputMaybe<VerificationHashWhereInput>;
};

export type ShieldCommitment = Commitment & {
  __typename?: 'ShieldCommitment';
  batchStartTreePosition: Scalars['Int']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  commitmentType: CommitmentType;
  encryptedBundle: Array<Scalars['Bytes']['output']>;
  fee?: Maybe<Scalars['BigInt']['output']>;
  hash: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  preimage: CommitmentPreimage;
  shieldKey: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  treeNumber: Scalars['Int']['output'];
  treePosition: Scalars['Int']['output'];
};

export type ShieldCommitmentEdge = {
  __typename?: 'ShieldCommitmentEdge';
  cursor: Scalars['String']['output'];
  node: ShieldCommitment;
};

export type ShieldCommitmentOrderByInput =
  | 'batchStartTreePosition_ASC'
  | 'batchStartTreePosition_ASC_NULLS_FIRST'
  | 'batchStartTreePosition_DESC'
  | 'batchStartTreePosition_DESC_NULLS_LAST'
  | 'blockNumber_ASC'
  | 'blockNumber_ASC_NULLS_FIRST'
  | 'blockNumber_DESC'
  | 'blockNumber_DESC_NULLS_LAST'
  | 'blockTimestamp_ASC'
  | 'blockTimestamp_ASC_NULLS_FIRST'
  | 'blockTimestamp_DESC'
  | 'blockTimestamp_DESC_NULLS_LAST'
  | 'commitmentType_ASC'
  | 'commitmentType_ASC_NULLS_FIRST'
  | 'commitmentType_DESC'
  | 'commitmentType_DESC_NULLS_LAST'
  | 'fee_ASC'
  | 'fee_ASC_NULLS_FIRST'
  | 'fee_DESC'
  | 'fee_DESC_NULLS_LAST'
  | 'hash_ASC'
  | 'hash_ASC_NULLS_FIRST'
  | 'hash_DESC'
  | 'hash_DESC_NULLS_LAST'
  | 'id_ASC'
  | 'id_ASC_NULLS_FIRST'
  | 'id_DESC'
  | 'id_DESC_NULLS_LAST'
  | 'preimage_id_ASC'
  | 'preimage_id_ASC_NULLS_FIRST'
  | 'preimage_id_DESC'
  | 'preimage_id_DESC_NULLS_LAST'
  | 'preimage_npk_ASC'
  | 'preimage_npk_ASC_NULLS_FIRST'
  | 'preimage_npk_DESC'
  | 'preimage_npk_DESC_NULLS_LAST'
  | 'preimage_value_ASC'
  | 'preimage_value_ASC_NULLS_FIRST'
  | 'preimage_value_DESC'
  | 'preimage_value_DESC_NULLS_LAST'
  | 'shieldKey_ASC'
  | 'shieldKey_ASC_NULLS_FIRST'
  | 'shieldKey_DESC'
  | 'shieldKey_DESC_NULLS_LAST'
  | 'transactionHash_ASC'
  | 'transactionHash_ASC_NULLS_FIRST'
  | 'transactionHash_DESC'
  | 'transactionHash_DESC_NULLS_LAST'
  | 'treeNumber_ASC'
  | 'treeNumber_ASC_NULLS_FIRST'
  | 'treeNumber_DESC'
  | 'treeNumber_DESC_NULLS_LAST'
  | 'treePosition_ASC'
  | 'treePosition_ASC_NULLS_FIRST'
  | 'treePosition_DESC'
  | 'treePosition_DESC_NULLS_LAST';

export type ShieldCommitmentWhereInput = {
  AND?: InputMaybe<Array<ShieldCommitmentWhereInput>>;
  OR?: InputMaybe<Array<ShieldCommitmentWhereInput>>;
  batchStartTreePosition_eq?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_gt?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_gte?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  batchStartTreePosition_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  batchStartTreePosition_lt?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_lte?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_not_eq?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  commitmentType_eq?: InputMaybe<CommitmentType>;
  commitmentType_in?: InputMaybe<Array<CommitmentType>>;
  commitmentType_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  commitmentType_not_eq?: InputMaybe<CommitmentType>;
  commitmentType_not_in?: InputMaybe<Array<CommitmentType>>;
  encryptedBundle_containsAll?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  encryptedBundle_containsAny?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  encryptedBundle_containsNone?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  encryptedBundle_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash_eq?: InputMaybe<Scalars['BigInt']['input']>;
  hash_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hash_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hash_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hash_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hash_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hash_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  preimage?: InputMaybe<CommitmentPreimageWhereInput>;
  preimage_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  shieldKey_eq?: InputMaybe<Scalars['Bytes']['input']>;
  shieldKey_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  shieldKey_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  transactionHash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  treeNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treeNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  treeNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treePosition_eq?: InputMaybe<Scalars['Int']['input']>;
  treePosition_gt?: InputMaybe<Scalars['Int']['input']>;
  treePosition_gte?: InputMaybe<Scalars['Int']['input']>;
  treePosition_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treePosition_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  treePosition_lt?: InputMaybe<Scalars['Int']['input']>;
  treePosition_lte?: InputMaybe<Scalars['Int']['input']>;
  treePosition_not_eq?: InputMaybe<Scalars['Int']['input']>;
  treePosition_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ShieldCommitmentsConnection = {
  __typename?: 'ShieldCommitmentsConnection';
  edges: Array<ShieldCommitmentEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The height of the processed part of the chain */
  height?: Maybe<Scalars['Int']['output']>;
};

export type Token = {
  __typename?: 'Token';
  id: Scalars['String']['output'];
  tokenAddress: Scalars['Bytes']['output'];
  tokenSubID: Scalars['String']['output'];
  tokenType: TokenType;
};

export type TokenEdge = {
  __typename?: 'TokenEdge';
  cursor: Scalars['String']['output'];
  node: Token;
};

export type TokenOrderByInput =
  | 'id_ASC'
  | 'id_ASC_NULLS_FIRST'
  | 'id_DESC'
  | 'id_DESC_NULLS_LAST'
  | 'tokenAddress_ASC'
  | 'tokenAddress_ASC_NULLS_FIRST'
  | 'tokenAddress_DESC'
  | 'tokenAddress_DESC_NULLS_LAST'
  | 'tokenSubID_ASC'
  | 'tokenSubID_ASC_NULLS_FIRST'
  | 'tokenSubID_DESC'
  | 'tokenSubID_DESC_NULLS_LAST'
  | 'tokenType_ASC'
  | 'tokenType_ASC_NULLS_FIRST'
  | 'tokenType_DESC'
  | 'tokenType_DESC_NULLS_LAST';

export type TokenType =
  | 'ERC20'
  | 'ERC721'
  | 'ERC1155';

export type TokenWhereInput = {
  AND?: InputMaybe<Array<TokenWhereInput>>;
  OR?: InputMaybe<Array<TokenWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_eq?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tokenAddress_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  tokenSubID_contains?: InputMaybe<Scalars['String']['input']>;
  tokenSubID_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tokenSubID_endsWith?: InputMaybe<Scalars['String']['input']>;
  tokenSubID_eq?: InputMaybe<Scalars['String']['input']>;
  tokenSubID_gt?: InputMaybe<Scalars['String']['input']>;
  tokenSubID_gte?: InputMaybe<Scalars['String']['input']>;
  tokenSubID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenSubID_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tokenSubID_lt?: InputMaybe<Scalars['String']['input']>;
  tokenSubID_lte?: InputMaybe<Scalars['String']['input']>;
  tokenSubID_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenSubID_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tokenSubID_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  tokenSubID_not_eq?: InputMaybe<Scalars['String']['input']>;
  tokenSubID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenSubID_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  tokenSubID_startsWith?: InputMaybe<Scalars['String']['input']>;
  tokenType_eq?: InputMaybe<TokenType>;
  tokenType_in?: InputMaybe<Array<TokenType>>;
  tokenType_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tokenType_not_eq?: InputMaybe<TokenType>;
  tokenType_not_in?: InputMaybe<Array<TokenType>>;
};

export type TokensConnection = {
  __typename?: 'TokensConnection';
  edges: Array<TokenEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TransactCommitment = Commitment & {
  __typename?: 'TransactCommitment';
  batchStartTreePosition: Scalars['Int']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  ciphertext: CommitmentCiphertext;
  commitmentType: CommitmentType;
  hash: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  transactionHash: Scalars['Bytes']['output'];
  treeNumber: Scalars['Int']['output'];
  treePosition: Scalars['Int']['output'];
};

export type TransactCommitmentEdge = {
  __typename?: 'TransactCommitmentEdge';
  cursor: Scalars['String']['output'];
  node: TransactCommitment;
};

export type TransactCommitmentOrderByInput =
  | 'batchStartTreePosition_ASC'
  | 'batchStartTreePosition_ASC_NULLS_FIRST'
  | 'batchStartTreePosition_DESC'
  | 'batchStartTreePosition_DESC_NULLS_LAST'
  | 'blockNumber_ASC'
  | 'blockNumber_ASC_NULLS_FIRST'
  | 'blockNumber_DESC'
  | 'blockNumber_DESC_NULLS_LAST'
  | 'blockTimestamp_ASC'
  | 'blockTimestamp_ASC_NULLS_FIRST'
  | 'blockTimestamp_DESC'
  | 'blockTimestamp_DESC_NULLS_LAST'
  | 'ciphertext_annotationData_ASC'
  | 'ciphertext_annotationData_ASC_NULLS_FIRST'
  | 'ciphertext_annotationData_DESC'
  | 'ciphertext_annotationData_DESC_NULLS_LAST'
  | 'ciphertext_blindedReceiverViewingKey_ASC'
  | 'ciphertext_blindedReceiverViewingKey_ASC_NULLS_FIRST'
  | 'ciphertext_blindedReceiverViewingKey_DESC'
  | 'ciphertext_blindedReceiverViewingKey_DESC_NULLS_LAST'
  | 'ciphertext_blindedSenderViewingKey_ASC'
  | 'ciphertext_blindedSenderViewingKey_ASC_NULLS_FIRST'
  | 'ciphertext_blindedSenderViewingKey_DESC'
  | 'ciphertext_blindedSenderViewingKey_DESC_NULLS_LAST'
  | 'ciphertext_id_ASC'
  | 'ciphertext_id_ASC_NULLS_FIRST'
  | 'ciphertext_id_DESC'
  | 'ciphertext_id_DESC_NULLS_LAST'
  | 'ciphertext_memo_ASC'
  | 'ciphertext_memo_ASC_NULLS_FIRST'
  | 'ciphertext_memo_DESC'
  | 'ciphertext_memo_DESC_NULLS_LAST'
  | 'commitmentType_ASC'
  | 'commitmentType_ASC_NULLS_FIRST'
  | 'commitmentType_DESC'
  | 'commitmentType_DESC_NULLS_LAST'
  | 'hash_ASC'
  | 'hash_ASC_NULLS_FIRST'
  | 'hash_DESC'
  | 'hash_DESC_NULLS_LAST'
  | 'id_ASC'
  | 'id_ASC_NULLS_FIRST'
  | 'id_DESC'
  | 'id_DESC_NULLS_LAST'
  | 'transactionHash_ASC'
  | 'transactionHash_ASC_NULLS_FIRST'
  | 'transactionHash_DESC'
  | 'transactionHash_DESC_NULLS_LAST'
  | 'treeNumber_ASC'
  | 'treeNumber_ASC_NULLS_FIRST'
  | 'treeNumber_DESC'
  | 'treeNumber_DESC_NULLS_LAST'
  | 'treePosition_ASC'
  | 'treePosition_ASC_NULLS_FIRST'
  | 'treePosition_DESC'
  | 'treePosition_DESC_NULLS_LAST';

export type TransactCommitmentWhereInput = {
  AND?: InputMaybe<Array<TransactCommitmentWhereInput>>;
  OR?: InputMaybe<Array<TransactCommitmentWhereInput>>;
  batchStartTreePosition_eq?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_gt?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_gte?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  batchStartTreePosition_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  batchStartTreePosition_lt?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_lte?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_not_eq?: InputMaybe<Scalars['Int']['input']>;
  batchStartTreePosition_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ciphertext?: InputMaybe<CommitmentCiphertextWhereInput>;
  ciphertext_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  commitmentType_eq?: InputMaybe<CommitmentType>;
  commitmentType_in?: InputMaybe<Array<CommitmentType>>;
  commitmentType_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  commitmentType_not_eq?: InputMaybe<CommitmentType>;
  commitmentType_not_in?: InputMaybe<Array<CommitmentType>>;
  hash_eq?: InputMaybe<Scalars['BigInt']['input']>;
  hash_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hash_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hash_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hash_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hash_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hash_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  transactionHash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  transactionHash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  treeNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treeNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  treeNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  treeNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treePosition_eq?: InputMaybe<Scalars['Int']['input']>;
  treePosition_gt?: InputMaybe<Scalars['Int']['input']>;
  treePosition_gte?: InputMaybe<Scalars['Int']['input']>;
  treePosition_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treePosition_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  treePosition_lt?: InputMaybe<Scalars['Int']['input']>;
  treePosition_lte?: InputMaybe<Scalars['Int']['input']>;
  treePosition_not_eq?: InputMaybe<Scalars['Int']['input']>;
  treePosition_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type TransactCommitmentsConnection = {
  __typename?: 'TransactCommitmentsConnection';
  edges: Array<TransactCommitmentEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Transaction = TransactionInterface & {
  __typename?: 'Transaction';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  boundParamsHash: Scalars['Bytes']['output'];
  commitments: Array<Scalars['Bytes']['output']>;
  hasUnshield: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  merkleRoot: Scalars['Bytes']['output'];
  nullifiers: Array<Scalars['Bytes']['output']>;
  transactionHash: Scalars['Bytes']['output'];
  unshieldToAddress: Scalars['Bytes']['output'];
  unshieldToken: Token;
  unshieldValue: Scalars['BigInt']['output'];
  utxoBatchStartPositionOut: Scalars['BigInt']['output'];
  utxoTreeIn: Scalars['BigInt']['output'];
  utxoTreeOut: Scalars['BigInt']['output'];
  verificationHash: Scalars['Bytes']['output'];
};

export type TransactionEdge = {
  __typename?: 'TransactionEdge';
  cursor: Scalars['String']['output'];
  node: Transaction;
};

export type TransactionInterface = {
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  boundParamsHash: Scalars['Bytes']['output'];
  commitments: Array<Scalars['Bytes']['output']>;
  hasUnshield: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  merkleRoot: Scalars['Bytes']['output'];
  nullifiers: Array<Scalars['Bytes']['output']>;
  transactionHash: Scalars['Bytes']['output'];
  unshieldToAddress: Scalars['Bytes']['output'];
  unshieldToken: Token;
  unshieldValue: Scalars['BigInt']['output'];
  utxoBatchStartPositionOut: Scalars['BigInt']['output'];
  utxoTreeIn: Scalars['BigInt']['output'];
  utxoTreeOut: Scalars['BigInt']['output'];
  verificationHash: Scalars['Bytes']['output'];
};

export type TransactionOrderByInput =
  | 'blockNumber_ASC'
  | 'blockNumber_ASC_NULLS_FIRST'
  | 'blockNumber_DESC'
  | 'blockNumber_DESC_NULLS_LAST'
  | 'blockTimestamp_ASC'
  | 'blockTimestamp_ASC_NULLS_FIRST'
  | 'blockTimestamp_DESC'
  | 'blockTimestamp_DESC_NULLS_LAST'
  | 'boundParamsHash_ASC'
  | 'boundParamsHash_ASC_NULLS_FIRST'
  | 'boundParamsHash_DESC'
  | 'boundParamsHash_DESC_NULLS_LAST'
  | 'hasUnshield_ASC'
  | 'hasUnshield_ASC_NULLS_FIRST'
  | 'hasUnshield_DESC'
  | 'hasUnshield_DESC_NULLS_LAST'
  | 'id_ASC'
  | 'id_ASC_NULLS_FIRST'
  | 'id_DESC'
  | 'id_DESC_NULLS_LAST'
  | 'merkleRoot_ASC'
  | 'merkleRoot_ASC_NULLS_FIRST'
  | 'merkleRoot_DESC'
  | 'merkleRoot_DESC_NULLS_LAST'
  | 'transactionHash_ASC'
  | 'transactionHash_ASC_NULLS_FIRST'
  | 'transactionHash_DESC'
  | 'transactionHash_DESC_NULLS_LAST'
  | 'unshieldToAddress_ASC'
  | 'unshieldToAddress_ASC_NULLS_FIRST'
  | 'unshieldToAddress_DESC'
  | 'unshieldToAddress_DESC_NULLS_LAST'
  | 'unshieldToken_id_ASC'
  | 'unshieldToken_id_ASC_NULLS_FIRST'
  | 'unshieldToken_id_DESC'
  | 'unshieldToken_id_DESC_NULLS_LAST'
  | 'unshieldToken_tokenAddress_ASC'
  | 'unshieldToken_tokenAddress_ASC_NULLS_FIRST'
  | 'unshieldToken_tokenAddress_DESC'
  | 'unshieldToken_tokenAddress_DESC_NULLS_LAST'
  | 'unshieldToken_tokenSubID_ASC'
  | 'unshieldToken_tokenSubID_ASC_NULLS_FIRST'
  | 'unshieldToken_tokenSubID_DESC'
  | 'unshieldToken_tokenSubID_DESC_NULLS_LAST'
  | 'unshieldToken_tokenType_ASC'
  | 'unshieldToken_tokenType_ASC_NULLS_FIRST'
  | 'unshieldToken_tokenType_DESC'
  | 'unshieldToken_tokenType_DESC_NULLS_LAST'
  | 'unshieldValue_ASC'
  | 'unshieldValue_ASC_NULLS_FIRST'
  | 'unshieldValue_DESC'
  | 'unshieldValue_DESC_NULLS_LAST'
  | 'utxoBatchStartPositionOut_ASC'
  | 'utxoBatchStartPositionOut_ASC_NULLS_FIRST'
  | 'utxoBatchStartPositionOut_DESC'
  | 'utxoBatchStartPositionOut_DESC_NULLS_LAST'
  | 'utxoTreeIn_ASC'
  | 'utxoTreeIn_ASC_NULLS_FIRST'
  | 'utxoTreeIn_DESC'
  | 'utxoTreeIn_DESC_NULLS_LAST'
  | 'utxoTreeOut_ASC'
  | 'utxoTreeOut_ASC_NULLS_FIRST'
  | 'utxoTreeOut_DESC'
  | 'utxoTreeOut_DESC_NULLS_LAST'
  | 'verificationHash_ASC'
  | 'verificationHash_ASC_NULLS_FIRST'
  | 'verificationHash_DESC'
  | 'verificationHash_DESC_NULLS_LAST';

export type TransactionWhereInput = {
  AND?: InputMaybe<Array<TransactionWhereInput>>;
  OR?: InputMaybe<Array<TransactionWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  boundParamsHash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  boundParamsHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  boundParamsHash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  commitments_containsAll?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  commitments_containsAny?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  commitments_containsNone?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  commitments_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hasUnshield_eq?: InputMaybe<Scalars['Boolean']['input']>;
  hasUnshield_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hasUnshield_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  merkleRoot_eq?: InputMaybe<Scalars['Bytes']['input']>;
  merkleRoot_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  merkleRoot_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  nullifiers_containsAll?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  nullifiers_containsAny?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  nullifiers_containsNone?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  nullifiers_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  transactionHash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  transactionHash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  unshieldToAddress_eq?: InputMaybe<Scalars['Bytes']['input']>;
  unshieldToAddress_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  unshieldToAddress_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  unshieldToken?: InputMaybe<TokenWhereInput>;
  unshieldToken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  unshieldValue_eq?: InputMaybe<Scalars['BigInt']['input']>;
  unshieldValue_gt?: InputMaybe<Scalars['BigInt']['input']>;
  unshieldValue_gte?: InputMaybe<Scalars['BigInt']['input']>;
  unshieldValue_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unshieldValue_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  unshieldValue_lt?: InputMaybe<Scalars['BigInt']['input']>;
  unshieldValue_lte?: InputMaybe<Scalars['BigInt']['input']>;
  unshieldValue_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  unshieldValue_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  utxoBatchStartPositionOut_eq?: InputMaybe<Scalars['BigInt']['input']>;
  utxoBatchStartPositionOut_gt?: InputMaybe<Scalars['BigInt']['input']>;
  utxoBatchStartPositionOut_gte?: InputMaybe<Scalars['BigInt']['input']>;
  utxoBatchStartPositionOut_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  utxoBatchStartPositionOut_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  utxoBatchStartPositionOut_lt?: InputMaybe<Scalars['BigInt']['input']>;
  utxoBatchStartPositionOut_lte?: InputMaybe<Scalars['BigInt']['input']>;
  utxoBatchStartPositionOut_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  utxoBatchStartPositionOut_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  utxoTreeIn_eq?: InputMaybe<Scalars['BigInt']['input']>;
  utxoTreeIn_gt?: InputMaybe<Scalars['BigInt']['input']>;
  utxoTreeIn_gte?: InputMaybe<Scalars['BigInt']['input']>;
  utxoTreeIn_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  utxoTreeIn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  utxoTreeIn_lt?: InputMaybe<Scalars['BigInt']['input']>;
  utxoTreeIn_lte?: InputMaybe<Scalars['BigInt']['input']>;
  utxoTreeIn_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  utxoTreeIn_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  utxoTreeOut_eq?: InputMaybe<Scalars['BigInt']['input']>;
  utxoTreeOut_gt?: InputMaybe<Scalars['BigInt']['input']>;
  utxoTreeOut_gte?: InputMaybe<Scalars['BigInt']['input']>;
  utxoTreeOut_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  utxoTreeOut_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  utxoTreeOut_lt?: InputMaybe<Scalars['BigInt']['input']>;
  utxoTreeOut_lte?: InputMaybe<Scalars['BigInt']['input']>;
  utxoTreeOut_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  utxoTreeOut_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  verificationHash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  verificationHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  verificationHash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
};

export type TransactionsConnection = {
  __typename?: 'TransactionsConnection';
  edges: Array<TransactionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Unshield = {
  __typename?: 'Unshield';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  eventLogIndex: Scalars['BigInt']['output'];
  fee: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  to: Scalars['Bytes']['output'];
  token: Token;
  transactionHash: Scalars['Bytes']['output'];
};

export type UnshieldEdge = {
  __typename?: 'UnshieldEdge';
  cursor: Scalars['String']['output'];
  node: Unshield;
};

export type UnshieldOrderByInput =
  | 'amount_ASC'
  | 'amount_ASC_NULLS_FIRST'
  | 'amount_DESC'
  | 'amount_DESC_NULLS_LAST'
  | 'blockNumber_ASC'
  | 'blockNumber_ASC_NULLS_FIRST'
  | 'blockNumber_DESC'
  | 'blockNumber_DESC_NULLS_LAST'
  | 'blockTimestamp_ASC'
  | 'blockTimestamp_ASC_NULLS_FIRST'
  | 'blockTimestamp_DESC'
  | 'blockTimestamp_DESC_NULLS_LAST'
  | 'eventLogIndex_ASC'
  | 'eventLogIndex_ASC_NULLS_FIRST'
  | 'eventLogIndex_DESC'
  | 'eventLogIndex_DESC_NULLS_LAST'
  | 'fee_ASC'
  | 'fee_ASC_NULLS_FIRST'
  | 'fee_DESC'
  | 'fee_DESC_NULLS_LAST'
  | 'id_ASC'
  | 'id_ASC_NULLS_FIRST'
  | 'id_DESC'
  | 'id_DESC_NULLS_LAST'
  | 'to_ASC'
  | 'to_ASC_NULLS_FIRST'
  | 'to_DESC'
  | 'to_DESC_NULLS_LAST'
  | 'token_id_ASC'
  | 'token_id_ASC_NULLS_FIRST'
  | 'token_id_DESC'
  | 'token_id_DESC_NULLS_LAST'
  | 'token_tokenAddress_ASC'
  | 'token_tokenAddress_ASC_NULLS_FIRST'
  | 'token_tokenAddress_DESC'
  | 'token_tokenAddress_DESC_NULLS_LAST'
  | 'token_tokenSubID_ASC'
  | 'token_tokenSubID_ASC_NULLS_FIRST'
  | 'token_tokenSubID_DESC'
  | 'token_tokenSubID_DESC_NULLS_LAST'
  | 'token_tokenType_ASC'
  | 'token_tokenType_ASC_NULLS_FIRST'
  | 'token_tokenType_DESC'
  | 'token_tokenType_DESC_NULLS_LAST'
  | 'transactionHash_ASC'
  | 'transactionHash_ASC_NULLS_FIRST'
  | 'transactionHash_DESC'
  | 'transactionHash_DESC_NULLS_LAST';

export type UnshieldWhereInput = {
  AND?: InputMaybe<Array<UnshieldWhereInput>>;
  OR?: InputMaybe<Array<UnshieldWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventLogIndex_eq?: InputMaybe<Scalars['BigInt']['input']>;
  eventLogIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  eventLogIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  eventLogIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventLogIndex_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  eventLogIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  eventLogIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  eventLogIndex_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  eventLogIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  to_eq?: InputMaybe<Scalars['Bytes']['input']>;
  to_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  to_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  token?: InputMaybe<TokenWhereInput>;
  token_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  transactionHash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  transactionHash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
};

export type UnshieldsConnection = {
  __typename?: 'UnshieldsConnection';
  edges: Array<UnshieldEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type VerificationHash = {
  __typename?: 'VerificationHash';
  id: Scalars['String']['output'];
  verificationHash: Scalars['Bytes']['output'];
};

export type VerificationHashEdge = {
  __typename?: 'VerificationHashEdge';
  cursor: Scalars['String']['output'];
  node: VerificationHash;
};

export type VerificationHashOrderByInput =
  | 'id_ASC'
  | 'id_ASC_NULLS_FIRST'
  | 'id_DESC'
  | 'id_DESC_NULLS_LAST'
  | 'verificationHash_ASC'
  | 'verificationHash_ASC_NULLS_FIRST'
  | 'verificationHash_DESC'
  | 'verificationHash_DESC_NULLS_LAST';

export type VerificationHashWhereInput = {
  AND?: InputMaybe<Array<VerificationHashWhereInput>>;
  OR?: InputMaybe<Array<VerificationHashWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  verificationHash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  verificationHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  verificationHash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
};

export type VerificationHashesConnection = {
  __typename?: 'VerificationHashesConnection';
  edges: Array<VerificationHashEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type WhereIdInput = {
  id: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  Commitment: ( LegacyEncryptedCommitment ) | ( LegacyGeneratedCommitment ) | ( ShieldCommitment ) | ( TransactCommitment );
  TransactionInterface: ( Transaction );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  Ciphertext: ResolverTypeWrapper<Ciphertext>;
  CiphertextEdge: ResolverTypeWrapper<CiphertextEdge>;
  CiphertextOrderByInput: CiphertextOrderByInput;
  CiphertextWhereInput: CiphertextWhereInput;
  CiphertextsConnection: ResolverTypeWrapper<CiphertextsConnection>;
  Commitment: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Commitment']>;
  CommitmentBatchEventNew: ResolverTypeWrapper<CommitmentBatchEventNew>;
  CommitmentBatchEventNewEdge: ResolverTypeWrapper<CommitmentBatchEventNewEdge>;
  CommitmentBatchEventNewOrderByInput: CommitmentBatchEventNewOrderByInput;
  CommitmentBatchEventNewWhereInput: CommitmentBatchEventNewWhereInput;
  CommitmentBatchEventNewsConnection: ResolverTypeWrapper<CommitmentBatchEventNewsConnection>;
  CommitmentCiphertext: ResolverTypeWrapper<CommitmentCiphertext>;
  CommitmentCiphertextEdge: ResolverTypeWrapper<CommitmentCiphertextEdge>;
  CommitmentCiphertextOrderByInput: CommitmentCiphertextOrderByInput;
  CommitmentCiphertextWhereInput: CommitmentCiphertextWhereInput;
  CommitmentCiphertextsConnection: ResolverTypeWrapper<CommitmentCiphertextsConnection>;
  CommitmentEdge: ResolverTypeWrapper<Omit<CommitmentEdge, 'node'> & { node: ResolversTypes['Commitment'] }>;
  CommitmentOrderByInput: CommitmentOrderByInput;
  CommitmentPreimage: ResolverTypeWrapper<CommitmentPreimage>;
  CommitmentPreimageEdge: ResolverTypeWrapper<CommitmentPreimageEdge>;
  CommitmentPreimageOrderByInput: CommitmentPreimageOrderByInput;
  CommitmentPreimageWhereInput: CommitmentPreimageWhereInput;
  CommitmentPreimagesConnection: ResolverTypeWrapper<CommitmentPreimagesConnection>;
  CommitmentType: CommitmentType;
  CommitmentWhereInput: CommitmentWhereInput;
  CommitmentsConnection: ResolverTypeWrapper<Omit<CommitmentsConnection, 'edges'> & { edges: Array<ResolversTypes['CommitmentEdge']> }>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LegacyCommitmentCiphertext: ResolverTypeWrapper<LegacyCommitmentCiphertext>;
  LegacyCommitmentCiphertextEdge: ResolverTypeWrapper<LegacyCommitmentCiphertextEdge>;
  LegacyCommitmentCiphertextOrderByInput: LegacyCommitmentCiphertextOrderByInput;
  LegacyCommitmentCiphertextWhereInput: LegacyCommitmentCiphertextWhereInput;
  LegacyCommitmentCiphertextsConnection: ResolverTypeWrapper<LegacyCommitmentCiphertextsConnection>;
  LegacyEncryptedCommitment: ResolverTypeWrapper<LegacyEncryptedCommitment>;
  LegacyEncryptedCommitmentEdge: ResolverTypeWrapper<LegacyEncryptedCommitmentEdge>;
  LegacyEncryptedCommitmentOrderByInput: LegacyEncryptedCommitmentOrderByInput;
  LegacyEncryptedCommitmentWhereInput: LegacyEncryptedCommitmentWhereInput;
  LegacyEncryptedCommitmentsConnection: ResolverTypeWrapper<LegacyEncryptedCommitmentsConnection>;
  LegacyGeneratedCommitment: ResolverTypeWrapper<LegacyGeneratedCommitment>;
  LegacyGeneratedCommitmentEdge: ResolverTypeWrapper<LegacyGeneratedCommitmentEdge>;
  LegacyGeneratedCommitmentOrderByInput: LegacyGeneratedCommitmentOrderByInput;
  LegacyGeneratedCommitmentWhereInput: LegacyGeneratedCommitmentWhereInput;
  LegacyGeneratedCommitmentsConnection: ResolverTypeWrapper<LegacyGeneratedCommitmentsConnection>;
  Nullifier: ResolverTypeWrapper<Nullifier>;
  NullifierEdge: ResolverTypeWrapper<NullifierEdge>;
  NullifierOrderByInput: NullifierOrderByInput;
  NullifierWhereInput: NullifierWhereInput;
  NullifiersConnection: ResolverTypeWrapper<NullifiersConnection>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  ShieldCommitment: ResolverTypeWrapper<ShieldCommitment>;
  ShieldCommitmentEdge: ResolverTypeWrapper<ShieldCommitmentEdge>;
  ShieldCommitmentOrderByInput: ShieldCommitmentOrderByInput;
  ShieldCommitmentWhereInput: ShieldCommitmentWhereInput;
  ShieldCommitmentsConnection: ResolverTypeWrapper<ShieldCommitmentsConnection>;
  SquidStatus: ResolverTypeWrapper<SquidStatus>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Token: ResolverTypeWrapper<Token>;
  TokenEdge: ResolverTypeWrapper<TokenEdge>;
  TokenOrderByInput: TokenOrderByInput;
  TokenType: TokenType;
  TokenWhereInput: TokenWhereInput;
  TokensConnection: ResolverTypeWrapper<TokensConnection>;
  TransactCommitment: ResolverTypeWrapper<TransactCommitment>;
  TransactCommitmentEdge: ResolverTypeWrapper<TransactCommitmentEdge>;
  TransactCommitmentOrderByInput: TransactCommitmentOrderByInput;
  TransactCommitmentWhereInput: TransactCommitmentWhereInput;
  TransactCommitmentsConnection: ResolverTypeWrapper<TransactCommitmentsConnection>;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionEdge: ResolverTypeWrapper<TransactionEdge>;
  TransactionInterface: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['TransactionInterface']>;
  TransactionOrderByInput: TransactionOrderByInput;
  TransactionWhereInput: TransactionWhereInput;
  TransactionsConnection: ResolverTypeWrapper<TransactionsConnection>;
  Unshield: ResolverTypeWrapper<Unshield>;
  UnshieldEdge: ResolverTypeWrapper<UnshieldEdge>;
  UnshieldOrderByInput: UnshieldOrderByInput;
  UnshieldWhereInput: UnshieldWhereInput;
  UnshieldsConnection: ResolverTypeWrapper<UnshieldsConnection>;
  VerificationHash: ResolverTypeWrapper<VerificationHash>;
  VerificationHashEdge: ResolverTypeWrapper<VerificationHashEdge>;
  VerificationHashOrderByInput: VerificationHashOrderByInput;
  VerificationHashWhereInput: VerificationHashWhereInput;
  VerificationHashesConnection: ResolverTypeWrapper<VerificationHashesConnection>;
  WhereIdInput: WhereIdInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BigInt: Scalars['BigInt']['output'];
  Boolean: Scalars['Boolean']['output'];
  Bytes: Scalars['Bytes']['output'];
  Ciphertext: Ciphertext;
  CiphertextEdge: CiphertextEdge;
  CiphertextWhereInput: CiphertextWhereInput;
  CiphertextsConnection: CiphertextsConnection;
  Commitment: ResolversInterfaceTypes<ResolversParentTypes>['Commitment'];
  CommitmentBatchEventNew: CommitmentBatchEventNew;
  CommitmentBatchEventNewEdge: CommitmentBatchEventNewEdge;
  CommitmentBatchEventNewWhereInput: CommitmentBatchEventNewWhereInput;
  CommitmentBatchEventNewsConnection: CommitmentBatchEventNewsConnection;
  CommitmentCiphertext: CommitmentCiphertext;
  CommitmentCiphertextEdge: CommitmentCiphertextEdge;
  CommitmentCiphertextWhereInput: CommitmentCiphertextWhereInput;
  CommitmentCiphertextsConnection: CommitmentCiphertextsConnection;
  CommitmentEdge: Omit<CommitmentEdge, 'node'> & { node: ResolversParentTypes['Commitment'] };
  CommitmentPreimage: CommitmentPreimage;
  CommitmentPreimageEdge: CommitmentPreimageEdge;
  CommitmentPreimageWhereInput: CommitmentPreimageWhereInput;
  CommitmentPreimagesConnection: CommitmentPreimagesConnection;
  CommitmentWhereInput: CommitmentWhereInput;
  CommitmentsConnection: Omit<CommitmentsConnection, 'edges'> & { edges: Array<ResolversParentTypes['CommitmentEdge']> };
  Int: Scalars['Int']['output'];
  LegacyCommitmentCiphertext: LegacyCommitmentCiphertext;
  LegacyCommitmentCiphertextEdge: LegacyCommitmentCiphertextEdge;
  LegacyCommitmentCiphertextWhereInput: LegacyCommitmentCiphertextWhereInput;
  LegacyCommitmentCiphertextsConnection: LegacyCommitmentCiphertextsConnection;
  LegacyEncryptedCommitment: LegacyEncryptedCommitment;
  LegacyEncryptedCommitmentEdge: LegacyEncryptedCommitmentEdge;
  LegacyEncryptedCommitmentWhereInput: LegacyEncryptedCommitmentWhereInput;
  LegacyEncryptedCommitmentsConnection: LegacyEncryptedCommitmentsConnection;
  LegacyGeneratedCommitment: LegacyGeneratedCommitment;
  LegacyGeneratedCommitmentEdge: LegacyGeneratedCommitmentEdge;
  LegacyGeneratedCommitmentWhereInput: LegacyGeneratedCommitmentWhereInput;
  LegacyGeneratedCommitmentsConnection: LegacyGeneratedCommitmentsConnection;
  Nullifier: Nullifier;
  NullifierEdge: NullifierEdge;
  NullifierWhereInput: NullifierWhereInput;
  NullifiersConnection: NullifiersConnection;
  PageInfo: PageInfo;
  Query: {};
  ShieldCommitment: ShieldCommitment;
  ShieldCommitmentEdge: ShieldCommitmentEdge;
  ShieldCommitmentWhereInput: ShieldCommitmentWhereInput;
  ShieldCommitmentsConnection: ShieldCommitmentsConnection;
  SquidStatus: SquidStatus;
  String: Scalars['String']['output'];
  Token: Token;
  TokenEdge: TokenEdge;
  TokenWhereInput: TokenWhereInput;
  TokensConnection: TokensConnection;
  TransactCommitment: TransactCommitment;
  TransactCommitmentEdge: TransactCommitmentEdge;
  TransactCommitmentWhereInput: TransactCommitmentWhereInput;
  TransactCommitmentsConnection: TransactCommitmentsConnection;
  Transaction: Transaction;
  TransactionEdge: TransactionEdge;
  TransactionInterface: ResolversInterfaceTypes<ResolversParentTypes>['TransactionInterface'];
  TransactionWhereInput: TransactionWhereInput;
  TransactionsConnection: TransactionsConnection;
  Unshield: Unshield;
  UnshieldEdge: UnshieldEdge;
  UnshieldWhereInput: UnshieldWhereInput;
  UnshieldsConnection: UnshieldsConnection;
  VerificationHash: VerificationHash;
  VerificationHashEdge: VerificationHashEdge;
  VerificationHashWhereInput: VerificationHashWhereInput;
  VerificationHashesConnection: VerificationHashesConnection;
  WhereIdInput: WhereIdInput;
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CiphertextResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ciphertext'] = ResolversParentTypes['Ciphertext']> = {
  data?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  iv?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CiphertextEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CiphertextEdge'] = ResolversParentTypes['CiphertextEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Ciphertext'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CiphertextsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CiphertextsConnection'] = ResolversParentTypes['CiphertextsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CiphertextEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommitmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Commitment'] = ResolversParentTypes['Commitment']> = {
  __resolveType: TypeResolveFn<'LegacyEncryptedCommitment' | 'LegacyGeneratedCommitment' | 'ShieldCommitment' | 'TransactCommitment', ParentType, ContextType>;
  batchStartTreePosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  commitmentType?: Resolver<ResolversTypes['CommitmentType'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  treeNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  treePosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type CommitmentBatchEventNewResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommitmentBatchEventNew'] = ResolversParentTypes['CommitmentBatchEventNew']> = {
  batchStartTreePosition?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  treeNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommitmentBatchEventNewEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommitmentBatchEventNewEdge'] = ResolversParentTypes['CommitmentBatchEventNewEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['CommitmentBatchEventNew'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommitmentBatchEventNewsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommitmentBatchEventNewsConnection'] = ResolversParentTypes['CommitmentBatchEventNewsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CommitmentBatchEventNewEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommitmentCiphertextResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommitmentCiphertext'] = ResolversParentTypes['CommitmentCiphertext']> = {
  annotationData?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blindedReceiverViewingKey?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blindedSenderViewingKey?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  ciphertext?: Resolver<ResolversTypes['Ciphertext'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  memo?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommitmentCiphertextEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommitmentCiphertextEdge'] = ResolversParentTypes['CommitmentCiphertextEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['CommitmentCiphertext'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommitmentCiphertextsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommitmentCiphertextsConnection'] = ResolversParentTypes['CommitmentCiphertextsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CommitmentCiphertextEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommitmentEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommitmentEdge'] = ResolversParentTypes['CommitmentEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Commitment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommitmentPreimageResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommitmentPreimage'] = ResolversParentTypes['CommitmentPreimage']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  npk?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommitmentPreimageEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommitmentPreimageEdge'] = ResolversParentTypes['CommitmentPreimageEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['CommitmentPreimage'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommitmentPreimagesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommitmentPreimagesConnection'] = ResolversParentTypes['CommitmentPreimagesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CommitmentPreimageEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommitmentsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommitmentsConnection'] = ResolversParentTypes['CommitmentsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CommitmentEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LegacyCommitmentCiphertextResolvers<ContextType = any, ParentType extends ResolversParentTypes['LegacyCommitmentCiphertext'] = ResolversParentTypes['LegacyCommitmentCiphertext']> = {
  ciphertext?: Resolver<ResolversTypes['Ciphertext'], ParentType, ContextType>;
  ephemeralKeys?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  memo?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LegacyCommitmentCiphertextEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LegacyCommitmentCiphertextEdge'] = ResolversParentTypes['LegacyCommitmentCiphertextEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['LegacyCommitmentCiphertext'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LegacyCommitmentCiphertextsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LegacyCommitmentCiphertextsConnection'] = ResolversParentTypes['LegacyCommitmentCiphertextsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['LegacyCommitmentCiphertextEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LegacyEncryptedCommitmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['LegacyEncryptedCommitment'] = ResolversParentTypes['LegacyEncryptedCommitment']> = {
  batchStartTreePosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  ciphertext?: Resolver<ResolversTypes['LegacyCommitmentCiphertext'], ParentType, ContextType>;
  commitmentType?: Resolver<ResolversTypes['CommitmentType'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  treeNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  treePosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LegacyEncryptedCommitmentEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LegacyEncryptedCommitmentEdge'] = ResolversParentTypes['LegacyEncryptedCommitmentEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['LegacyEncryptedCommitment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LegacyEncryptedCommitmentsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LegacyEncryptedCommitmentsConnection'] = ResolversParentTypes['LegacyEncryptedCommitmentsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['LegacyEncryptedCommitmentEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LegacyGeneratedCommitmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['LegacyGeneratedCommitment'] = ResolversParentTypes['LegacyGeneratedCommitment']> = {
  batchStartTreePosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  commitmentType?: Resolver<ResolversTypes['CommitmentType'], ParentType, ContextType>;
  encryptedRandom?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preimage?: Resolver<ResolversTypes['CommitmentPreimage'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  treeNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  treePosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LegacyGeneratedCommitmentEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LegacyGeneratedCommitmentEdge'] = ResolversParentTypes['LegacyGeneratedCommitmentEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['LegacyGeneratedCommitment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LegacyGeneratedCommitmentsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LegacyGeneratedCommitmentsConnection'] = ResolversParentTypes['LegacyGeneratedCommitmentsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['LegacyGeneratedCommitmentEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NullifierResolvers<ContextType = any, ParentType extends ResolversParentTypes['Nullifier'] = ResolversParentTypes['Nullifier']> = {
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nullifier?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  treeNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NullifierEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['NullifierEdge'] = ResolversParentTypes['NullifierEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Nullifier'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NullifiersConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['NullifiersConnection'] = ResolversParentTypes['NullifiersConnection']> = {
  edges?: Resolver<Array<ResolversTypes['NullifierEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  ciphertextById?: Resolver<Maybe<ResolversTypes['Ciphertext']>, ParentType, ContextType, RequireFields<QueryCiphertextByIdArgs, 'id'>>;
  ciphertextByUniqueInput?: Resolver<Maybe<ResolversTypes['Ciphertext']>, ParentType, ContextType, RequireFields<QueryCiphertextByUniqueInputArgs, 'where'>>;
  ciphertexts?: Resolver<Array<ResolversTypes['Ciphertext']>, ParentType, ContextType, Partial<QueryCiphertextsArgs>>;
  ciphertextsConnection?: Resolver<ResolversTypes['CiphertextsConnection'], ParentType, ContextType, RequireFields<QueryCiphertextsConnectionArgs, 'orderBy'>>;
  commitmentBatchEventNewById?: Resolver<Maybe<ResolversTypes['CommitmentBatchEventNew']>, ParentType, ContextType, RequireFields<QueryCommitmentBatchEventNewByIdArgs, 'id'>>;
  commitmentBatchEventNewByUniqueInput?: Resolver<Maybe<ResolversTypes['CommitmentBatchEventNew']>, ParentType, ContextType, RequireFields<QueryCommitmentBatchEventNewByUniqueInputArgs, 'where'>>;
  commitmentBatchEventNews?: Resolver<Array<ResolversTypes['CommitmentBatchEventNew']>, ParentType, ContextType, Partial<QueryCommitmentBatchEventNewsArgs>>;
  commitmentBatchEventNewsConnection?: Resolver<ResolversTypes['CommitmentBatchEventNewsConnection'], ParentType, ContextType, RequireFields<QueryCommitmentBatchEventNewsConnectionArgs, 'orderBy'>>;
  commitmentCiphertextById?: Resolver<Maybe<ResolversTypes['CommitmentCiphertext']>, ParentType, ContextType, RequireFields<QueryCommitmentCiphertextByIdArgs, 'id'>>;
  commitmentCiphertextByUniqueInput?: Resolver<Maybe<ResolversTypes['CommitmentCiphertext']>, ParentType, ContextType, RequireFields<QueryCommitmentCiphertextByUniqueInputArgs, 'where'>>;
  commitmentCiphertexts?: Resolver<Array<ResolversTypes['CommitmentCiphertext']>, ParentType, ContextType, Partial<QueryCommitmentCiphertextsArgs>>;
  commitmentCiphertextsConnection?: Resolver<ResolversTypes['CommitmentCiphertextsConnection'], ParentType, ContextType, RequireFields<QueryCommitmentCiphertextsConnectionArgs, 'orderBy'>>;
  commitmentPreimageById?: Resolver<Maybe<ResolversTypes['CommitmentPreimage']>, ParentType, ContextType, RequireFields<QueryCommitmentPreimageByIdArgs, 'id'>>;
  commitmentPreimageByUniqueInput?: Resolver<Maybe<ResolversTypes['CommitmentPreimage']>, ParentType, ContextType, RequireFields<QueryCommitmentPreimageByUniqueInputArgs, 'where'>>;
  commitmentPreimages?: Resolver<Array<ResolversTypes['CommitmentPreimage']>, ParentType, ContextType, Partial<QueryCommitmentPreimagesArgs>>;
  commitmentPreimagesConnection?: Resolver<ResolversTypes['CommitmentPreimagesConnection'], ParentType, ContextType, RequireFields<QueryCommitmentPreimagesConnectionArgs, 'orderBy'>>;
  commitments?: Resolver<Array<ResolversTypes['Commitment']>, ParentType, ContextType, Partial<QueryCommitmentsArgs>>;
  commitmentsConnection?: Resolver<ResolversTypes['CommitmentsConnection'], ParentType, ContextType, RequireFields<QueryCommitmentsConnectionArgs, 'orderBy'>>;
  legacyCommitmentCiphertextById?: Resolver<Maybe<ResolversTypes['LegacyCommitmentCiphertext']>, ParentType, ContextType, RequireFields<QueryLegacyCommitmentCiphertextByIdArgs, 'id'>>;
  legacyCommitmentCiphertextByUniqueInput?: Resolver<Maybe<ResolversTypes['LegacyCommitmentCiphertext']>, ParentType, ContextType, RequireFields<QueryLegacyCommitmentCiphertextByUniqueInputArgs, 'where'>>;
  legacyCommitmentCiphertexts?: Resolver<Array<ResolversTypes['LegacyCommitmentCiphertext']>, ParentType, ContextType, Partial<QueryLegacyCommitmentCiphertextsArgs>>;
  legacyCommitmentCiphertextsConnection?: Resolver<ResolversTypes['LegacyCommitmentCiphertextsConnection'], ParentType, ContextType, RequireFields<QueryLegacyCommitmentCiphertextsConnectionArgs, 'orderBy'>>;
  legacyEncryptedCommitmentById?: Resolver<Maybe<ResolversTypes['LegacyEncryptedCommitment']>, ParentType, ContextType, RequireFields<QueryLegacyEncryptedCommitmentByIdArgs, 'id'>>;
  legacyEncryptedCommitmentByUniqueInput?: Resolver<Maybe<ResolversTypes['LegacyEncryptedCommitment']>, ParentType, ContextType, RequireFields<QueryLegacyEncryptedCommitmentByUniqueInputArgs, 'where'>>;
  legacyEncryptedCommitments?: Resolver<Array<ResolversTypes['LegacyEncryptedCommitment']>, ParentType, ContextType, Partial<QueryLegacyEncryptedCommitmentsArgs>>;
  legacyEncryptedCommitmentsConnection?: Resolver<ResolversTypes['LegacyEncryptedCommitmentsConnection'], ParentType, ContextType, RequireFields<QueryLegacyEncryptedCommitmentsConnectionArgs, 'orderBy'>>;
  legacyGeneratedCommitmentById?: Resolver<Maybe<ResolversTypes['LegacyGeneratedCommitment']>, ParentType, ContextType, RequireFields<QueryLegacyGeneratedCommitmentByIdArgs, 'id'>>;
  legacyGeneratedCommitmentByUniqueInput?: Resolver<Maybe<ResolversTypes['LegacyGeneratedCommitment']>, ParentType, ContextType, RequireFields<QueryLegacyGeneratedCommitmentByUniqueInputArgs, 'where'>>;
  legacyGeneratedCommitments?: Resolver<Array<ResolversTypes['LegacyGeneratedCommitment']>, ParentType, ContextType, Partial<QueryLegacyGeneratedCommitmentsArgs>>;
  legacyGeneratedCommitmentsConnection?: Resolver<ResolversTypes['LegacyGeneratedCommitmentsConnection'], ParentType, ContextType, RequireFields<QueryLegacyGeneratedCommitmentsConnectionArgs, 'orderBy'>>;
  nullifierById?: Resolver<Maybe<ResolversTypes['Nullifier']>, ParentType, ContextType, RequireFields<QueryNullifierByIdArgs, 'id'>>;
  nullifierByUniqueInput?: Resolver<Maybe<ResolversTypes['Nullifier']>, ParentType, ContextType, RequireFields<QueryNullifierByUniqueInputArgs, 'where'>>;
  nullifiers?: Resolver<Array<ResolversTypes['Nullifier']>, ParentType, ContextType, Partial<QueryNullifiersArgs>>;
  nullifiersConnection?: Resolver<ResolversTypes['NullifiersConnection'], ParentType, ContextType, RequireFields<QueryNullifiersConnectionArgs, 'orderBy'>>;
  shieldCommitmentById?: Resolver<Maybe<ResolversTypes['ShieldCommitment']>, ParentType, ContextType, RequireFields<QueryShieldCommitmentByIdArgs, 'id'>>;
  shieldCommitmentByUniqueInput?: Resolver<Maybe<ResolversTypes['ShieldCommitment']>, ParentType, ContextType, RequireFields<QueryShieldCommitmentByUniqueInputArgs, 'where'>>;
  shieldCommitments?: Resolver<Array<ResolversTypes['ShieldCommitment']>, ParentType, ContextType, Partial<QueryShieldCommitmentsArgs>>;
  shieldCommitmentsConnection?: Resolver<ResolversTypes['ShieldCommitmentsConnection'], ParentType, ContextType, RequireFields<QueryShieldCommitmentsConnectionArgs, 'orderBy'>>;
  squidStatus?: Resolver<Maybe<ResolversTypes['SquidStatus']>, ParentType, ContextType>;
  tokenById?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QueryTokenByIdArgs, 'id'>>;
  tokenByUniqueInput?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QueryTokenByUniqueInputArgs, 'where'>>;
  tokens?: Resolver<Array<ResolversTypes['Token']>, ParentType, ContextType, Partial<QueryTokensArgs>>;
  tokensConnection?: Resolver<ResolversTypes['TokensConnection'], ParentType, ContextType, RequireFields<QueryTokensConnectionArgs, 'orderBy'>>;
  transactCommitmentById?: Resolver<Maybe<ResolversTypes['TransactCommitment']>, ParentType, ContextType, RequireFields<QueryTransactCommitmentByIdArgs, 'id'>>;
  transactCommitmentByUniqueInput?: Resolver<Maybe<ResolversTypes['TransactCommitment']>, ParentType, ContextType, RequireFields<QueryTransactCommitmentByUniqueInputArgs, 'where'>>;
  transactCommitments?: Resolver<Array<ResolversTypes['TransactCommitment']>, ParentType, ContextType, Partial<QueryTransactCommitmentsArgs>>;
  transactCommitmentsConnection?: Resolver<ResolversTypes['TransactCommitmentsConnection'], ParentType, ContextType, RequireFields<QueryTransactCommitmentsConnectionArgs, 'orderBy'>>;
  transactionById?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionByIdArgs, 'id'>>;
  transactionByUniqueInput?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionByUniqueInputArgs, 'where'>>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, Partial<QueryTransactionsArgs>>;
  transactionsConnection?: Resolver<ResolversTypes['TransactionsConnection'], ParentType, ContextType, RequireFields<QueryTransactionsConnectionArgs, 'orderBy'>>;
  unshieldById?: Resolver<Maybe<ResolversTypes['Unshield']>, ParentType, ContextType, RequireFields<QueryUnshieldByIdArgs, 'id'>>;
  unshieldByUniqueInput?: Resolver<Maybe<ResolversTypes['Unshield']>, ParentType, ContextType, RequireFields<QueryUnshieldByUniqueInputArgs, 'where'>>;
  unshields?: Resolver<Array<ResolversTypes['Unshield']>, ParentType, ContextType, Partial<QueryUnshieldsArgs>>;
  unshieldsConnection?: Resolver<ResolversTypes['UnshieldsConnection'], ParentType, ContextType, RequireFields<QueryUnshieldsConnectionArgs, 'orderBy'>>;
  verificationHashById?: Resolver<Maybe<ResolversTypes['VerificationHash']>, ParentType, ContextType, RequireFields<QueryVerificationHashByIdArgs, 'id'>>;
  verificationHashByUniqueInput?: Resolver<Maybe<ResolversTypes['VerificationHash']>, ParentType, ContextType, RequireFields<QueryVerificationHashByUniqueInputArgs, 'where'>>;
  verificationHashes?: Resolver<Array<ResolversTypes['VerificationHash']>, ParentType, ContextType, Partial<QueryVerificationHashesArgs>>;
  verificationHashesConnection?: Resolver<ResolversTypes['VerificationHashesConnection'], ParentType, ContextType, RequireFields<QueryVerificationHashesConnectionArgs, 'orderBy'>>;
};

export type ShieldCommitmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShieldCommitment'] = ResolversParentTypes['ShieldCommitment']> = {
  batchStartTreePosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  commitmentType?: Resolver<ResolversTypes['CommitmentType'], ParentType, ContextType>;
  encryptedBundle?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  fee?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preimage?: Resolver<ResolversTypes['CommitmentPreimage'], ParentType, ContextType>;
  shieldKey?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  treeNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  treePosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShieldCommitmentEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShieldCommitmentEdge'] = ResolversParentTypes['ShieldCommitmentEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ShieldCommitment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShieldCommitmentsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShieldCommitmentsConnection'] = ResolversParentTypes['ShieldCommitmentsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ShieldCommitmentEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SquidStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['SquidStatus'] = ResolversParentTypes['SquidStatus']> = {
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenSubID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenType?: Resolver<ResolversTypes['TokenType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenEdge'] = ResolversParentTypes['TokenEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokensConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokensConnection'] = ResolversParentTypes['TokensConnection']> = {
  edges?: Resolver<Array<ResolversTypes['TokenEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactCommitmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactCommitment'] = ResolversParentTypes['TransactCommitment']> = {
  batchStartTreePosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  ciphertext?: Resolver<ResolversTypes['CommitmentCiphertext'], ParentType, ContextType>;
  commitmentType?: Resolver<ResolversTypes['CommitmentType'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  treeNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  treePosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactCommitmentEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactCommitmentEdge'] = ResolversParentTypes['TransactCommitmentEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['TransactCommitment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactCommitmentsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactCommitmentsConnection'] = ResolversParentTypes['TransactCommitmentsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['TransactCommitmentEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  boundParamsHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  commitments?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  hasUnshield?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  merkleRoot?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  nullifiers?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  unshieldToAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  unshieldToken?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  unshieldValue?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  utxoBatchStartPositionOut?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  utxoTreeIn?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  utxoTreeOut?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  verificationHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionEdge'] = ResolversParentTypes['TransactionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionInterface'] = ResolversParentTypes['TransactionInterface']> = {
  __resolveType: TypeResolveFn<'Transaction', ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  boundParamsHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  commitments?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  hasUnshield?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  merkleRoot?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  nullifiers?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  unshieldToAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  unshieldToken?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  unshieldValue?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  utxoBatchStartPositionOut?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  utxoTreeIn?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  utxoTreeOut?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  verificationHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
};

export type TransactionsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionsConnection'] = ResolversParentTypes['TransactionsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['TransactionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnshieldResolvers<ContextType = any, ParentType extends ResolversParentTypes['Unshield'] = ResolversParentTypes['Unshield']> = {
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  eventLogIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnshieldEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnshieldEdge'] = ResolversParentTypes['UnshieldEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Unshield'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnshieldsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnshieldsConnection'] = ResolversParentTypes['UnshieldsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UnshieldEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerificationHashResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerificationHash'] = ResolversParentTypes['VerificationHash']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verificationHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerificationHashEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerificationHashEdge'] = ResolversParentTypes['VerificationHashEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['VerificationHash'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerificationHashesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerificationHashesConnection'] = ResolversParentTypes['VerificationHashesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['VerificationHashEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Ciphertext?: CiphertextResolvers<ContextType>;
  CiphertextEdge?: CiphertextEdgeResolvers<ContextType>;
  CiphertextsConnection?: CiphertextsConnectionResolvers<ContextType>;
  Commitment?: CommitmentResolvers<ContextType>;
  CommitmentBatchEventNew?: CommitmentBatchEventNewResolvers<ContextType>;
  CommitmentBatchEventNewEdge?: CommitmentBatchEventNewEdgeResolvers<ContextType>;
  CommitmentBatchEventNewsConnection?: CommitmentBatchEventNewsConnectionResolvers<ContextType>;
  CommitmentCiphertext?: CommitmentCiphertextResolvers<ContextType>;
  CommitmentCiphertextEdge?: CommitmentCiphertextEdgeResolvers<ContextType>;
  CommitmentCiphertextsConnection?: CommitmentCiphertextsConnectionResolvers<ContextType>;
  CommitmentEdge?: CommitmentEdgeResolvers<ContextType>;
  CommitmentPreimage?: CommitmentPreimageResolvers<ContextType>;
  CommitmentPreimageEdge?: CommitmentPreimageEdgeResolvers<ContextType>;
  CommitmentPreimagesConnection?: CommitmentPreimagesConnectionResolvers<ContextType>;
  CommitmentsConnection?: CommitmentsConnectionResolvers<ContextType>;
  LegacyCommitmentCiphertext?: LegacyCommitmentCiphertextResolvers<ContextType>;
  LegacyCommitmentCiphertextEdge?: LegacyCommitmentCiphertextEdgeResolvers<ContextType>;
  LegacyCommitmentCiphertextsConnection?: LegacyCommitmentCiphertextsConnectionResolvers<ContextType>;
  LegacyEncryptedCommitment?: LegacyEncryptedCommitmentResolvers<ContextType>;
  LegacyEncryptedCommitmentEdge?: LegacyEncryptedCommitmentEdgeResolvers<ContextType>;
  LegacyEncryptedCommitmentsConnection?: LegacyEncryptedCommitmentsConnectionResolvers<ContextType>;
  LegacyGeneratedCommitment?: LegacyGeneratedCommitmentResolvers<ContextType>;
  LegacyGeneratedCommitmentEdge?: LegacyGeneratedCommitmentEdgeResolvers<ContextType>;
  LegacyGeneratedCommitmentsConnection?: LegacyGeneratedCommitmentsConnectionResolvers<ContextType>;
  Nullifier?: NullifierResolvers<ContextType>;
  NullifierEdge?: NullifierEdgeResolvers<ContextType>;
  NullifiersConnection?: NullifiersConnectionResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ShieldCommitment?: ShieldCommitmentResolvers<ContextType>;
  ShieldCommitmentEdge?: ShieldCommitmentEdgeResolvers<ContextType>;
  ShieldCommitmentsConnection?: ShieldCommitmentsConnectionResolvers<ContextType>;
  SquidStatus?: SquidStatusResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  TokenEdge?: TokenEdgeResolvers<ContextType>;
  TokensConnection?: TokensConnectionResolvers<ContextType>;
  TransactCommitment?: TransactCommitmentResolvers<ContextType>;
  TransactCommitmentEdge?: TransactCommitmentEdgeResolvers<ContextType>;
  TransactCommitmentsConnection?: TransactCommitmentsConnectionResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  TransactionEdge?: TransactionEdgeResolvers<ContextType>;
  TransactionInterface?: TransactionInterfaceResolvers<ContextType>;
  TransactionsConnection?: TransactionsConnectionResolvers<ContextType>;
  Unshield?: UnshieldResolvers<ContextType>;
  UnshieldEdge?: UnshieldEdgeResolvers<ContextType>;
  UnshieldsConnection?: UnshieldsConnectionResolvers<ContextType>;
  VerificationHash?: VerificationHashResolvers<ContextType>;
  VerificationHashEdge?: VerificationHashEdgeResolvers<ContextType>;
  VerificationHashesConnection?: VerificationHashesConnectionResolvers<ContextType>;
};


export type BigInt = Scalars["BigInt"];
export type Bytes = Scalars["Bytes"];