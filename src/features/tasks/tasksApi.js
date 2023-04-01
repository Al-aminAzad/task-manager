import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTaskList: builder.query({
            query: () => '/tasks'
        })
    })
})

export const { useGetTaskListQuery } = tasksApi