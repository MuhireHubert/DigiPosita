# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*ListAllUsers*](#listallusers)
  - [*GetMailbox*](#getmailbox)
  - [*ListMyMailboxes*](#listmymailboxes)
  - [*GetLetter*](#getletter)
  - [*ListSentLetters*](#listsentletters)
  - [*GetAttachment*](#getattachment)
  - [*ListAttachmentsForLetter*](#listattachmentsforletter)
  - [*GetFolder*](#getfolder)
  - [*ListMyFolders*](#listmyfolders)
  - [*ListFolderContents*](#listfoldercontents)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateMailbox*](#createmailbox)
  - [*UpdateMailbox*](#updatemailbox)
  - [*DeleteMailbox*](#deletemailbox)
  - [*SendLetter*](#sendletter)
  - [*UpdateLetterStatus*](#updateletterstatus)
  - [*DeleteLetter*](#deleteletter)
  - [*CreateAttachment*](#createattachment)
  - [*UpdateAttachment*](#updateattachment)
  - [*DeleteAttachment*](#deleteattachment)
  - [*CreateFolder*](#createfolder)
  - [*UpdateFolder*](#updatefolder)
  - [*DeleteFolder*](#deletefolder)
  - [*AssignLetterToFolder*](#assignlettertofolder)
  - [*RemoveLetterFromFolder*](#removeletterfromfolder)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCurrentUserData {
  user?: {
    displayName: string;
    email: string;
  };
}
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@dataconnect/generated';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@dataconnect/generated';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListAllUsers
You can execute the `ListAllUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllUsers(options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

interface ListAllUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
}
export const listAllUsersRef: ListAllUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

interface ListAllUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
}
export const listAllUsersRef: ListAllUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllUsersRef:
```typescript
const name = listAllUsersRef.operationName;
console.log(name);
```

### Variables
The `ListAllUsers` query has no variables.
### Return Type
Recall that executing the `ListAllUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAllUsersData {
  users: ({
    displayName: string;
  })[];
}
```
### Using `ListAllUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllUsers } from '@dataconnect/generated';


// Call the `listAllUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listAllUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListAllUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllUsersRef } from '@dataconnect/generated';


// Call the `listAllUsersRef()` function to get a reference to the query.
const ref = listAllUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetMailbox
You can execute the `GetMailbox` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMailbox(vars: GetMailboxVariables, options?: ExecuteQueryOptions): QueryPromise<GetMailboxData, GetMailboxVariables>;

interface GetMailboxRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMailboxVariables): QueryRef<GetMailboxData, GetMailboxVariables>;
}
export const getMailboxRef: GetMailboxRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMailbox(dc: DataConnect, vars: GetMailboxVariables, options?: ExecuteQueryOptions): QueryPromise<GetMailboxData, GetMailboxVariables>;

interface GetMailboxRef {
  ...
  (dc: DataConnect, vars: GetMailboxVariables): QueryRef<GetMailboxData, GetMailboxVariables>;
}
export const getMailboxRef: GetMailboxRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMailboxRef:
```typescript
const name = getMailboxRef.operationName;
console.log(name);
```

### Variables
The `GetMailbox` query requires an argument of type `GetMailboxVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMailboxVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetMailbox` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMailboxData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMailboxData {
  mailbox?: {
    mailboxAddress: string;
  };
}
```
### Using `GetMailbox`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMailbox, GetMailboxVariables } from '@dataconnect/generated';

// The `GetMailbox` query requires an argument of type `GetMailboxVariables`:
const getMailboxVars: GetMailboxVariables = {
  id: ..., 
};

// Call the `getMailbox()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMailbox(getMailboxVars);
// Variables can be defined inline as well.
const { data } = await getMailbox({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMailbox(dataConnect, getMailboxVars);

console.log(data.mailbox);

// Or, you can use the `Promise` API.
getMailbox(getMailboxVars).then((response) => {
  const data = response.data;
  console.log(data.mailbox);
});
```

### Using `GetMailbox`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMailboxRef, GetMailboxVariables } from '@dataconnect/generated';

// The `GetMailbox` query requires an argument of type `GetMailboxVariables`:
const getMailboxVars: GetMailboxVariables = {
  id: ..., 
};

// Call the `getMailboxRef()` function to get a reference to the query.
const ref = getMailboxRef(getMailboxVars);
// Variables can be defined inline as well.
const ref = getMailboxRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMailboxRef(dataConnect, getMailboxVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.mailbox);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.mailbox);
});
```

## ListMyMailboxes
You can execute the `ListMyMailboxes` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyMailboxes(options?: ExecuteQueryOptions): QueryPromise<ListMyMailboxesData, undefined>;

interface ListMyMailboxesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyMailboxesData, undefined>;
}
export const listMyMailboxesRef: ListMyMailboxesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyMailboxes(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyMailboxesData, undefined>;

interface ListMyMailboxesRef {
  ...
  (dc: DataConnect): QueryRef<ListMyMailboxesData, undefined>;
}
export const listMyMailboxesRef: ListMyMailboxesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyMailboxesRef:
```typescript
const name = listMyMailboxesRef.operationName;
console.log(name);
```

### Variables
The `ListMyMailboxes` query has no variables.
### Return Type
Recall that executing the `ListMyMailboxes` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyMailboxesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyMailboxesData {
  mailboxes: ({
    mailboxAddress: string;
  })[];
}
```
### Using `ListMyMailboxes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyMailboxes } from '@dataconnect/generated';


// Call the `listMyMailboxes()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyMailboxes();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyMailboxes(dataConnect);

console.log(data.mailboxes);

// Or, you can use the `Promise` API.
listMyMailboxes().then((response) => {
  const data = response.data;
  console.log(data.mailboxes);
});
```

### Using `ListMyMailboxes`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyMailboxesRef } from '@dataconnect/generated';


// Call the `listMyMailboxesRef()` function to get a reference to the query.
const ref = listMyMailboxesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyMailboxesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.mailboxes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.mailboxes);
});
```

## GetLetter
You can execute the `GetLetter` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getLetter(vars: GetLetterVariables, options?: ExecuteQueryOptions): QueryPromise<GetLetterData, GetLetterVariables>;

interface GetLetterRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLetterVariables): QueryRef<GetLetterData, GetLetterVariables>;
}
export const getLetterRef: GetLetterRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLetter(dc: DataConnect, vars: GetLetterVariables, options?: ExecuteQueryOptions): QueryPromise<GetLetterData, GetLetterVariables>;

interface GetLetterRef {
  ...
  (dc: DataConnect, vars: GetLetterVariables): QueryRef<GetLetterData, GetLetterVariables>;
}
export const getLetterRef: GetLetterRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLetterRef:
```typescript
const name = getLetterRef.operationName;
console.log(name);
```

### Variables
The `GetLetter` query requires an argument of type `GetLetterVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetLetterVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetLetter` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLetterData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetLetterData {
  letter?: {
    subject: string;
    body: string;
  };
}
```
### Using `GetLetter`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLetter, GetLetterVariables } from '@dataconnect/generated';

// The `GetLetter` query requires an argument of type `GetLetterVariables`:
const getLetterVars: GetLetterVariables = {
  id: ..., 
};

// Call the `getLetter()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLetter(getLetterVars);
// Variables can be defined inline as well.
const { data } = await getLetter({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLetter(dataConnect, getLetterVars);

console.log(data.letter);

// Or, you can use the `Promise` API.
getLetter(getLetterVars).then((response) => {
  const data = response.data;
  console.log(data.letter);
});
```

### Using `GetLetter`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLetterRef, GetLetterVariables } from '@dataconnect/generated';

// The `GetLetter` query requires an argument of type `GetLetterVariables`:
const getLetterVars: GetLetterVariables = {
  id: ..., 
};

// Call the `getLetterRef()` function to get a reference to the query.
const ref = getLetterRef(getLetterVars);
// Variables can be defined inline as well.
const ref = getLetterRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLetterRef(dataConnect, getLetterVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.letter);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.letter);
});
```

## ListSentLetters
You can execute the `ListSentLetters` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listSentLetters(options?: ExecuteQueryOptions): QueryPromise<ListSentLettersData, undefined>;

interface ListSentLettersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSentLettersData, undefined>;
}
export const listSentLettersRef: ListSentLettersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSentLetters(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListSentLettersData, undefined>;

interface ListSentLettersRef {
  ...
  (dc: DataConnect): QueryRef<ListSentLettersData, undefined>;
}
export const listSentLettersRef: ListSentLettersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSentLettersRef:
```typescript
const name = listSentLettersRef.operationName;
console.log(name);
```

### Variables
The `ListSentLetters` query has no variables.
### Return Type
Recall that executing the `ListSentLetters` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSentLettersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListSentLettersData {
  letters: ({
    subject: string;
    sentAt: TimestampString;
  })[];
}
```
### Using `ListSentLetters`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSentLetters } from '@dataconnect/generated';


// Call the `listSentLetters()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSentLetters();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSentLetters(dataConnect);

console.log(data.letters);

// Or, you can use the `Promise` API.
listSentLetters().then((response) => {
  const data = response.data;
  console.log(data.letters);
});
```

### Using `ListSentLetters`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSentLettersRef } from '@dataconnect/generated';


// Call the `listSentLettersRef()` function to get a reference to the query.
const ref = listSentLettersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSentLettersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.letters);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.letters);
});
```

## GetAttachment
You can execute the `GetAttachment` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAttachment(vars: GetAttachmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetAttachmentData, GetAttachmentVariables>;

interface GetAttachmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAttachmentVariables): QueryRef<GetAttachmentData, GetAttachmentVariables>;
}
export const getAttachmentRef: GetAttachmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAttachment(dc: DataConnect, vars: GetAttachmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetAttachmentData, GetAttachmentVariables>;

interface GetAttachmentRef {
  ...
  (dc: DataConnect, vars: GetAttachmentVariables): QueryRef<GetAttachmentData, GetAttachmentVariables>;
}
export const getAttachmentRef: GetAttachmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAttachmentRef:
```typescript
const name = getAttachmentRef.operationName;
console.log(name);
```

### Variables
The `GetAttachment` query requires an argument of type `GetAttachmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAttachmentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetAttachment` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAttachmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAttachmentData {
  attachment?: {
    fileName: string;
    fileUrl: string;
  };
}
```
### Using `GetAttachment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAttachment, GetAttachmentVariables } from '@dataconnect/generated';

// The `GetAttachment` query requires an argument of type `GetAttachmentVariables`:
const getAttachmentVars: GetAttachmentVariables = {
  id: ..., 
};

// Call the `getAttachment()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAttachment(getAttachmentVars);
// Variables can be defined inline as well.
const { data } = await getAttachment({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAttachment(dataConnect, getAttachmentVars);

console.log(data.attachment);

// Or, you can use the `Promise` API.
getAttachment(getAttachmentVars).then((response) => {
  const data = response.data;
  console.log(data.attachment);
});
```

### Using `GetAttachment`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAttachmentRef, GetAttachmentVariables } from '@dataconnect/generated';

// The `GetAttachment` query requires an argument of type `GetAttachmentVariables`:
const getAttachmentVars: GetAttachmentVariables = {
  id: ..., 
};

// Call the `getAttachmentRef()` function to get a reference to the query.
const ref = getAttachmentRef(getAttachmentVars);
// Variables can be defined inline as well.
const ref = getAttachmentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAttachmentRef(dataConnect, getAttachmentVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.attachment);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.attachment);
});
```

## ListAttachmentsForLetter
You can execute the `ListAttachmentsForLetter` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAttachmentsForLetter(vars: ListAttachmentsForLetterVariables, options?: ExecuteQueryOptions): QueryPromise<ListAttachmentsForLetterData, ListAttachmentsForLetterVariables>;

interface ListAttachmentsForLetterRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAttachmentsForLetterVariables): QueryRef<ListAttachmentsForLetterData, ListAttachmentsForLetterVariables>;
}
export const listAttachmentsForLetterRef: ListAttachmentsForLetterRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAttachmentsForLetter(dc: DataConnect, vars: ListAttachmentsForLetterVariables, options?: ExecuteQueryOptions): QueryPromise<ListAttachmentsForLetterData, ListAttachmentsForLetterVariables>;

interface ListAttachmentsForLetterRef {
  ...
  (dc: DataConnect, vars: ListAttachmentsForLetterVariables): QueryRef<ListAttachmentsForLetterData, ListAttachmentsForLetterVariables>;
}
export const listAttachmentsForLetterRef: ListAttachmentsForLetterRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAttachmentsForLetterRef:
```typescript
const name = listAttachmentsForLetterRef.operationName;
console.log(name);
```

### Variables
The `ListAttachmentsForLetter` query requires an argument of type `ListAttachmentsForLetterVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAttachmentsForLetterVariables {
  letterId: UUIDString;
}
```
### Return Type
Recall that executing the `ListAttachmentsForLetter` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAttachmentsForLetterData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAttachmentsForLetterData {
  attachments: ({
    fileName: string;
  })[];
}
```
### Using `ListAttachmentsForLetter`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAttachmentsForLetter, ListAttachmentsForLetterVariables } from '@dataconnect/generated';

// The `ListAttachmentsForLetter` query requires an argument of type `ListAttachmentsForLetterVariables`:
const listAttachmentsForLetterVars: ListAttachmentsForLetterVariables = {
  letterId: ..., 
};

// Call the `listAttachmentsForLetter()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAttachmentsForLetter(listAttachmentsForLetterVars);
// Variables can be defined inline as well.
const { data } = await listAttachmentsForLetter({ letterId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAttachmentsForLetter(dataConnect, listAttachmentsForLetterVars);

console.log(data.attachments);

// Or, you can use the `Promise` API.
listAttachmentsForLetter(listAttachmentsForLetterVars).then((response) => {
  const data = response.data;
  console.log(data.attachments);
});
```

### Using `ListAttachmentsForLetter`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAttachmentsForLetterRef, ListAttachmentsForLetterVariables } from '@dataconnect/generated';

// The `ListAttachmentsForLetter` query requires an argument of type `ListAttachmentsForLetterVariables`:
const listAttachmentsForLetterVars: ListAttachmentsForLetterVariables = {
  letterId: ..., 
};

// Call the `listAttachmentsForLetterRef()` function to get a reference to the query.
const ref = listAttachmentsForLetterRef(listAttachmentsForLetterVars);
// Variables can be defined inline as well.
const ref = listAttachmentsForLetterRef({ letterId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAttachmentsForLetterRef(dataConnect, listAttachmentsForLetterVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.attachments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.attachments);
});
```

## GetFolder
You can execute the `GetFolder` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getFolder(vars: GetFolderVariables, options?: ExecuteQueryOptions): QueryPromise<GetFolderData, GetFolderVariables>;

interface GetFolderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFolderVariables): QueryRef<GetFolderData, GetFolderVariables>;
}
export const getFolderRef: GetFolderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getFolder(dc: DataConnect, vars: GetFolderVariables, options?: ExecuteQueryOptions): QueryPromise<GetFolderData, GetFolderVariables>;

interface GetFolderRef {
  ...
  (dc: DataConnect, vars: GetFolderVariables): QueryRef<GetFolderData, GetFolderVariables>;
}
export const getFolderRef: GetFolderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getFolderRef:
```typescript
const name = getFolderRef.operationName;
console.log(name);
```

### Variables
The `GetFolder` query requires an argument of type `GetFolderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetFolderVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetFolder` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetFolderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetFolderData {
  folder?: {
    name: string;
  };
}
```
### Using `GetFolder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getFolder, GetFolderVariables } from '@dataconnect/generated';

// The `GetFolder` query requires an argument of type `GetFolderVariables`:
const getFolderVars: GetFolderVariables = {
  id: ..., 
};

// Call the `getFolder()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getFolder(getFolderVars);
// Variables can be defined inline as well.
const { data } = await getFolder({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getFolder(dataConnect, getFolderVars);

console.log(data.folder);

// Or, you can use the `Promise` API.
getFolder(getFolderVars).then((response) => {
  const data = response.data;
  console.log(data.folder);
});
```

### Using `GetFolder`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getFolderRef, GetFolderVariables } from '@dataconnect/generated';

// The `GetFolder` query requires an argument of type `GetFolderVariables`:
const getFolderVars: GetFolderVariables = {
  id: ..., 
};

// Call the `getFolderRef()` function to get a reference to the query.
const ref = getFolderRef(getFolderVars);
// Variables can be defined inline as well.
const ref = getFolderRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getFolderRef(dataConnect, getFolderVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.folder);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.folder);
});
```

## ListMyFolders
You can execute the `ListMyFolders` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyFolders(options?: ExecuteQueryOptions): QueryPromise<ListMyFoldersData, undefined>;

interface ListMyFoldersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyFoldersData, undefined>;
}
export const listMyFoldersRef: ListMyFoldersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyFolders(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyFoldersData, undefined>;

interface ListMyFoldersRef {
  ...
  (dc: DataConnect): QueryRef<ListMyFoldersData, undefined>;
}
export const listMyFoldersRef: ListMyFoldersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyFoldersRef:
```typescript
const name = listMyFoldersRef.operationName;
console.log(name);
```

### Variables
The `ListMyFolders` query has no variables.
### Return Type
Recall that executing the `ListMyFolders` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyFoldersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyFoldersData {
  folders: ({
    name: string;
  })[];
}
```
### Using `ListMyFolders`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyFolders } from '@dataconnect/generated';


// Call the `listMyFolders()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyFolders();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyFolders(dataConnect);

console.log(data.folders);

// Or, you can use the `Promise` API.
listMyFolders().then((response) => {
  const data = response.data;
  console.log(data.folders);
});
```

### Using `ListMyFolders`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyFoldersRef } from '@dataconnect/generated';


// Call the `listMyFoldersRef()` function to get a reference to the query.
const ref = listMyFoldersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyFoldersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.folders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.folders);
});
```

## ListFolderContents
You can execute the `ListFolderContents` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listFolderContents(vars: ListFolderContentsVariables, options?: ExecuteQueryOptions): QueryPromise<ListFolderContentsData, ListFolderContentsVariables>;

interface ListFolderContentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListFolderContentsVariables): QueryRef<ListFolderContentsData, ListFolderContentsVariables>;
}
export const listFolderContentsRef: ListFolderContentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listFolderContents(dc: DataConnect, vars: ListFolderContentsVariables, options?: ExecuteQueryOptions): QueryPromise<ListFolderContentsData, ListFolderContentsVariables>;

interface ListFolderContentsRef {
  ...
  (dc: DataConnect, vars: ListFolderContentsVariables): QueryRef<ListFolderContentsData, ListFolderContentsVariables>;
}
export const listFolderContentsRef: ListFolderContentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listFolderContentsRef:
```typescript
const name = listFolderContentsRef.operationName;
console.log(name);
```

### Variables
The `ListFolderContents` query requires an argument of type `ListFolderContentsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListFolderContentsVariables {
  folderId: UUIDString;
}
```
### Return Type
Recall that executing the `ListFolderContents` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFolderContentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListFolderContentsData {
  letterAssignments: ({
    letter: {
      subject: string;
    };
  })[];
}
```
### Using `ListFolderContents`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listFolderContents, ListFolderContentsVariables } from '@dataconnect/generated';

// The `ListFolderContents` query requires an argument of type `ListFolderContentsVariables`:
const listFolderContentsVars: ListFolderContentsVariables = {
  folderId: ..., 
};

// Call the `listFolderContents()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listFolderContents(listFolderContentsVars);
// Variables can be defined inline as well.
const { data } = await listFolderContents({ folderId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listFolderContents(dataConnect, listFolderContentsVars);

console.log(data.letterAssignments);

// Or, you can use the `Promise` API.
listFolderContents(listFolderContentsVars).then((response) => {
  const data = response.data;
  console.log(data.letterAssignments);
});
```

### Using `ListFolderContents`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listFolderContentsRef, ListFolderContentsVariables } from '@dataconnect/generated';

// The `ListFolderContents` query requires an argument of type `ListFolderContentsVariables`:
const listFolderContentsVars: ListFolderContentsVariables = {
  folderId: ..., 
};

// Call the `listFolderContentsRef()` function to get a reference to the query.
const ref = listFolderContentsRef(listFolderContentsVars);
// Variables can be defined inline as well.
const ref = listFolderContentsRef({ folderId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listFolderContentsRef(dataConnect, listFolderContentsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.letterAssignments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.letterAssignments);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  displayName: string;
  email: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  displayName: ..., 
  email: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ displayName: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  displayName: ..., 
  email: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ displayName: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect, vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  (dc: DataConnect, vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserVariables {
  displayName: string;
}
```
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  displayName: ..., 
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ displayName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect, updateUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser(updateUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  displayName: ..., 
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ displayName: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect, updateUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateMailbox
You can execute the `CreateMailbox` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMailbox(vars: CreateMailboxVariables): MutationPromise<CreateMailboxData, CreateMailboxVariables>;

interface CreateMailboxRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMailboxVariables): MutationRef<CreateMailboxData, CreateMailboxVariables>;
}
export const createMailboxRef: CreateMailboxRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMailbox(dc: DataConnect, vars: CreateMailboxVariables): MutationPromise<CreateMailboxData, CreateMailboxVariables>;

interface CreateMailboxRef {
  ...
  (dc: DataConnect, vars: CreateMailboxVariables): MutationRef<CreateMailboxData, CreateMailboxVariables>;
}
export const createMailboxRef: CreateMailboxRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMailboxRef:
```typescript
const name = createMailboxRef.operationName;
console.log(name);
```

### Variables
The `CreateMailbox` mutation requires an argument of type `CreateMailboxVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMailboxVariables {
  address: string;
}
```
### Return Type
Recall that executing the `CreateMailbox` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMailboxData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMailboxData {
  mailbox_insert: Mailbox_Key;
}
```
### Using `CreateMailbox`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMailbox, CreateMailboxVariables } from '@dataconnect/generated';

// The `CreateMailbox` mutation requires an argument of type `CreateMailboxVariables`:
const createMailboxVars: CreateMailboxVariables = {
  address: ..., 
};

// Call the `createMailbox()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMailbox(createMailboxVars);
// Variables can be defined inline as well.
const { data } = await createMailbox({ address: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMailbox(dataConnect, createMailboxVars);

console.log(data.mailbox_insert);

// Or, you can use the `Promise` API.
createMailbox(createMailboxVars).then((response) => {
  const data = response.data;
  console.log(data.mailbox_insert);
});
```

### Using `CreateMailbox`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMailboxRef, CreateMailboxVariables } from '@dataconnect/generated';

// The `CreateMailbox` mutation requires an argument of type `CreateMailboxVariables`:
const createMailboxVars: CreateMailboxVariables = {
  address: ..., 
};

// Call the `createMailboxRef()` function to get a reference to the mutation.
const ref = createMailboxRef(createMailboxVars);
// Variables can be defined inline as well.
const ref = createMailboxRef({ address: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMailboxRef(dataConnect, createMailboxVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.mailbox_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.mailbox_insert);
});
```

## UpdateMailbox
You can execute the `UpdateMailbox` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMailbox(vars: UpdateMailboxVariables): MutationPromise<UpdateMailboxData, UpdateMailboxVariables>;

interface UpdateMailboxRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMailboxVariables): MutationRef<UpdateMailboxData, UpdateMailboxVariables>;
}
export const updateMailboxRef: UpdateMailboxRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMailbox(dc: DataConnect, vars: UpdateMailboxVariables): MutationPromise<UpdateMailboxData, UpdateMailboxVariables>;

interface UpdateMailboxRef {
  ...
  (dc: DataConnect, vars: UpdateMailboxVariables): MutationRef<UpdateMailboxData, UpdateMailboxVariables>;
}
export const updateMailboxRef: UpdateMailboxRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMailboxRef:
```typescript
const name = updateMailboxRef.operationName;
console.log(name);
```

### Variables
The `UpdateMailbox` mutation requires an argument of type `UpdateMailboxVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMailboxVariables {
  id: UUIDString;
  address: string;
}
```
### Return Type
Recall that executing the `UpdateMailbox` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMailboxData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMailboxData {
  mailbox_update?: Mailbox_Key | null;
}
```
### Using `UpdateMailbox`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMailbox, UpdateMailboxVariables } from '@dataconnect/generated';

// The `UpdateMailbox` mutation requires an argument of type `UpdateMailboxVariables`:
const updateMailboxVars: UpdateMailboxVariables = {
  id: ..., 
  address: ..., 
};

// Call the `updateMailbox()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMailbox(updateMailboxVars);
// Variables can be defined inline as well.
const { data } = await updateMailbox({ id: ..., address: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMailbox(dataConnect, updateMailboxVars);

console.log(data.mailbox_update);

// Or, you can use the `Promise` API.
updateMailbox(updateMailboxVars).then((response) => {
  const data = response.data;
  console.log(data.mailbox_update);
});
```

### Using `UpdateMailbox`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMailboxRef, UpdateMailboxVariables } from '@dataconnect/generated';

// The `UpdateMailbox` mutation requires an argument of type `UpdateMailboxVariables`:
const updateMailboxVars: UpdateMailboxVariables = {
  id: ..., 
  address: ..., 
};

// Call the `updateMailboxRef()` function to get a reference to the mutation.
const ref = updateMailboxRef(updateMailboxVars);
// Variables can be defined inline as well.
const ref = updateMailboxRef({ id: ..., address: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMailboxRef(dataConnect, updateMailboxVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.mailbox_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.mailbox_update);
});
```

## DeleteMailbox
You can execute the `DeleteMailbox` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMailbox(vars: DeleteMailboxVariables): MutationPromise<DeleteMailboxData, DeleteMailboxVariables>;

interface DeleteMailboxRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMailboxVariables): MutationRef<DeleteMailboxData, DeleteMailboxVariables>;
}
export const deleteMailboxRef: DeleteMailboxRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMailbox(dc: DataConnect, vars: DeleteMailboxVariables): MutationPromise<DeleteMailboxData, DeleteMailboxVariables>;

interface DeleteMailboxRef {
  ...
  (dc: DataConnect, vars: DeleteMailboxVariables): MutationRef<DeleteMailboxData, DeleteMailboxVariables>;
}
export const deleteMailboxRef: DeleteMailboxRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMailboxRef:
```typescript
const name = deleteMailboxRef.operationName;
console.log(name);
```

### Variables
The `DeleteMailbox` mutation requires an argument of type `DeleteMailboxVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMailboxVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteMailbox` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMailboxData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMailboxData {
  mailbox_delete?: Mailbox_Key | null;
}
```
### Using `DeleteMailbox`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMailbox, DeleteMailboxVariables } from '@dataconnect/generated';

// The `DeleteMailbox` mutation requires an argument of type `DeleteMailboxVariables`:
const deleteMailboxVars: DeleteMailboxVariables = {
  id: ..., 
};

// Call the `deleteMailbox()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMailbox(deleteMailboxVars);
// Variables can be defined inline as well.
const { data } = await deleteMailbox({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMailbox(dataConnect, deleteMailboxVars);

console.log(data.mailbox_delete);

// Or, you can use the `Promise` API.
deleteMailbox(deleteMailboxVars).then((response) => {
  const data = response.data;
  console.log(data.mailbox_delete);
});
```

### Using `DeleteMailbox`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMailboxRef, DeleteMailboxVariables } from '@dataconnect/generated';

// The `DeleteMailbox` mutation requires an argument of type `DeleteMailboxVariables`:
const deleteMailboxVars: DeleteMailboxVariables = {
  id: ..., 
};

// Call the `deleteMailboxRef()` function to get a reference to the mutation.
const ref = deleteMailboxRef(deleteMailboxVars);
// Variables can be defined inline as well.
const ref = deleteMailboxRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMailboxRef(dataConnect, deleteMailboxVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.mailbox_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.mailbox_delete);
});
```

## SendLetter
You can execute the `SendLetter` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
sendLetter(vars: SendLetterVariables): MutationPromise<SendLetterData, SendLetterVariables>;

interface SendLetterRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SendLetterVariables): MutationRef<SendLetterData, SendLetterVariables>;
}
export const sendLetterRef: SendLetterRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
sendLetter(dc: DataConnect, vars: SendLetterVariables): MutationPromise<SendLetterData, SendLetterVariables>;

interface SendLetterRef {
  ...
  (dc: DataConnect, vars: SendLetterVariables): MutationRef<SendLetterData, SendLetterVariables>;
}
export const sendLetterRef: SendLetterRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the sendLetterRef:
```typescript
const name = sendLetterRef.operationName;
console.log(name);
```

### Variables
The `SendLetter` mutation requires an argument of type `SendLetterVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SendLetterVariables {
  mailboxId: UUIDString;
  subject: string;
  body: string;
}
```
### Return Type
Recall that executing the `SendLetter` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SendLetterData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SendLetterData {
  letter_insert: Letter_Key;
}
```
### Using `SendLetter`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, sendLetter, SendLetterVariables } from '@dataconnect/generated';

// The `SendLetter` mutation requires an argument of type `SendLetterVariables`:
const sendLetterVars: SendLetterVariables = {
  mailboxId: ..., 
  subject: ..., 
  body: ..., 
};

// Call the `sendLetter()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await sendLetter(sendLetterVars);
// Variables can be defined inline as well.
const { data } = await sendLetter({ mailboxId: ..., subject: ..., body: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await sendLetter(dataConnect, sendLetterVars);

console.log(data.letter_insert);

// Or, you can use the `Promise` API.
sendLetter(sendLetterVars).then((response) => {
  const data = response.data;
  console.log(data.letter_insert);
});
```

### Using `SendLetter`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, sendLetterRef, SendLetterVariables } from '@dataconnect/generated';

// The `SendLetter` mutation requires an argument of type `SendLetterVariables`:
const sendLetterVars: SendLetterVariables = {
  mailboxId: ..., 
  subject: ..., 
  body: ..., 
};

// Call the `sendLetterRef()` function to get a reference to the mutation.
const ref = sendLetterRef(sendLetterVars);
// Variables can be defined inline as well.
const ref = sendLetterRef({ mailboxId: ..., subject: ..., body: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = sendLetterRef(dataConnect, sendLetterVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.letter_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.letter_insert);
});
```

## UpdateLetterStatus
You can execute the `UpdateLetterStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateLetterStatus(vars: UpdateLetterStatusVariables): MutationPromise<UpdateLetterStatusData, UpdateLetterStatusVariables>;

interface UpdateLetterStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLetterStatusVariables): MutationRef<UpdateLetterStatusData, UpdateLetterStatusVariables>;
}
export const updateLetterStatusRef: UpdateLetterStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateLetterStatus(dc: DataConnect, vars: UpdateLetterStatusVariables): MutationPromise<UpdateLetterStatusData, UpdateLetterStatusVariables>;

interface UpdateLetterStatusRef {
  ...
  (dc: DataConnect, vars: UpdateLetterStatusVariables): MutationRef<UpdateLetterStatusData, UpdateLetterStatusVariables>;
}
export const updateLetterStatusRef: UpdateLetterStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateLetterStatusRef:
```typescript
const name = updateLetterStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateLetterStatus` mutation requires an argument of type `UpdateLetterStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateLetterStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateLetterStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateLetterStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateLetterStatusData {
  letter_update?: Letter_Key | null;
}
```
### Using `UpdateLetterStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateLetterStatus, UpdateLetterStatusVariables } from '@dataconnect/generated';

// The `UpdateLetterStatus` mutation requires an argument of type `UpdateLetterStatusVariables`:
const updateLetterStatusVars: UpdateLetterStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateLetterStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateLetterStatus(updateLetterStatusVars);
// Variables can be defined inline as well.
const { data } = await updateLetterStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateLetterStatus(dataConnect, updateLetterStatusVars);

console.log(data.letter_update);

// Or, you can use the `Promise` API.
updateLetterStatus(updateLetterStatusVars).then((response) => {
  const data = response.data;
  console.log(data.letter_update);
});
```

### Using `UpdateLetterStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateLetterStatusRef, UpdateLetterStatusVariables } from '@dataconnect/generated';

// The `UpdateLetterStatus` mutation requires an argument of type `UpdateLetterStatusVariables`:
const updateLetterStatusVars: UpdateLetterStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateLetterStatusRef()` function to get a reference to the mutation.
const ref = updateLetterStatusRef(updateLetterStatusVars);
// Variables can be defined inline as well.
const ref = updateLetterStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateLetterStatusRef(dataConnect, updateLetterStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.letter_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.letter_update);
});
```

## DeleteLetter
You can execute the `DeleteLetter` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteLetter(vars: DeleteLetterVariables): MutationPromise<DeleteLetterData, DeleteLetterVariables>;

interface DeleteLetterRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLetterVariables): MutationRef<DeleteLetterData, DeleteLetterVariables>;
}
export const deleteLetterRef: DeleteLetterRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteLetter(dc: DataConnect, vars: DeleteLetterVariables): MutationPromise<DeleteLetterData, DeleteLetterVariables>;

interface DeleteLetterRef {
  ...
  (dc: DataConnect, vars: DeleteLetterVariables): MutationRef<DeleteLetterData, DeleteLetterVariables>;
}
export const deleteLetterRef: DeleteLetterRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteLetterRef:
```typescript
const name = deleteLetterRef.operationName;
console.log(name);
```

### Variables
The `DeleteLetter` mutation requires an argument of type `DeleteLetterVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteLetterVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteLetter` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteLetterData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteLetterData {
  letter_delete?: Letter_Key | null;
}
```
### Using `DeleteLetter`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteLetter, DeleteLetterVariables } from '@dataconnect/generated';

// The `DeleteLetter` mutation requires an argument of type `DeleteLetterVariables`:
const deleteLetterVars: DeleteLetterVariables = {
  id: ..., 
};

// Call the `deleteLetter()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteLetter(deleteLetterVars);
// Variables can be defined inline as well.
const { data } = await deleteLetter({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteLetter(dataConnect, deleteLetterVars);

console.log(data.letter_delete);

// Or, you can use the `Promise` API.
deleteLetter(deleteLetterVars).then((response) => {
  const data = response.data;
  console.log(data.letter_delete);
});
```

### Using `DeleteLetter`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteLetterRef, DeleteLetterVariables } from '@dataconnect/generated';

// The `DeleteLetter` mutation requires an argument of type `DeleteLetterVariables`:
const deleteLetterVars: DeleteLetterVariables = {
  id: ..., 
};

// Call the `deleteLetterRef()` function to get a reference to the mutation.
const ref = deleteLetterRef(deleteLetterVars);
// Variables can be defined inline as well.
const ref = deleteLetterRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteLetterRef(dataConnect, deleteLetterVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.letter_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.letter_delete);
});
```

## CreateAttachment
You can execute the `CreateAttachment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAttachment(vars: CreateAttachmentVariables): MutationPromise<CreateAttachmentData, CreateAttachmentVariables>;

interface CreateAttachmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAttachmentVariables): MutationRef<CreateAttachmentData, CreateAttachmentVariables>;
}
export const createAttachmentRef: CreateAttachmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAttachment(dc: DataConnect, vars: CreateAttachmentVariables): MutationPromise<CreateAttachmentData, CreateAttachmentVariables>;

interface CreateAttachmentRef {
  ...
  (dc: DataConnect, vars: CreateAttachmentVariables): MutationRef<CreateAttachmentData, CreateAttachmentVariables>;
}
export const createAttachmentRef: CreateAttachmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAttachmentRef:
```typescript
const name = createAttachmentRef.operationName;
console.log(name);
```

### Variables
The `CreateAttachment` mutation requires an argument of type `CreateAttachmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAttachmentVariables {
  letterId: UUIDString;
  url: string;
  name: string;
}
```
### Return Type
Recall that executing the `CreateAttachment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAttachmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAttachmentData {
  attachment_insert: Attachment_Key;
}
```
### Using `CreateAttachment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAttachment, CreateAttachmentVariables } from '@dataconnect/generated';

// The `CreateAttachment` mutation requires an argument of type `CreateAttachmentVariables`:
const createAttachmentVars: CreateAttachmentVariables = {
  letterId: ..., 
  url: ..., 
  name: ..., 
};

// Call the `createAttachment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAttachment(createAttachmentVars);
// Variables can be defined inline as well.
const { data } = await createAttachment({ letterId: ..., url: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAttachment(dataConnect, createAttachmentVars);

console.log(data.attachment_insert);

// Or, you can use the `Promise` API.
createAttachment(createAttachmentVars).then((response) => {
  const data = response.data;
  console.log(data.attachment_insert);
});
```

### Using `CreateAttachment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAttachmentRef, CreateAttachmentVariables } from '@dataconnect/generated';

// The `CreateAttachment` mutation requires an argument of type `CreateAttachmentVariables`:
const createAttachmentVars: CreateAttachmentVariables = {
  letterId: ..., 
  url: ..., 
  name: ..., 
};

// Call the `createAttachmentRef()` function to get a reference to the mutation.
const ref = createAttachmentRef(createAttachmentVars);
// Variables can be defined inline as well.
const ref = createAttachmentRef({ letterId: ..., url: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAttachmentRef(dataConnect, createAttachmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.attachment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.attachment_insert);
});
```

## UpdateAttachment
You can execute the `UpdateAttachment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateAttachment(vars: UpdateAttachmentVariables): MutationPromise<UpdateAttachmentData, UpdateAttachmentVariables>;

interface UpdateAttachmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAttachmentVariables): MutationRef<UpdateAttachmentData, UpdateAttachmentVariables>;
}
export const updateAttachmentRef: UpdateAttachmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAttachment(dc: DataConnect, vars: UpdateAttachmentVariables): MutationPromise<UpdateAttachmentData, UpdateAttachmentVariables>;

interface UpdateAttachmentRef {
  ...
  (dc: DataConnect, vars: UpdateAttachmentVariables): MutationRef<UpdateAttachmentData, UpdateAttachmentVariables>;
}
export const updateAttachmentRef: UpdateAttachmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAttachmentRef:
```typescript
const name = updateAttachmentRef.operationName;
console.log(name);
```

### Variables
The `UpdateAttachment` mutation requires an argument of type `UpdateAttachmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAttachmentVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `UpdateAttachment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAttachmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAttachmentData {
  attachment_update?: Attachment_Key | null;
}
```
### Using `UpdateAttachment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAttachment, UpdateAttachmentVariables } from '@dataconnect/generated';

// The `UpdateAttachment` mutation requires an argument of type `UpdateAttachmentVariables`:
const updateAttachmentVars: UpdateAttachmentVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateAttachment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAttachment(updateAttachmentVars);
// Variables can be defined inline as well.
const { data } = await updateAttachment({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAttachment(dataConnect, updateAttachmentVars);

console.log(data.attachment_update);

// Or, you can use the `Promise` API.
updateAttachment(updateAttachmentVars).then((response) => {
  const data = response.data;
  console.log(data.attachment_update);
});
```

### Using `UpdateAttachment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAttachmentRef, UpdateAttachmentVariables } from '@dataconnect/generated';

// The `UpdateAttachment` mutation requires an argument of type `UpdateAttachmentVariables`:
const updateAttachmentVars: UpdateAttachmentVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateAttachmentRef()` function to get a reference to the mutation.
const ref = updateAttachmentRef(updateAttachmentVars);
// Variables can be defined inline as well.
const ref = updateAttachmentRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAttachmentRef(dataConnect, updateAttachmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.attachment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.attachment_update);
});
```

## DeleteAttachment
You can execute the `DeleteAttachment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteAttachment(vars: DeleteAttachmentVariables): MutationPromise<DeleteAttachmentData, DeleteAttachmentVariables>;

interface DeleteAttachmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAttachmentVariables): MutationRef<DeleteAttachmentData, DeleteAttachmentVariables>;
}
export const deleteAttachmentRef: DeleteAttachmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAttachment(dc: DataConnect, vars: DeleteAttachmentVariables): MutationPromise<DeleteAttachmentData, DeleteAttachmentVariables>;

interface DeleteAttachmentRef {
  ...
  (dc: DataConnect, vars: DeleteAttachmentVariables): MutationRef<DeleteAttachmentData, DeleteAttachmentVariables>;
}
export const deleteAttachmentRef: DeleteAttachmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAttachmentRef:
```typescript
const name = deleteAttachmentRef.operationName;
console.log(name);
```

### Variables
The `DeleteAttachment` mutation requires an argument of type `DeleteAttachmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAttachmentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAttachment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAttachmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAttachmentData {
  attachment_delete?: Attachment_Key | null;
}
```
### Using `DeleteAttachment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAttachment, DeleteAttachmentVariables } from '@dataconnect/generated';

// The `DeleteAttachment` mutation requires an argument of type `DeleteAttachmentVariables`:
const deleteAttachmentVars: DeleteAttachmentVariables = {
  id: ..., 
};

// Call the `deleteAttachment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAttachment(deleteAttachmentVars);
// Variables can be defined inline as well.
const { data } = await deleteAttachment({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAttachment(dataConnect, deleteAttachmentVars);

console.log(data.attachment_delete);

// Or, you can use the `Promise` API.
deleteAttachment(deleteAttachmentVars).then((response) => {
  const data = response.data;
  console.log(data.attachment_delete);
});
```

### Using `DeleteAttachment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAttachmentRef, DeleteAttachmentVariables } from '@dataconnect/generated';

// The `DeleteAttachment` mutation requires an argument of type `DeleteAttachmentVariables`:
const deleteAttachmentVars: DeleteAttachmentVariables = {
  id: ..., 
};

// Call the `deleteAttachmentRef()` function to get a reference to the mutation.
const ref = deleteAttachmentRef(deleteAttachmentVars);
// Variables can be defined inline as well.
const ref = deleteAttachmentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAttachmentRef(dataConnect, deleteAttachmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.attachment_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.attachment_delete);
});
```

## CreateFolder
You can execute the `CreateFolder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createFolder(vars: CreateFolderVariables): MutationPromise<CreateFolderData, CreateFolderVariables>;

interface CreateFolderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFolderVariables): MutationRef<CreateFolderData, CreateFolderVariables>;
}
export const createFolderRef: CreateFolderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createFolder(dc: DataConnect, vars: CreateFolderVariables): MutationPromise<CreateFolderData, CreateFolderVariables>;

interface CreateFolderRef {
  ...
  (dc: DataConnect, vars: CreateFolderVariables): MutationRef<CreateFolderData, CreateFolderVariables>;
}
export const createFolderRef: CreateFolderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createFolderRef:
```typescript
const name = createFolderRef.operationName;
console.log(name);
```

### Variables
The `CreateFolder` mutation requires an argument of type `CreateFolderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateFolderVariables {
  name: string;
}
```
### Return Type
Recall that executing the `CreateFolder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateFolderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateFolderData {
  folder_insert: Folder_Key;
}
```
### Using `CreateFolder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createFolder, CreateFolderVariables } from '@dataconnect/generated';

// The `CreateFolder` mutation requires an argument of type `CreateFolderVariables`:
const createFolderVars: CreateFolderVariables = {
  name: ..., 
};

// Call the `createFolder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createFolder(createFolderVars);
// Variables can be defined inline as well.
const { data } = await createFolder({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createFolder(dataConnect, createFolderVars);

console.log(data.folder_insert);

// Or, you can use the `Promise` API.
createFolder(createFolderVars).then((response) => {
  const data = response.data;
  console.log(data.folder_insert);
});
```

### Using `CreateFolder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createFolderRef, CreateFolderVariables } from '@dataconnect/generated';

// The `CreateFolder` mutation requires an argument of type `CreateFolderVariables`:
const createFolderVars: CreateFolderVariables = {
  name: ..., 
};

// Call the `createFolderRef()` function to get a reference to the mutation.
const ref = createFolderRef(createFolderVars);
// Variables can be defined inline as well.
const ref = createFolderRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createFolderRef(dataConnect, createFolderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.folder_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.folder_insert);
});
```

## UpdateFolder
You can execute the `UpdateFolder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateFolder(vars: UpdateFolderVariables): MutationPromise<UpdateFolderData, UpdateFolderVariables>;

interface UpdateFolderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFolderVariables): MutationRef<UpdateFolderData, UpdateFolderVariables>;
}
export const updateFolderRef: UpdateFolderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateFolder(dc: DataConnect, vars: UpdateFolderVariables): MutationPromise<UpdateFolderData, UpdateFolderVariables>;

interface UpdateFolderRef {
  ...
  (dc: DataConnect, vars: UpdateFolderVariables): MutationRef<UpdateFolderData, UpdateFolderVariables>;
}
export const updateFolderRef: UpdateFolderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateFolderRef:
```typescript
const name = updateFolderRef.operationName;
console.log(name);
```

### Variables
The `UpdateFolder` mutation requires an argument of type `UpdateFolderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateFolderVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `UpdateFolder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateFolderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateFolderData {
  folder_update?: Folder_Key | null;
}
```
### Using `UpdateFolder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateFolder, UpdateFolderVariables } from '@dataconnect/generated';

// The `UpdateFolder` mutation requires an argument of type `UpdateFolderVariables`:
const updateFolderVars: UpdateFolderVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateFolder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateFolder(updateFolderVars);
// Variables can be defined inline as well.
const { data } = await updateFolder({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateFolder(dataConnect, updateFolderVars);

console.log(data.folder_update);

// Or, you can use the `Promise` API.
updateFolder(updateFolderVars).then((response) => {
  const data = response.data;
  console.log(data.folder_update);
});
```

### Using `UpdateFolder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateFolderRef, UpdateFolderVariables } from '@dataconnect/generated';

// The `UpdateFolder` mutation requires an argument of type `UpdateFolderVariables`:
const updateFolderVars: UpdateFolderVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateFolderRef()` function to get a reference to the mutation.
const ref = updateFolderRef(updateFolderVars);
// Variables can be defined inline as well.
const ref = updateFolderRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateFolderRef(dataConnect, updateFolderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.folder_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.folder_update);
});
```

## DeleteFolder
You can execute the `DeleteFolder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteFolder(vars: DeleteFolderVariables): MutationPromise<DeleteFolderData, DeleteFolderVariables>;

interface DeleteFolderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFolderVariables): MutationRef<DeleteFolderData, DeleteFolderVariables>;
}
export const deleteFolderRef: DeleteFolderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteFolder(dc: DataConnect, vars: DeleteFolderVariables): MutationPromise<DeleteFolderData, DeleteFolderVariables>;

interface DeleteFolderRef {
  ...
  (dc: DataConnect, vars: DeleteFolderVariables): MutationRef<DeleteFolderData, DeleteFolderVariables>;
}
export const deleteFolderRef: DeleteFolderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteFolderRef:
```typescript
const name = deleteFolderRef.operationName;
console.log(name);
```

### Variables
The `DeleteFolder` mutation requires an argument of type `DeleteFolderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteFolderVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteFolder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteFolderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteFolderData {
  folder_delete?: Folder_Key | null;
}
```
### Using `DeleteFolder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteFolder, DeleteFolderVariables } from '@dataconnect/generated';

// The `DeleteFolder` mutation requires an argument of type `DeleteFolderVariables`:
const deleteFolderVars: DeleteFolderVariables = {
  id: ..., 
};

// Call the `deleteFolder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteFolder(deleteFolderVars);
// Variables can be defined inline as well.
const { data } = await deleteFolder({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteFolder(dataConnect, deleteFolderVars);

console.log(data.folder_delete);

// Or, you can use the `Promise` API.
deleteFolder(deleteFolderVars).then((response) => {
  const data = response.data;
  console.log(data.folder_delete);
});
```

### Using `DeleteFolder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteFolderRef, DeleteFolderVariables } from '@dataconnect/generated';

// The `DeleteFolder` mutation requires an argument of type `DeleteFolderVariables`:
const deleteFolderVars: DeleteFolderVariables = {
  id: ..., 
};

// Call the `deleteFolderRef()` function to get a reference to the mutation.
const ref = deleteFolderRef(deleteFolderVars);
// Variables can be defined inline as well.
const ref = deleteFolderRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteFolderRef(dataConnect, deleteFolderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.folder_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.folder_delete);
});
```

## AssignLetterToFolder
You can execute the `AssignLetterToFolder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
assignLetterToFolder(vars: AssignLetterToFolderVariables): MutationPromise<AssignLetterToFolderData, AssignLetterToFolderVariables>;

interface AssignLetterToFolderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignLetterToFolderVariables): MutationRef<AssignLetterToFolderData, AssignLetterToFolderVariables>;
}
export const assignLetterToFolderRef: AssignLetterToFolderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
assignLetterToFolder(dc: DataConnect, vars: AssignLetterToFolderVariables): MutationPromise<AssignLetterToFolderData, AssignLetterToFolderVariables>;

interface AssignLetterToFolderRef {
  ...
  (dc: DataConnect, vars: AssignLetterToFolderVariables): MutationRef<AssignLetterToFolderData, AssignLetterToFolderVariables>;
}
export const assignLetterToFolderRef: AssignLetterToFolderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the assignLetterToFolderRef:
```typescript
const name = assignLetterToFolderRef.operationName;
console.log(name);
```

### Variables
The `AssignLetterToFolder` mutation requires an argument of type `AssignLetterToFolderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AssignLetterToFolderVariables {
  letterId: UUIDString;
  folderId: UUIDString;
}
```
### Return Type
Recall that executing the `AssignLetterToFolder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AssignLetterToFolderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AssignLetterToFolderData {
  letterAssignment_insert: LetterAssignment_Key;
}
```
### Using `AssignLetterToFolder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, assignLetterToFolder, AssignLetterToFolderVariables } from '@dataconnect/generated';

// The `AssignLetterToFolder` mutation requires an argument of type `AssignLetterToFolderVariables`:
const assignLetterToFolderVars: AssignLetterToFolderVariables = {
  letterId: ..., 
  folderId: ..., 
};

// Call the `assignLetterToFolder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await assignLetterToFolder(assignLetterToFolderVars);
// Variables can be defined inline as well.
const { data } = await assignLetterToFolder({ letterId: ..., folderId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await assignLetterToFolder(dataConnect, assignLetterToFolderVars);

console.log(data.letterAssignment_insert);

// Or, you can use the `Promise` API.
assignLetterToFolder(assignLetterToFolderVars).then((response) => {
  const data = response.data;
  console.log(data.letterAssignment_insert);
});
```

### Using `AssignLetterToFolder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, assignLetterToFolderRef, AssignLetterToFolderVariables } from '@dataconnect/generated';

// The `AssignLetterToFolder` mutation requires an argument of type `AssignLetterToFolderVariables`:
const assignLetterToFolderVars: AssignLetterToFolderVariables = {
  letterId: ..., 
  folderId: ..., 
};

// Call the `assignLetterToFolderRef()` function to get a reference to the mutation.
const ref = assignLetterToFolderRef(assignLetterToFolderVars);
// Variables can be defined inline as well.
const ref = assignLetterToFolderRef({ letterId: ..., folderId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = assignLetterToFolderRef(dataConnect, assignLetterToFolderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.letterAssignment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.letterAssignment_insert);
});
```

## RemoveLetterFromFolder
You can execute the `RemoveLetterFromFolder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
removeLetterFromFolder(vars: RemoveLetterFromFolderVariables): MutationPromise<RemoveLetterFromFolderData, RemoveLetterFromFolderVariables>;

interface RemoveLetterFromFolderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveLetterFromFolderVariables): MutationRef<RemoveLetterFromFolderData, RemoveLetterFromFolderVariables>;
}
export const removeLetterFromFolderRef: RemoveLetterFromFolderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeLetterFromFolder(dc: DataConnect, vars: RemoveLetterFromFolderVariables): MutationPromise<RemoveLetterFromFolderData, RemoveLetterFromFolderVariables>;

interface RemoveLetterFromFolderRef {
  ...
  (dc: DataConnect, vars: RemoveLetterFromFolderVariables): MutationRef<RemoveLetterFromFolderData, RemoveLetterFromFolderVariables>;
}
export const removeLetterFromFolderRef: RemoveLetterFromFolderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeLetterFromFolderRef:
```typescript
const name = removeLetterFromFolderRef.operationName;
console.log(name);
```

### Variables
The `RemoveLetterFromFolder` mutation requires an argument of type `RemoveLetterFromFolderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveLetterFromFolderVariables {
  letterId: UUIDString;
  folderId: UUIDString;
}
```
### Return Type
Recall that executing the `RemoveLetterFromFolder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveLetterFromFolderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveLetterFromFolderData {
  letterAssignment_delete?: LetterAssignment_Key | null;
}
```
### Using `RemoveLetterFromFolder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeLetterFromFolder, RemoveLetterFromFolderVariables } from '@dataconnect/generated';

// The `RemoveLetterFromFolder` mutation requires an argument of type `RemoveLetterFromFolderVariables`:
const removeLetterFromFolderVars: RemoveLetterFromFolderVariables = {
  letterId: ..., 
  folderId: ..., 
};

// Call the `removeLetterFromFolder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeLetterFromFolder(removeLetterFromFolderVars);
// Variables can be defined inline as well.
const { data } = await removeLetterFromFolder({ letterId: ..., folderId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeLetterFromFolder(dataConnect, removeLetterFromFolderVars);

console.log(data.letterAssignment_delete);

// Or, you can use the `Promise` API.
removeLetterFromFolder(removeLetterFromFolderVars).then((response) => {
  const data = response.data;
  console.log(data.letterAssignment_delete);
});
```

### Using `RemoveLetterFromFolder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeLetterFromFolderRef, RemoveLetterFromFolderVariables } from '@dataconnect/generated';

// The `RemoveLetterFromFolder` mutation requires an argument of type `RemoveLetterFromFolderVariables`:
const removeLetterFromFolderVars: RemoveLetterFromFolderVariables = {
  letterId: ..., 
  folderId: ..., 
};

// Call the `removeLetterFromFolderRef()` function to get a reference to the mutation.
const ref = removeLetterFromFolderRef(removeLetterFromFolderVars);
// Variables can be defined inline as well.
const ref = removeLetterFromFolderRef({ letterId: ..., folderId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeLetterFromFolderRef(dataConnect, removeLetterFromFolderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.letterAssignment_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.letterAssignment_delete);
});
```

