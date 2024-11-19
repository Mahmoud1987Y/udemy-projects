import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./Sidebar";
import FormMoadal from "./FormModal";

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const dialog = useRef();

  function handleClick() {
    setSidebarVisible((prev) => !prev);
  }
  function handleShowForm() {
    dialog.current.open();
  }
  function onClose() {
    dialog.current.close();
  }

  function getProject(id) {
    const project = [...projects.filter((item) => item.id === id)];
    setCurrentProject(project);
  }
  return (
    <>
      {<FormMoadal ref={dialog} onClose={onClose} setProjects={setProjects} />}
      <div className="bg-white ">
        <button
          className="bg-black w-30 h-10 text-white px-3 absolute right-3 top-3 mb-10 md:hidden "
          onClick={handleClick}
        >
          <span className="block w-6 bg-white h-1 mb-1"></span>
          <span className="block w-6 bg-white h-1 mb-1"></span>
          <span className="block w-6 bg-white h-1 mb-1"></span>
          <span className="block"></span>
        </button>
        <div className="flex justify-between mt-10">
          <Sidebar className="transition-all ease-in-out duration-300"
            sidebarVisible={sidebarVisible}
            setSidebarVisible={setSidebarVisible}
            showForm={handleShowForm}
            projects={projects}
            getProject={getProject}
          />
          <div className="w-full">
            <h1 className="text-center text-2xl underline uppercase">{currentProject ? currentProject[0].name : "no projects"}</h1>
            <p className="mx-4 text-gray-600 text-lg">{currentProject ? currentProject[0].description : ""}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
