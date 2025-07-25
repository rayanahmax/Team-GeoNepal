import React, { useEffect, useState } from 'react';

const GoogleReverseGeocode = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const GOOGLE_API_KEY = 'AIzaSyDXRHvW4xMAOIN9yKyfF_n6u-BZBCJ7QXA'; // 🔒 Replace this securely

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setLocation(coords);

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lon}&key=${GOOGLE_API_KEY}`
          );
          const data = await response.json();

          if (data.status === 'OK') {
            const formatted = data.results[0]?.formatted_address || 'Unknown address';
            setAddress(formatted);
          } else {
            setError('Geocoding error: ' + data.status);
          }
        } catch (err) {
          setError('Failed to get address');
        }
      },
      (err) => {
        setError('Location error: ' + err.message);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div>
      <h2>Live Location</h2>
      {error && <p>Error: {error}</p>}
      {location ? (
        <>
          <p><strong>Coordinates:</strong> {location.lat}, {location.lon}</p>
          <p><strong>Address:</strong> {address}</p>
        </>
      ) : (
        <p>Tracking location...</p>
      )}
    </div>
  );
};

export default GoogleReverseGeocode;
