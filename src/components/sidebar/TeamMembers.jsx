import React from 'react'
import { useGetTeamQuery } from '../../features/team/teamApi'
import Error from '../helperUi/Error'
import Loading from '../helperUi/Loading'
import NotFound from '../helperUi/NotFound'
import Member from './Member'

const TeamMembers = () => {
  const {data: members, isLoading, isError} = useGetTeamQuery()
    //decide what to render
    let content=null
    if(isLoading) content=<Loading/>
    if(!isLoading && isError) content=<Error/>
    if(!isLoading && !isError && members?.length === 0) content = <NotFound text={'Members'}/>
    if(!isLoading && !isError && members?.length >0) content= members?.map(member => <Member key={member.id} member={member} />)
  return (
    <div className="mt-8">
    <h3 className="text-xl font-bold">Team Members</h3>
    <div className="mt-3 space-y-4">
      {content}
    </div>
  </div>
  )
}

export default TeamMembers