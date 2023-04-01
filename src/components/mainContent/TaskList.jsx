import React from 'react'
import { useGetTaskListQuery } from '../../features/tasks/tasksApi'
import Task from './Task'
import Loading from '../helperUi/Loading'
import Error from '../helperUi/Error'
import NotFound from '../helperUi/NotFound'
const TaskList = () => {
  const {data:tasks, isLoading, isError} = useGetTaskListQuery()
    //decide what to render
    let content=null
    if(isLoading) content=<Loading/>
    if(!isLoading && isError) content=<Error/>
    if(!isLoading && !isError && tasks?.length === 0) content = <NotFound text={'Tasks'}/>
    if(!isLoading && !isError && tasks?.length >0) content= tasks?.map(task => <Task key={task.id} task={task} />)
  return (
    <div className="lws-task-list">
        {content}
    </div>
  )
}

export default TaskList