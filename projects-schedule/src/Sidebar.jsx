import React from "react";

const Sidebar = ({ sidebarVisible, setSidebarVisible, showForm, projects,getProject }) => {
  return (
    <div
      className={`${
        sidebarVisible ? `w-full absolute top-0` : "hidden"
      } md:w-1/3 md:block md:rounded-r-md flex bg-gray-900 min-h-svh text-white items-start pl-10  flex-col transition-all duration-500 ease-in-out `}
    >
      <p
        className={`${
          sidebarVisible ? "" : "hidden"
        } absolute top-4 right-5 text-xl w-8 h-8 bg-slate-300 text-center my-auto rounded-sm text-black font-extrabold cursor-pointer hover:text-red-700 hover:w-9 hover:h-9`}
        onClick={() => setSidebarVisible(false)}
      >
        X
      </p>
      <div>

      <h1 className="text-2xl mt-10 mb-10  ">Projects</h1>
      <button
        className="bg-slate-400 px-4 py-2 rounded-sm hover:bg-blue-500"
        onClick={showForm}
        >
        +Add Project
      </button>
      <ul className="mt-4 ">
        {projects.map((item) => (
          <li className="border-b-2 pb-2 mx-4 mb-2 hover:bg-gray-600 rounded-sm cursor-pointer" onClick={() => getProject(item.id)} key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
        </div>
    </div>
  );
};

export default Sidebar;
