import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import car2 from '../assets/car2.jpg';

const Applications = () => {
  // List of application sections
  const appSections = [
    {
      id: 1,
      title: "HR Management",
      icon: "",
      description: "",
      path: ""
    },
    {
      id: 2,
      title: "Product catelogue",
      icon: "",
      description: "",
      path: ""
    },
    {
      id: 3,
      title: "Display panel",
      icon: "",
      description: "",
      path: ""
    },
    {
      id: 4,
      title: "Pallet card",
      icon: "",
      description: "",
      path: ""
    },
    {
      id: 5,
      title: "Feedback form",
      icon: "",
      description: "",
      path: ""
    },
    {
      id: 6,
      title: "Non confirmity",
      icon: "",
      description: "",
      path: ""
    }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" 
          style={{ backgroundImage: `url(${car2})` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex-grow">
        <Navbar active={"/applications"} />
        
        <div className="pt-25 px-5 pb-8">
          {/* Header */}
          <div className="text-center mb-8 pt-5">
            <h1 className="text-4xl font-bold text-white mb-2">Company Applications</h1>
            <p className="text-xl text-gray-200">Access all internal systems and tools</p>
          </div>
          
          {/* Dashboard Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Application Sections */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-lg p-4 backdrop-blur-sm bg-opacity-90">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 pb-2 border-b border-gray-200">
                  Application Sections
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                  {appSections.map((section) => (
                    <NavLink 
                      key={section.id}
                      to={section.path}
                      className={({ isActive }) => 
                        `block p-4 rounded-lg transition-all hover:shadow-md ${isActive ? 'bg-blue-100 border-l-4 border-red-400' : 'bg-gray-50 hover:bg-red-500'}`
                      }
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{section.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                          <p className="text-sm text-gray-600">{section.description}</p>
                        </div>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Side - Main Content */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-lg p-6 backdrop-blur-sm bg-opacity-90 min-h-[500px]">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Application Dashboard</h2>
                
                <div className="bg-blue-50 rounded-lg p-8 text-center border-2 border-dashed border-blue-200">
                  <div className="text-blue-400 mb-4">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg> */}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Select an Application</h3>
                  <p className="text-gray-600">Choose one of the application sections from the menu to view details and access features.</p>
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
  );
};

export default Applications;