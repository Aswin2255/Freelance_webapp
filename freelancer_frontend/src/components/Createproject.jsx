import React, { useState } from "react";

import Usevalidate from "../hooks/Usevalidate";
import { ToastContainer, toast } from "react-toastify";
import { addJob } from "../api/api";
import { useDispatch } from "react-redux";
import { Authaction } from "../redux/Authslice";
import { jobaction } from "../redux/jobslice";

function Createjob({ modal }) {
  const dispatch = useDispatch();

  const generateerror = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };
  const generatesucess = (err) => {
    toast.success(err, {
      position: "top-center",
    });
  };

  const { handelChange, values, errors } = Usevalidate();

  const handelsubmit = (e) => {
    e.preventDefault();
    setloader(true);
    modal(false);

    const obj = { ...values };
    delete obj.role;

    if (Object.keys(obj).length === 3) {
      addJob("job/createjob", { obj })
        .then(({ data }) => {
          generatesucess("job added sucesfully");
          dispatch(jobaction.getAlljob(data));
        })
        .catch((er) => {
          alert("error ocured log in again");
          dispatch(Authaction.Userlogout());
        });
    } else {
      generateerror("input fields contain errors plz check");
    }
  };

  return (
    <div>
      <>
        <ToastContainer />
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className=" md:w-1/2  my-6 mx-auto max-w-1/2 sm:w-auto">
            {/*content*/}

            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <form onSubmit={(e) => handelsubmit(e)}>
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                  </svg>
                  Add new job
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => modal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className=" p-6 flex-auto overflow-y-scroll h-64">
                  <div className="flext justify-center">
                    <label className="block mb-2 text-sm font-semibold ">
                      job title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={values.title}
                      maxLength={20}
                      onChange={handelChange}
                      className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="built website"
                      required={true}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                    ></input>
                    <p className="text-red-500 text-xs italic  h-4">
                      {errors.title && errors.title}
                    </p>
                    <label className="block mb-2 mt-2 text-sm font-semibold ">
                      job Description
                    </label>
                    <textarea
                      name="desc"
                      value={values.desc}
                      onChange={handelChange}
                      rows="4"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                      placeholder="Write note to Username..."
                      required={true}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                    ></textarea>
                    <p className="text-red-500 text-xs italic  h-4">
                      {errors.desc && errors.desc}
                    </p>

                    <label className="block mb-2 text-sm font-semibold mt-2 ">
                      budget
                    </label>
                    <input
                      type="number"
                      name="budget"
                      value={values.budget}
                      onChange={handelChange}
                      className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="1000"
                      required={true}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                    ></input>
                    <p className="text-red-500 text-xs italic  h-4">
                      {errors.budget && errors.budget}
                    </p>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => modal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </div>
  );
}

export default Createjob;
