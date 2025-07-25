import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

   const [dest, setDest] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        console.error('Location error:', err);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  console.log(dest, location)
    const handleClick = ()=>{
      //  if (!dest || !location) return;

      navigate('/search', {
      state: {
        dest,
        currentLoca: location,
      },
    });
    }
  return (
    <section
        className="relative bg-cover bg-center h-96 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://readdy.ai/api/search-image?query=spectacular%20himalayan%20mountain%20range%20with%20prayer%20flags%20in%20foreground%20dramatic%20clouds%20and%20golden%20sunrise%20light%20creating%20inspiring%20adventure%20tourism%20atmosphere&width=1440&height=400&seq=20&orientation=landscape')`,
        }}
      >
        <div className="text-center text-white max-w-4xl px-6">
          <h1 className="text-5xl font-bold mb-4">
            Discover the Magic of Nepal
          </h1>
          <p className="text-xl mb-8">
            Experience the Himalayas, ancient cultures, and unforgettable
            adventures
          </p>

          <div className="flex items-center justify-center max-w-2xl mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Where do you want to go?"
                onChange={(e) => setDest(e.target.value)}
                className="w-full px-6 py-4 pr-20 text-gray-700 bg-white !rounded-button border-none text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={handleClick}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 !rounded-button font-semibold cursor-pointer whitespace-nowrap transition-colors duration-200"
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero