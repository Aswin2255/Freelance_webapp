import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Clienthome from "./pages/Clienthome";
import Jobrequest from "./pages/Jobrequest";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Clientprotected from "./components/Clientprotected";
import Freelanceprotected from "./components/Freelanceprotected";

function App() {
  const islogedin = useSelector((state) => state.Auth.logedin);
  const role = useSelector((state) => state.Auth.role);
  console.log(islogedin);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={islogedin && role === "freelancer" || role === "guest" ? <Home/> : <Navigate replace to={'/client'}></Navigate>}></Route>
          <Route element={<Clientprotected/>}>
          <Route path="/client" element={<Clienthome />}></Route>
          <Route path="/client/request" element={<Jobrequest />}></Route>
          </Route>
          <Route element = {<Freelanceprotected/>}>
        
            
          </Route>
          <Route
            path="/login"
            element={
              islogedin && role === "freelancer" ? (
                <Navigate replace to={"/"}></Navigate>
              ) : islogedin && role === "client" ? (
                <Navigate replace to={"/client"}></Navigate>
              ) : (
                <Login />
              )
            }
          ></Route>
         <Route
            path="/signup"
            element={
              islogedin && role === "freelancer" ? (
                <Navigate replace to={"/"}></Navigate>
              ) : islogedin && role === "client" ? (
                <Navigate replace to={"/client"}></Navigate>
              ) : (
                <Signup/>
              )
            }
          ></Route>
       
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
