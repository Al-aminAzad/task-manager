import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTaskList: builder.query({
            query: () => '/tasks'
        }),
        addTasks: builder.mutation({
            query: (data) => ({
                url: '/tasks',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: task } = await queryFulfilled;
                    // update tasklist cache pessimistically
                    dispatch(tasksApi.util.updateQueryData('getTaskList', undefined, (draft) => {
                        draft.push(task)
                    }))

                } catch (error) {
                    console.log(error)
                }

            }
        })
    })
})

export const { useGetTaskListQuery, useAddTasksMutation } = tasksApi