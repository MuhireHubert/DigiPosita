import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AssignLetterToFolderData {
  letterAssignment_insert: LetterAssignment_Key;
}

export interface AssignLetterToFolderVariables {
  letterId: UUIDString;
  folderId: UUIDString;
}

export interface Attachment_Key {
  id: UUIDString;
  __typename?: 'Attachment_Key';
}

export interface CreateAttachmentData {
  attachment_insert: Attachment_Key;
}

export interface CreateAttachmentVariables {
  letterId: UUIDString;
  url: string;
  name: string;
}

export interface CreateFolderData {
  folder_insert: Folder_Key;
}

export interface CreateFolderVariables {
  name: string;
}

export interface CreateMailboxData {
  mailbox_insert: Mailbox_Key;
}

export interface CreateMailboxVariables {
  address: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  displayName: string;
  email: string;
}

export interface DeleteAttachmentData {
  attachment_delete?: Attachment_Key | null;
}

export interface DeleteAttachmentVariables {
  id: UUIDString;
}

export interface DeleteFolderData {
  folder_delete?: Folder_Key | null;
}

export interface DeleteFolderVariables {
  id: UUIDString;
}

export interface DeleteLetterData {
  letter_delete?: Letter_Key | null;
}

export interface DeleteLetterVariables {
  id: UUIDString;
}

export interface DeleteMailboxData {
  mailbox_delete?: Mailbox_Key | null;
}

export interface DeleteMailboxVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface Folder_Key {
  id: UUIDString;
  __typename?: 'Folder_Key';
}

export interface GetAttachmentData {
  attachment?: {
    fileName: string;
    fileUrl: string;
  };
}

export interface GetAttachmentVariables {
  id: UUIDString;
}

export interface GetCurrentUserData {
  user?: {
    displayName: string;
    email: string;
  };
}

export interface GetFolderData {
  folder?: {
    name: string;
  };
}

export interface GetFolderVariables {
  id: UUIDString;
}

export interface GetLetterData {
  letter?: {
    subject: string;
    body: string;
  };
}

export interface GetLetterVariables {
  id: UUIDString;
}

export interface GetMailboxData {
  mailbox?: {
    mailboxAddress: string;
  };
}

export interface GetMailboxVariables {
  id: UUIDString;
}

export interface LetterAssignment_Key {
  letterId: UUIDString;
  folderId: UUIDString;
  __typename?: 'LetterAssignment_Key';
}

export interface Letter_Key {
  id: UUIDString;
  __typename?: 'Letter_Key';
}

export interface ListAllUsersData {
  users: ({
    displayName: string;
  })[];
}

export interface ListAttachmentsForLetterData {
  attachments: ({
    fileName: string;
  })[];
}

export interface ListAttachmentsForLetterVariables {
  letterId: UUIDString;
}

export interface ListFolderContentsData {
  letterAssignments: ({
    letter: {
      subject: string;
    };
  })[];
}

export interface ListFolderContentsVariables {
  folderId: UUIDString;
}

export interface ListMyFoldersData {
  folders: ({
    name: string;
  })[];
}

export interface ListMyMailboxesData {
  mailboxes: ({
    mailboxAddress: string;
  })[];
}

export interface ListSentLettersData {
  letters: ({
    subject: string;
    sentAt: TimestampString;
  })[];
}

export interface Mailbox_Key {
  id: UUIDString;
  __typename?: 'Mailbox_Key';
}

export interface RemoveLetterFromFolderData {
  letterAssignment_delete?: LetterAssignment_Key | null;
}

export interface RemoveLetterFromFolderVariables {
  letterId: UUIDString;
  folderId: UUIDString;
}

export interface SendLetterData {
  letter_insert: Letter_Key;
}

export interface SendLetterVariables {
  mailboxId: UUIDString;
  subject: string;
  body: string;
}

export interface UpdateAttachmentData {
  attachment_update?: Attachment_Key | null;
}

export interface UpdateAttachmentVariables {
  id: UUIDString;
  name: string;
}

export interface UpdateFolderData {
  folder_update?: Folder_Key | null;
}

export interface UpdateFolderVariables {
  id: UUIDString;
  name: string;
}

export interface UpdateLetterStatusData {
  letter_update?: Letter_Key | null;
}

export interface UpdateLetterStatusVariables {
  id: UUIDString;
  status: string;
}

export interface UpdateMailboxData {
  mailbox_update?: Mailbox_Key | null;
}

