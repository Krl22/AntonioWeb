import React, { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { NavLink } from "react-router-dom";

const locations = [
  {
    name: "Store",
    description: "Learn vocabulary and phrases related to shopping.",
    position: { lat: 42.3551, lng: -71.0656 }, // Boston Common
    pinColor: "#FBBC04", // Amarillo
    route: "/store", // Ruta para el enlace NavLink
    iconUrl: "https://img.icons8.com/color/48/000000/shop.png",
  },
  {
    name: "Hospital",
    description:
      "Understand medical terms and common phrases used in healthcare.",
    position: { lat: 42.3651, lng: -71.0616 }, // Massachusetts General Hospital
    pinColor: "#EA4335", // Rojo
    route: "/hospital", // Ruta para el enlace NavLink
    iconUrl: "https://img.icons8.com/color/48/000000/hospital-3.png",
  },
  {
    name: "Bank",
    description:
      "Familiarize yourself with financial terminology and banking procedures.",
    position: { lat: 42.377, lng: -71.0603 }, // Cambridge near Harvard University
    pinColor: "#4285F4", // Azul
    route: "/bank", // Ruta para el enlace NavLink
    iconUrl: "https://img.icons8.com/color/48/000000/bank.png",
  },
  {
    name: "Restaurant",
    description:
      "Practice ordering food and interacting with restaurant staff.",
    position: { lat: 42.3933, lng: -71.0465 }, // East Boston
    pinColor: "#34A853", // Verde
    route: "/restaurant", // Ruta para el enlace NavLink
    iconUrl: "https://img.icons8.com/color/48/000000/restaurant.png",
  },
  {
    name: "School",
    description: "Learn phrases and vocabulary related to education.",
    position: { lat: 42.3001, lng: -71.0589 }, // Dorchester
    pinColor: "#FF6F00", // Naranja
    route: "/school", // Ruta para el enlace NavLink
    iconUrl: "https://img.icons8.com/color/48/000000/school.png",
  },
  {
    name: "Park",
    description:
      "Explore vocabulary and phrases used in recreational settings.",
    position: { lat: 42.4134, lng: -71.0101 }, // Revere
    pinColor: "#9C27B0", // Morado
    route: "/park", // Ruta para el enlace NavLink
    iconUrl: "https://img.icons8.com/color/48/000000/park-bench.png",
  },
];

const Environment = () => {
  const [openInfoWindow, setOpenInfoWindow] = useState(null);

  const handleMarkerClick = (index) => {
    setOpenInfoWindow(index);
  };

  const handleCloseInfoWindow = () => {
    setOpenInfoWindow(null);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-green-50 to-green-100 p-6 pt-[92px] pb-[112px]"
      style={{ overflow: "hidden" }}
    >
      <APIProvider apiKey="AIzaSyBl-Y9xVxjWDlIVQSoNVBT_xeh43JhQlNc">
        <Map
          style={{ width: "100%", height: "600px" }}
          defaultCenter={{ lat: 42.3601, lng: -71.0589 }}
          defaultZoom={12}
          gestureHandling="greedy"
          disableDefaultUI={true}
          mapId="a548e871536e43d7"
        >
          {locations.map((location, index) => (
            <AdvancedMarker
              key={index}
              position={location.position}
              onClick={() => handleMarkerClick(index)}
            >
              <Pin background={location.pinColor} />
            </AdvancedMarker>
          ))}
          {openInfoWindow !== null && (
            <InfoWindow
              onCloseClick={handleCloseInfoWindow}
              position={locations[openInfoWindow].position}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "10px",
              }}
              headerContent={locations[openInfoWindow].name}
            >
              <div className="flex items-center justify-center mb-2">
                <img
                  src={locations[openInfoWindow].iconUrl}
                  alt={locations[openInfoWindow].name}
                  className="w-8 h-8 mr-2"
                />
              </div>
              <p className="mb-4 text-gray-600">
                {locations[openInfoWindow].description}
              </p>
              <NavLink
                to={locations[openInfoWindow].route}
                className="text-blue-500 hover:underline"
              >
                Go to {locations[openInfoWindow].name}
              </NavLink>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default Environment;
