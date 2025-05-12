export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Big number integer */
  BigInt: { input: string; output: string; }
  /** Binary data encoded as a hex string always prefixed with 0x */
  Bytes: { input: string; output: string; }
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

export const enum CiphertextOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IvAsc = 'iv_ASC',
  IvAscNullsFirst = 'iv_ASC_NULLS_FIRST',
  IvDesc = 'iv_DESC',
  IvDescNullsLast = 'iv_DESC_NULLS_LAST',
  TagAsc = 'tag_ASC',
  TagAscNullsFirst = 'tag_ASC_NULLS_FIRST',
  TagDesc = 'tag_DESC',
  TagDescNullsLast = 'tag_DESC_NULLS_LAST'
};

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

export const enum CommitmentBatchEventNewOrderByInput {
  BatchStartTreePositionAsc = 'batchStartTreePosition_ASC',
  BatchStartTreePositionAscNullsFirst = 'batchStartTreePosition_ASC_NULLS_FIRST',
  BatchStartTreePositionDesc = 'batchStartTreePosition_DESC',
  BatchStartTreePositionDescNullsLast = 'batchStartTreePosition_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TreeNumberAsc = 'treeNumber_ASC',
  TreeNumberAscNullsFirst = 'treeNumber_ASC_NULLS_FIRST',
  TreeNumberDesc = 'treeNumber_DESC',
  TreeNumberDescNullsLast = 'treeNumber_DESC_NULLS_LAST'
};

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

export const enum CommitmentCiphertextOrderByInput {
  AnnotationDataAsc = 'annotationData_ASC',
  AnnotationDataAscNullsFirst = 'annotationData_ASC_NULLS_FIRST',
  AnnotationDataDesc = 'annotationData_DESC',
  AnnotationDataDescNullsLast = 'annotationData_DESC_NULLS_LAST',
  BlindedReceiverViewingKeyAsc = 'blindedReceiverViewingKey_ASC',
  BlindedReceiverViewingKeyAscNullsFirst = 'blindedReceiverViewingKey_ASC_NULLS_FIRST',
  BlindedReceiverViewingKeyDesc = 'blindedReceiverViewingKey_DESC',
  BlindedReceiverViewingKeyDescNullsLast = 'blindedReceiverViewingKey_DESC_NULLS_LAST',
  BlindedSenderViewingKeyAsc = 'blindedSenderViewingKey_ASC',
  BlindedSenderViewingKeyAscNullsFirst = 'blindedSenderViewingKey_ASC_NULLS_FIRST',
  BlindedSenderViewingKeyDesc = 'blindedSenderViewingKey_DESC',
  BlindedSenderViewingKeyDescNullsLast = 'blindedSenderViewingKey_DESC_NULLS_LAST',
  CiphertextIdAsc = 'ciphertext_id_ASC',
  CiphertextIdAscNullsFirst = 'ciphertext_id_ASC_NULLS_FIRST',
  CiphertextIdDesc = 'ciphertext_id_DESC',
  CiphertextIdDescNullsLast = 'ciphertext_id_DESC_NULLS_LAST',
  CiphertextIvAsc = 'ciphertext_iv_ASC',
  CiphertextIvAscNullsFirst = 'ciphertext_iv_ASC_NULLS_FIRST',
  CiphertextIvDesc = 'ciphertext_iv_DESC',
  CiphertextIvDescNullsLast = 'ciphertext_iv_DESC_NULLS_LAST',
  CiphertextTagAsc = 'ciphertext_tag_ASC',
  CiphertextTagAscNullsFirst = 'ciphertext_tag_ASC_NULLS_FIRST',
  CiphertextTagDesc = 'ciphertext_tag_DESC',
  CiphertextTagDescNullsLast = 'ciphertext_tag_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MemoAsc = 'memo_ASC',
  MemoAscNullsFirst = 'memo_ASC_NULLS_FIRST',
  MemoDesc = 'memo_DESC',
  MemoDescNullsLast = 'memo_DESC_NULLS_LAST'
};

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

export const enum CommitmentOrderByInput {
  TypeAsc = '_type_ASC',
  TypeDesc = '_type_DESC',
  BatchStartTreePositionAsc = 'batchStartTreePosition_ASC',
  BatchStartTreePositionAscNullsFirst = 'batchStartTreePosition_ASC_NULLS_FIRST',
  BatchStartTreePositionDesc = 'batchStartTreePosition_DESC',
  BatchStartTreePositionDescNullsLast = 'batchStartTreePosition_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  BlockTimestampAsc = 'blockTimestamp_ASC',
  BlockTimestampAscNullsFirst = 'blockTimestamp_ASC_NULLS_FIRST',
  BlockTimestampDesc = 'blockTimestamp_DESC',
  BlockTimestampDescNullsLast = 'blockTimestamp_DESC_NULLS_LAST',
  CommitmentTypeAsc = 'commitmentType_ASC',
  CommitmentTypeAscNullsFirst = 'commitmentType_ASC_NULLS_FIRST',
  CommitmentTypeDesc = 'commitmentType_DESC',
  CommitmentTypeDescNullsLast = 'commitmentType_DESC_NULLS_LAST',
  HashAsc = 'hash_ASC',
  HashAscNullsFirst = 'hash_ASC_NULLS_FIRST',
  HashDesc = 'hash_DESC',
  HashDescNullsLast = 'hash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TransactionHashAsc = 'transactionHash_ASC',
  TransactionHashAscNullsFirst = 'transactionHash_ASC_NULLS_FIRST',
  TransactionHashDesc = 'transactionHash_DESC',
  TransactionHashDescNullsLast = 'transactionHash_DESC_NULLS_LAST',
  TreeNumberAsc = 'treeNumber_ASC',
  TreeNumberAscNullsFirst = 'treeNumber_ASC_NULLS_FIRST',
  TreeNumberDesc = 'treeNumber_DESC',
  TreeNumberDescNullsLast = 'treeNumber_DESC_NULLS_LAST',
  TreePositionAsc = 'treePosition_ASC',
  TreePositionAscNullsFirst = 'treePosition_ASC_NULLS_FIRST',
  TreePositionDesc = 'treePosition_DESC',
  TreePositionDescNullsLast = 'treePosition_DESC_NULLS_LAST'
};

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

