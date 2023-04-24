import React from 'react'

function Pagination({totalpage , currentpage, setcurrentpage}) {
  let pagenumbers = []
  for(let i=1;i<=totalpage;i++){
        pagenumbers.push(i)
  }
  return (
    <div>
        <nav >
  <ul className="inline-flex items-center -space-x-px">
   
   
   {
    pagenumbers.map((e)=>{
     return (
      <li>
      <p  onClick={()=>setcurrentpage(e)} className={e === currentpage ? " cursor-pointer px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" : " cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"}>{e}</p>
    </li>
   
     )
    })
   }
   
   
  
  </ul>
</nav>

      
    </div>
  )
}

export default Pagination
