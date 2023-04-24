import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Crads from "../components/Crads";
import Modals from "../components/Modals";
import Createproject from "../components/Createproject";
import { ToastContainer } from "react-toastify";
import { getAllclientjobs, } from "../api/api";
import { jobaction } from "../redux/jobslice";
import { useDispatch, useSelector } from "react-redux";
import { Authaction } from "../redux/Authslice";
import Pagination from "../components/Pagination";
import Loaders from "../components/Loaders";

function Clienthome() {
  const dispatch = useDispatch();
  //this modal shows the more details of the job posted
  const [modal, setmodal] = useState(false);
  //this state is use to set the jobid for current viewed post
  const [jobid, setjobid] = useState("");
  const [createmodal, setcreatemodal] = useState(false);
  const [loader,setloader] = useState(false)
  const allJobs = useSelector((state) => state.Job.jobs);
  const [postperpage,setpage] = useState(6)
  const [page,currentpage] = useState(1)
  
  const lastindex = page * postperpage
  const startindex = lastindex - postperpage
  useEffect(() => {
    getAllclientjobs("job/getallclientjob")
      .then(({ data }) => {
        dispatch(jobaction.getAlljob(data));
      })
      .catch((er) => {
        alert("unexpected error occured");
        dispatch(Authaction.Userlogout());
      });
  }, []);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="flex justify-center align-middle mt-10  ">
        <button
          onClick={() => setcreatemodal(!createmodal)}
          className="p-4 w-1/2 flex justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create a New project
        </button>
      </div>
      <div className="flex justify-center align-middle m-10   ">
          <h1 className="items-center font-semibold text-xl">
            Project posted by you
          </h1>
        </div>
      <div className="flex justify-center">
        {
          loader ? <Loaders/> : <div className=" lg:grid  grid-cols-3 gap-4 ">
          {allJobs ? (
            <>
              {allJobs.slice(0).reverse().slice(startindex,lastindex).map((e) => {
                return <Crads modal={setmodal} jobid={setjobid} details={e} />;
              })}
            </>
          ) : (
            <Loaders/>
          )}
        </div>
        }
      </div>
      <div>
        {modal && <Modals modal={setmodal} jobid={jobid} />}
        {createmodal && <Createproject modal={setcreatemodal} loader = {setloader} />}
      </div>
      <div className="flex justify-center m-5">
      <Pagination totalpage = {Math.ceil(allJobs.length/postperpage)} currentpage = {page} setcurrentpage = {currentpage}/>
      </div>
    </div>
  );
}

export default Clienthome;
