import React from "react";
// import { imageMapper } from "../../utills/imageMapper";

const Member = ({ member }) => {
  const { name, avatar } = member;
  return (
    <div className="checkbox-container">
      <img src={avatar} alt={name} className="team-avater" />
      <p className="label">{name}</p>
    </div>
  );
};

export default Member;
