import React from "react";
import SideBar from "../sidebar";
import MainContent from "../mainContent";

const Home = () => {
  return (
    <div className="container relative">
      <SideBar />
      <MainContent />
    </div>
  );
};

export default Home;
