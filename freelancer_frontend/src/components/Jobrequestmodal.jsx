import React from "react";
import { useSelector } from "react-redux";

function Jobrequestmodal({ modal ,reqid}) {
  const allreq = useSelector((state)=>state.Aplied.appliedjobs)
  const speceficreq = allreq.filter((e)=>e._id === reqid)
  return (
    <div>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className=" md:w-1/2  my-6 mx-auto max-w-1/2 sm:w-auto">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
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
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Take action
                <button
                  className="p-1 ml-auto bg-transparent border-0  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => modal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
              {/*body*/}
              <div className=" p-6 flex-auto overflow-y-scroll h-64">
                <div className="flext  justify-center">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-semibold "
                  >
                    Name of user : {speceficreq[0]?.userid?.username}
                  </label>

                  <label
                    for="email"
                    className="block mb-2 mt-2 text-sm font-semibold "
                  >
                    Email :  {speceficreq[0]?.userid?.email}
                  </label>
                  <label
                    for="email"
                    className="block mb-2 mt-2 text-sm font-semibold "
                  >
                    Phone number :  {speceficreq[0]?.userid?.phonenumber}
                  </label>

                  <label
                    for="email"
                    className="block mb-2 mt-2 text-sm font-semibold "
                  >
                    Portfolio Link :  {speceficreq[0]?.link}
                  </label>

                  <label
                    for="email"
                    className="block mb-2 text-sm font-semibold mt-2 "
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    value={speceficreq[0]?.message}
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Write note to Username..."
                  ></textarea>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
               
                <button
                  onClick={() => modal(false)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                >
                  close
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
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </div>
  );
}

export default Jobrequestmodal;
