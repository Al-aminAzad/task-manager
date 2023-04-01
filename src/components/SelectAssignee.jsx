import React from "react";
import { useGetTeamQuery } from "../features/team/teamApi";
import Loading from "./helperUi/Loading";
import Error from "./helperUi/Error";
import NotFound from "./helperUi/NotFound";

const Assignee = ({ teamMember, setTeamMember }) => {
  const { data: members, isLoading, isError } = useGetTeamQuery();
  //decide what to render
  let content = null;
  if (isLoading) content = <Loading />;
  if (!isLoading && isError) content = <Error />;
  if (!isLoading && !isError && members?.length === 0)
    content = <NotFound text={"Members"} />;
  if (!isLoading && !isError && members?.length > 0)
    content = members?.map((member) => (
      <option key={member.id} value={member.name}>
        {member.name}
      </option>
    ));
  // define the handleChange function
  const handleSelectChange = (event) => {
    const name = event.target.value;
    const selectedMember = members.find((member) => member.name === name);
    setTeamMember(selectedMember);
  };
  return (
    <div className="fieldContainer">
      <label>Assign To</label>
      <select
        name="teamMember"
        onChange={handleSelectChange}
        value={teamMember?.name ?? ''}
        id="lws-teamMember"
        required
      >
        <option value="">Select Job</option>
        {content}
      </select>
    </div>
  );
};

export default Assignee;
