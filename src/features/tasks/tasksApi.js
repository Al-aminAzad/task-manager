import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTaskList: builder.query({
            query: () => '/tasks'
        }),
        getTask: builder.query({
            query: (id) => `/tasks/${id}`
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
        }),
        editTask: builder.mutation({
            query: ({ id, data }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: task } = await queryFulfilled;
                    // update single edited task cache
                    dispatch(apiSlice.util.updateQueryData('getTask', arg.id, (draft) => task))
                    // need to update full tasklist cache
                    dispatch(apiSlice.util.updateQueryData('getTaskList', undefined, (draft) => draft.map(item => item.id == task.id ? task : item)))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // update tasks cache optimistically after delete
                const finalTasks = dispatch(apiSlice.util.updateQueryData('getTaskList', undefined, (draft) => draft.filter(item => item.id !== arg)))
                try {
                    await queryFulfilled
                } catch (error) {
                    finalTasks.undo()
                }
            }
        })
    })
})

export const { useGetTaskListQuery, useGetTaskQuery, useAddTasksMutation, useEditTaskMutation, useDeleteTaskMutation } = tasksApi