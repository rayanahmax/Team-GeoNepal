// src/components/MapComponent.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

// Default center (Kathmandu, Nepal)
const DEFAULT_CENTER = {
  lat: 27.7172,
  lng: 85.3167
};

const NEPAL_LOCATIONS = [
  { name: 'Kathmandu', lat: 27.704517, lng: 85.306691, description: 'A central view within Kathmandu Durbar Square, looking at temples.' },
  { name: 'Bhaktapur', lat: 27.672322, lng: 85.428418, description: 'Inside Bhaktapur Durbar Square, near the Golden Gate.' },
  { name: 'Patan (Lalitpur)', lat: 27.672836, lng: 85.325324, description: 'In the heart of Patan Durbar Square, with a view of the palace and temples.' },
  { name: 'Pokhara', lat: 28.214088, lng: 83.953538, description: 'On the main Lakeside road in Pokhara, with shops and a view towards Phewa Lake.' },
  { name: 'Lumbini', lat: 27.469190, lng: 83.274351, description: 'On the central path in Lumbini, looking towards the Maya Devi Temple.' },
  { name: 'Bandipur', lat: 27.934891, lng: 84.415413, description: 'On the main pedestrianized street of Bandipur\'s historic bazaar.' },
  { name: 'Tansen', lat: 27.868019, lng: 83.546944, description: 'On the main road in Tansen, right in front of the Tansen Durbar (Palace).' },
  { name: 'Dhulikhel', lat: 27.621455, lng: 85.556277, description: 'On the Araniko Highway passing through Dhulikhel, showing the town\'s character.' },
  { name: 'Hetauda', lat: 27.421674, lng: 85.035417, description: 'At a main intersection (chowk) in the center of Hetauda city.' },
  { name: 'Janakpur', lat: 26.728956, lng: 85.925835, description: 'A view from the street directly in front of the main gate of Janaki Mandir.' },
  { name: 'Mt. Everest Base Camp', lat: 27.975471, lng: 86.859664, description: 'Trekker View. On the EBC trail in Gorak Shep, the last settlement before base camp.' },
  { name: 'Annapurna Base Camp', lat: 28.532156, lng: 83.878772, description: 'Photosphere. A 360° view from the Annapurna Base Camp signpost, surrounded by peaks.' },
  { name: 'Ghorepani-Poon Hill', lat: 28.404285, lng: 83.697368, description: 'Photosphere. At the top of Poon Hill, showing the famous panoramic mountain view.' },
  { name: 'Manaslu Circuit', lat: 28.558356, lng: 84.773820, description: 'Nearest Road. Street view from Besisahar, a common starting point for the Annapurna and Manaslu circuits.' },
  { name: 'Langtang Valley', lat: 28.210452, lng: 85.567702, description: 'Trekker View. On the trail in Kyanjin Gompa, deep inside the Langtang Valley.' },
  { name: 'Upper Mustang', lat: 28.817448, lng: 83.873204, description: 'Nearest Road. Street View from the road near Muktinath, the gateway to Upper Mustang. The restricted area itself has no SV.' },
  { name: 'Phewa Lake (Pokhara)', lat: 28.213233, lng: 83.951591, description: 'A beautiful view of Phewa Lake from the main Lakeside road.' },
  { name: 'Gosaikunda Lake', lat: 28.084126, lng: 85.412499, description: 'Photosphere. A 360° view from the edge of the sacred Gosaikunda Lake.' },
  { name: 'Taudaha Lake', lat: 27.658607, lng: 85.281691, description: 'View from the main road that runs alongside Taudaha Lake on the outskirts of Kathmandu.' },
  { name: 'Indra Sarobar', lat: 27.593796, lng: 85.111818, description: 'Street view from the road on the Kulekhani Dam, overlooking the Indra Sarobar reservoir.' },
  { name: 'Pashupatinath Temple', lat: 27.710787, lng: 85.347895, description: 'View from the eastern bank of the Bagmati River, looking across at the main temple complex.' },
  { name: 'Swayambhunath', lat: 27.714986, lng: 85.290547, description: 'Trekker View. At the top of the stairs, looking directly at the main Swayambhunath Stupa.' },
  { name: 'Boudhanath Stupa', lat: 27.721458, lng: 85.361623, description: 'A ground-level view from within the main courtyard (kora) of the Boudhanath Stupa.' },
  { name: 'Muktinath Temple', lat: 28.816667, lng: 83.871861, description: 'Trekker View. On the path inside the Muktinath temple complex, near the 108 water spouts.' },
  { name: 'Manakamana Temple', lat: 27.904838, lng: 84.577232, description: 'Street view from the plaza area right outside the Manakamana temple entrance.' },
  { name: 'Chitwan Nat\'l Park', lat: 27.578672, lng: 84.493540, description: 'On the main street in Sauraha, the primary tourist hub for Chitwan National Park.' },
  { name: 'Sagarmatha Nat\'l Park', lat: 27.804368, lng: 86.711100, description: 'Trekker View. In the middle of Namche Bazaar, the main town inside Sagarmatha National Park.' },
  { name: 'Sarangkot (Paragliding)', lat: 28.249444, lng: 83.957500, description: 'Photosphere. A 360° view from the paragliding launch point in Sarangkot, overlooking Phewa Lake.' },
  { name: 'Bungee (The Last Resort)', lat: 27.817028, lng: 85.949778, description: 'View from the suspension bridge over the Bhote Koshi river where the bungee jump takes place.' },
  { name: 'White Water Rafting', lat: 27.818333, lng: 84.795833, description: 'View from the Prithvi Highway looking down at a rafting put-in/take-out point on the Trishuli River.' },
  { name: 'Chandragiri Hills', lat: 27.674389, lng: 85.215889, description: 'Photosphere. A 360° view from the Chandragiri Hills viewpoint, looking towards the Himalayas.' },
  { name: 'Nagarkot', lat: 27.717144, lng: 85.521570, description: 'View from the main road in Nagarkot near hotels, famous for sunrise and mountain views.' },
  { name: 'Thamel (Tourist Hub)', lat: 27.715330, lng: 85.312810, description: 'In the heart of Thamel, on a classic narrow street filled with shops and signs.' },
  { name: 'Ilam Tea Gardens', lat: 26.908271, lng: 87.923838, description: 'View from the Mechi Highway as it cuts directly through the scenic Ilam tea gardens.' },
  { name: 'Indra Jatra', lat: 27.704517, lng: 85.306691, description: 'The main celebration area for Indra Jatra is Kathmandu Durbar Square.' }
];

