import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import blue from '../assets/blue.jpg';
//import pink from '../assets/pink.jpg';
// import backImg8 from '../assets/backImg8.jpg';
import car1 from '../assets/car1.jpg';
import car2 from '../assets/car2.jpg';
import car3 from '../assets/car3.jpg';    
import car4 from '../assets/car4.jpg';
import { GrLocation } from "react-icons/gr";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import vision1  from '../assets/vision1.jpg';
import values3 from '../assets/values3.jpg';


const Home = () => {
  const companyImages = [car1, car2, car3, car4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === companyImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [companyImages.length]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Background image section */}
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0 " 
          style={{ backgroundImage: `url(${blue})` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      {/* Content section */}
      <div className="relative z-10 flex-grow">
        <Navbar active={"/"} />
        
        <div className="pt-4 px-5 pb-8">
          {/* Company Image Carousel */}
          <div className="mb-4 flex justify-center pt-17">
            <div className="rounded-lg overflow-hidden w-full h-100">
              <div className="relative w-full h-full border-9 border-white">
                <img 
                  src={companyImages[currentImageIndex]} 
                  alt="Company showcase"
                  className="w-full h-full object-cover transition-opacity duration-1000"
                />
                <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center space-x-1 p-2 bg-gradient-to-t from-black/50 to-transparent">
                  {companyImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-1.5 w-6 rounded-full transition-all ${currentImageIndex === index ? 'bg-white' : 'bg-gray-400 hover:bg-gray-300'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex flex-col lg:flex-row gap-8 py-5">
            {/* Left side - News and content */}
            <div className="flex-1 space-y-8">
              
             {/* Company values section */}
              <div className="bg-transparent rounded-lg shadow-lg shadow-red-300 hover:shadow-red-500 p-6 backdrop-blur-sm bg-opacity-90 flex">
                {/* Image on the left */}
                <div className="w-2/4 pr-6">
                  <img 
                    src={vision1}  
                    alt="Vision and Mission"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                {/* Content on the right */}
                <div className="w-2/4 pr-6">
                  <img 
                    src={values3}  
                    alt="values"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* News section */}
              <div className="bg-transparent rounded-lg shadow-lg shadow-red-300 hover:transition duration-150 ease-in-out hover:shadow-red-500 p-6 backdrop-blur-sm bg-opacity-90">
                <h2 className="text-3xl text-black font-bold mb-6 pb-2 border-b-2 border-gray-200">
                  News and Announcements
                </h2>
                <div className="space-y-4">
                  <div className="group p-4 border-b border-gray-100  hover:text-black transition-colors">
                    <h3 className="text-xl font-semibold text-white ">Latest Company Update</h3>
                    <p className="text-white mt-2">Details about the recent company developments...</p>
                    <span className="text-sm text-white block mt-2">Posted on: {new Date().toLocaleDateString()}</span>

                    {/* Popover that appears on hover - to show news */}
                    <div className="absolute hidden group-hover:block z-10 w-64 p-3  -mt-0.5 ml-4  bg-cyan-300 border-2 border-gray-300 rounded-lg shadow-lg transition-all duration-300">
                      <h4 className="font-bold text-blue-950 mb-1">Launching a new product</h4>
                      <p className="text-sm text-black">aaaaaaaaaaaaaaaaaaaaaaaa</p>
                      <div className="absolute top-3 -left-2 w-4 h-4 rotate-45 bg-cyan-500 border-l border-t border-gray-300"></div>
                    </div>
                  </div>

                  <div className="group p-4 border-b border-gray-100  hover:text-black transition-colors">
                    <h3 className="text-xl font-semibold text-white">Announcements</h3>
                    <p className="text-white mt-2">Information about  company announcements...</p>
                    <span className="text-sm text-white block mt-2">Posted on: {new Date().toLocaleDateString()}</span>
                    
                    {/* Popover that appears on hover - to show announcements */}
                    <div className="absolute hidden group-hover:block z-10 w-64 p-3  -mt-0.5 ml-4 bg-cyan-300 border-2 border-gray-300 rounded-lg shadow-lg transition-all duration-300">
                      <h4 font-bold text-blue-950 mb-1>xxxxxx</h4>
                      <p className="text-sm text-black">xxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                      <div className="absolute top-3 -left-2 w-4 h-4 rotate-45 bg-cyan-500 border-l border-t border-gray-300"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end of news and content in left side */}
            </div>

            {/* Right side - Calendar and Events */}
            <div className="lg:w-96 space-y-8">
              {/* Calendar */}
              <div className="bg-white rounded-lg shadow-md shadow-red-300 hover:shadow-red-500 p-4  backdrop-blur-sm bg-opacity-90">
                <h2 className="text-xl font-semibold text-blue-950 mb-4">Working Calendar</h2>
                <div className="flex justify-center">
                  <Calendar 
                    date={new Date()}
                    onChange={() => {}} 
                    color='#2563eb'
                  />
                </div>
              </div>

              {/* Monthly plan */}
              <div className="bg-white rounded-lg shadow-xs shadow-red-300 hover:shadow-red-500 p-1  backdrop-blur-sm bg-opacity-90">
                <p className='p-2 text-xl font-semibold text-blue-950 mb-1 flex justify-center'>Monthly plan</p>
                {/* Preview Area */}
                  <div className="mt-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 p-4 flex flex-col items-center justify-center h-60">
                    <span className="text-gray-400 mb-2">Image preview will appear here</span>
                  </div>
                <div className="bg-gray-100 rounded-lg shadow p-4 h-30 flex items-center justify-center">
                <span className="text-gray-400 mb-2 ">
                
                <input
                                    type="file"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100 "
                                    />
              </span>         
              </div>
            </div>

              {/* yearly plan */}
              <div className="bg-white rounded-lg shadow-xs shadow-red-300 hover:shadow-red-500 p-1  backdrop-blur-sm bg-opacity-90">
                <h2 className="text-xl font-semibold text-blue-950 mb-1 flex justify-center">
                  <a href="#" className="hover:text-amber-500 hover:underline transition-colors">
                    View Yearly Plan
                  </a>
                </h2>
              </div>

              {/* Events Section */}
              <div className="bg-transparent rounded-lg shadow-lg shadow-red-300  hover:shadow-red-500 p-6 backdrop-blur-sm bg-opacity-90">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 pb-2 border-b-2 border-gray-200">
                  Upcoming Events
                </h2>
                <div className="space-y-4">
                <div className="group relative p-4 border-b border-gray-100 transition-colors rounded-lg cursor-pointer">
                  <h3 className="text-lg font-bold text-black mb-3">Title: Health week</h3>
                  <p className="text-blacke mt-1 mb-3">
                    <span className="font-normal">Description: Inorder to determine whether all the workers are good in health and their healthy is very important.</span>
                  </p>
                  <p className="text-black mt-1">
                    <span className="font-normal">Date: 2025-08-15 to 2025-08-25</span> 
                  </p>
                  
                  {/* Popover that appears on hover */}
                  <div className="absolute hidden group-hover:block z-10 w-64 p-3  -mt-1 ml-4 bg-cyan-300 border border-gray-300 rounded-lg shadow-lg transition-all duration-300">
                    <h4 className="font-bold text-blue-950 mb-1">Additional Details</h4>
                    <p className="text-sm text-black">This health week includes free checkups, vaccinations, and wellness seminars for all employees.</p>
                    <div className="absolute top-3 -left-2 w-4 h-4 rotate-45 bg-cyan-500 border-l border-t border-gray-300"></div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="mt-12 bg-transparent rounded-lg shadow-lg shadow-red-300 hover:shadow-red-500 p-8 backdrop-blur-sm bg-opacity-90">
            <h2 className="text-3xl font-bold text-white mb-6 text-left">Contact Us</h2>
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
              <div className="flex flex-row justify-between gap-8"> {/* Single row layout */}
                {/* Address */}
                <div className="flex items-start flex-1 border-1 border-red-400 rounded-lg p-4">
                  <div className="text-red-600 mr-4 mt-1">
                    <GrLocation className="h-6 w-6" fill="none" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-black">Address</h4>
                    <p className="text-black">Samson Rubber Industries (Pvt) Ltd,</p>
                    <p className="text-black">Jinasena Mawatha, Mahara,</p>
                    <p className="text-black">Kadawatha, Sri Lanka</p>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-start flex-1 border-1 border-red-400 rounded-lg p-4">
                  <div className="text-red-600 mr-4 mt-1">
                    <FiPhone className="h-6 w-6" fill="none" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-black">Phone</h4>
                    <p className="text-black">+94 77 060 0601</p>
                    <p className="text-black">+94 11 292 8700</p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start flex-1 border-1 border-red-400 rounded-lg p-4">
                  <div className="text-red-600 mr-4 mt-1">
                    <HiOutlineMail className="h-6 w-6" fill="none"/>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-black">Email</h4>
                    <p className="text-black"><a href="https://dsityreshop.com/" className=''>dsityreshop@dsityre.lk</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className='bg-blue-950 text-white py-4 text-center relative z-10'>
        <p className='text-sm'>
          All rights reserved © DSI Samson Rubber Industries - Information Technology Department {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}

export default Home;