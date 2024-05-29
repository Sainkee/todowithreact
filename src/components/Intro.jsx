import React from "react";
import backgroundImage from "../assets/back.svg";
import { Link } from "react-router-dom";

export default function Intro() {
  return (
    <div className=" flex justify-center items-center  h-screen w-[95%] md:w-[90%] lg:w-[80%] mx-auto">
      <div className="grid md:grid-cols-2">
        <div className=" text-start">
          <h1 className="intro-heading text-4xl font-bold r mb-4 md:text-5xl lg:text-6xl text-white dark:text-white">
            Manage your todos with ease
          </h1>
          <p className=" text-xl r mb-8 md:text-xl lg:text-2xl text-white dark:text-gray-200">
            Never miss a deadline again! Get organized and stay on top of your
            tasks with our intuitive todo management system.
          </p>
          <Link
            to="/todos"
            className=" bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Get Started
          </Link>
        </div>
        <img
          src={backgroundImage}
          alt="Illustration related to todo management"
          style={{ transform: "scaleX(-1)" }}
          className=" h-full w-full  md:-mt-16"
        />
      </div>
    </div>
  );
}