export const enum CommitmentPreimageOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NpkAsc = 'npk_ASC',
  NpkAscNullsFirst = 'npk_ASC_NULLS_FIRST',
  NpkDesc = 'npk_DESC',
  NpkDescNullsLast = 'npk_DESC_NULLS_LAST',
  TokenIdAsc = 'token_id_ASC',
  TokenIdAscNullsFirst = 'token_id_ASC_NULLS_FIRST',
  TokenIdDesc = 'token_id_DESC',
  TokenIdDescNullsLast = 'token_id_DESC_NULLS_LAST',
  TokenTokenAddressAsc = 'token_tokenAddress_ASC',
  TokenTokenAddressAscNullsFirst = 'token_tokenAddress_ASC_NULLS_FIRST',
  TokenTokenAddressDesc = 'token_tokenAddress_DESC',
  TokenTokenAddressDescNullsLast = 'token_tokenAddress_DESC_NULLS_LAST',
  TokenTokenSubIdAsc = 'token_tokenSubID_ASC',
  TokenTokenSubIdAscNullsFirst = 'token_tokenSubID_ASC_NULLS_FIRST',
  TokenTokenSubIdDesc = 'token_tokenSubID_DESC',
  TokenTokenSubIdDescNullsLast = 'token_tokenSubID_DESC_NULLS_LAST',
  TokenTokenTypeAsc = 'token_tokenType_ASC',
  TokenTokenTypeAscNullsFirst = 'token_tokenType_ASC_NULLS_FIRST',
  TokenTokenTypeDesc = 'token_tokenType_DESC',
  TokenTokenTypeDescNullsLast = 'token_tokenType_DESC_NULLS_LAST',
  ValueAsc = 'value_ASC',
  ValueAscNullsFirst = 'value_ASC_NULLS_FIRST',
  ValueDesc = 'value_DESC',
  ValueDescNullsLast = 'value_DESC_NULLS_LAST'
};

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

export const enum CommitmentType {
  LegacyEncryptedCommitment = 'LegacyEncryptedCommitment',
  LegacyGeneratedCommitment = 'LegacyGeneratedCommitment',
  ShieldCommitment = 'ShieldCommitment',
  TransactCommitment = 'TransactCommitment'
};

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

export const enum LegacyCommitmentCiphertextOrderByInput {
  CiphertextIdAsc = 'ciphertext_id_ASC',
  CiphertextIdAscNullsFirst = 'ciphertext_id_ASC_NULLS_FIRST',
  CiphertextIdDesc = 'ciphertext_id_DESC',
  CiphertextIdDescNullsLast = 'ciphertext_id_DESC_NULLS_LAST',
  CiphertextIvAsc = 'ciphertext_iv_ASC',
  CiphertextIvAscNullsFirst = 'ciphertext_iv_ASC_NULLS_FIRST',
  CiphertextIvDesc = 'ciphertext_iv_DESC',
  CiphertextIvDescNullsLast = 'ciphertext_iv_DESC_NULLS_LAST',
  CiphertextTagAsc = 'ciphertext_tag_ASC',
  CiphertextTagAscNullsFirst = 'ciphertext_tag_ASC_NULLS_FIRST',
  CiphertextTagDesc = 'ciphertext_tag_DESC',
  CiphertextTagDescNullsLast = 'ciphertext_tag_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST'
};

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

export const enum LegacyEncryptedCommitmentOrderByInput {
  BatchStartTreePositionAsc = 'batchStartTreePosition_ASC',
  BatchStartTreePositionAscNullsFirst = 'batchStartTreePosition_ASC_NULLS_FIRST',
  BatchStartTreePositionDesc = 'batchStartTreePosition_DESC',
  BatchStartTreePositionDescNullsLast = 'batchStartTreePosition_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  BlockTimestampAsc = 'blockTimestamp_ASC',
  BlockTimestampAscNullsFirst = 'blockTimestamp_ASC_NULLS_FIRST',
  BlockTimestampDesc = 'blockTimestamp_DESC',
  BlockTimestampDescNullsLast = 'blockTimestamp_DESC_NULLS_LAST',
  CiphertextIdAsc = 'ciphertext_id_ASC',
  CiphertextIdAscNullsFirst = 'ciphertext_id_ASC_NULLS_FIRST',
  CiphertextIdDesc = 'ciphertext_id_DESC',
  CiphertextIdDescNullsLast = 'ciphertext_id_DESC_NULLS_LAST',
  CommitmentTypeAsc = 'commitmentType_ASC',
  CommitmentTypeAscNullsFirst = 'commitmentType_ASC_NULLS_FIRST',
  CommitmentTypeDesc = 'commitmentType_DESC',
  CommitmentTypeDescNullsLast = 'commitmentType_DESC_NULLS_LAST',
  HashAsc = 'hash_ASC',
  HashAscNullsFirst = 'hash_ASC_NULLS_FIRST',
  HashDesc = 'hash_DESC',
  HashDescNullsLast = 'hash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TransactionHashAsc = 'transactionHash_ASC',
  TransactionHashAscNullsFirst = 'transactionHash_ASC_NULLS_FIRST',
  TransactionHashDesc = 'transactionHash_DESC',
  TransactionHashDescNullsLast = 'transactionHash_DESC_NULLS_LAST',
  TreeNumberAsc = 'treeNumber_ASC',
  TreeNumberAscNullsFirst = 'treeNumber_ASC_NULLS_FIRST',
  TreeNumberDesc = 'treeNumber_DESC',
  TreeNumberDescNullsLast = 'treeNumber_DESC_NULLS_LAST',
  TreePositionAsc = 'treePosition_ASC',
  TreePositionAscNullsFirst = 'treePosition_ASC_NULLS_FIRST',
  TreePositionDesc = 'treePosition_DESC',
  TreePositionDescNullsLast = 'treePosition_DESC_NULLS_LAST'
};

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

export const enum LegacyGeneratedCommitmentOrderByInput {
  BatchStartTreePositionAsc = 'batchStartTreePosition_ASC',
  BatchStartTreePositionAscNullsFirst = 'batchStartTreePosition_ASC_NULLS_FIRST',
  BatchStartTreePositionDesc = 'batchStartTreePosition_DESC',
  BatchStartTreePositionDescNullsLast = 'batchStartTreePosition_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  BlockTimestampAsc = 'blockTimestamp_ASC',
  BlockTimestampAscNullsFirst = 'blockTimestamp_ASC_NULLS_FIRST',
  BlockTimestampDesc = 'blockTimestamp_DESC',
  BlockTimestampDescNullsLast = 'blockTimestamp_DESC_NULLS_LAST',
  CommitmentTypeAsc = 'commitmentType_ASC',
  CommitmentTypeAscNullsFirst = 'commitmentType_ASC_NULLS_FIRST',
  CommitmentTypeDesc = 'commitmentType_DESC',
  CommitmentTypeDescNullsLast = 'commitmentType_DESC_NULLS_LAST',
  HashAsc = 'hash_ASC',
  HashAscNullsFirst = 'hash_ASC_NULLS_FIRST',
  HashDesc = 'hash_DESC',
  HashDescNullsLast = 'hash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PreimageIdAsc = 'preimage_id_ASC',
  PreimageIdAscNullsFirst = 'preimage_id_ASC_NULLS_FIRST',
  PreimageIdDesc = 'preimage_id_DESC',
  PreimageIdDescNullsLast = 'preimage_id_DESC_NULLS_LAST',
  PreimageNpkAsc = 'preimage_npk_ASC',
  PreimageNpkAscNullsFirst = 'preimage_npk_ASC_NULLS_FIRST',
  PreimageNpkDesc = 'preimage_npk_DESC',
  PreimageNpkDescNullsLast = 'preimage_npk_DESC_NULLS_LAST',
  PreimageValueAsc = 'preimage_value_ASC',
  PreimageValueAscNullsFirst = 'preimage_value_ASC_NULLS_FIRST',
  PreimageValueDesc = 'preimage_value_DESC',
  PreimageValueDescNullsLast = 'preimage_value_DESC_NULLS_LAST',
  TransactionHashAsc = 'transactionHash_ASC',
  TransactionHashAscNullsFirst = 'transactionHash_ASC_NULLS_FIRST',
  TransactionHashDesc = 'transactionHash_DESC',
  TransactionHashDescNullsLast = 'transactionHash_DESC_NULLS_LAST',
  TreeNumberAsc = 'treeNumber_ASC',
  TreeNumberAscNullsFirst = 'treeNumber_ASC_NULLS_FIRST',
  TreeNumberDesc = 'treeNumber_DESC',
  TreeNumberDescNullsLast = 'treeNumber_DESC_NULLS_LAST',
  TreePositionAsc = 'treePosition_ASC',
  TreePositionAscNullsFirst = 'treePosition_ASC_NULLS_FIRST',
  TreePositionDesc = 'treePosition_DESC',
  TreePositionDescNullsLast = 'treePosition_DESC_NULLS_LAST'
};

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

