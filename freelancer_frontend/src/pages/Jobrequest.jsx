import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Crads from "../components/Crads";
import Pagination from "../components/Pagination";

import Jobrequestmodal from "../components/Jobrequestmodal";
import { getjobreq } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { Applyaction } from "../redux/apliedslice";

function Jobrequest() {
  const dispatch = useDispatch()
  const [jobid,setjobid] = useState()
  const allJobs = useSelector((state) => state.Aplied.appliedjobs);
  const [postperpage,setpage] = useState(3)
  const [page,currentpage] = useState(1)
  
  const lastindex = page * postperpage
  const startindex = lastindex - postperpage
  useEffect(()=>{
  getjobreq('job/jobrequest').then(({data})=>{
    dispatch(Applyaction.applied(data))
  })
},[])
    const [modal,setmodal] = useState(false)
  return (
    <div>
      <div>
        <Navbar />
        <div className="flex justify-center align-middle m-10   ">
          <h1 className="items-center font-semibold text-xl">
            Project request from freelancers
          </h1>
        </div>

        <div className=" m-4 flex flex-col align-middle justify-center items-center   ">
        {allJobs ? (
            <>
              {allJobs.slice(0).reverse(0).slice(startindex,lastindex).map((e) => {
                return <Crads modal={setmodal} jobid={setjobid} details={e} apply={true} />;
              })}
            </>
          ) : (
            <h1>no req</h1>
          )}
       

       <Pagination totalpage = {Math.ceil(allJobs.length/postperpage)} currentpage = {page} setcurrentpage = {currentpage}/>
        </div>
      </div>
      {
        modal && <Jobrequestmodal modal = {setmodal} reqid = {jobid}/>
      }
    </div>
  );
}

export default Jobrequest;
