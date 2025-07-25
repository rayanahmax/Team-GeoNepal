// googleMapsLoader.js - Google Maps dynamic loader utility

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

let googleMapsApiPromise = null;

const loadGoogleMapsAPI = () => {
  if (window.google && window.google.maps) {
    return Promise.resolve();
  }
  if (googleMapsApiPromise) {
    return googleMapsApiPromise;
  }
  googleMapsApiPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry&callback=initMap`;
    script.async = true;
    window.initMap = () => {
      resolve();
      delete window.initMap;
    };
    script.onerror = (error) => {
      delete window.initMap;
      reject(new Error('Failed to load Google Maps API'));
    };
    document.head.appendChild(script);
  });
  return googleMapsApiPromise;
};

export default loadGoogleMapsAPI; 