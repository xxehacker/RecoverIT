import { CalendarDays, MapPin, Clock, Tag } from "lucide-react";
import React from "react";

const ProductInfo = ({ item }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 p-8">
      {/* Images */}
      <div className="space-y-4">
        {item.images?.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:9000/${img}`}
            alt={`Lost item ${index + 1}`}
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
        ))}
      </div>

      {/* Info */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Product: {item.title}</h1>
        <p className="text-white">
          <span className="font-bold">Description:</span> {item.description}
        </p>

        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-5 h-5 text-white" />
          <span className="font-medium text-white">Location:</span>
          <span className="text-white">{item.location}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <CalendarDays className="w-5 h-5 text-white" />
          <span className="font-medium text-white">Date Lost:</span>
          <span className="text-white">
            {new Date(item.dateLost).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-5 h-5 text-white" />
          <span className="font-medium text-white">Time Lost:</span>
          <span className="text-white">
            {new Date(item.dateLost).toLocaleTimeString()}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Tag className="w-5 h-5 text-white" />
          <span className="font-medium text-white">Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              item.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {item.status}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 text-sm text-white">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-white" />
            Reported On: {new Date(item.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="border-t pt-4 text-sm text-gray-200">
          <p>
            <strong>Reported by:</strong> {item.userId?.username} (
            {item.userId?.email})
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
