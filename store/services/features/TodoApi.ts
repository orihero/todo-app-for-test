import { createApi } from "@reduxjs/toolkit/query/react";
import ApiBaseQuery from "../ApiBaseQuery";
import { Todo, Tokens } from "@/@types";

export const TodoApi = createApi({
  reducerPath: "movieApi",
  baseQuery: ApiBaseQuery({ baseUrl: "" }),
  tagTypes: ["auth", "todoList", "todo"],
  endpoints: (builder) => ({
    auth: builder.mutation<
      {
        user: {
          id: string;
        };
      } & Tokens,
      void
    >({
      query: () => ({
        url: "/auth",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    getTodos: builder.query<Todo[], void>({
      query: () => ({
        url: "/todo",
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "todoList", id: "LIST" }] : [],
    }),
    addNewTodo: builder.mutation<Todo, Pick<Todo, "title" | "description">>({
      query: (data) => ({
        url: "/todo",
        method: "POST",
        data,
      }),
      transformResponse: (response: { data: Todo }) => response.data,
      invalidatesTags: [{ type: "todoList", id: "LIST" }],
    }),
    updateStatus: builder.mutation<Todo, Pick<Todo, "status" | "id">>({
      query: (data) => ({
        url: `/todo/status/${data.id}`,
        method: "PUT",
        data: {
          status: data.status,
        },
      }),
      // Invalidate the cache for the specific todo
      invalidatesTags: (result) =>
        result ? [{ type: "todoList", id: "LIST" }] : [],
    }),
    updateTodo: builder.mutation<
      Todo,
      Pick<Todo, "description" | "title" | "id">
    >({
      query: ({ description, id, title }) => ({
        url: `/todo/${id}`,
        method: "PUT",
        data: {
          title,
          description,
        },
      }),
      // Invalidate the cache for the specific todo
      invalidatesTags: (result) =>
        result ? [{ type: "todoList", id: "LIST" }] : [],
    }),
    deleteTodo: builder.mutation<Todo, Pick<Todo, "id">>({
      query: (data) => ({
        url: `/todo/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todoList"],
    }),
  }),
});

export const {
  useAuthMutation,
  useAddNewTodoMutation,
  useGetTodosQuery,
  useLazyGetTodosQuery,
  useUpdateStatusMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = TodoApi;
