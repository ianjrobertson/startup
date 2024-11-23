import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// Map container style
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

// Default center of the map (fallback if geolocation fails)
const defaultCenter = {
  lat: 37.7749, // San Francisco
  lng: -122.4194,
};

function LocationPicker({ onLocationSelect }) {
  const [currentLocation, setCurrentLocation] = useState(defaultCenter); // Initial center location
  const [selectedLocation, setSelectedLocation] = useState(null); // Selected location for the marker
  const [mapCenter, setMapCenter] = useState(defaultCenter); // Track map center separately

  // Load the Google Maps API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCMB3K5ZPZl_jcx2jhh2M0yAn48kHa4Faw",
  });

  useEffect(() => {
    // Only run this effect once when the component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(newLocation); // Update current location
          setMapCenter(newLocation); // Set map center (only once)
        },
        () => {
          console.error("Geolocation permission denied or unavailable");
        }
      );
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Handle marker placement
  const handleMapClick = (event) => {
    const location = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelectedLocation(location); // Update selected location on map click
    onLocationSelect(location); // Pass selected location to parent component
  };

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    <div style={mapContainerStyle}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={mapCenter} // Fix map center (do not change based on zoom/pan)
        zoom={14}
        onClick={handleMapClick} // Add event handler for map click
        options={{
            mapTypeControl: false,
          streetViewControl: false, // Hides the Street View button
          fullscreenControl: false, // Hides the Fullscreen button
          zoomControl: false,
          minZoom: 3, // Optional: restrict zoom levels
          maxZoom: 18,
        }}
      >
        {/* Show user's current location */}
        <Marker position={currentLocation} />
        {/* Show marker where the user clicks */}
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>
      {selectedLocation && (
        <p>
          Selected Location: {selectedLocation.lat.toFixed(4)},{" "}
          {selectedLocation.lng.toFixed(4)}
        </p>
      )}
    </div>
  );
}

export default LocationPicker;
