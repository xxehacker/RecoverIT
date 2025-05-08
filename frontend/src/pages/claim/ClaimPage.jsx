import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaBox,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFileAlt,
  FaPaperclip,
  FaBarcode,
  FaCommentDots,
  FaTruck,
  FaCheckCircle,
  FaChevronRight,
  FaChevronLeft,
  FaInfoCircle,
  FaRegTrashAlt,
} from "react-icons/fa";
import AXIOS_INSTANCE from "@/utils/axiosInstance";
import { API_ENDPOINTS } from "@/utils/apiPath";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

export default function ClaimRequestForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    foundItemId: "",
    description: "",
    contactInformation: {
      phone: "",
      email: "",
      preferredContactMethod: "phone",
    },
    itemIdentifiers: {
      serialNumber: "",
      uniqueMarks: "",
      purchaseReceipt: "",
    },
    meetupPreference: "inPerson",
    additionalNotes: "",
    attachments: [],
    claimVerificationMethod: "photoVerification",
  });

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setFormData((prevData) => ({
        ...prevData,
        foundItemId: id,
      }));
    }
  }, [id]);

  const handleInputChange = (e, section, subsection) => {
    const { name, value } = e.target;

    if (subsection) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [subsection]: {
            ...formData[section][subsection],
            [name]: value,
          },
        },
      });
    } else if (section) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    payload.append("foundItemId", formData.foundItemId);
    payload.append("description", formData.description);
    payload.append("meetupPreference", formData.meetupPreference);
    payload.append("additionalNotes", formData.additionalNotes);
    payload.append("claimVerificationMethod", formData.claimVerificationMethod);

    // Append nested objects
    for (const [key, value] of Object.entries(formData.contactInformation)) {
      payload.append(`contactInformation[${key}]`, value);
    }

    for (const [key, value] of Object.entries(formData.itemIdentifiers)) {
      payload.append(`itemIdentifiers[${key}]`, value);
    }

    // Append files
    formData.attachments.forEach((file) => {
      payload.append("attachments", file);
    });

    try {
      const response = await AXIOS_INSTANCE.post(
        API_ENDPOINTS.CLAIM.SUBMIT_CLAIM,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log(response.data?.claimItem);
        toast.success("Claim submitted successfully");
        setFormData({});
        navigate("/found-reports");
      }
    } catch (error) {
      console.error("Error while submitting claim:", error);
      toast.error("Failed to submit claim");
    }
  };

  const steps = [
    { id: 1, label: "Item Details", icon: <FaBox /> },
    { id: 2, label: "Contact Info", icon: <FaUser /> },
    { id: 3, label: "Review", icon: <FaCheckCircle /> },
  ];

  const renderItemDetailsSection = () => {
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <label className="text-gray-700 font-medium mb-2 flex items-center">
            Item Description <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => handleInputChange(e)}
            className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 resize-none"
            placeholder="Provide a detailed description of the item you're claiming"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <FaBarcode className="text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-800">
              Item Identifiers
            </h3>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Serial Number
              </label>
              <input
                type="text"
                name="serialNumber"
                value={formData.itemIdentifiers.serialNumber}
                onChange={(e) => handleInputChange(e, "itemIdentifiers")}
                className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="If applicable"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Unique Marks or Identifiers
              </label>
              <input
                type="text"
                name="uniqueMarks"
                value={formData.itemIdentifiers.uniqueMarks}
                onChange={(e) => handleInputChange(e, "itemIdentifiers")}
                className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="Scratches, stickers, engravings, etc."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Purchase Receipt Reference
              </label>
              <input
                type="text"
                name="purchaseReceipt"
                value={formData.itemIdentifiers.purchaseReceipt}
                onChange={(e) => handleInputChange(e, "itemIdentifiers")}
                className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="Receipt number or reference"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <FaPaperclip className="text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-800">Attachments</h3>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Upload Evidence Files
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-blue-50 text-blue-600 rounded-lg border-2 border-dashed border-blue-300 cursor-pointer hover:bg-blue-100 transition-colors duration-200">
                <FaPaperclip className="text-2xl mb-2" />
                <span className="font-medium">Click to attach files</span>
                <span className="text-sm text-gray-500 mt-1">
                  Photos, receipts, or other evidence
                </span>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {formData.attachments.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {formData.attachments.length} file
                  {formData.attachments.length > 1 ? "s" : ""} selected
                </p>
                <div className="space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center">
                        <FaFileAlt className="text-gray-500 mr-2" />
                        <span className="text-sm text-gray-700 truncate max-w-xs">
                          {file.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <FaCheckCircle className="text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-800">
              Verification Method
            </h3>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              How would you prefer to verify your claim?
            </label>
            <select
              name="claimVerificationMethod"
              value={formData.claimVerificationMethod}
              onChange={(e) => handleInputChange(e)}
              className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 bg-white"
            >
              <option value="descriptiveMatching">Descriptive Matching</option>
              <option value="photoVerification">Photo Verification</option>
              <option value="inPerson">In-Person Verification</option>
              <option value="documentProof">Document Proof</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderContactInfoSection = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <FaPhone className="text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-800">
              Contact Information
            </h3>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.contactInformation.phone}
                  onChange={(e) => handleInputChange(e, "contactInformation")}
                  className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.contactInformation.email}
                  onChange={(e) => handleInputChange(e, "contactInformation")}
                  className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-3">
                Preferred Contact Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "app", label: "App", icon: <FaCommentDots /> },
                  { id: "phone", label: "Phone", icon: <FaPhone /> },
                  { id: "email", label: "Email", icon: <FaEnvelope /> },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      formData.contactInformation.preferredContactMethod ===
                      method.id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredContactMethod"
                      value={method.id}
                      checked={
                        formData.contactInformation.preferredContactMethod ===
                        method.id
                      }
                      onChange={(e) =>
                        handleInputChange(e, "contactInformation")
                      }
                      className="sr-only"
                    />
                    <div className="text-xl mb-2">{method.icon}</div>
                    <span className="font-medium">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <FaTruck className="text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-800">
              Meetup Preference
            </h3>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              How would you like to receive your item?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { id: "inPerson", label: "In Person", icon: <FaUser /> },
                { id: "courier", label: "Courier Delivery", icon: <FaTruck /> },
                {
                  id: "pickupLocation",
                  label: "Pickup Location",
                  icon: <FaMapMarkerAlt />,
                },
              ].map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.meetupPreference === option.id
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="meetupPreference"
                    value={option.id}
                    checked={formData.meetupPreference === option.id}
                    onChange={(e) => handleInputChange(e)}
                    className="sr-only"
                  />
                  <div className="text-lg mr-3">{option.icon}</div>
                  <span className="font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <FaCommentDots className="text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-800">
              Additional Notes
            </h3>
          </div>
          <div>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange(e)}
              className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 resize-none"
              placeholder="Any other details you'd like to share about your claim"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
    );
  };

  const renderReviewSection = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
          <FaFileAlt className="text-blue-600 text-2xl mr-3" />
          <h3 className="text-xl font-bold text-gray-800">
            Claim Request Summary
          </h3>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-md font-semibold text-blue-700 mb-2 flex items-center">
              <FaBox className="mr-2" /> Item Description
            </h4>
            <p className="text-gray-700">
              {formData.description || "Not provided"}
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
              <FaBarcode className="mr-2" /> Item Identifiers
            </h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex flex-wrap">
                <span className="w-1/3 font-medium text-gray-600">
                  Serial Number:
                </span>
                <span className="w-2/3 text-gray-700">
                  {formData.itemIdentifiers.serialNumber || "Not provided"}
                </span>
              </div>
              <div className="flex flex-wrap">
                <span className="w-1/3 font-medium text-gray-600">
                  Unique Marks:
                </span>
                <span className="w-2/3 text-gray-700">
                  {formData.itemIdentifiers.uniqueMarks || "Not provided"}
                </span>
              </div>
              <div className="flex flex-wrap">
                <span className="w-1/3 font-medium text-gray-600">
                  Purchase Receipt:
                </span>
                <span className="w-2/3 text-gray-700">
                  {formData.itemIdentifiers.purchaseReceipt || "Not provided"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
              <FaUser className="mr-2" /> Contact Information
            </h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex flex-wrap">
                <span className="w-1/3 font-medium text-gray-600">Phone:</span>
                <span className="w-2/3 text-gray-700">
                  {formData.contactInformation.phone || "Not provided"}
                </span>
              </div>
              <div className="flex flex-wrap">
                <span className="w-1/3 font-medium text-gray-600">Email:</span>
                <span className="w-2/3 text-gray-700">
                  {formData.contactInformation.email || "Not provided"}
                </span>
              </div>
              <div className="flex flex-wrap">
                <span className="w-1/3 font-medium text-gray-600">
                  Preferred Contact:
                </span>
                <span className="w-2/3 text-gray-700 capitalize">
                  {formData.contactInformation.preferredContactMethod}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                <FaTruck className="mr-2" /> Meetup Method
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <span className="text-gray-700 capitalize">
                  {formData.meetupPreference.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                <FaCheckCircle className="mr-2" /> Verification Method
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <span className="text-gray-700 capitalize">
                  {formData.claimVerificationMethod
                    .replace(/([A-Z])/g, " $1")
                    .trim()}
                </span>
              </div>
            </div>
          </div>

          {formData.attachments.length > 0 && (
            <div>
              <h4 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                <FaPaperclip className="mr-2" /> Attached Files
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {formData.attachments.map((file, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <FaFileAlt className="text-gray-500 mr-2" />
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {formData.additionalNotes && (
            <div>
              <h4 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                <FaCommentDots className="mr-2" /> Additional Notes
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{formData.additionalNotes}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-start">
          <FaInfoCircle className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            By submitting this claim, you confirm that all information provided
            is accurate and truthful. False claims may result in account
            penalties as outlined in our Terms of Service.
          </p>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderItemDetailsSection();
      case 2:
        return renderContactInfoSection();
      case 3:
        return renderReviewSection();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 py-6 px-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <FaBox className="mr-3" /> Lost Item Claim Request
                </h2>
                <p className="text-blue-100 mt-1">
                  Please provide details to help us verify and return your item.
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="p-4 bg-white border-b border-gray-100">
            <div className="flex justify-between items-center mb-2">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div
                    className={`flex items-center ${
                      currentStep >= step.id ? "text-blue-600" : "text-gray-400"
                    }`}
                    onClick={() =>
                      currentStep >= step.id && setCurrentStep(step.id)
                    }
                    style={{
                      cursor: currentStep >= step.id ? "pointer" : "default",
                    }}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep > step.id
                          ? "bg-blue-600 text-white"
                          : currentStep === step.id
                          ? "bg-blue-100 text-blue-600 border-2 border-blue-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <FaCheckCircle className="w-5 h-5" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium hidden sm:block ${
                        currentStep >= step.id
                          ? "text-gray-800"
                          : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4 h-1 rounded-full bg-gray-200 hidden sm:block">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width:
                            currentStep > index + 1
                              ? "100%"
                              : currentStep === index + 1
                              ? "50%"
                              : "0%",
                        }}
                      ></div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="text-center text-sm font-medium text-blue-600 mt-2">
              Step {currentStep} of {steps.length}:
              {steps.find((step) => step.id === currentStep)?.label}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {renderStepContent()}

            <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
              {currentStep > 1 && (
                <button
                  type="button"
                  className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200 cursor-pointer"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  <FaChevronLeft className="mr-2" />
                  Previous
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  className="ml-auto flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 cursor-pointer"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                  <FaChevronRight className="ml-2" />
                </button>
              ) : (
                <div className="px-6">
                  <button
                    type="submit"
                    className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    Submit Claim
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
