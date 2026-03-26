import { apiSlice } from '../apiSlice';

export interface Todo {
  id: string;
  title: string;
  description: string;
  starred: boolean;
  completed: boolean;
  projectId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoApi {
  _id: string;
  title: string;
  description: string;
  starred: boolean;
  completed: boolean;
  projectId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface getMyTodosResponse {
  todos: Todo[];
}

export interface getMyTodosApiResponse {
  todos: TodoApi[];
}

// export type TodoFilterBy = 'project' | 'starred';

export interface getTodosQueryParams {
  filterBy?: string;
  value?: string;
}

export interface createTodoBodyType {
  title: string;
  description: string;
  starred: boolean;
  projectId: string;
  dueAt?: string;
}

export interface updateTodoBodyType {
  title?: string;
  description?: string;
  starred?: boolean;
  completed?: boolean;
  projectId?: string;
  dueAt?: string;
}

export interface updateTodoArgs {
  todoId: string;
  data: updateTodoBodyType;
}

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getMyTodos: builder.query<getMyTodosResponse, getTodosQueryParams | null>({
    //   query: (params) => ({
    //     url: '/mytodos',
    //     params: params ?? undefined,
    //   }),
    //   transformResponse: (
    //     response: getMyTodosApiResponse,
    //   ): getMyTodosResponse => ({
    //     todos: response.todos.map(
    //       ({ _id, ...rest }): Todo => ({
    //         id: _id,
    //         ...rest,
    //       }),
    //     ),
    //   }),
    //   providesTags: (result) =>
    //     result
    //       ? [
    //           ...result.todos.map(({ id }) => ({
    //             type: 'Todo' as const,
    //             id,
    //           })),
    //           { type: 'Todo', id: 'LIST' },
    //         ]
    //       : [{ type: 'Todo', id: 'LIST' }],
    // }),
    getMyTodos: builder.query<getMyTodosResponse, void>({
      query: () => ({
        url: '/mytodos',
      }),
      transformResponse: (
        response: getMyTodosApiResponse,
      ): getMyTodosResponse => ({
        todos: response.todos.map(({ _id, ...rest }) => ({
          id: _id,
          ...rest,
        })),
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.todos.map(({ id }) => ({
                type: 'Todo' as const,
                id,
              })),
              { type: 'Todo', id: 'LIST' },
            ]
          : [{ type: 'Todo', id: 'LIST' }],
    }),

    getTodoById: builder.query<Todo, { todoId: string }>({
      query: ({ todoId }) => ({
        url: `/mytodos/${todoId}`,
      }),
      transformResponse: (response: { todo: TodoApi }): Todo => {
        const { _id, ...rest } = response.todo;
        return { id: _id, ...rest };
      },
      providesTags: (result, _error, arg) =>
        result
          ? [{ type: 'Todo', id: arg.todoId }]
          : [{ type: 'Todo', id: 'LIST' }],
    }),

    createTodo: builder.mutation<{ message: string }, createTodoBodyType>({
      query: (reqBody) => ({
        url: '/mytodos',
        method: 'POST',
        body: { ...reqBody },
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
    updateTodo: builder.mutation<{ message: string }, updateTodoArgs>({
      query: ({ todoId, data }) => ({
        url: `/mytodos/${todoId}`,
        method: 'PATCH',
        body: { ...data },
      }),
      // Optimistic updates - updates cache before and renders UI while API call is being made. If API call fails then UI reverts back it its original data.
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApiSlice.util.updateQueryData(
            'getMyTodos',
            undefined,
            (draft) => {
              const todo = draft.todos.find((t) => t.id === arg.todoId);
              if (todo) {
                Object.assign(todo, arg.data);
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Todo', id: arg.todoId },
      ],
    }),

    deleteTodo: builder.mutation<{ message: string }, { todoId: string }>({
      query: ({ todoId }) => ({
        url: `/mytodos/${todoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Todo', id: arg.todoId },
        { type: 'Todo', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetMyTodosQuery,
  useGetTodoByIdQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApiSlice;
