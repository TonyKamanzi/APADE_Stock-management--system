import React from "react";
import Navbar from "../../components/home/Navbar";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 my-3">
        <div className="flex justify-center">
          <img src="/apade.png" alt="apade logo" />
        </div>
        <h1 className="md:text-3xl text-xl text-gray-600 md:flex md:justify-center mt-6 mx-6">
          <span className="md:text-3xl font-bold text-blue-600 md:mx-4 mr-2 text-2xl">
            Welcome
          </span>
          to APADE Stock Management system
        </h1>
        <p className="md:text-2xl text-gray-500 flex justify-center p-6 text-xl">
          Manage stock efficiently and securely
        </p>
      </div>
      <div className="flex justify-center">
        <Link
          to={"/login"}
          className="bg-blue-500 text-center text-white p-2 md:w-sm w-4xl  rounded-lg shadow-md hover:shadow-2xl  flex justify-center hover:bg-blue-600"
        >
          <span>Login</span>
          <LogIn className="ml-4" />
        </Link>
      </div>
    </div>
  );
}
