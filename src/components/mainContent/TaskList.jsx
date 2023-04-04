import React from 'react'
import { useSelector } from "react-redux";
import { useGetTaskListQuery } from '../../features/tasks/tasksApi'
import Task from './Task'
import Loading from '../helperUi/Loading'
import Error from '../helperUi/Error'
import NotFound from '../helperUi/NotFound'
const TaskList = () => {
  const {data:tasks, isLoading, isError} = useGetTaskListQuery()
  const { checkedProjects, searchText } = useSelector(state=>state.filter)
  const filterTasksByProjects =(task)=>{
    const findTask = checkedProjects.find(item=>item.id == task.project.id)
    if(findTask){
      return true
    }else{
      return false
    }
  }
  const filterTasksBySearch=(task)=>{
    const taskName = task?.taskName.toLowerCase().trim();
    const searchName = searchText.toLowerCase().trim();
    return taskName.includes(searchName);
  }
    //decide what to render
    let content=null
    if(isLoading) content=<Loading/>
    if(!isLoading && isError) content=<Error/>
    if(!isLoading && !isError && tasks?.length === 0) content = <NotFound text={'Tasks'}/>
    if(!isLoading && !isError && tasks?.length >0) content= tasks?.filter(filterTasksBySearch).filter(filterTasksByProjects).map(task => <Task key={task.id} task={task} />)
  return (
    <div className="lws-task-list">
        {content}
    </div>
  )
}

export default TaskList