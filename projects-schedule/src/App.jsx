import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./SIdebar";

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  function handleClick() {
    setSidebarVisible((prev) => !prev);
  }
  return (
    <>
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
          <Sidebar
            sidebarVisible={sidebarVisible}
            setSidebarVisible={setSidebarVisible}
          />
          <div className="w-full">main window</div>
        </div>
      </div>
    </>
  );
}

export default App;