export const enum NullifierOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  BlockTimestampAsc = 'blockTimestamp_ASC',
  BlockTimestampAscNullsFirst = 'blockTimestamp_ASC_NULLS_FIRST',
  BlockTimestampDesc = 'blockTimestamp_DESC',
  BlockTimestampDescNullsLast = 'blockTimestamp_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NullifierAsc = 'nullifier_ASC',
  NullifierAscNullsFirst = 'nullifier_ASC_NULLS_FIRST',
  NullifierDesc = 'nullifier_DESC',
  NullifierDescNullsLast = 'nullifier_DESC_NULLS_LAST',
  TransactionHashAsc = 'transactionHash_ASC',
  TransactionHashAscNullsFirst = 'transactionHash_ASC_NULLS_FIRST',
  TransactionHashDesc = 'transactionHash_DESC',
  TransactionHashDescNullsLast = 'transactionHash_DESC_NULLS_LAST',
  TreeNumberAsc = 'treeNumber_ASC',
  TreeNumberAscNullsFirst = 'treeNumber_ASC_NULLS_FIRST',
  TreeNumberDesc = 'treeNumber_DESC',
  TreeNumberDescNullsLast = 'treeNumber_DESC_NULLS_LAST'
};

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

export const enum ShieldCommitmentOrderByInput {
  BatchStartTreePositionAsc = 'batchStartTreePosition_ASC',
  BatchStartTreePositionAscNullsFirst = 'batchStartTreePosition_ASC_NULLS_FIRST',
  BatchStartTreePositionDesc = 'batchStartTreePosition_DESC',
  BatchStartTreePositionDescNullsLast = 'batchStartTreePosition_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  BlockTimestampAsc = 'blockTimestamp_ASC',
  BlockTimestampAscNullsFirst = 'blockTimestamp_ASC_NULLS_FIRST',
  BlockTimestampDesc = 'blockTimestamp_DESC',
  BlockTimestampDescNullsLast = 'blockTimestamp_DESC_NULLS_LAST',
  CommitmentTypeAsc = 'commitmentType_ASC',
  CommitmentTypeAscNullsFirst = 'commitmentType_ASC_NULLS_FIRST',
  CommitmentTypeDesc = 'commitmentType_DESC',
  CommitmentTypeDescNullsLast = 'commitmentType_DESC_NULLS_LAST',
  FeeAsc = 'fee_ASC',
  FeeAscNullsFirst = 'fee_ASC_NULLS_FIRST',
  FeeDesc = 'fee_DESC',
  FeeDescNullsLast = 'fee_DESC_NULLS_LAST',
  HashAsc = 'hash_ASC',
  HashAscNullsFirst = 'hash_ASC_NULLS_FIRST',
  HashDesc = 'hash_DESC',
  HashDescNullsLast = 'hash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PreimageIdAsc = 'preimage_id_ASC',
  PreimageIdAscNullsFirst = 'preimage_id_ASC_NULLS_FIRST',
  PreimageIdDesc = 'preimage_id_DESC',
  PreimageIdDescNullsLast = 'preimage_id_DESC_NULLS_LAST',
  PreimageNpkAsc = 'preimage_npk_ASC',
  PreimageNpkAscNullsFirst = 'preimage_npk_ASC_NULLS_FIRST',
  PreimageNpkDesc = 'preimage_npk_DESC',
  PreimageNpkDescNullsLast = 'preimage_npk_DESC_NULLS_LAST',
  PreimageValueAsc = 'preimage_value_ASC',
  PreimageValueAscNullsFirst = 'preimage_value_ASC_NULLS_FIRST',
  PreimageValueDesc = 'preimage_value_DESC',
  PreimageValueDescNullsLast = 'preimage_value_DESC_NULLS_LAST',
  ShieldKeyAsc = 'shieldKey_ASC',
  ShieldKeyAscNullsFirst = 'shieldKey_ASC_NULLS_FIRST',
  ShieldKeyDesc = 'shieldKey_DESC',
  ShieldKeyDescNullsLast = 'shieldKey_DESC_NULLS_LAST',
  TransactionHashAsc = 'transactionHash_ASC',
  TransactionHashAscNullsFirst = 'transactionHash_ASC_NULLS_FIRST',
  TransactionHashDesc = 'transactionHash_DESC',
  TransactionHashDescNullsLast = 'transactionHash_DESC_NULLS_LAST',
  TreeNumberAsc = 'treeNumber_ASC',
  TreeNumberAscNullsFirst = 'treeNumber_ASC_NULLS_FIRST',
  TreeNumberDesc = 'treeNumber_DESC',
  TreeNumberDescNullsLast = 'treeNumber_DESC_NULLS_LAST',
  TreePositionAsc = 'treePosition_ASC',
  TreePositionAscNullsFirst = 'treePosition_ASC_NULLS_FIRST',
  TreePositionDesc = 'treePosition_DESC',
  TreePositionDescNullsLast = 'treePosition_DESC_NULLS_LAST'
};

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

export const enum TokenOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TokenAddressAsc = 'tokenAddress_ASC',
  TokenAddressAscNullsFirst = 'tokenAddress_ASC_NULLS_FIRST',
  TokenAddressDesc = 'tokenAddress_DESC',
  TokenAddressDescNullsLast = 'tokenAddress_DESC_NULLS_LAST',
  TokenSubIdAsc = 'tokenSubID_ASC',
  TokenSubIdAscNullsFirst = 'tokenSubID_ASC_NULLS_FIRST',
  TokenSubIdDesc = 'tokenSubID_DESC',
  TokenSubIdDescNullsLast = 'tokenSubID_DESC_NULLS_LAST',
  TokenTypeAsc = 'tokenType_ASC',
  TokenTypeAscNullsFirst = 'tokenType_ASC_NULLS_FIRST',
  TokenTypeDesc = 'tokenType_DESC',
  TokenTypeDescNullsLast = 'tokenType_DESC_NULLS_LAST'
};

export const enum TokenType {
  Erc20 = 'ERC20',
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155'
};

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

