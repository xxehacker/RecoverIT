import React from "react";
import { Trash2 } from "lucide-react";

const ManageitemCard = ({ item, onDelete, onStatusChange }) => {
  console.log(item)
  return (
    <div className="flex flex-col bg-white/50 shadow-2xl shadow-gray-400 rounded-2xl p-4 mb-4 border">
      {/* Attachments */}
      <div className="w-full flex flex-col gap-2 overflow-x-auto mb-4">
        <label
          htmlFor="attachments"
          className="text-sm text-gray-900 font-bold mt-1"
        >
          Claim Images
        </label>
        <div className="w-full flex gap-4">
          {item?.attachments?.map((src, i) => (
            <img
              key={i}
              src={`http://localhost:9000/${src}`}
              alt={`Claim Image ${i + 1}`}
              className="w-1/2 h-60 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 overflow-x-auto mb-4">
        <label
          htmlFor="attachments"
          className="text-sm text-gray-900 font-bold mt-1"
        >
          Found Images
        </label>
        <div className="w-full flex gap-4">
          {item?.foundItemId?.images?.map((src, i) => (
            <img
              key={i}
              src={`http://localhost:9000/${src}`}
              alt={`Found Image ${i + 1}`}
              className="w-1/2 h-64 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">{item?.foundItemId?.title}</h2>
          <select
            className="border border-gray-300 rounded-md p-2"
            onChange={(e) => onStatusChange(item._id, e.target.value)}
            value={item?.status}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Claim Description:</strong> {item.description}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Claim On:</strong> {new Date(item.claimDate).toDateString()}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Verification Method:</strong> {item.claimVerificationMethod}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Meetup Preference:</strong> {item.meetupPreference}
        </p>

        <p className="text-sm text-gray-600 mt-1">
          <strong>Additional Notes:</strong> {item.additionalNotes}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Description:</strong> {item?.description}
        </p>
        <div className="text-sm text-gray-600 mt-2">
          <strong>User Info:</strong> {item.userId?.username} (
          {item.userId?.email} {item.userId?.role})
        </div>
        {/* contactInformation */}
        <div className="w-full flex gap-2 overflow-x-auto mb-4">
          <p className="text-sm text-gray-600 mt-1">
            <strong>Email:</strong> {item.contactInformation?.email}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Phone:</strong> {item.contactInformation?.phone}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Preferred Contact:</strong>{" "}
            {item.contactInformation?.preferredContactMethod}
          </p>
        </div>
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

export default ManageitemCard;
