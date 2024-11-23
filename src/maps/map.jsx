import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "250px",
};

const center = {
  lat: 0, // Default center
  lng: 0,
};

function PostMap({ location }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCMB3K5ZPZl_jcx2jhh2M0yAn48kHa4Faw",
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={location || center}
      options={{
        streetViewControl: false, // Hides the Street View button
        fullscreenControl: false, // Hides the Fullscreen button
        zoomControl: false,
      }}
    >
      {location && <Marker position={location} />}
    </GoogleMap>
  );
}

export default PostMap;