export const enum TransactCommitmentOrderByInput {
  BatchStartTreePositionAsc = 'batchStartTreePosition_ASC',
  BatchStartTreePositionAscNullsFirst = 'batchStartTreePosition_ASC_NULLS_FIRST',
  BatchStartTreePositionDesc = 'batchStartTreePosition_DESC',
  BatchStartTreePositionDescNullsLast = 'batchStartTreePosition_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  BlockTimestampAsc = 'blockTimestamp_ASC',
  BlockTimestampAscNullsFirst = 'blockTimestamp_ASC_NULLS_FIRST',
  BlockTimestampDesc = 'blockTimestamp_DESC',
  BlockTimestampDescNullsLast = 'blockTimestamp_DESC_NULLS_LAST',
  CiphertextAnnotationDataAsc = 'ciphertext_annotationData_ASC',
  CiphertextAnnotationDataAscNullsFirst = 'ciphertext_annotationData_ASC_NULLS_FIRST',
  CiphertextAnnotationDataDesc = 'ciphertext_annotationData_DESC',
  CiphertextAnnotationDataDescNullsLast = 'ciphertext_annotationData_DESC_NULLS_LAST',
  CiphertextBlindedReceiverViewingKeyAsc = 'ciphertext_blindedReceiverViewingKey_ASC',
  CiphertextBlindedReceiverViewingKeyAscNullsFirst = 'ciphertext_blindedReceiverViewingKey_ASC_NULLS_FIRST',
  CiphertextBlindedReceiverViewingKeyDesc = 'ciphertext_blindedReceiverViewingKey_DESC',
  CiphertextBlindedReceiverViewingKeyDescNullsLast = 'ciphertext_blindedReceiverViewingKey_DESC_NULLS_LAST',
  CiphertextBlindedSenderViewingKeyAsc = 'ciphertext_blindedSenderViewingKey_ASC',
  CiphertextBlindedSenderViewingKeyAscNullsFirst = 'ciphertext_blindedSenderViewingKey_ASC_NULLS_FIRST',
  CiphertextBlindedSenderViewingKeyDesc = 'ciphertext_blindedSenderViewingKey_DESC',
  CiphertextBlindedSenderViewingKeyDescNullsLast = 'ciphertext_blindedSenderViewingKey_DESC_NULLS_LAST',
  CiphertextIdAsc = 'ciphertext_id_ASC',
  CiphertextIdAscNullsFirst = 'ciphertext_id_ASC_NULLS_FIRST',
  CiphertextIdDesc = 'ciphertext_id_DESC',
  CiphertextIdDescNullsLast = 'ciphertext_id_DESC_NULLS_LAST',
  CiphertextMemoAsc = 'ciphertext_memo_ASC',
  CiphertextMemoAscNullsFirst = 'ciphertext_memo_ASC_NULLS_FIRST',
  CiphertextMemoDesc = 'ciphertext_memo_DESC',
  CiphertextMemoDescNullsLast = 'ciphertext_memo_DESC_NULLS_LAST',
  CommitmentTypeAsc = 'commitmentType_ASC',
  CommitmentTypeAscNullsFirst = 'commitmentType_ASC_NULLS_FIRST',
  CommitmentTypeDesc = 'commitmentType_DESC',
  CommitmentTypeDescNullsLast = 'commitmentType_DESC_NULLS_LAST',
  HashAsc = 'hash_ASC',
  HashAscNullsFirst = 'hash_ASC_NULLS_FIRST',
  HashDesc = 'hash_DESC',
  HashDescNullsLast = 'hash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TransactionHashAsc = 'transactionHash_ASC',
  TransactionHashAscNullsFirst = 'transactionHash_ASC_NULLS_FIRST',
  TransactionHashDesc = 'transactionHash_DESC',
  TransactionHashDescNullsLast = 'transactionHash_DESC_NULLS_LAST',
  TreeNumberAsc = 'treeNumber_ASC',
  TreeNumberAscNullsFirst = 'treeNumber_ASC_NULLS_FIRST',
  TreeNumberDesc = 'treeNumber_DESC',
  TreeNumberDescNullsLast = 'treeNumber_DESC_NULLS_LAST',
  TreePositionAsc = 'treePosition_ASC',
  TreePositionAscNullsFirst = 'treePosition_ASC_NULLS_FIRST',
  TreePositionDesc = 'treePosition_DESC',
  TreePositionDescNullsLast = 'treePosition_DESC_NULLS_LAST'
};

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

export const enum TransactionOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  BlockTimestampAsc = 'blockTimestamp_ASC',
  BlockTimestampAscNullsFirst = 'blockTimestamp_ASC_NULLS_FIRST',
  BlockTimestampDesc = 'blockTimestamp_DESC',
  BlockTimestampDescNullsLast = 'blockTimestamp_DESC_NULLS_LAST',
  BoundParamsHashAsc = 'boundParamsHash_ASC',
  BoundParamsHashAscNullsFirst = 'boundParamsHash_ASC_NULLS_FIRST',
  BoundParamsHashDesc = 'boundParamsHash_DESC',
  BoundParamsHashDescNullsLast = 'boundParamsHash_DESC_NULLS_LAST',
  HasUnshieldAsc = 'hasUnshield_ASC',
  HasUnshieldAscNullsFirst = 'hasUnshield_ASC_NULLS_FIRST',
  HasUnshieldDesc = 'hasUnshield_DESC',
  HasUnshieldDescNullsLast = 'hasUnshield_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MerkleRootAsc = 'merkleRoot_ASC',
  MerkleRootAscNullsFirst = 'merkleRoot_ASC_NULLS_FIRST',
  MerkleRootDesc = 'merkleRoot_DESC',
  MerkleRootDescNullsLast = 'merkleRoot_DESC_NULLS_LAST',
  TransactionHashAsc = 'transactionHash_ASC',
  TransactionHashAscNullsFirst = 'transactionHash_ASC_NULLS_FIRST',
  TransactionHashDesc = 'transactionHash_DESC',
  TransactionHashDescNullsLast = 'transactionHash_DESC_NULLS_LAST',
  UnshieldToAddressAsc = 'unshieldToAddress_ASC',
  UnshieldToAddressAscNullsFirst = 'unshieldToAddress_ASC_NULLS_FIRST',
  UnshieldToAddressDesc = 'unshieldToAddress_DESC',
  UnshieldToAddressDescNullsLast = 'unshieldToAddress_DESC_NULLS_LAST',
  UnshieldTokenIdAsc = 'unshieldToken_id_ASC',
  UnshieldTokenIdAscNullsFirst = 'unshieldToken_id_ASC_NULLS_FIRST',
  UnshieldTokenIdDesc = 'unshieldToken_id_DESC',
  UnshieldTokenIdDescNullsLast = 'unshieldToken_id_DESC_NULLS_LAST',
  UnshieldTokenTokenAddressAsc = 'unshieldToken_tokenAddress_ASC',
  UnshieldTokenTokenAddressAscNullsFirst = 'unshieldToken_tokenAddress_ASC_NULLS_FIRST',
  UnshieldTokenTokenAddressDesc = 'unshieldToken_tokenAddress_DESC',
  UnshieldTokenTokenAddressDescNullsLast = 'unshieldToken_tokenAddress_DESC_NULLS_LAST',
  UnshieldTokenTokenSubIdAsc = 'unshieldToken_tokenSubID_ASC',
  UnshieldTokenTokenSubIdAscNullsFirst = 'unshieldToken_tokenSubID_ASC_NULLS_FIRST',
  UnshieldTokenTokenSubIdDesc = 'unshieldToken_tokenSubID_DESC',
  UnshieldTokenTokenSubIdDescNullsLast = 'unshieldToken_tokenSubID_DESC_NULLS_LAST',
  UnshieldTokenTokenTypeAsc = 'unshieldToken_tokenType_ASC',
  UnshieldTokenTokenTypeAscNullsFirst = 'unshieldToken_tokenType_ASC_NULLS_FIRST',
  UnshieldTokenTokenTypeDesc = 'unshieldToken_tokenType_DESC',
  UnshieldTokenTokenTypeDescNullsLast = 'unshieldToken_tokenType_DESC_NULLS_LAST',
  UnshieldValueAsc = 'unshieldValue_ASC',
  UnshieldValueAscNullsFirst = 'unshieldValue_ASC_NULLS_FIRST',
  UnshieldValueDesc = 'unshieldValue_DESC',
  UnshieldValueDescNullsLast = 'unshieldValue_DESC_NULLS_LAST',
  UtxoBatchStartPositionOutAsc = 'utxoBatchStartPositionOut_ASC',
  UtxoBatchStartPositionOutAscNullsFirst = 'utxoBatchStartPositionOut_ASC_NULLS_FIRST',
  UtxoBatchStartPositionOutDesc = 'utxoBatchStartPositionOut_DESC',
  UtxoBatchStartPositionOutDescNullsLast = 'utxoBatchStartPositionOut_DESC_NULLS_LAST',
  UtxoTreeInAsc = 'utxoTreeIn_ASC',
  UtxoTreeInAscNullsFirst = 'utxoTreeIn_ASC_NULLS_FIRST',
  UtxoTreeInDesc = 'utxoTreeIn_DESC',
  UtxoTreeInDescNullsLast = 'utxoTreeIn_DESC_NULLS_LAST',
  UtxoTreeOutAsc = 'utxoTreeOut_ASC',
  UtxoTreeOutAscNullsFirst = 'utxoTreeOut_ASC_NULLS_FIRST',
  UtxoTreeOutDesc = 'utxoTreeOut_DESC',
  UtxoTreeOutDescNullsLast = 'utxoTreeOut_DESC_NULLS_LAST',
  VerificationHashAsc = 'verificationHash_ASC',
  VerificationHashAscNullsFirst = 'verificationHash_ASC_NULLS_FIRST',
  VerificationHashDesc = 'verificationHash_DESC',
  VerificationHashDescNullsLast = 'verificationHash_DESC_NULLS_LAST'
};

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