function MapComponent({ destination, apiKey }) {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [marker, setMarker] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [foundLocation, setFoundLocation] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || "AIzaSyDXRHvW4xMAOIN9yKyfF_n6u-BZBCJ7QXA"
  });

  const findLocationInNepal = useCallback((searchTerm) => {
    if (!searchTerm) return null;

    const normalizedSearch = searchTerm.toLowerCase().trim();
    
    // First, try exact match
    let found = NEPAL_LOCATIONS.find(location => 
      location.name.toLowerCase() === normalizedSearch
    );

    // If no exact match, try partial match
    if (!found) {
      found = NEPAL_LOCATIONS.find(location => 
        location.name.toLowerCase().includes(normalizedSearch) ||
        normalizedSearch.includes(location.name.toLowerCase())
      );
    }

    // Also check for common alternative names
    if (!found) {
      const alternativeMatches = {
        'lalitpur': 'Patan (Lalitpur)',
        'everest': 'Mt. Everest Base Camp',
        'ebc': 'Mt. Everest Base Camp',
        'abc': 'Annapurna Base Camp',
        'poon hill': 'Ghorepani-Poon Hill',
        'monkey temple': 'Swayambhunath',
        'boudha': 'Boudhanath Stupa',
        'chitwan': 'Chitwan Nat\'l Park',
        'sagarmatha': 'Sagarmatha Nat\'l Park'
      };

      const altName = alternativeMatches[normalizedSearch];
      if (altName) {
        found = NEPAL_LOCATIONS.find(location => location.name === altName);
      }
    }

    return found;
  }, []);

  useEffect(() => {
    if (destination) {
      const location = findLocationInNepal(destination);
      
      if (location) {
        const newCenter = { lat: location.lat, lng: location.lng };
        setCenter(newCenter);
        setMarker(newCenter);
        setFoundLocation(location);
        setLocationError(null);
      } else {
        setLocationError(`Location "${destination}" not found in Nepal locations database`);
        setFoundLocation(null);
        // Keep the current center and marker when location is not found
      }
    } else {
      // Reset to default when no destination
      setCenter(DEFAULT_CENTER);
      setMarker(null);
      setLocationError(null);
      setFoundLocation(null);
    }
  }, [destination, findLocationInNepal]);

  const onMapLoad = useCallback((map) => {
    // Optional: You can store the map instance if needed
    // setMap(map);
  }, []);

  if (loadError) {
    return (
      <div className="map-error" style={{ ...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
        <p>Error loading Google Maps</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="map-loading" style={{ ...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div className="map-container">
      {foundLocation && (
        <div className="location-info" style={{ padding: '10px', backgroundColor: '#e8f5e8', textAlign: 'center', fontSize: '14px' }}>
          <strong>{foundLocation.name}</strong>
          <br />
          <span style={{ color: '#666' }}>{foundLocation.description}</span>
        </div>
      )}
      
      {locationError && (
        <div className="location-error" style={{ padding: '10px', backgroundColor: '#ffebee', color: '#c62828', textAlign: 'center' }}>
          {locationError}
          <br />
          <small>Available locations: {NEPAL_LOCATIONS.slice(0, 5).map(l => l.name).join(', ')}...</small>
        </div>
      )}
      
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={destination && marker ? 12 : 8}
        mapTypeId="satellite"
        onLoad={onMapLoad}
      >
        {marker && (
          <Marker
            position={marker}
            title={foundLocation ? foundLocation.name : destination}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default MapComponent;