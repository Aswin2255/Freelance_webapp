import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Authaction } from "../redux/Authslice";

function Navbar() {
  const [shownav, setshownav] = useState(false);
  const username = useSelector((state) => state.Auth.username);
  const role = useSelector((state) => state.Auth.role);
  const dispatch = useDispatch()
  const handellogout = ()=>{
    localStorage.removeItem('token')
    dispatch(Authaction.Userlogout());
    Navigate('/login');
  }
  return (
    <div className="sticky top-0 z-20">
      <nav className="bg-white border  ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8zL_xi9tKRu4egy3x9xsKZSW4ksonX632ici0od_H&s"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              Freelancer
            </span>
          </a>
          <button
            onClick={() => setshownav(!shownav)}
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className={
              shownav
                ? " w-full md:block md:w-auto"
                : "hidden w-full md:block md:w-auto"
            }
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white0 ">
              {username ? (
                <Link to={role === 'client' ? '/client' : '/' }>
                <p className=" cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                  {username}
                </p> 
                </Link>
              ) : (
                <Link to={"/signup"}>
                  <p className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">signup</p>
                </Link>
              )}
              {username ? (
                <p onClick={handellogout} className=" cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                  Logout
                </p>
              ) : (
                <Link to={'/login'}>
                  <p className=" cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"></p>
                  Login
                </Link>
              )}
             {
              role === 'freelancer' ? '' : role === 'client' ? <Link to={'/client/request'}><p>job request</p></Link> : ''
             }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