export const enum UnshieldOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  BlockTimestampAsc = 'blockTimestamp_ASC',
  BlockTimestampAscNullsFirst = 'blockTimestamp_ASC_NULLS_FIRST',
  BlockTimestampDesc = 'blockTimestamp_DESC',
  BlockTimestampDescNullsLast = 'blockTimestamp_DESC_NULLS_LAST',
  EventLogIndexAsc = 'eventLogIndex_ASC',
  EventLogIndexAscNullsFirst = 'eventLogIndex_ASC_NULLS_FIRST',
  EventLogIndexDesc = 'eventLogIndex_DESC',
  EventLogIndexDescNullsLast = 'eventLogIndex_DESC_NULLS_LAST',
  FeeAsc = 'fee_ASC',
  FeeAscNullsFirst = 'fee_ASC_NULLS_FIRST',
  FeeDesc = 'fee_DESC',
  FeeDescNullsLast = 'fee_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ToAsc = 'to_ASC',
  ToAscNullsFirst = 'to_ASC_NULLS_FIRST',
  ToDesc = 'to_DESC',
  ToDescNullsLast = 'to_DESC_NULLS_LAST',
  TokenIdAsc = 'token_id_ASC',
  TokenIdAscNullsFirst = 'token_id_ASC_NULLS_FIRST',
  TokenIdDesc = 'token_id_DESC',
  TokenIdDescNullsLast = 'token_id_DESC_NULLS_LAST',
  TokenTokenAddressAsc = 'token_tokenAddress_ASC',
  TokenTokenAddressAscNullsFirst = 'token_tokenAddress_ASC_NULLS_FIRST',
  TokenTokenAddressDesc = 'token_tokenAddress_DESC',
  TokenTokenAddressDescNullsLast = 'token_tokenAddress_DESC_NULLS_LAST',
  TokenTokenSubIdAsc = 'token_tokenSubID_ASC',
  TokenTokenSubIdAscNullsFirst = 'token_tokenSubID_ASC_NULLS_FIRST',
  TokenTokenSubIdDesc = 'token_tokenSubID_DESC',
  TokenTokenSubIdDescNullsLast = 'token_tokenSubID_DESC_NULLS_LAST',
  TokenTokenTypeAsc = 'token_tokenType_ASC',
  TokenTokenTypeAscNullsFirst = 'token_tokenType_ASC_NULLS_FIRST',
  TokenTokenTypeDesc = 'token_tokenType_DESC',
  TokenTokenTypeDescNullsLast = 'token_tokenType_DESC_NULLS_LAST',
  TransactionHashAsc = 'transactionHash_ASC',
  TransactionHashAscNullsFirst = 'transactionHash_ASC_NULLS_FIRST',
  TransactionHashDesc = 'transactionHash_DESC',
  TransactionHashDescNullsLast = 'transactionHash_DESC_NULLS_LAST'
};

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

export const enum VerificationHashOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  VerificationHashAsc = 'verificationHash_ASC',
  VerificationHashAscNullsFirst = 'verificationHash_ASC_NULLS_FIRST',
  VerificationHashDesc = 'verificationHash_DESC',
  VerificationHashDescNullsLast = 'verificationHash_DESC_NULLS_LAST'
};

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


      // Define missing scalar types that might be referenced
      type Bytes = string;
      type BigInt = string;
      type Int = number;
      // Note: Maybe is already defined by GraphQL Codegen so we don't need to define it again
      


      type Primitive =
          | null
          | undefined
          | string
          | number
          | boolean
          | symbol
          | bigint

export type FieldSelector<Entity> = {
               [Key in keyof Entity]-?:
                 Entity[Key] extends (infer ItemType)[]
                   ? ItemType extends Primitive
                     ? Key
                     : { [P in Key]: FieldSelector<ItemType>[] }
                   : Entity[Key] extends Primitive
                     ? Key
                     : { [P in Key]: FieldSelector<Entity[Key]>[] }
             } [keyof Entity];

type AddFields<Args, TypeFields> = Args & { fields: FieldSelector<TypeFields>[] }

type GenerateIO<
      Key extends keyof Query,
      QueryArgs,
      Field = Query[Key],
      Entity = Field extends Array<infer IT1>
        ? IT1
        : Field extends Maybe<infer IT2>
          ? NonNullable<IT2>
          : Field,
      Wrapper = Field extends Array<infer _>
        ? 'array'
        : Field extends Maybe<infer _>
          ? 'maybe'
        : 'simple'
    > = {
      entity: Entity;
      input: AddFields<QueryArgs, Entity>;
      output: Field;
      wrapper: Wrapper;
    }

