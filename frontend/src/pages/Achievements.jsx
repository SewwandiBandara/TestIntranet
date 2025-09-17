import React from 'react';
import Navbar from '../components/Navbar';
// import backImg4 from '../assets/backImg4.jpg';
import car1 from '../assets/car1.jpg';

const Achievements = () => {
  // Sample awards data
  const awards = [
    {
      id: 1,
      title: "Exporter of the year 2010 (NCE of Sri Lanka)",
      description: "SLIM brand excellence",
      date: "2005-04-25",
      image: "https://www.dsi.lk/wp-content/uploads/2024/05/mo20140319001906.jpg" 
    },
    {
      id: 2,
      title: "Entrepreneur of the year 2004",
      description: "National chamber of the exporter-NCE",
      date: "2005-4-25",
      image: "https://www.dsi.lk/wp-content/uploads/2024/05/mo20140303041611.jpg" 
    },
    {
      id: 3,
      title: "EDB Presidential export award 2005",
      description: "National chamber of the exporter-NCE",
      date: "2006-08-12",
      image: "https://www.dsi.lk/wp-content/uploads/2024/05/mo20140303041747.jpg" 
    },
     {
      id: 4,
      title: "Export Excellence 2003 (Bronze)",
      description: "National chamber of the exporter-NCE",
      date: "2004-06-18",
      image: "https://www.dsi.lk/wp-content/uploads/2024/05/mo20140303042031.jpg" 
    }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed " 
          style={{backgroundImage: `url(${car1})` }}>
        <div className="absolute inset-0 bg-black opacity-40 "></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex-grow">
        <Navbar active={"/achievements"} />
        
        <div className="pt-15 px-5 pb-8">
          {/* Header */}
          <div className="text-center mb-8 pt-5">
            <h1 className="text-5xl font-bold text-white mb-2">Achievements</h1>
            <p className="text-xl font-semibold text-gray-200">Our awards and recognitions</p>
          </div>
          
          {/* Awards Cards Grid */}
          <div className="flex justify-center px-4">
            <div className="w-full max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {awards.map((award) => (
                  <div 
                    key={award.id} 
                    className="bg-white rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-opacity-90 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex justify-center mb-4">
                        <img 
                          src={award.image} 
                          alt={award.title} 
                          className="h-45 w-45 object-contain hover:scale-140 transition-transform duration-300 rounded-md"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-center text-blue-900 mb-2">
                        {award.title}
                      </h3>
                      {award.description && (
                        <p className="text-sm text-black text-center mb-4">
                          {award.description}
                        </p>)}
                      <div className="text-sm text-amber-600 font-medium text-center">
                        Awarded: {award.date}
                      </div>
                    </div>
                  </div>
                ))}
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

export default Achievements;