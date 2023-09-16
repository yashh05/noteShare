import React from "react";
import Navbar from "../components/Navbar";
import NavbarMui from "../components/NavbarMui";
import Navbar2 from "../components/Navbar2";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="bg-white">
      <Navbar2 />
      <div className="mx-10 md:mx-20 gap-20 py-20  flex md:flex-row items-center ">
        <div className=" flex flex-col gap-6 w-3/6">
          <h1 className=" text-2xl text-[#212024] tracking-wide	 md:text-7xl font-poppins">
            Build your best ideas together, in NoteShare
          </h1>
          <div className=" leading-9 text-[#717578] tracking-wide	text-xl">
            <span>
              Create and collaborate on online documents in real-time and from
              any device.
            </span>
            <Link to="/home" className="bg-[#1A72E9] ml-10 text-white rounded-lg px-4 py-1 font-semibold">
              Try Notes
            </Link>
          </div>
          <div className=" leading-9 text-[#717578] tracking-wide	text-lg">
          <span> Don't have an account? </span> 
          <Link to="/signup" className="text-[#1A72E9] ml-2 text-sm tracking-tighter cursor-pointer"> Sign up for free</Link>            
          </div>
        </div>
        <div className="w-3/6">
      <img src="/resources/landing.png" alt=""  className=" max-h-full rounded-lg"/>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