export type EntityQueryMap = {
      ciphertextById: GenerateIO<'ciphertextById', QueryCiphertextByIdArgs>
  ciphertextByUniqueInput: GenerateIO<'ciphertextByUniqueInput', QueryCiphertextByUniqueInputArgs>
  ciphertexts: GenerateIO<'ciphertexts', QueryCiphertextsArgs>
  ciphertextsConnection: GenerateIO<'ciphertextsConnection', QueryCiphertextsConnectionArgs>
  commitmentBatchEventNewById: GenerateIO<'commitmentBatchEventNewById', QueryCommitmentBatchEventNewByIdArgs>
  commitmentBatchEventNewByUniqueInput: GenerateIO<'commitmentBatchEventNewByUniqueInput', QueryCommitmentBatchEventNewByUniqueInputArgs>
  commitmentBatchEventNews: GenerateIO<'commitmentBatchEventNews', QueryCommitmentBatchEventNewsArgs>
  commitmentBatchEventNewsConnection: GenerateIO<'commitmentBatchEventNewsConnection', QueryCommitmentBatchEventNewsConnectionArgs>
  commitmentCiphertextById: GenerateIO<'commitmentCiphertextById', QueryCommitmentCiphertextByIdArgs>
  commitmentCiphertextByUniqueInput: GenerateIO<'commitmentCiphertextByUniqueInput', QueryCommitmentCiphertextByUniqueInputArgs>
  commitmentCiphertexts: GenerateIO<'commitmentCiphertexts', QueryCommitmentCiphertextsArgs>
  commitmentCiphertextsConnection: GenerateIO<'commitmentCiphertextsConnection', QueryCommitmentCiphertextsConnectionArgs>
  commitmentPreimageById: GenerateIO<'commitmentPreimageById', QueryCommitmentPreimageByIdArgs>
  commitmentPreimageByUniqueInput: GenerateIO<'commitmentPreimageByUniqueInput', QueryCommitmentPreimageByUniqueInputArgs>
  commitmentPreimages: GenerateIO<'commitmentPreimages', QueryCommitmentPreimagesArgs>
  commitmentPreimagesConnection: GenerateIO<'commitmentPreimagesConnection', QueryCommitmentPreimagesConnectionArgs>
  commitments: GenerateIO<'commitments', QueryCommitmentsArgs>
  commitmentsConnection: GenerateIO<'commitmentsConnection', QueryCommitmentsConnectionArgs>
  legacyCommitmentCiphertextById: GenerateIO<'legacyCommitmentCiphertextById', QueryLegacyCommitmentCiphertextByIdArgs>
  legacyCommitmentCiphertextByUniqueInput: GenerateIO<'legacyCommitmentCiphertextByUniqueInput', QueryLegacyCommitmentCiphertextByUniqueInputArgs>
  legacyCommitmentCiphertexts: GenerateIO<'legacyCommitmentCiphertexts', QueryLegacyCommitmentCiphertextsArgs>
  legacyCommitmentCiphertextsConnection: GenerateIO<'legacyCommitmentCiphertextsConnection', QueryLegacyCommitmentCiphertextsConnectionArgs>
  legacyEncryptedCommitmentById: GenerateIO<'legacyEncryptedCommitmentById', QueryLegacyEncryptedCommitmentByIdArgs>
  legacyEncryptedCommitmentByUniqueInput: GenerateIO<'legacyEncryptedCommitmentByUniqueInput', QueryLegacyEncryptedCommitmentByUniqueInputArgs>
  legacyEncryptedCommitments: GenerateIO<'legacyEncryptedCommitments', QueryLegacyEncryptedCommitmentsArgs>
  legacyEncryptedCommitmentsConnection: GenerateIO<'legacyEncryptedCommitmentsConnection', QueryLegacyEncryptedCommitmentsConnectionArgs>
  legacyGeneratedCommitmentById: GenerateIO<'legacyGeneratedCommitmentById', QueryLegacyGeneratedCommitmentByIdArgs>
  legacyGeneratedCommitmentByUniqueInput: GenerateIO<'legacyGeneratedCommitmentByUniqueInput', QueryLegacyGeneratedCommitmentByUniqueInputArgs>
  legacyGeneratedCommitments: GenerateIO<'legacyGeneratedCommitments', QueryLegacyGeneratedCommitmentsArgs>
  legacyGeneratedCommitmentsConnection: GenerateIO<'legacyGeneratedCommitmentsConnection', QueryLegacyGeneratedCommitmentsConnectionArgs>
  nullifierById: GenerateIO<'nullifierById', QueryNullifierByIdArgs>
  nullifierByUniqueInput: GenerateIO<'nullifierByUniqueInput', QueryNullifierByUniqueInputArgs>
  nullifiers: GenerateIO<'nullifiers', QueryNullifiersArgs>
  nullifiersConnection: GenerateIO<'nullifiersConnection', QueryNullifiersConnectionArgs>
  shieldCommitmentById: GenerateIO<'shieldCommitmentById', QueryShieldCommitmentByIdArgs>
  shieldCommitmentByUniqueInput: GenerateIO<'shieldCommitmentByUniqueInput', QueryShieldCommitmentByUniqueInputArgs>
  shieldCommitments: GenerateIO<'shieldCommitments', QueryShieldCommitmentsArgs>
  shieldCommitmentsConnection: GenerateIO<'shieldCommitmentsConnection', QueryShieldCommitmentsConnectionArgs>
  squidStatus: GenerateIO<'squidStatus', {}>
  tokenById: GenerateIO<'tokenById', QueryTokenByIdArgs>
  tokenByUniqueInput: GenerateIO<'tokenByUniqueInput', QueryTokenByUniqueInputArgs>
  tokens: GenerateIO<'tokens', QueryTokensArgs>
  tokensConnection: GenerateIO<'tokensConnection', QueryTokensConnectionArgs>
  transactCommitmentById: GenerateIO<'transactCommitmentById', QueryTransactCommitmentByIdArgs>
  transactCommitmentByUniqueInput: GenerateIO<'transactCommitmentByUniqueInput', QueryTransactCommitmentByUniqueInputArgs>
  transactCommitments: GenerateIO<'transactCommitments', QueryTransactCommitmentsArgs>
  transactCommitmentsConnection: GenerateIO<'transactCommitmentsConnection', QueryTransactCommitmentsConnectionArgs>
  transactionById: GenerateIO<'transactionById', QueryTransactionByIdArgs>
  transactionByUniqueInput: GenerateIO<'transactionByUniqueInput', QueryTransactionByUniqueInputArgs>
  transactions: GenerateIO<'transactions', QueryTransactionsArgs>
  transactionsConnection: GenerateIO<'transactionsConnection', QueryTransactionsConnectionArgs>
  unshieldById: GenerateIO<'unshieldById', QueryUnshieldByIdArgs>
  unshieldByUniqueInput: GenerateIO<'unshieldByUniqueInput', QueryUnshieldByUniqueInputArgs>
  unshields: GenerateIO<'unshields', QueryUnshieldsArgs>
  unshieldsConnection: GenerateIO<'unshieldsConnection', QueryUnshieldsConnectionArgs>
  verificationHashById: GenerateIO<'verificationHashById', QueryVerificationHashByIdArgs>
  verificationHashByUniqueInput: GenerateIO<'verificationHashByUniqueInput', QueryVerificationHashByUniqueInputArgs>
  verificationHashes: GenerateIO<'verificationHashes', QueryVerificationHashesArgs>
  verificationHashesConnection: GenerateIO<'verificationHashesConnection', QueryVerificationHashesConnectionArgs>
    }

