import React from "react";
import errorImage from "../assets/ErrorImage.png"
import { BiArea } from "react-icons/bi";
import { RiRoadMapLine } from "react-icons/ri";
import { MdOutlineAttachMoney } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

const LandscapeCard = ({ property }) => {
  return (
    <div className="grid grid-row-2 rounded-lg w-full my-5 h-full p-2 border-[0.1px] gap-5 border-red-300 shadow-[0px_2px_4px_2px_rgba(0,_0,_0,_0.35)]  hover:shadow-[0px_8px_9px_2px_rgba(0,_0,_0,_0.35)]">
      <div className="rounded-md w-90">
      {property.photos.length > 0 ? (
  <img
    src={property.photos[0].startsWith("http") ? property.photos[0] : `http://localhost:5000/uploads/${property.photos[0]}`}
    alt={property.title}
    className="rounded-md object-fill w-90 h-60 hover:scale-105 transition"
    onError={(e) => e.target.src = errorImage} // Handle broken image links
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
        <div className="text-xl font-bold text-gray-800 hover:underline">{property.title}</div>
        <div className="flex flex-col space-y-1">
          <div className="text-sm text-gray-700 flex"><MdOutlineAttachMoney className="w-6 h-6 text-red mt-1" />
            ${property.price}
          </div>
          <div className="text-sm text-gray-700 flex"><BiArea className="w-5 h-5 text-red mt-1" />
            {property.size} sq ft
          </div>
          <div className="text-lg flex text-gray-700"><RiRoadMapLine className="w-5 h-5  mt-1 mr-1" />
            {property.city}
          </div>
        </div>
        <div className="text-lg flex font-semibold mt-2 text-gray-900 hover:underline">
          {property.description.length > 50
            ? property.description.slice(0, 50) + "..."
            : property.description}
        </div>
        <button className="px-4 py-2 bg-red-600 hover:drop-shadow-xl text-white rounded-lg flex shadow-md hover:bg-red-700 transition">
          View Details <TbListDetails className="w-5 h-5 mt-1 ml-1" />
        </button>
      </div>
    </div>

  );
};

export default LandscapeCard;