export interface UpdateMailboxVariables {
  id: UUIDString;
  address: string;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface UpdateUserVariables {
  displayName: string;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface ListAllUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
  operationName: string;
}
export const listAllUsersRef: ListAllUsersRef;

export function listAllUsers(options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;
export function listAllUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

interface CreateMailboxRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMailboxVariables): MutationRef<CreateMailboxData, CreateMailboxVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMailboxVariables): MutationRef<CreateMailboxData, CreateMailboxVariables>;
  operationName: string;
}
export const createMailboxRef: CreateMailboxRef;

export function createMailbox(vars: CreateMailboxVariables): MutationPromise<CreateMailboxData, CreateMailboxVariables>;
export function createMailbox(dc: DataConnect, vars: CreateMailboxVariables): MutationPromise<CreateMailboxData, CreateMailboxVariables>;

interface UpdateMailboxRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMailboxVariables): MutationRef<UpdateMailboxData, UpdateMailboxVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMailboxVariables): MutationRef<UpdateMailboxData, UpdateMailboxVariables>;
  operationName: string;
}
export const updateMailboxRef: UpdateMailboxRef;

export function updateMailbox(vars: UpdateMailboxVariables): MutationPromise<UpdateMailboxData, UpdateMailboxVariables>;
export function updateMailbox(dc: DataConnect, vars: UpdateMailboxVariables): MutationPromise<UpdateMailboxData, UpdateMailboxVariables>;

interface DeleteMailboxRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMailboxVariables): MutationRef<DeleteMailboxData, DeleteMailboxVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMailboxVariables): MutationRef<DeleteMailboxData, DeleteMailboxVariables>;
  operationName: string;
}
export const deleteMailboxRef: DeleteMailboxRef;

export function deleteMailbox(vars: DeleteMailboxVariables): MutationPromise<DeleteMailboxData, DeleteMailboxVariables>;
export function deleteMailbox(dc: DataConnect, vars: DeleteMailboxVariables): MutationPromise<DeleteMailboxData, DeleteMailboxVariables>;

interface GetMailboxRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMailboxVariables): QueryRef<GetMailboxData, GetMailboxVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMailboxVariables): QueryRef<GetMailboxData, GetMailboxVariables>;
  operationName: string;
}
export const getMailboxRef: GetMailboxRef;

export function getMailbox(vars: GetMailboxVariables, options?: ExecuteQueryOptions): QueryPromise<GetMailboxData, GetMailboxVariables>;
export function getMailbox(dc: DataConnect, vars: GetMailboxVariables, options?: ExecuteQueryOptions): QueryPromise<GetMailboxData, GetMailboxVariables>;

interface ListMyMailboxesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyMailboxesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyMailboxesData, undefined>;
  operationName: string;
}
export const listMyMailboxesRef: ListMyMailboxesRef;

export function listMyMailboxes(options?: ExecuteQueryOptions): QueryPromise<ListMyMailboxesData, undefined>;
export function listMyMailboxes(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyMailboxesData, undefined>;

interface SendLetterRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SendLetterVariables): MutationRef<SendLetterData, SendLetterVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SendLetterVariables): MutationRef<SendLetterData, SendLetterVariables>;
  operationName: string;
}
export const sendLetterRef: SendLetterRef;

export function sendLetter(vars: SendLetterVariables): MutationPromise<SendLetterData, SendLetterVariables>;
export function sendLetter(dc: DataConnect, vars: SendLetterVariables): MutationPromise<SendLetterData, SendLetterVariables>;

interface UpdateLetterStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLetterStatusVariables): MutationRef<UpdateLetterStatusData, UpdateLetterStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateLetterStatusVariables): MutationRef<UpdateLetterStatusData, UpdateLetterStatusVariables>;
  operationName: string;
}
export const updateLetterStatusRef: UpdateLetterStatusRef;

export function updateLetterStatus(vars: UpdateLetterStatusVariables): MutationPromise<UpdateLetterStatusData, UpdateLetterStatusVariables>;
export function updateLetterStatus(dc: DataConnect, vars: UpdateLetterStatusVariables): MutationPromise<UpdateLetterStatusData, UpdateLetterStatusVariables>;

interface DeleteLetterRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLetterVariables): MutationRef<DeleteLetterData, DeleteLetterVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteLetterVariables): MutationRef<DeleteLetterData, DeleteLetterVariables>;
  operationName: string;
}
export const deleteLetterRef: DeleteLetterRef;

