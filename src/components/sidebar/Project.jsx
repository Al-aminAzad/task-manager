import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterTasks } from "../../features/filter/filterSlice";

const Project = ({ projects, project }) => {
  const dispatch = useDispatch()
  const { projectName, colorClass } = project;
  const [checkedProjects, setCheckedProjects] = useState([]);

  useEffect(() => {
    if (projects) {
      setCheckedProjects(projects);
    }
  }, [projects]);
  const handleChange = (e) => {
    if (e.target.checked) {
      setCheckedProjects([...checkedProjects, project]);
    } else {
      setCheckedProjects(
        checkedProjects.filter((item) => item.id !== project.id)
      );
    }
  };

  useEffect(() => {
    dispatch(filterTasks({checkedProjects}))
  }, [checkedProjects,dispatch]);
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className={`${colorClass}`}
        onChange={handleChange}
        checked={checkedProjects.includes(project)}
      />
      <p className="label">{projectName}</p>
    </div>
  );
};

export default Project;
