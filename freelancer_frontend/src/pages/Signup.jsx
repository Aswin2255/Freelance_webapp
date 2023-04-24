import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Usevalidate from "../hooks/Usevalidate";
import { signUp } from "../api/api";
import {useDispatch} from 'react-redux'
import { Authaction } from "../redux/Authslice";
import {ToastContainer,toast} from 'react-toastify'
import {  useNavigate } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const generateerror = (err) => {
    toast.error(err, {
      position: 'top-center',
    });
  };
  const { handelChange, values, errors } = Usevalidate();
  const handelsubmit = (e)=>{
    e.preventDefault()
    
   if(Object.keys(values).length === 6 && Object.keys(errors).length === 0){
      signUp('auth/signup',{values}).then(({data})=>{
        
        dispatch(Authaction.Userlogin(data))
        navigate('/')
      }).catch((er)=>{
       
       generateerror(er.response.data.message)
      })
   }
   else{
    
    generateerror('input fields have error plz check')
   }
    
  }
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <div className="flex justify-center align-middle m-10  ">
        <h1 className="items-center">Create an account</h1>
      </div>
      <div className="flex justify-center items-center align-middle m-10">
        <form onSubmit={handelsubmit} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="username"
                type="text"
                placeholder="Jane"
                maxLength={10}
                required={true}
                value={values.username}
                onChange={handelChange}
              ></input>
              <p className="text-red-500 text-xs italic  h-4">
                {errors.username && errors.username}
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="jane@gmail.com"
                name="email"
                required={true}
                maxLength={50}
                value={values.email}
                onChange={handelChange}
              ></input>
              <p className="text-red-500 text-xs italic  h-4 mt-2">
                {errors.email && errors.email}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Phone number
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                required = {true}
                placeholder="9579xxxxxx"
                name="phonenumber"
                maxLength="10"
                value={values.phonenumber}
                onChange={handelChange}
              ></input>
              <p className="text-red-500 text-xs italic h-4">
                {errors.phonenumber && errors.phonenumber}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="password"
                name="pass"
                placeholder="******"
                required = {true}
                value={values.pass}
                onChange={handelChange}
              ></input>
              <p className="text-red-500 text-xs italic h-4">
                {errors.pass && errors.pass}
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Confirm Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
                name="cpass"
                required = {true}
                value={values.cpass}
                onChange={handelChange}
                placeholder="******"
              ></input>
              <p className="text-red-500 text-xs italic h-4 mt-2">
                {errors.cpass && errors.cpass}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <input
                  defaultChecked={true}
                  type="radio"
                  name="role"
                  value="freelancer"
                  onChange={handelChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                ></input>
                <label className="ml-2 text-sm font-medium text-gray-900">
                  Join as freelancer
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="client"
                  onChange={handelChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                ></input>
                <label className="ml-2 text-sm font-medium text-gray-900">
                  Join as Client
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center align-middle ">
            <button  type="submit" className=" inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Sign up
            </button>
          </div>
        </form>
      </div>
     
    </div>
  );
}

export default Signup;
