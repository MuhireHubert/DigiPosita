# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateUser, useUpdateUser, useDeleteUser, useGetCurrentUser, useListAllUsers, useCreateMailbox, useUpdateMailbox, useDeleteMailbox, useGetMailbox, useListMyMailboxes } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateUser(createUserVars);

const { data, isPending, isSuccess, isError, error } = useUpdateUser(updateUserVars);

const { data, isPending, isSuccess, isError, error } = useDeleteUser();

const { data, isPending, isSuccess, isError, error } = useGetCurrentUser();

const { data, isPending, isSuccess, isError, error } = useListAllUsers();

const { data, isPending, isSuccess, isError, error } = useCreateMailbox(createMailboxVars);

const { data, isPending, isSuccess, isError, error } = useUpdateMailbox(updateMailboxVars);

const { data, isPending, isSuccess, isError, error } = useDeleteMailbox(deleteMailboxVars);

const { data, isPending, isSuccess, isError, error } = useGetMailbox(getMailboxVars);

const { data, isPending, isSuccess, isError, error } = useListMyMailboxes();

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, updateUser, deleteUser, getCurrentUser, listAllUsers, createMailbox, updateMailbox, deleteMailbox, getMailbox, listMyMailboxes } from '@dataconnect/generated';


// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation UpdateUser:  For variables, look at type UpdateUserVars in ../index.d.ts
const { data } = await UpdateUser(dataConnect, updateUserVars);

// Operation DeleteUser: 
const { data } = await DeleteUser(dataConnect);

// Operation GetCurrentUser: 
const { data } = await GetCurrentUser(dataConnect);

// Operation ListAllUsers: 
const { data } = await ListAllUsers(dataConnect);

// Operation CreateMailbox:  For variables, look at type CreateMailboxVars in ../index.d.ts
const { data } = await CreateMailbox(dataConnect, createMailboxVars);

// Operation UpdateMailbox:  For variables, look at type UpdateMailboxVars in ../index.d.ts
const { data } = await UpdateMailbox(dataConnect, updateMailboxVars);

// Operation DeleteMailbox:  For variables, look at type DeleteMailboxVars in ../index.d.ts
const { data } = await DeleteMailbox(dataConnect, deleteMailboxVars);

// Operation GetMailbox:  For variables, look at type GetMailboxVars in ../index.d.ts
const { data } = await GetMailbox(dataConnect, getMailboxVars);

// Operation ListMyMailboxes: 
const { data } = await ListMyMailboxes(dataConnect);


```