export function deleteLetter(vars: DeleteLetterVariables): MutationPromise<DeleteLetterData, DeleteLetterVariables>;
export function deleteLetter(dc: DataConnect, vars: DeleteLetterVariables): MutationPromise<DeleteLetterData, DeleteLetterVariables>;

interface GetLetterRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLetterVariables): QueryRef<GetLetterData, GetLetterVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLetterVariables): QueryRef<GetLetterData, GetLetterVariables>;
  operationName: string;
}
export const getLetterRef: GetLetterRef;

export function getLetter(vars: GetLetterVariables, options?: ExecuteQueryOptions): QueryPromise<GetLetterData, GetLetterVariables>;
export function getLetter(dc: DataConnect, vars: GetLetterVariables, options?: ExecuteQueryOptions): QueryPromise<GetLetterData, GetLetterVariables>;

interface ListSentLettersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSentLettersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListSentLettersData, undefined>;
  operationName: string;
}
export const listSentLettersRef: ListSentLettersRef;

export function listSentLetters(options?: ExecuteQueryOptions): QueryPromise<ListSentLettersData, undefined>;
export function listSentLetters(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListSentLettersData, undefined>;

interface CreateAttachmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAttachmentVariables): MutationRef<CreateAttachmentData, CreateAttachmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAttachmentVariables): MutationRef<CreateAttachmentData, CreateAttachmentVariables>;
  operationName: string;
}
export const createAttachmentRef: CreateAttachmentRef;

export function createAttachment(vars: CreateAttachmentVariables): MutationPromise<CreateAttachmentData, CreateAttachmentVariables>;
export function createAttachment(dc: DataConnect, vars: CreateAttachmentVariables): MutationPromise<CreateAttachmentData, CreateAttachmentVariables>;

interface UpdateAttachmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAttachmentVariables): MutationRef<UpdateAttachmentData, UpdateAttachmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAttachmentVariables): MutationRef<UpdateAttachmentData, UpdateAttachmentVariables>;
  operationName: string;
}
export const updateAttachmentRef: UpdateAttachmentRef;

export function updateAttachment(vars: UpdateAttachmentVariables): MutationPromise<UpdateAttachmentData, UpdateAttachmentVariables>;
export function updateAttachment(dc: DataConnect, vars: UpdateAttachmentVariables): MutationPromise<UpdateAttachmentData, UpdateAttachmentVariables>;

interface DeleteAttachmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAttachmentVariables): MutationRef<DeleteAttachmentData, DeleteAttachmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAttachmentVariables): MutationRef<DeleteAttachmentData, DeleteAttachmentVariables>;
  operationName: string;
}
export const deleteAttachmentRef: DeleteAttachmentRef;

export function deleteAttachment(vars: DeleteAttachmentVariables): MutationPromise<DeleteAttachmentData, DeleteAttachmentVariables>;
export function deleteAttachment(dc: DataConnect, vars: DeleteAttachmentVariables): MutationPromise<DeleteAttachmentData, DeleteAttachmentVariables>;

interface GetAttachmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAttachmentVariables): QueryRef<GetAttachmentData, GetAttachmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAttachmentVariables): QueryRef<GetAttachmentData, GetAttachmentVariables>;
  operationName: string;
}
export const getAttachmentRef: GetAttachmentRef;

export function getAttachment(vars: GetAttachmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetAttachmentData, GetAttachmentVariables>;
export function getAttachment(dc: DataConnect, vars: GetAttachmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetAttachmentData, GetAttachmentVariables>;

interface ListAttachmentsForLetterRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAttachmentsForLetterVariables): QueryRef<ListAttachmentsForLetterData, ListAttachmentsForLetterVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListAttachmentsForLetterVariables): QueryRef<ListAttachmentsForLetterData, ListAttachmentsForLetterVariables>;
  operationName: string;
}
export const listAttachmentsForLetterRef: ListAttachmentsForLetterRef;

export function listAttachmentsForLetter(vars: ListAttachmentsForLetterVariables, options?: ExecuteQueryOptions): QueryPromise<ListAttachmentsForLetterData, ListAttachmentsForLetterVariables>;
export function listAttachmentsForLetter(dc: DataConnect, vars: ListAttachmentsForLetterVariables, options?: ExecuteQueryOptions): QueryPromise<ListAttachmentsForLetterData, ListAttachmentsForLetterVariables>;

interface CreateFolderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFolderVariables): MutationRef<CreateFolderData, CreateFolderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateFolderVariables): MutationRef<CreateFolderData, CreateFolderVariables>;
  operationName: string;
}
export const createFolderRef: CreateFolderRef;

