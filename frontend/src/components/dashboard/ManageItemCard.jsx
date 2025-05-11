import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const ManageItemCard = ({ item, onDelete, onStatusChange, type }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white/50 shadow-2xl shadow-gray-400 rounded-2xl p-4 mb-4 border">
      {/* Images */}
      <div className="w-full md:w-1/4 flex gap-2 overflow-x-auto">
        {item?.images?.map((src, i) => (
          <img
            key={i}
            src={`http://localhost:9000/${src}`}
            alt={`Lost item ${i + 1}`}
            className="w-32 h-32 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 mt-4 md:mt-0 md:ml-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">{item?.title}</h2>
          <select
            className="border border-gray-300 rounded-md p-2"
            onChange={(e) => {
              console.log(item._id, e.target.value);
              onStatusChange(item._id, e.target.value);
            }}
            value={item?.status}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <p className="text-sm text-gray-600 mt-1">
          <strong>{type === "Lost" ? "Lost On: " : "Found On"}</strong>{" "}
          {type === "Lost"
            ? new Date(item.dateLost).toDateString()
            : new Date(item.foundDate).toDateString()}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Location:</strong> {item?.location}
        </p>

        <p className="mt-2 text-gray-800 line-clamp-3">{item?.description}</p>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4 justify-end">
          <button
            onClick={() => onDelete(item._id)}
            className="flex items-center gap-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageItemCard;
