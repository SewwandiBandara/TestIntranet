import React from 'react';
import Navbar from '../components/Navbar';
import car3 from '../assets/car3.jpg';

const Communication = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" 
          style={{ backgroundImage: `url(${car3})` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex-grow">
        <Navbar active={"/commu"} />
        
        <div className="pt-25 px-5 pb-8">
          {/* Header */}
          <div className="text-center mb-8 pt-5">
            <h1 className="text-4xl font-bold text-white mb-2">Communication</h1>
            {/* <p className="text-xl text-gray-200">Company guidelines and operational procedures</p> */}
          </div>
          
          {/* Add your policy content here */}
          {/* <div className="bg-white rounded-lg shadow-lg p-6 backdrop-blur-sm bg-opacity-90">
            <h2 className="text-2xl font-bold text-blue-900 mb-4"></h2>
            <div className="space-y-4">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800"></h3>
                <p clasName=">"
              </div>
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800"></h3>
                <p className="text-gray-600 mt-2"></p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">Quality Standards</h3>
                <p className="text-gray-600 mt-2"></p>
              </div>
            </div>
          </div> */}

         
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

export default Communication;