import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Usevalidate from "../hooks/Usevalidate";
import { ToastContainer, toast } from "react-toastify";
import { applyJob } from "../api/api";
import { Applyaction } from "../redux/apliedslice";
import { Authaction } from "../redux/Authslice";

const MySwal = withReactContent(Swal);

function Modals({ modal, jobid , loader }) {
  const job = useSelector((state) => state.Job.jobs);
  const role = useSelector((state) => state.Auth.role);
  const appliedjobs = useSelector((state) => state.Aplied.appliedjobs);
  const appliedbyuser = appliedjobs.filter((e) => e.jobid === jobid);
  const { handelChange, values, errors } = Usevalidate();
  const currentjob = job.filter((e) => e._id === jobid);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const handelapply = (e) => {
    e.preventDefault();
    if (role === "freelancer") {
      if (
        Object.keys(values).length === 3 &&
        Object.keys(errors).length === 0
      ) {
        loader(true)
        let newobj = { ...values };
        newobj.jobid = jobid;
        applyJob("job/applyjob", newobj)
          .then(({ data }) => {
            dispatch(Applyaction.applied(data));
            generatesucess("job applied");
            modal(false);
          })
          .catch((er) => {
            alert("unexpected error occured");
            dispatch(Authaction.Userlogout());
          });
      } else {
        generateerror("input fields have error plz check");
      }
    } else {
      MySwal.fire({
        title: "oops ! not loged in",
        text: "log in to apply",
        icon: "error",
        confirmButtonText: "login",
      }).then(() => {
        navigate("/login");
      });
    }
    loader(false)
  };
  return (
    <div>
      <>
        <ToastContainer />
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className=" w-auto my-6 mx-auto max-w-3xl ">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <form onSubmit={handelapply}>
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Posted by : {currentjob[0].client?.username}
                  </h3>

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
                  <div>
                    <h3 className="text-xl font-semibold">About the job</h3>
                    <p className="my-4 text-slate-500 text-lg leading-relaxed w-full h-full">
                      {currentjob[0].jobdescription}
                    </p>
                  </div>
                 
                  <div>
                    <h3 className="text-xl font-semibold">Budget</h3>
                    <p className=" text-slate-500 text-lg leading-relaxed mt-3">
                      {currentjob[0].budget}
                    </p>
                  </div>
                  {role === "freelancer" && !appliedbyuser.length ? (
                    <div className="flext justify-center mt-2">
                      <label className="block mb-2 text-sm font-semibold ">
                        Portfolio Link
                      </label>
                      <input
                        type="text"
                        name="link"
                        value={values.link}
                        onChange={handelChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="https://yourname.com/"
                        required={true}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                          }
                        }}
                      ></input>
                      <p className="text-red-500 text-xs italic  h-4">
                        {errors.link && errors.link}
                      </p>
                      <label className="block mb-2 text-sm font-semibold mt-2 ">
                        Let them know why you are a good fit
                      </label>
                      <textarea
                        name="message"
                        value={values.message}
                        onChange={handelChange}
                        rows="4"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                        placeholder="Write note to Username..."
                      ></textarea>
                      <p className="text-red-500 text-xs italic  h-4">
                        {errors.message && errors.message}
                      </p>
                    </div>
                  ) : role === 'freelancer' ?  (
                    <h1 className="text-green-600 text-center">
                      sucessfully applied.....
                    </h1>
                  ) : ''}
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
                  {role === "freelancer" || role === "guest" ? (
                    <button
                      type="submit"
                      disabled={appliedbyuser.length ? true : false}
                      className={
                        appliedbyuser.length
                          ? "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-red-600"
                          : "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                      }
                    >
                      {appliedbyuser.length ? "" : "Apply"}
                      {appliedbyuser.length ? (
                        ""
                      ) : (
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
                      )}
                    </button>
                  ) : (
                    ""
                  )}
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

export default Modals;