export type TypeNameToType = {  'BigInt': BigInt;
  'Boolean': Boolean;
  'Bytes': Bytes;
  'Ciphertext': Ciphertext;
  'CiphertextEdge': CiphertextEdge;
  'CiphertextOrderByInput': CiphertextOrderByInput;
  'CiphertextWhereInput': CiphertextWhereInput;
  'CiphertextsConnection': CiphertextsConnection;
  'Commitment': Commitment;
  'CommitmentBatchEventNew': CommitmentBatchEventNew;
  'CommitmentBatchEventNewEdge': CommitmentBatchEventNewEdge;
  'CommitmentBatchEventNewOrderByInput': CommitmentBatchEventNewOrderByInput;
  'CommitmentBatchEventNewWhereInput': CommitmentBatchEventNewWhereInput;
  'CommitmentBatchEventNewsConnection': CommitmentBatchEventNewsConnection;
  'CommitmentCiphertext': CommitmentCiphertext;
  'CommitmentCiphertextEdge': CommitmentCiphertextEdge;
  'CommitmentCiphertextOrderByInput': CommitmentCiphertextOrderByInput;
  'CommitmentCiphertextWhereInput': CommitmentCiphertextWhereInput;
  'CommitmentCiphertextsConnection': CommitmentCiphertextsConnection;
  'CommitmentEdge': CommitmentEdge;
  'CommitmentOrderByInput': CommitmentOrderByInput;
  'CommitmentPreimage': CommitmentPreimage;
  'CommitmentPreimageEdge': CommitmentPreimageEdge;
  'CommitmentPreimageOrderByInput': CommitmentPreimageOrderByInput;
  'CommitmentPreimageWhereInput': CommitmentPreimageWhereInput;
  'CommitmentPreimagesConnection': CommitmentPreimagesConnection;
  'CommitmentType': CommitmentType;
  'CommitmentWhereInput': CommitmentWhereInput;
  'CommitmentsConnection': CommitmentsConnection;
  'Int': Int;
  'LegacyCommitmentCiphertext': LegacyCommitmentCiphertext;
  'LegacyCommitmentCiphertextEdge': LegacyCommitmentCiphertextEdge;
  'LegacyCommitmentCiphertextOrderByInput': LegacyCommitmentCiphertextOrderByInput;
  'LegacyCommitmentCiphertextWhereInput': LegacyCommitmentCiphertextWhereInput;
  'LegacyCommitmentCiphertextsConnection': LegacyCommitmentCiphertextsConnection;
  'LegacyEncryptedCommitment': LegacyEncryptedCommitment;
  'LegacyEncryptedCommitmentEdge': LegacyEncryptedCommitmentEdge;
  'LegacyEncryptedCommitmentOrderByInput': LegacyEncryptedCommitmentOrderByInput;
  'LegacyEncryptedCommitmentWhereInput': LegacyEncryptedCommitmentWhereInput;
  'LegacyEncryptedCommitmentsConnection': LegacyEncryptedCommitmentsConnection;
  'LegacyGeneratedCommitment': LegacyGeneratedCommitment;
  'LegacyGeneratedCommitmentEdge': LegacyGeneratedCommitmentEdge;
  'LegacyGeneratedCommitmentOrderByInput': LegacyGeneratedCommitmentOrderByInput;
  'LegacyGeneratedCommitmentWhereInput': LegacyGeneratedCommitmentWhereInput;
  'LegacyGeneratedCommitmentsConnection': LegacyGeneratedCommitmentsConnection;
  'Nullifier': Nullifier;
  'NullifierEdge': NullifierEdge;
  'NullifierOrderByInput': NullifierOrderByInput;
  'NullifierWhereInput': NullifierWhereInput;
  'NullifiersConnection': NullifiersConnection;
  'PageInfo': PageInfo;
  'Query': Query;
  'ShieldCommitment': ShieldCommitment;
  'ShieldCommitmentEdge': ShieldCommitmentEdge;
  'ShieldCommitmentOrderByInput': ShieldCommitmentOrderByInput;
  'ShieldCommitmentWhereInput': ShieldCommitmentWhereInput;
  'ShieldCommitmentsConnection': ShieldCommitmentsConnection;
  'SquidStatus': SquidStatus;
  'String': String;
  'Token': Token;
  'TokenEdge': TokenEdge;
  'TokenOrderByInput': TokenOrderByInput;
  'TokenType': TokenType;
  'TokenWhereInput': TokenWhereInput;
  'TokensConnection': TokensConnection;
  'TransactCommitment': TransactCommitment;
  'TransactCommitmentEdge': TransactCommitmentEdge;
  'TransactCommitmentOrderByInput': TransactCommitmentOrderByInput;
  'TransactCommitmentWhereInput': TransactCommitmentWhereInput;
  'TransactCommitmentsConnection': TransactCommitmentsConnection;
  'Transaction': Transaction;
  'TransactionEdge': TransactionEdge;
  'TransactionInterface': TransactionInterface;
  'TransactionOrderByInput': TransactionOrderByInput;
  'TransactionWhereInput': TransactionWhereInput;
  'TransactionsConnection': TransactionsConnection;
  'Unshield': Unshield;
  'UnshieldEdge': UnshieldEdge;
  'UnshieldOrderByInput': UnshieldOrderByInput;
  'UnshieldWhereInput': UnshieldWhereInput;
  'UnshieldsConnection': UnshieldsConnection;
  'VerificationHash': VerificationHash;
  'VerificationHashEdge': VerificationHashEdge;
  'VerificationHashOrderByInput': VerificationHashOrderByInput;
  'VerificationHashWhereInput': VerificationHashWhereInput;
  'VerificationHashesConnection': VerificationHashesConnection;
  'WhereIdInput': WhereIdInput;}

export type InterfaceImplementorsMap = {  'Commitment': 'LegacyEncryptedCommitment' | 'LegacyGeneratedCommitment' | 'ShieldCommitment' | 'TransactCommitment';
  'TransactionInterface': 'Transaction';}

export type FragmentKeyToType = {  "... on LegacyEncryptedCommitment": 'LegacyEncryptedCommitment';
  "... on LegacyGeneratedCommitment": 'LegacyGeneratedCommitment';
  "... on ShieldCommitment": 'ShieldCommitment';
  "... on TransactCommitment": 'TransactCommitment';
  "... on Transaction": 'Transaction';}

export type CommitmentFragmentsInput = { readonly "... on LegacyEncryptedCommitment": readonly FieldSelector<TypeNameToType['LegacyEncryptedCommitment']>[] }
  | { readonly "... on LegacyGeneratedCommitment": readonly FieldSelector<TypeNameToType['LegacyGeneratedCommitment']>[] }
  | { readonly "... on ShieldCommitment": readonly FieldSelector<TypeNameToType['ShieldCommitment']>[] }
  | { readonly "... on TransactCommitment": readonly FieldSelector<TypeNameToType['TransactCommitment']>[] };

