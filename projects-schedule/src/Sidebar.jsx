import React from "react";

const Sidebar = ({sidebarVisible,setSidebarVisible}) => {
  return (
    <div className={`${sidebarVisible?`w-full absolute top-0`:'hidden'} md:w-1/3 md:block md:rounded-r-md flex bg-gray-900 min-h-svh text-white items-start pl-20  flex-col `}>
      <p className={`${sidebarVisible?'':'hidden'} absolute top-4 right-5 text-xl w-8 h-8 bg-slate-300 text-center my-auto rounded-sm text-black font-extrabold cursor-pointer hover:text-red-700 hover:w-9 hover:h-9`} onClick={()=>setSidebarVisible(false)}>X</p>
      <h1 className="text-2xl mt-10 mb-4">Projects</h1> 
      <button className="bg-slate-400 px-4 py-2 rounded-sm">+Add Project</button>
      <div>list of projects</div>
    </div>
  );
};

export default Sidebar;
