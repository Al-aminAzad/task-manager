import React from "react";
import AddNew from "./AddNew";
import TaskList from "./TaskList";

const index = () => {
  return (
    <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <AddNew />
        <TaskList />
      </main>
    </div>
  );
};

export default index;
