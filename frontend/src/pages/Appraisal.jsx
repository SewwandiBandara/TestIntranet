import React from 'react'
import Navbar from '../components/Navbar';
import car3 from '../assets/car3.jpg';

const Appraisal = () => {
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
            <h1 className="text-4xl font-bold text-white mb-2">Appraisal</h1>
            {/* <p className="text-xl text-gray-200">Company guidelines and operational procedures</p> */}
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


export default Appraisal;