export type TransactionInterfaceFragmentsInput = { readonly "... on Transaction": readonly FieldSelector<TypeNameToType['Transaction']>[] };

export type QueryFieldsInputMap = {  'ciphertextById': readonly FieldSelector<TypeNameToType['Ciphertext']>[];
  'ciphertextByUniqueInput': readonly FieldSelector<TypeNameToType['Ciphertext']>[];
  'ciphertexts': readonly FieldSelector<TypeNameToType['Ciphertext']>[];
  'ciphertextsConnection': readonly FieldSelector<TypeNameToType['CiphertextsConnection']>[];
  'commitmentBatchEventNewById': readonly FieldSelector<TypeNameToType['CommitmentBatchEventNew']>[];
  'commitmentBatchEventNewByUniqueInput': readonly FieldSelector<TypeNameToType['CommitmentBatchEventNew']>[];
  'commitmentBatchEventNews': readonly FieldSelector<TypeNameToType['CommitmentBatchEventNew']>[];
  'commitmentBatchEventNewsConnection': readonly FieldSelector<TypeNameToType['CommitmentBatchEventNewsConnection']>[];
  'commitmentCiphertextById': readonly FieldSelector<TypeNameToType['CommitmentCiphertext']>[];
  'commitmentCiphertextByUniqueInput': readonly FieldSelector<TypeNameToType['CommitmentCiphertext']>[];
  'commitmentCiphertexts': readonly FieldSelector<TypeNameToType['CommitmentCiphertext']>[];
  'commitmentCiphertextsConnection': readonly FieldSelector<TypeNameToType['CommitmentCiphertextsConnection']>[];
  'commitmentPreimageById': readonly FieldSelector<TypeNameToType['CommitmentPreimage']>[];
  'commitmentPreimageByUniqueInput': readonly FieldSelector<TypeNameToType['CommitmentPreimage']>[];
  'commitmentPreimages': readonly FieldSelector<TypeNameToType['CommitmentPreimage']>[];
  'commitmentPreimagesConnection': readonly FieldSelector<TypeNameToType['CommitmentPreimagesConnection']>[];
  'commitments': readonly (FieldSelector<TypeNameToType['Commitment']> | CommitmentFragmentsInput)[];
  'commitmentsConnection': readonly FieldSelector<TypeNameToType['CommitmentsConnection']>[];
  'legacyCommitmentCiphertextById': readonly FieldSelector<TypeNameToType['LegacyCommitmentCiphertext']>[];
  'legacyCommitmentCiphertextByUniqueInput': readonly FieldSelector<TypeNameToType['LegacyCommitmentCiphertext']>[];
  'legacyCommitmentCiphertexts': readonly FieldSelector<TypeNameToType['LegacyCommitmentCiphertext']>[];
  'legacyCommitmentCiphertextsConnection': readonly FieldSelector<TypeNameToType['LegacyCommitmentCiphertextsConnection']>[];
  'legacyEncryptedCommitmentById': readonly FieldSelector<TypeNameToType['LegacyEncryptedCommitment']>[];
  'legacyEncryptedCommitmentByUniqueInput': readonly FieldSelector<TypeNameToType['LegacyEncryptedCommitment']>[];
  'legacyEncryptedCommitments': readonly FieldSelector<TypeNameToType['LegacyEncryptedCommitment']>[];
  'legacyEncryptedCommitmentsConnection': readonly FieldSelector<TypeNameToType['LegacyEncryptedCommitmentsConnection']>[];
  'legacyGeneratedCommitmentById': readonly FieldSelector<TypeNameToType['LegacyGeneratedCommitment']>[];
  'legacyGeneratedCommitmentByUniqueInput': readonly FieldSelector<TypeNameToType['LegacyGeneratedCommitment']>[];
  'legacyGeneratedCommitments': readonly FieldSelector<TypeNameToType['LegacyGeneratedCommitment']>[];
  'legacyGeneratedCommitmentsConnection': readonly FieldSelector<TypeNameToType['LegacyGeneratedCommitmentsConnection']>[];
  'nullifierById': readonly FieldSelector<TypeNameToType['Nullifier']>[];
  'nullifierByUniqueInput': readonly FieldSelector<TypeNameToType['Nullifier']>[];
  'nullifiers': readonly FieldSelector<TypeNameToType['Nullifier']>[];
  'nullifiersConnection': readonly FieldSelector<TypeNameToType['NullifiersConnection']>[];
  'shieldCommitmentById': readonly FieldSelector<TypeNameToType['ShieldCommitment']>[];
  'shieldCommitmentByUniqueInput': readonly FieldSelector<TypeNameToType['ShieldCommitment']>[];
  'shieldCommitments': readonly FieldSelector<TypeNameToType['ShieldCommitment']>[];
  'shieldCommitmentsConnection': readonly FieldSelector<TypeNameToType['ShieldCommitmentsConnection']>[];
  'squidStatus': readonly FieldSelector<TypeNameToType['SquidStatus']>[];
  'tokenById': readonly FieldSelector<TypeNameToType['Token']>[];
  'tokenByUniqueInput': readonly FieldSelector<TypeNameToType['Token']>[];
  'tokens': readonly FieldSelector<TypeNameToType['Token']>[];
  'tokensConnection': readonly FieldSelector<TypeNameToType['TokensConnection']>[];
  'transactCommitmentById': readonly FieldSelector<TypeNameToType['TransactCommitment']>[];
  'transactCommitmentByUniqueInput': readonly FieldSelector<TypeNameToType['TransactCommitment']>[];
  'transactCommitments': readonly FieldSelector<TypeNameToType['TransactCommitment']>[];
  'transactCommitmentsConnection': readonly FieldSelector<TypeNameToType['TransactCommitmentsConnection']>[];
  'transactionById': readonly FieldSelector<TypeNameToType['Transaction']>[];
  'transactionByUniqueInput': readonly FieldSelector<TypeNameToType['Transaction']>[];
  'transactions': readonly FieldSelector<TypeNameToType['Transaction']>[];
  'transactionsConnection': readonly FieldSelector<TypeNameToType['TransactionsConnection']>[];
  'unshieldById': readonly FieldSelector<TypeNameToType['Unshield']>[];
  'unshieldByUniqueInput': readonly FieldSelector<TypeNameToType['Unshield']>[];
  'unshields': readonly FieldSelector<TypeNameToType['Unshield']>[];
  'unshieldsConnection': readonly FieldSelector<TypeNameToType['UnshieldsConnection']>[];
  'verificationHashById': readonly FieldSelector<TypeNameToType['VerificationHash']>[];
  'verificationHashByUniqueInput': readonly FieldSelector<TypeNameToType['VerificationHash']>[];
  'verificationHashes': readonly FieldSelector<TypeNameToType['VerificationHash']>[];
  'verificationHashesConnection': readonly FieldSelector<TypeNameToType['VerificationHashesConnection']>[];}