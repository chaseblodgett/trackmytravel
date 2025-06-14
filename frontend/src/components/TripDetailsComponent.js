import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 

const TripDetailsComponent = ( {handleAllTrips, onClickBack, onClickDestination}) => {
  const { id } = useParams(); 
  const [trip, setTrip] = useState(null);
  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await fetch(`/api/trips/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch trip details");
        }
        const tripData = await response.json();
        setTrip(tripData);
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };

    fetchTripDetails();
  }, [id]);

  if (!trip) {
    return <div>Loading...</div>;
  }

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleClickBack = () => {
    handleAllTrips();
    onClickBack();
  };

  const handleNewWindow = (destination) => {
    console.log(destination);
    onClickDestination(destination);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <button
        onClick={() => handleClickBack()}
        className="text-purple-400 hover:underline mb-4 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Trips
      </button>
  
      <h2 className="text-3xl font-bold text-purple-300 mb-2">{trip.name}</h2>
      <p className="text-lg text-gray-400">
        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
      </p>
  
      <div className="mt-6">
        <div className="space-y-4">
          {trip.destinations.map((destination, index) => (
            <div
              key={index}
              className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer border border-gray-700"
              onClick={() => handleNewWindow(destination)}
            >
              <h4 className="text-lg font-semibold text-white">{destination.name}</h4>
              <p className="text-gray-400">
                {formatDate(destination.startDate)} - {formatDate(destination.endDate)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default TripDetailsComponent;
