import React from 'react';
import Navbar from '../components/Navbar';
// import backImg4 from '../assets/backImg4.jpg';
import car1 from '../assets/car1.jpg';
import { useEffect , useState} from 'react';

const Achievements = () => {
 
  //status for get data                  
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //fetch achievements from backend
   useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/achievements');
        if (!response.ok) {
          throw new Error('Failed to fetch achievements');
        }
        const data = await response.json();
        // Map backend data to match frontend structure
        const mappedAchievements = data.map(achievement => ({
          id: achievement.Id,
          title: achievement.Title,
          description: achievement.Description,
          date: achievement.AchievementDate,
          image: `http://localhost:3001${achievement.ImagePath}`
        }));
        setAchievements(mappedAchievements);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError('Failed to load achievements. Please try again later.');
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);


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
              {loading ? (
              <div className="text-center text-white text-lg">Loading achievements...</div>
              ) : error ? (
              <div className="text-center text-red-500 text-lg">{error}</div>
              ) : achievements.length === 0 ? (
              <div className="text-center text-white text-lg">No achievements availabale.</div>
              ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {achievements.map((award) => (
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
              )}
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