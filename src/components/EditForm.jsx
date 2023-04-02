import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditTaskMutation,
  useGetTaskQuery,
} from "../features/tasks/tasksApi";
import SelectProject from "./SelectProject";
import SelectAssignee from "./SelectAssignee";
import Error from "./helperUi/Error";

const EditForm = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { data: task } = useGetTaskQuery(taskId);
  const [editTask, { isLoading, isError, isSuccess }] = useEditTaskMutation();
  const [data, setData] = useState({
    taskName: "",
    deadline: "",
    status: "",
  });
  const [teamMember, setTeamMember] = useState({});
  const [project, setProject] = useState({});

  useEffect(() => {
    if (task?.id) {
      const { taskName, deadline, status, teamMember, project } = task;
      setData({
        taskName,
        deadline,
        status,
      });
      setTeamMember(teamMember);
      setProject(project);
    }
  }, [task]);
  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const reset = () => {
    setData({
      taskName: "",
      deadline: "",
      status: "",
    });
    setTeamMember({});
    setProject({});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...data,
      teamMember,
      project,
    };
    // console.log({...data,teamMember,teamMember})
    editTask({ id: taskId, data: finalData });
    reset();
  };
  return (
    <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="fieldContainer">
          <label for="lws-taskName">Task Name</label>
          <input
            type="text"
            name="taskName"
            id="lws-taskName"
            required
            placeholder="Implement RTK Query"
            value={data.taskName}
            onChange={handleChange}
          />
        </div>

        <SelectAssignee teamMember={teamMember} setTeamMember={setTeamMember} />
        <SelectProject project={project} setProject={setProject} />

        <div className="fieldContainer">
          <label for="lws-deadline">Deadline</label>
          <input
            type="date"
            name="deadline"
            id="lws-deadline"
            onChange={handleChange}
            value={data.deadline}
            required
          />
        </div>

        <div className="text-right">
          <button type="submit" disabled={isLoading} className="lws-submit">
            Update
          </button>
          {isError && <Error />}
        </div>
      </form>
    </div>
  );
};

export default EditForm;
