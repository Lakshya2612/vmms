import React from "react";
import yogiji from "../assets/yogiji2.png";
import uttam from "../assets/uttam.png";
import VISHWAKARMA from "../assets/VISHWAKARMA.png";
import tiki from "../assets/tiki tar.png";
import Card from "../components/Card/Card";
import shield from "../assets/shield-check-mark-gradient.png";
import guard from "../assets/vecteezy_police-officer-vector-illustration_251401.jpg";
import canteen from "../assets/young-people-ordering-takeaway-coffee-cafe-barista-chat-network-flat-vector-illustration-hot-beverages-service.png";
import housekeeping from "../assets/cleaners-with-cleaning-products-housekeeping-service.png";
import staffing from "../assets/user_icon_007.jpg";
import home from "../assets/vecteezy_man-search-for-hiring-job-online-from-laptop-human_.jpg";

export default function Home() {
  return (
    <>
      <div
        className="relative w-full h-96 bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${home})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Connecting Talent with Opportunity
          </h1>
          <p className="text-lg">Find your next career move with us!</p>
        </div>
      </div>
      <span className="block px-4 mt-4 text-justify sm:text-base">
        <strong>Vaishno Management and Manpower Services</strong>
        is a group of personnel who are trained and motivated to provide utility
        services to companies, factories, Industrial Houses, Corporates, and
        Residence etc. The Persons employed at Vaishno Management and Manpower
        Services are professionally competent and their approach to profession
        is totally thorough. It is the result of their dedication to the client
        that brings about consistency of Vaishno Management and Manpower
        Services standard.
      </span>
      <span className="block px-4 mt-4 text-justify sm:text-base">
        Our services are supported by efficient management also our supervisors
        are well trained in their respective jobs and are aware of
        systematic/scientific approach ensuring a clean atmosphere causing
        minimum/obstruction easiness of the client. To approach high quality
        results our personnel are deputed only after careful analysis and
        selection procedure keeping in view the specific requirement of
        respective clients.
      </span>
      <div className="flex justify-center items-center mb-6 mt-6">
        <hr className="w-20 h-0.5 bg-blue-500 mr-2" />
        <span className="text-[navy] font-semibold text-3xl sm:text-2xl">
          Our Services
        </span>
        <hr className="w-20 h-0.5 bg-blue-500 ml-2" />
      </div>
      <div className="flex gap-8 flex-wrap justify-center mt-4 mb-6 sm:gap-4">
        <Card image={shield} task1="Executive Protection" />
        <Card image={guard} task1="Guarding and security" />
        <Card image={canteen} task1="Canteen services" />
        <Card image={housekeeping} task1="House keeping services" />
        <Card image={staffing} task1="Flexible staffing" />
      </div>
      <div className="flex justify-center items-center mb-6 mt-6">
        <hr className="w-20 h-0.5 bg-blue-500 mr-2" />
        <span className="text-[navy] font-semibold text-3xl sm:text-2xl">
          Our Clients
        </span>
        <hr className="w-20 h-0.5 bg-blue-500 ml-2" />
      </div>
      <div className="flex justify-center items-center flex-wrap gap-6 mt-4 mb-6 px-6 sm:gap-4">
        <div className=" h-32 w-32 flex items-center justify-center">
          <img src={yogiji} alt="Client logo" />
        </div>
        <div className=" h-32 w-32 flex items-center justify-center ">
          <img src={uttam} alt="Client logo" />
        </div>
        <div className=" h-32 w-32 flex items-center justify-center">
          <img src={VISHWAKARMA} alt="Client logo" />
        </div>
        <div className=" h-32 w-32 flex items-center justify-center">
          <img src={tiki} alt="Client logo" />
        </div>
      </div>
    </>
  );
}
