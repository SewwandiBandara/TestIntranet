import React from 'react';
import Navbar from '../components/Navbar';
import car3 from '../assets/car3.jpg';

const DisplayPanel = () => {
  const cards = [
    {
      title: "Customer order status", 
    },
    {
      title: "Stores Panel",
    },
    {
      title: "Grading press panel"
    },
    {
      title: "Bicycle panel"
    }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed " 
          style={{ backgroundImage: `url(${car3})` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex-grow">
        <Navbar active={"/display"} />
        
        <div className="pt-25 px-5 pb-8">
          {/* Header */}
          <div className="text-center mb-8 pt-5">
            <h1 className="text-4xl font-bold text-white mb-2">Display Panels</h1>
          </div>
          
          {/* Square Cards Section */}
          <div className="flex justify-center p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
              {cards.map((card, index) => (
                <div 
                  key={index} 
                  className="aspect-square bg-blue-100 rounded-lg shadow-md p-4 shadow-red-200 hover:shadow-red-300 transition-shadow backdrop-blur-sm bg-opacity-90 flex flex-col items-center justify-center text-center"
                >
                  <h2 className="text-2xl font-bold text-amber-500 mb-3"><a href="#"className="hover:underline transition-colors"> {card.title} </a></h2>
                </div>
              ))}
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

export default DisplayPanel;