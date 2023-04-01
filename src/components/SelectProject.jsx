import React from "react";
import { useGetProjectsQuery } from "../features/projects/projectsApi";
import Loading from "./helperUi/Loading";
import Error from "./helperUi/Error";
import NotFound from "./helperUi/NotFound";

const SelectProject = ({ project, setProject }) => {
  const { data: projects, isError, isLoading } = useGetProjectsQuery();

  //decide what to render
  let content = null;
  if (isLoading) content = <Loading />;
  if (!isLoading && isError) content = <Error />;
  if (!isLoading && !isError && projects?.length === 0)
    content = <NotFound text={"Projects"} />;
  if (!isLoading && !isError && projects?.length > 0)
    content = projects?.map((project) => (
      <option key={project.id} value={project.projectName}>
        {project.projectName}
      </option>
    ));
  const handleSelectChange = (event) => {
    const name = event.target.value;
    const selectedProject = projects.find(
      (project) => project.projectName === name
    );
    setProject(selectedProject);
  };
  return (
    <div className="fieldContainer">
      <label for="lws-projectName">Project Name</label>
      <select
        id="lws-projectName"
        onChange={handleSelectChange}
        value={project?.projectName ?? ''}
        name="projectName"
        required
      >
        <option value="">Select Project</option>
        {content}
      </select>
    </div>
  );
};

export default SelectProject;
