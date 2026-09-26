import { CreateUserData, CreateUserVariables, UpdateUserData, UpdateUserVariables, DeleteUserData, GetCurrentUserData, ListAllUsersData, CreateMailboxData, CreateMailboxVariables, UpdateMailboxData, UpdateMailboxVariables, DeleteMailboxData, DeleteMailboxVariables, GetMailboxData, GetMailboxVariables, ListMyMailboxesData, SendLetterData, SendLetterVariables, UpdateLetterStatusData, UpdateLetterStatusVariables, DeleteLetterData, DeleteLetterVariables, GetLetterData, GetLetterVariables, ListSentLettersData, CreateAttachmentData, CreateAttachmentVariables, UpdateAttachmentData, UpdateAttachmentVariables, DeleteAttachmentData, DeleteAttachmentVariables, GetAttachmentData, GetAttachmentVariables, ListAttachmentsForLetterData, ListAttachmentsForLetterVariables, CreateFolderData, CreateFolderVariables, UpdateFolderData, UpdateFolderVariables, DeleteFolderData, DeleteFolderVariables, GetFolderData, GetFolderVariables, ListMyFoldersData, AssignLetterToFolderData, AssignLetterToFolderVariables, RemoveLetterFromFolderData, RemoveLetterFromFolderVariables, ListFolderContentsData, ListFolderContentsVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;

export function useGetCurrentUser(options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;
export function useGetCurrentUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;

export function useListAllUsers(options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;
export function useListAllUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;

export function useCreateMailbox(options?: useDataConnectMutationOptions<CreateMailboxData, FirebaseError, CreateMailboxVariables>): UseDataConnectMutationResult<CreateMailboxData, CreateMailboxVariables>;
export function useCreateMailbox(dc: DataConnect, options?: useDataConnectMutationOptions<CreateMailboxData, FirebaseError, CreateMailboxVariables>): UseDataConnectMutationResult<CreateMailboxData, CreateMailboxVariables>;

export function useUpdateMailbox(options?: useDataConnectMutationOptions<UpdateMailboxData, FirebaseError, UpdateMailboxVariables>): UseDataConnectMutationResult<UpdateMailboxData, UpdateMailboxVariables>;
export function useUpdateMailbox(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateMailboxData, FirebaseError, UpdateMailboxVariables>): UseDataConnectMutationResult<UpdateMailboxData, UpdateMailboxVariables>;

export function useDeleteMailbox(options?: useDataConnectMutationOptions<DeleteMailboxData, FirebaseError, DeleteMailboxVariables>): UseDataConnectMutationResult<DeleteMailboxData, DeleteMailboxVariables>;
export function useDeleteMailbox(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteMailboxData, FirebaseError, DeleteMailboxVariables>): UseDataConnectMutationResult<DeleteMailboxData, DeleteMailboxVariables>;

export function useGetMailbox(vars: GetMailboxVariables, options?: useDataConnectQueryOptions<GetMailboxData>): UseDataConnectQueryResult<GetMailboxData, GetMailboxVariables>;
export function useGetMailbox(dc: DataConnect, vars: GetMailboxVariables, options?: useDataConnectQueryOptions<GetMailboxData>): UseDataConnectQueryResult<GetMailboxData, GetMailboxVariables>;

export function useListMyMailboxes(options?: useDataConnectQueryOptions<ListMyMailboxesData>): UseDataConnectQueryResult<ListMyMailboxesData, undefined>;
export function useListMyMailboxes(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyMailboxesData>): UseDataConnectQueryResult<ListMyMailboxesData, undefined>;

export function useSendLetter(options?: useDataConnectMutationOptions<SendLetterData, FirebaseError, SendLetterVariables>): UseDataConnectMutationResult<SendLetterData, SendLetterVariables>;
export function useSendLetter(dc: DataConnect, options?: useDataConnectMutationOptions<SendLetterData, FirebaseError, SendLetterVariables>): UseDataConnectMutationResult<SendLetterData, SendLetterVariables>;

export function useUpdateLetterStatus(options?: useDataConnectMutationOptions<UpdateLetterStatusData, FirebaseError, UpdateLetterStatusVariables>): UseDataConnectMutationResult<UpdateLetterStatusData, UpdateLetterStatusVariables>;
export function useUpdateLetterStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateLetterStatusData, FirebaseError, UpdateLetterStatusVariables>): UseDataConnectMutationResult<UpdateLetterStatusData, UpdateLetterStatusVariables>;

export function useDeleteLetter(options?: useDataConnectMutationOptions<DeleteLetterData, FirebaseError, DeleteLetterVariables>): UseDataConnectMutationResult<DeleteLetterData, DeleteLetterVariables>;
export function useDeleteLetter(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteLetterData, FirebaseError, DeleteLetterVariables>): UseDataConnectMutationResult<DeleteLetterData, DeleteLetterVariables>;

export function useGetLetter(vars: GetLetterVariables, options?: useDataConnectQueryOptions<GetLetterData>): UseDataConnectQueryResult<GetLetterData, GetLetterVariables>;
export function useGetLetter(dc: DataConnect, vars: GetLetterVariables, options?: useDataConnectQueryOptions<GetLetterData>): UseDataConnectQueryResult<GetLetterData, GetLetterVariables>;

export function useListSentLetters(options?: useDataConnectQueryOptions<ListSentLettersData>): UseDataConnectQueryResult<ListSentLettersData, undefined>;
export function useListSentLetters(dc: DataConnect, options?: useDataConnectQueryOptions<ListSentLettersData>): UseDataConnectQueryResult<ListSentLettersData, undefined>;

export function useCreateAttachment(options?: useDataConnectMutationOptions<CreateAttachmentData, FirebaseError, CreateAttachmentVariables>): UseDataConnectMutationResult<CreateAttachmentData, CreateAttachmentVariables>;
export function useCreateAttachment(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAttachmentData, FirebaseError, CreateAttachmentVariables>): UseDataConnectMutationResult<CreateAttachmentData, CreateAttachmentVariables>;

export function useUpdateAttachment(options?: useDataConnectMutationOptions<UpdateAttachmentData, FirebaseError, UpdateAttachmentVariables>): UseDataConnectMutationResult<UpdateAttachmentData, UpdateAttachmentVariables>;
export function useUpdateAttachment(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAttachmentData, FirebaseError, UpdateAttachmentVariables>): UseDataConnectMutationResult<UpdateAttachmentData, UpdateAttachmentVariables>;

export function useDeleteAttachment(options?: useDataConnectMutationOptions<DeleteAttachmentData, FirebaseError, DeleteAttachmentVariables>): UseDataConnectMutationResult<DeleteAttachmentData, DeleteAttachmentVariables>;
export function useDeleteAttachment(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAttachmentData, FirebaseError, DeleteAttachmentVariables>): UseDataConnectMutationResult<DeleteAttachmentData, DeleteAttachmentVariables>;

export function useGetAttachment(vars: GetAttachmentVariables, options?: useDataConnectQueryOptions<GetAttachmentData>): UseDataConnectQueryResult<GetAttachmentData, GetAttachmentVariables>;
export function useGetAttachment(dc: DataConnect, vars: GetAttachmentVariables, options?: useDataConnectQueryOptions<GetAttachmentData>): UseDataConnectQueryResult<GetAttachmentData, GetAttachmentVariables>;

export function useListAttachmentsForLetter(vars: ListAttachmentsForLetterVariables, options?: useDataConnectQueryOptions<ListAttachmentsForLetterData>): UseDataConnectQueryResult<ListAttachmentsForLetterData, ListAttachmentsForLetterVariables>;
export function useListAttachmentsForLetter(dc: DataConnect, vars: ListAttachmentsForLetterVariables, options?: useDataConnectQueryOptions<ListAttachmentsForLetterData>): UseDataConnectQueryResult<ListAttachmentsForLetterData, ListAttachmentsForLetterVariables>;

export function useCreateFolder(options?: useDataConnectMutationOptions<CreateFolderData, FirebaseError, CreateFolderVariables>): UseDataConnectMutationResult<CreateFolderData, CreateFolderVariables>;
export function useCreateFolder(dc: DataConnect, options?: useDataConnectMutationOptions<CreateFolderData, FirebaseError, CreateFolderVariables>): UseDataConnectMutationResult<CreateFolderData, CreateFolderVariables>;

export function useUpdateFolder(options?: useDataConnectMutationOptions<UpdateFolderData, FirebaseError, UpdateFolderVariables>): UseDataConnectMutationResult<UpdateFolderData, UpdateFolderVariables>;
export function useUpdateFolder(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateFolderData, FirebaseError, UpdateFolderVariables>): UseDataConnectMutationResult<UpdateFolderData, UpdateFolderVariables>;

export function useDeleteFolder(options?: useDataConnectMutationOptions<DeleteFolderData, FirebaseError, DeleteFolderVariables>): UseDataConnectMutationResult<DeleteFolderData, DeleteFolderVariables>;
export function useDeleteFolder(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteFolderData, FirebaseError, DeleteFolderVariables>): UseDataConnectMutationResult<DeleteFolderData, DeleteFolderVariables>;

export function useGetFolder(vars: GetFolderVariables, options?: useDataConnectQueryOptions<GetFolderData>): UseDataConnectQueryResult<GetFolderData, GetFolderVariables>;
export function useGetFolder(dc: DataConnect, vars: GetFolderVariables, options?: useDataConnectQueryOptions<GetFolderData>): UseDataConnectQueryResult<GetFolderData, GetFolderVariables>;

export function useListMyFolders(options?: useDataConnectQueryOptions<ListMyFoldersData>): UseDataConnectQueryResult<ListMyFoldersData, undefined>;
export function useListMyFolders(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyFoldersData>): UseDataConnectQueryResult<ListMyFoldersData, undefined>;

export function useAssignLetterToFolder(options?: useDataConnectMutationOptions<AssignLetterToFolderData, FirebaseError, AssignLetterToFolderVariables>): UseDataConnectMutationResult<AssignLetterToFolderData, AssignLetterToFolderVariables>;
export function useAssignLetterToFolder(dc: DataConnect, options?: useDataConnectMutationOptions<AssignLetterToFolderData, FirebaseError, AssignLetterToFolderVariables>): UseDataConnectMutationResult<AssignLetterToFolderData, AssignLetterToFolderVariables>;

export function useRemoveLetterFromFolder(options?: useDataConnectMutationOptions<RemoveLetterFromFolderData, FirebaseError, RemoveLetterFromFolderVariables>): UseDataConnectMutationResult<RemoveLetterFromFolderData, RemoveLetterFromFolderVariables>;
export function useRemoveLetterFromFolder(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveLetterFromFolderData, FirebaseError, RemoveLetterFromFolderVariables>): UseDataConnectMutationResult<RemoveLetterFromFolderData, RemoveLetterFromFolderVariables>;

export function useListFolderContents(vars: ListFolderContentsVariables, options?: useDataConnectQueryOptions<ListFolderContentsData>): UseDataConnectQueryResult<ListFolderContentsData, ListFolderContentsVariables>;
export function useListFolderContents(dc: DataConnect, vars: ListFolderContentsVariables, options?: useDataConnectQueryOptions<ListFolderContentsData>): UseDataConnectQueryResult<ListFolderContentsData, ListFolderContentsVariables>;
