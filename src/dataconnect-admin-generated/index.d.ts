import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

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

/** Generated Node Admin SDK operation action function for the 'CreateUser' Mutation. Allow users to execute without passing in DataConnect. */
export function createUser(dc: DataConnect, vars: CreateUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateUserData>>;
/** Generated Node Admin SDK operation action function for the 'CreateUser' Mutation. Allow users to pass in custom DataConnect instances. */
export function createUser(vars: CreateUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateUserData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateUser' Mutation. Allow users to execute without passing in DataConnect. */
export function updateUser(dc: DataConnect, vars: UpdateUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateUserData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateUser' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateUser(vars: UpdateUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateUserData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteUser' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteUser(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteUserData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteUser' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteUser(options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteUserData>>;

/** Generated Node Admin SDK operation action function for the 'GetCurrentUser' Query. Allow users to execute without passing in DataConnect. */
export function getCurrentUser(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCurrentUserData>>;
/** Generated Node Admin SDK operation action function for the 'GetCurrentUser' Query. Allow users to pass in custom DataConnect instances. */
export function getCurrentUser(options?: OperationOptions): Promise<ExecuteOperationResponse<GetCurrentUserData>>;

/** Generated Node Admin SDK operation action function for the 'ListAllUsers' Query. Allow users to execute without passing in DataConnect. */
export function listAllUsers(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListAllUsersData>>;
/** Generated Node Admin SDK operation action function for the 'ListAllUsers' Query. Allow users to pass in custom DataConnect instances. */
export function listAllUsers(options?: OperationOptions): Promise<ExecuteOperationResponse<ListAllUsersData>>;

/** Generated Node Admin SDK operation action function for the 'CreateMailbox' Mutation. Allow users to execute without passing in DataConnect. */
export function createMailbox(dc: DataConnect, vars: CreateMailboxVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateMailboxData>>;
/** Generated Node Admin SDK operation action function for the 'CreateMailbox' Mutation. Allow users to pass in custom DataConnect instances. */
export function createMailbox(vars: CreateMailboxVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateMailboxData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateMailbox' Mutation. Allow users to execute without passing in DataConnect. */
export function updateMailbox(dc: DataConnect, vars: UpdateMailboxVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateMailboxData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateMailbox' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateMailbox(vars: UpdateMailboxVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateMailboxData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteMailbox' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteMailbox(dc: DataConnect, vars: DeleteMailboxVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteMailboxData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteMailbox' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteMailbox(vars: DeleteMailboxVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteMailboxData>>;

/** Generated Node Admin SDK operation action function for the 'GetMailbox' Query. Allow users to execute without passing in DataConnect. */
export function getMailbox(dc: DataConnect, vars: GetMailboxVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetMailboxData>>;
/** Generated Node Admin SDK operation action function for the 'GetMailbox' Query. Allow users to pass in custom DataConnect instances. */
export function getMailbox(vars: GetMailboxVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetMailboxData>>;

/** Generated Node Admin SDK operation action function for the 'ListMyMailboxes' Query. Allow users to execute without passing in DataConnect. */
export function listMyMailboxes(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListMyMailboxesData>>;
/** Generated Node Admin SDK operation action function for the 'ListMyMailboxes' Query. Allow users to pass in custom DataConnect instances. */
export function listMyMailboxes(options?: OperationOptions): Promise<ExecuteOperationResponse<ListMyMailboxesData>>;

/** Generated Node Admin SDK operation action function for the 'SendLetter' Mutation. Allow users to execute without passing in DataConnect. */
export function sendLetter(dc: DataConnect, vars: SendLetterVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SendLetterData>>;
/** Generated Node Admin SDK operation action function for the 'SendLetter' Mutation. Allow users to pass in custom DataConnect instances. */
export function sendLetter(vars: SendLetterVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SendLetterData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateLetterStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function updateLetterStatus(dc: DataConnect, vars: UpdateLetterStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateLetterStatusData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateLetterStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateLetterStatus(vars: UpdateLetterStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateLetterStatusData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteLetter' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteLetter(dc: DataConnect, vars: DeleteLetterVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteLetterData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteLetter' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteLetter(vars: DeleteLetterVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteLetterData>>;

/** Generated Node Admin SDK operation action function for the 'GetLetter' Query. Allow users to execute without passing in DataConnect. */
export function getLetter(dc: DataConnect, vars: GetLetterVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetLetterData>>;
/** Generated Node Admin SDK operation action function for the 'GetLetter' Query. Allow users to pass in custom DataConnect instances. */
export function getLetter(vars: GetLetterVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetLetterData>>;

/** Generated Node Admin SDK operation action function for the 'ListSentLetters' Query. Allow users to execute without passing in DataConnect. */
export function listSentLetters(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListSentLettersData>>;
/** Generated Node Admin SDK operation action function for the 'ListSentLetters' Query. Allow users to pass in custom DataConnect instances. */
export function listSentLetters(options?: OperationOptions): Promise<ExecuteOperationResponse<ListSentLettersData>>;

/** Generated Node Admin SDK operation action function for the 'CreateAttachment' Mutation. Allow users to execute without passing in DataConnect. */
export function createAttachment(dc: DataConnect, vars: CreateAttachmentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateAttachmentData>>;
/** Generated Node Admin SDK operation action function for the 'CreateAttachment' Mutation. Allow users to pass in custom DataConnect instances. */
export function createAttachment(vars: CreateAttachmentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateAttachmentData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateAttachment' Mutation. Allow users to execute without passing in DataConnect. */
export function updateAttachment(dc: DataConnect, vars: UpdateAttachmentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateAttachmentData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateAttachment' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateAttachment(vars: UpdateAttachmentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateAttachmentData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteAttachment' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteAttachment(dc: DataConnect, vars: DeleteAttachmentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteAttachmentData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteAttachment' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteAttachment(vars: DeleteAttachmentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteAttachmentData>>;

/** Generated Node Admin SDK operation action function for the 'GetAttachment' Query. Allow users to execute without passing in DataConnect. */
export function getAttachment(dc: DataConnect, vars: GetAttachmentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAttachmentData>>;
/** Generated Node Admin SDK operation action function for the 'GetAttachment' Query. Allow users to pass in custom DataConnect instances. */
export function getAttachment(vars: GetAttachmentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAttachmentData>>;

/** Generated Node Admin SDK operation action function for the 'ListAttachmentsForLetter' Query. Allow users to execute without passing in DataConnect. */
export function listAttachmentsForLetter(dc: DataConnect, vars: ListAttachmentsForLetterVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListAttachmentsForLetterData>>;
/** Generated Node Admin SDK operation action function for the 'ListAttachmentsForLetter' Query. Allow users to pass in custom DataConnect instances. */
export function listAttachmentsForLetter(vars: ListAttachmentsForLetterVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListAttachmentsForLetterData>>;

/** Generated Node Admin SDK operation action function for the 'CreateFolder' Mutation. Allow users to execute without passing in DataConnect. */
export function createFolder(dc: DataConnect, vars: CreateFolderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateFolderData>>;
/** Generated Node Admin SDK operation action function for the 'CreateFolder' Mutation. Allow users to pass in custom DataConnect instances. */
export function createFolder(vars: CreateFolderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateFolderData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateFolder' Mutation. Allow users to execute without passing in DataConnect. */
export function updateFolder(dc: DataConnect, vars: UpdateFolderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateFolderData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateFolder' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateFolder(vars: UpdateFolderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateFolderData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteFolder' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteFolder(dc: DataConnect, vars: DeleteFolderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteFolderData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteFolder' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteFolder(vars: DeleteFolderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteFolderData>>;

/** Generated Node Admin SDK operation action function for the 'GetFolder' Query. Allow users to execute without passing in DataConnect. */
export function getFolder(dc: DataConnect, vars: GetFolderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetFolderData>>;
/** Generated Node Admin SDK operation action function for the 'GetFolder' Query. Allow users to pass in custom DataConnect instances. */
export function getFolder(vars: GetFolderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetFolderData>>;

/** Generated Node Admin SDK operation action function for the 'ListMyFolders' Query. Allow users to execute without passing in DataConnect. */
export function listMyFolders(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListMyFoldersData>>;
/** Generated Node Admin SDK operation action function for the 'ListMyFolders' Query. Allow users to pass in custom DataConnect instances. */
export function listMyFolders(options?: OperationOptions): Promise<ExecuteOperationResponse<ListMyFoldersData>>;

/** Generated Node Admin SDK operation action function for the 'AssignLetterToFolder' Mutation. Allow users to execute without passing in DataConnect. */
export function assignLetterToFolder(dc: DataConnect, vars: AssignLetterToFolderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AssignLetterToFolderData>>;
/** Generated Node Admin SDK operation action function for the 'AssignLetterToFolder' Mutation. Allow users to pass in custom DataConnect instances. */
export function assignLetterToFolder(vars: AssignLetterToFolderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AssignLetterToFolderData>>;

/** Generated Node Admin SDK operation action function for the 'RemoveLetterFromFolder' Mutation. Allow users to execute without passing in DataConnect. */
export function removeLetterFromFolder(dc: DataConnect, vars: RemoveLetterFromFolderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RemoveLetterFromFolderData>>;
/** Generated Node Admin SDK operation action function for the 'RemoveLetterFromFolder' Mutation. Allow users to pass in custom DataConnect instances. */
export function removeLetterFromFolder(vars: RemoveLetterFromFolderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RemoveLetterFromFolderData>>;

/** Generated Node Admin SDK operation action function for the 'ListFolderContents' Query. Allow users to execute without passing in DataConnect. */
export function listFolderContents(dc: DataConnect, vars: ListFolderContentsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListFolderContentsData>>;
/** Generated Node Admin SDK operation action function for the 'ListFolderContents' Query. Allow users to pass in custom DataConnect instances. */
export function listFolderContents(vars: ListFolderContentsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListFolderContentsData>>;

