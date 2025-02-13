import React from "react";
import errorImage from "../assets/ErrorImage.png"

const LandscapeCard = ({ property }) => {
  return (
    <div className="grid grid-cols-3 group rounded-lg w-full my-5 h-full p-4 border-[0.1px] gap-5 border-red-300 shadow-[0px_2px_4px_2px_rgba(0,_0,_0,_0.35)]  hover:shadow-[0px_8px_9px_2px_rgba(0,_0,_0,_0.35)]">
      <div className="rounded-md w-90">
        {/* <img className="rounded-md h-full w-full object-cover" src={hero} alt={property.title} /> */}
        {property.photos.length > 0 ? (
          <img
            src={`http://localhost:5000/${property.photos[0]}`}
            alt={property.title}
            className="rounded-md object-fill w-90 h-60 hover:scale-105 transition"
          />
        ) : (
          <img
            src={errorImage}
            alt={property.title}
            className="rounded-md object-fill w-90 h-60"
          />
        )}
      </div>

      <div className="flex flex-col justify-between p-2">
        <div className="text-2xl font-bold text-gray-800 hover:underline">{property.title}</div>
        <div className="flex flex-col space-y-1">
          <div className="text-lg text-gray-700">
            <span className="font-semibold hover:underline">Price:</span> ${property.price}
          </div>
          <div className="text-lg text-gray-700">
            <span className="font-semibold hover:underline">Size:</span> {property.size} sq ft
          </div>
          <div className="text-lg text-gray-700">
            <span className="font-semibold hover:underline">Location:</span> {property.city}
          </div>
        </div>
        <div className="text-xl font-semibold mt-2 text-gray-900 hover:underline">Description</div>
      </div>

      <div className="absolute right-45  opacity-0 group-hover:opacity-100 transition">
        <button className="px-4 py-2 bg-red-600 hover:drop-shadow-xl text-white rounded-lg shadow-md hover:bg-red-700 transition">
          View Details
        </button>
      </div>
    </div>
    // </div>
  );
};

export default LandscapeCard;