export function createFolder(vars: CreateFolderVariables): MutationPromise<CreateFolderData, CreateFolderVariables>;
export function createFolder(dc: DataConnect, vars: CreateFolderVariables): MutationPromise<CreateFolderData, CreateFolderVariables>;

interface UpdateFolderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFolderVariables): MutationRef<UpdateFolderData, UpdateFolderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateFolderVariables): MutationRef<UpdateFolderData, UpdateFolderVariables>;
  operationName: string;
}
export const updateFolderRef: UpdateFolderRef;

export function updateFolder(vars: UpdateFolderVariables): MutationPromise<UpdateFolderData, UpdateFolderVariables>;
export function updateFolder(dc: DataConnect, vars: UpdateFolderVariables): MutationPromise<UpdateFolderData, UpdateFolderVariables>;

interface DeleteFolderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFolderVariables): MutationRef<DeleteFolderData, DeleteFolderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteFolderVariables): MutationRef<DeleteFolderData, DeleteFolderVariables>;
  operationName: string;
}
export const deleteFolderRef: DeleteFolderRef;

export function deleteFolder(vars: DeleteFolderVariables): MutationPromise<DeleteFolderData, DeleteFolderVariables>;
export function deleteFolder(dc: DataConnect, vars: DeleteFolderVariables): MutationPromise<DeleteFolderData, DeleteFolderVariables>;

interface GetFolderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFolderVariables): QueryRef<GetFolderData, GetFolderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetFolderVariables): QueryRef<GetFolderData, GetFolderVariables>;
  operationName: string;
}
export const getFolderRef: GetFolderRef;

export function getFolder(vars: GetFolderVariables, options?: ExecuteQueryOptions): QueryPromise<GetFolderData, GetFolderVariables>;
export function getFolder(dc: DataConnect, vars: GetFolderVariables, options?: ExecuteQueryOptions): QueryPromise<GetFolderData, GetFolderVariables>;

interface ListMyFoldersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyFoldersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyFoldersData, undefined>;
  operationName: string;
}
export const listMyFoldersRef: ListMyFoldersRef;

export function listMyFolders(options?: ExecuteQueryOptions): QueryPromise<ListMyFoldersData, undefined>;
export function listMyFolders(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyFoldersData, undefined>;

interface AssignLetterToFolderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignLetterToFolderVariables): MutationRef<AssignLetterToFolderData, AssignLetterToFolderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AssignLetterToFolderVariables): MutationRef<AssignLetterToFolderData, AssignLetterToFolderVariables>;
  operationName: string;
}
export const assignLetterToFolderRef: AssignLetterToFolderRef;

export function assignLetterToFolder(vars: AssignLetterToFolderVariables): MutationPromise<AssignLetterToFolderData, AssignLetterToFolderVariables>;
export function assignLetterToFolder(dc: DataConnect, vars: AssignLetterToFolderVariables): MutationPromise<AssignLetterToFolderData, AssignLetterToFolderVariables>;

interface RemoveLetterFromFolderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveLetterFromFolderVariables): MutationRef<RemoveLetterFromFolderData, RemoveLetterFromFolderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveLetterFromFolderVariables): MutationRef<RemoveLetterFromFolderData, RemoveLetterFromFolderVariables>;
  operationName: string;
}
export const removeLetterFromFolderRef: RemoveLetterFromFolderRef;

export function removeLetterFromFolder(vars: RemoveLetterFromFolderVariables): MutationPromise<RemoveLetterFromFolderData, RemoveLetterFromFolderVariables>;
export function removeLetterFromFolder(dc: DataConnect, vars: RemoveLetterFromFolderVariables): MutationPromise<RemoveLetterFromFolderData, RemoveLetterFromFolderVariables>;

interface ListFolderContentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListFolderContentsVariables): QueryRef<ListFolderContentsData, ListFolderContentsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListFolderContentsVariables): QueryRef<ListFolderContentsData, ListFolderContentsVariables>;
  operationName: string;
}
export const listFolderContentsRef: ListFolderContentsRef;

export function listFolderContents(vars: ListFolderContentsVariables, options?: ExecuteQueryOptions): QueryPromise<ListFolderContentsData, ListFolderContentsVariables>;
export function listFolderContents(dc: DataConnect, vars: ListFolderContentsVariables, options?: ExecuteQueryOptions): QueryPromise<ListFolderContentsData, ListFolderContentsVariables>;

