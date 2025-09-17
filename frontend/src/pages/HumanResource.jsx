import React from 'react';
import Navbar from '../components/Navbar';
import car3 from '../assets/car3.jpg';

const HumanResource = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" 
          style={{ backgroundImage: `url(${car3})` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex-grow flex flex-col min-h-screen">
      <Navbar active={"/hr"} />
      
      <div className="flex-grow flex items-center justify-center">  {/* Centering both vertically and horizontally */}
        <div className="container mx-auto px-5 pt-14">
          {/* Header */}
          <div className="text-center  pt-4">  {/* Changed pt-25 to pb-8 for better spacing */}
            <h1 className="text-4xl font-bold text-white mb-2">Human Resource Management</h1>
            <p className="text-xl text-gray-200 font-bold">Leave Management System</p>
          </div>
          
          {/* Centered Login Block */}
          <div className="flex justify-center">  {/* Center the login block */}
            <div className="w-full max-w-md">
              <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Welcome to DSI HRIs</h2>
                <p className="text-gray-700 mb-6">Please sign in with your credentials.</p>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">Username</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2 font-medium">Password</label>
                    <input 
                      type="password" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your password"
                    />
                    <p className="text-right mt-2 text-sm text-blue-600 hover:underline cursor-pointer">Forgot password?</p>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      type="submit" 
                      className="flex-1 bg-red-600 font-medium text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Login
                    </button>
                    <button 
                      type="button" 
                      className="flex-1 bg-gray-500 font-medium text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
      {/* Footer */}
     <footer className='bg-blue-950 text-white py-4 text-center relative z-10 px-4'>
        <p className='text-sm'>
          All rights reserved © DSI Samson Rubber Industries - Information Technology Department {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default HumanResource;