import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const FormMoadal = forwardRef(function FormModal(
  { onClose, setProjects },
  ref
) {
  const dialog = useRef();
  const projectName = useRef();
  const projectDesc = useRef();
  const [error, setError] = useState({});
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });
  function submitForm(e) {
    e.preventDefault();
    if (projectName.current.value !== "" && projectDesc.current.value !== "") {
      setError({});
      try {
        setProjects((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            name: projectName.current.value,
            description: projectDesc.current.value,
          },
        ]);
      } catch (error) {
        setError((prev) => ({ ...prev, message: "cannot add project" }));
      }
    } else {
      setError((prev) => ({ ...prev, message: "fields must not empty" }));
    }
  }

  return (
    <dialog
      className="min-h-96 w-[30rem] bg-slate-500 px-10 py-7 rounded-md backdrop:bg-black"
      ref={dialog}
    >
      <div className="flex justify-end">
        <button
          className="w-8 h-6 rounded-full hover:text-white bg-red-700 absolute top-3 right-3"
          onClick={onClose}
        >
          X
        </button>
      </div>
      <h1 className="text-center text-4xl font-serif text-pink-950">
        Add Project
      </h1>
      <form
        className="mt-10 flex flex-col"
        method="dialog"
        onSubmit={submitForm}
      >
        <label
          className="text-white text-lg font-bold mb-1 mt-5"
          htmlFor="project_name"
        >
          Project Name
        </label>
        <input
          className="rounded-sm h-8 px-2 "
          ref={projectName}
          type="text"
          name="project_name"
          id="project_name"
        />
        <label
          className="text-white text-lg font-bold mb-1 mt-5"
          htmlFor="project_desc"
        >
          Project Description
        </label>
        <textarea
          className="h-32 rounded-md px-2 pt-1"
          ref={projectDesc}
          name="project_desc"
          id="project_desc"
        ></textarea>{" "}
        <p>{error.message}</p>
        <div className="flex justify-center gap-10 mt-5">
          <button
            type="submit"
            className="bg-yellow-600 h-10 px-4 rounded-md text-xl text-gray-100 uppercase hover:bg-yellow-800"
          >
            Add
          </button>
          <button className="border-2 px-4 text-xl uppercase rounded-md text-gray-900 hover:bg-white">
            reset
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default FormMoadal;
