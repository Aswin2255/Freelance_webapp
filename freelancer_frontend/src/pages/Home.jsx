import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Crads from "../components/Crads";
import { useState } from "react";
import Modals from "../components/Modals";
import Pagination from "../components/Pagination";
import { getAlljobs, getAppliedjob } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { jobaction } from "../redux/jobslice";
import { ToastContainer } from "react-toastify";
import { Applyaction } from "../redux/apliedslice";
import Loaders from "../components/Loaders";


function Home() {
  const allJobs = useSelector((state) => state.Job.jobs);
  const role = useSelector((state)=>state.Auth.role)

  const [modal, setmodal] = useState(false);
  const [jobid,setjobid] = useState()
  const [postperpage,setpage] = useState(6)
  const [page,currentpage] = useState(1)
  const [loader,setloader] = useState(false)
  
  const lastindex = page * postperpage
  const startindex = lastindex - postperpage

   
  const dispatch = useDispatch()
  useEffect(() => {
    getAlljobs("job/getalljob")
      .then(({ data }) => {
        console.log(data)
        dispatch(jobaction.getAlljob(data));
      })
      .catch((er) => {
       
      });
      if(role === 'freelancer'){
      
        getAppliedjob('job/getappliedjob').then(({data})=>{
          console.log(data)
          dispatch(Applyaction.applied(data))
        })
        
      }
      
  }, []);

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <div className="flex justify-center align-middle m-10   ">
          <h1 className="items-center font-semibold text-xl">
            Popular projects available
          </h1>
        </div>
      <div className="flex justify-center">
       {
        loader ? <Loaders/> :  <div className=" lg:grid  grid-cols-3 gap-4 ">
        {allJobs?.length ? (
            <>
              {allJobs.slice(0).reverse(0).slice(startindex,lastindex).map((e) => {
                return <Crads modal={setmodal} jobid={setjobid} details={e} />;
              })}
            </>
          ) : (
           <Loaders/>
          )}
         
        </div>
       }
      </div>
     <div className="flex justify-center m-5">
      <Pagination totalpage = {Math.ceil(allJobs?.length/postperpage)} currentpage = {page} setcurrentpage = {currentpage}/>
     </div>
      <div>{modal && <Modals modal={setmodal} jobid={jobid} loader = {setloader} />}</div>
    </div>
  );
}

export default Home;
