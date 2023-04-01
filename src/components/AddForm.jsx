import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddTasksMutation } from "../features/tasks/tasksApi";
import SelectAssignee from "./SelectAssignee";
import SelectProject from "./SelectProject";

const AddForm = () => {
  const navigate = useNavigate();
  const [addTasks, { isSuccess, isLoading, isError }] = useAddTasksMutation();
  const [data, setData] = useState({
    taskName: "",
    deadline: "",
    status: "pending",
  });
  const [teamMember, setTeamMember] = useState({});
  const [project, setProject] = useState({});

  const reset = () => {
    setData({
      taskName: "",
      deadline: "",
      status: "pending",
    });
    setTeamMember({});
    setProject({});
  };

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...data,
      teamMember,
      project,
    };
    // console.log({...data,teamMember,teamMember})
    addTasks(finalData);
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
            onChange={handleChange}
            value={data.deadline}
            id="lws-deadline"
            required
          />
        </div>

        <div className="text-right">
          <button type="submit" disabled={isLoading} className="lws-submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
