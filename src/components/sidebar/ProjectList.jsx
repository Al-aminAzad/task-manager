import React from "react";
import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import Error from "../helperUi/Error";
import Loading from "../helperUi/Loading";
import NotFound from "../helperUi/NotFound";
import Project from "./Project";

const ProjectList = () => {
  const { data: projects, isError, isLoading } = useGetProjectsQuery();

  //decide what to render
  let content=null
  if(isLoading) content=<Loading/>
  if(!isLoading && isError) content=<Error/>
  if(!isLoading && !isError && projects?.length === 0) content = <NotFound text={'Projects'}/>
  if(!isLoading && !isError && projects?.length >0) content= projects?.map(project => <Project key={project.id} project={project} />)
  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">
       {content}
      </div>
    </div>
  );
};

export default ProjectList;
