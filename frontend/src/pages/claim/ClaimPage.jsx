import { useState, useEffect } from "react";
import {
  FaUser,
  FaBox,
  FaCalendarAlt,
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
} from "react-icons/fa";
import AXIOS_INSTANCE from "@/utils/axiosInstance";
import { API_ENDPOINTS } from "@/utils/apiPath";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function ClaimRequestForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    foundItemId: "",
    description: "",
    contactInformation: {
      phone: "",
      email: "",
      preferredContactMethod: "app",
    },
    itemIdentifiers: {
      serialNumber: "",
      uniqueMarks: "",
      purchaseReceipt: "",
    },
    deliveryAddress: {
      streetAddress: "",
      cityName: "",
      stateOrProvince: "",
      postalCode: "",
      countryName: "United States",
      addressNotes: "",
    },
    meetupPreference: "inPerson",
    additionalNotes: "",
    attachments: [],
    claimVerificationMethod: "descriptive-matching",
  });

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
    // Handle file attachments
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...files.map((file) => file.name)],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Submit logic and api call
    try {
      const response = AXIOS_INSTANCE.post(
        API_ENDPOINTS.CLAIM.SUBMIT_CLAIM,
        formData
      );
      if (response.data?.claim) {
        toast.success(response.data?.message);
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Item Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => handleInputChange(e)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Provide a detailed description of the item you're claiming"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <FaBarcode className="text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold">Item Identifiers</h3>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Serial Number
              </label>
              <input
                type="text"
                name="serialNumber"
                value={formData.itemIdentifiers.serialNumber}
                onChange={(e) => handleInputChange(e, "itemIdentifiers")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="If applicable"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Unique Marks or Identifiers
              </label>
              <input
                type="text"
                name="uniqueMarks"
                value={formData.itemIdentifiers.uniqueMarks}
                onChange={(e) => handleInputChange(e, "itemIdentifiers")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Scratches, stickers, engravings, etc."
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Purchase Receipt Reference
              </label>
              <input
                type="text"
                name="purchaseReceipt"
                value={formData.itemIdentifiers.purchaseReceipt}
                onChange={(e) => handleInputChange(e, "itemIdentifiers")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Receipt number or reference"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <FaPaperclip className="text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold">Attachments</h3>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Evidence Files
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-indigo-600 rounded-lg shadow-md tracking-wide border border-dashed border-indigo-400 cursor-pointer hover:bg-indigo-50 transition-colors">
                <FaPaperclip className="text-xl" />
                <span className="mt-2 text-sm">Attach files</span>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {formData.attachments.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700">
                  Attached files:
                </p>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-600">
                  {formData.attachments.map((file, index) => (
                    <li key={index}>{file}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <FaCheckCircle className="text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold">Verification Method</h3>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              How would you prefer to verify your claim?
            </label>
            <select
              name="claimVerificationMethod"
              value={formData.claimVerificationMethod}
              onChange={(e) => handleInputChange(e)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="descriptive-matching">Descriptive Matching</option>
              <option value="photo-verification">Photo Verification</option>
              <option value="in-person">In-Person Verification</option>
              <option value="document-proof">Document Proof</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderContactInfoSection = () => {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center mb-2">
            <FaPhone className="text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold">Contact Information</h3>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.contactInformation.phone}
                onChange={(e) => handleInputChange(e, "contactInformation")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="(123) 456-7890"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.contactInformation.email}
                onChange={(e) => handleInputChange(e, "contactInformation")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Preferred Contact Method
              </label>
              <div className="flex flex-wrap gap-4">
                {["app", "phone", "email"].map((method) => (
                  <label key={method} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="preferredContactMethod"
                      value={method}
                      checked={
                        formData.contactInformation.preferredContactMethod ===
                        method
                      }
                      onChange={(e) =>
                        handleInputChange(e, "contactInformation")
                      }
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2 text-gray-700 capitalize">
                      {method}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <FaTruck className="text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold">Meetup Preference</h3>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              How would you like to receive your item?
            </label>
            <div className="flex flex-wrap gap-4">
              {[
                { id: "inPerson", label: "In Person" },
                { id: "courier", label: "Courier Delivery" },
                { id: "pickup-location", label: "Pickup Location" },
              ].map((option) => (
                <label key={option.id} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="meetupPreference"
                    value={option.id}
                    checked={formData.meetupPreference === option.id}
                    onChange={(e) => handleInputChange(e)}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2 text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold">Delivery Address</h3>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.deliveryAddress.streetAddress}
                onChange={(e) => handleInputChange(e, "deliveryAddress")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="123 Main St"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="cityName"
                  value={formData.deliveryAddress.cityName}
                  onChange={(e) => handleInputChange(e, "deliveryAddress")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  State/Province
                </label>
                <input
                  type="text"
                  name="stateOrProvince"
                  value={formData.deliveryAddress.stateOrProvince}
                  onChange={(e) => handleInputChange(e, "deliveryAddress")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="State"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.deliveryAddress.postalCode}
                  onChange={(e) => handleInputChange(e, "deliveryAddress")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Zip/Postal"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="countryName"
                  value={formData.deliveryAddress.countryName}
                  onChange={(e) => handleInputChange(e, "deliveryAddress")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Country"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Delivery Notes
              </label>
              <textarea
                name="addressNotes"
                value={formData.deliveryAddress.addressNotes}
                onChange={(e) => handleInputChange(e, "deliveryAddress")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Additional delivery instructions, apartment number, etc."
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <FaCommentDots className="text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold">Additional Notes</h3>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange(e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Claim Request Summary
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="text-md font-semibold text-gray-700">
              Item Description
            </h4>
            <p className="text-gray-600 mt-1">
              {formData.description || "Not provided"}
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-700">
              Item Identifiers
            </h4>
            <div className="ml-4 mt-1">
              <p className="text-gray-600">
                <span className="font-medium">Serial Number:</span>{" "}
                {formData.itemIdentifiers.serialNumber || "Not provided"}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Unique Marks:</span>{" "}
                {formData.itemIdentifiers.uniqueMarks || "Not provided"}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Purchase Receipt:</span>{" "}
                {formData.itemIdentifiers.purchaseReceipt || "Not provided"}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-700">
              Contact Information
            </h4>
            <div className="ml-4 mt-1">
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span>{" "}
                {formData.contactInformation.phone || "Not provided"}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span>{" "}
                {formData.contactInformation.email || "Not provided"}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Preferred Contact:</span>{" "}
                {formData.contactInformation.preferredContactMethod}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-700">
              Delivery Preferences
            </h4>
            <div className="ml-4 mt-1">
              <p className="text-gray-600">
                <span className="font-medium">Meetup Method:</span>{" "}
                {formData.meetupPreference}
              </p>
              {formData.meetupPreference !== "inPerson" && (
                <>
                  <p className="text-gray-600">
                    <span className="font-medium">Address:</span>{" "}
                    {formData.deliveryAddress.streetAddress}
                  </p>
                  <p className="text-gray-600">
                    {formData.deliveryAddress.cityName},{" "}
                    {formData.deliveryAddress.stateOrProvince}{" "}
                    {formData.deliveryAddress.postalCode}
                  </p>
                  <p className="text-gray-600">
                    {formData.deliveryAddress.countryName}
                  </p>
                  {formData.deliveryAddress.addressNotes && (
                    <p className="text-gray-600">
                      <span className="font-medium">Notes:</span>{" "}
                      {formData.deliveryAddress.addressNotes}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-700">
              Verification Method
            </h4>
            <p className="text-gray-600 mt-1">
              {formData.claimVerificationMethod}
            </p>
          </div>

          {formData.attachments.length > 0 && (
            <div>
              <h4 className="text-md font-semibold text-gray-700">
                Attached Files
              </h4>
              <ul className="list-disc ml-8 mt-1">
                {formData.attachments.map((file, index) => (
                  <li key={index} className="text-gray-600">
                    {file}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {formData.additionalNotes && (
            <div>
              <h4 className="text-md font-semibold text-gray-700">
                Additional Notes
              </h4>
              <p className="text-gray-600 mt-1">{formData.additionalNotes}</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>
            By submitting this claim, you confirm that all information provided
            is accurate and truthful.
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-6 px-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center">
                <FaBox className="mr-3" /> Lost Item Claim Request
              </h2>
              <p className="text-indigo-100 mt-1">
                Please provide details to help us verify and return your item.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-100 bg-indigo-700">
                Step {currentStep} of 3:{" "}
                {steps.find((step) => step.id === currentStep)?.label}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-64 bg-indigo-900 text-white p-6">
            <div className="space-y-6">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    currentStep === step.id
                      ? "bg-indigo-800 shadow-md"
                      : currentStep > step.id
                      ? "text-indigo-300 hover:bg-indigo-800/50"
                      : "text-indigo-400 opacity-70"
                  }`}
                  onClick={() =>
                    currentStep >= step.id && setCurrentStep(step.id)
                  }
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full 
                    ${
                      currentStep === step.id
                        ? "bg-indigo-600 text-white"
                        : currentStep > step.id
                        ? "bg-green-500 text-white"
                        : "bg-indigo-700 text-indigo-300"
                    }`}
                  >
                    {currentStep > step.id ? <FaCheckCircle /> : step.icon}
                  </div>
                  <span className="ml-3 font-medium">{step.label}</span>
                  {currentStep === step.id && (
                    <FaChevronRight className="ml-auto text-indigo-300" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Progress Bar */}
            <div className="mb-8 px-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-xs text-indigo-600 font-semibold">
                    {Math.round((currentStep / 3) * 100)}% Complete
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-indigo-200">
                  <div
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500 ease-in-out"
                  />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="px-4">
              {renderStepContent()}

              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <button
                    type="button"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg inline-flex items-center transition-colors duration-200"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    <FaChevronLeft className="mr-2" />
                    Back
                  </button>
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center transition-colors duration-200"
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    Next
                    <FaChevronRight className="ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center transition-colors duration-200"
                  >
                    Submit Claim
                    <FaCheckCircle className="ml-2" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
