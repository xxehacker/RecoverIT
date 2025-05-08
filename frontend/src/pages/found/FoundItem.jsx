import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Info,
  AlertCircle,
  FileText,
  Share2,
  MessageSquare,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AXIOS_INSTANCE from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../utils/apiPath";
import { useNavigate } from "react-router-dom";

export default function FoundItem() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  const [foundReport, setFoundReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchLostReport = async () => {
      try {
        const response = await AXIOS_INSTANCE.get(
          API_ENDPOINTS.FOUND.GET_FOUND_REPORT(id)
        );
        if (response.data?.foundItem) {
          setFoundReport(response.data?.foundItem);
          console.log("foundReport", foundReport);
          toast.success("Found report fetched successfully");
        } else {
          setError(response.data?.message);
          toast.error("Lost report not found");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLostReport();
  }, [id, AXIOS_INSTANCE, API_ENDPOINTS]);

  const product = foundReport || {};

  const productImages = product?.images || [];

  const imageUrls =
    productImages.length > 0
      ? productImages.map((img) =>
          img.startsWith("http") ? img : `http://localhost:9000/${img}`
        )
      : ["/api/placeholder/800/600", "/api/placeholder/800/600"];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (imageUrls.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [imageUrls.length]);

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-500";
      case "found":
        return "bg-emerald-500";
      case "closed":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="w-full bg-gradient-to-br from-indigo-100 to-purple-50 min-h-screen py-8 px-4">
      {loading ? (
        <div className="max-w-7xl h-full mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-12 flex justify-center items-center">
          <div className="text-center">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">
              Loading item details...
            </p>
          </div>
        </div>
      ) : error ? (
        <div className="max-w-7xl h-full mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-12 text-center">
          <AlertCircle size={64} className="mx-auto text-red-500 mb-6" />
          <h3 className="text-2xl font-bold text-gray-800">
            Error Loading Item
          </h3>
          <p className="mt-3 text-gray-600">
            {error?.message || "Failed to load the item details"}
          </p>
          <button
            className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : (
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Status Bar */}
          <motion.div
            className="flex justify-between items-center mb-6"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500">
                Item ID: {product?._id?.substring(0, 8)}...
              </span>
            </div>
            <div
              className={`${getStatusBadgeClass(
                product?.status
              )} px-4 py-1.5 rounded-full font-medium text-white flex items-center`}
            >
              <AlertCircle className="mr-1.5" size={16} />
              {product?.status?.charAt(0).toUpperCase() +
                product?.status?.slice(1) || "Unknown"}
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="bg-gradient-to-tr from-white to-indigo-50/80 rounded-3xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <motion.div className="lg:w-3/5 relative" variants={itemVariants}>
                <div className="relative aspect-[4/3] bg-gray-100 ">
                  {imageUrls.map((img, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img
                        src={img}
                        alt={`${product?.title || "Product"} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}

                  {/* Image Navigation */}
                  {imageUrls.length > 1 && (
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
                      {imageUrls.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentImageIndex
                              ? "bg-white scale-125 shadow-md"
                              : "bg-white/60"
                          }`}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Image Details */}
                <div className="p-6 border-t bg-white/70">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="mr-2 text-indigo-600" size={18} />
                      <span className="font-medium">
                        Lost on {formatDate(product?.dateLost || new Date())}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="mr-2 text-red-500" size={18} />
                      <span className="font-medium">
                        {product?.location || "Unknown location"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                className="lg:w-2/5 p-8 flex flex-col bg-white/70"
                variants={itemVariants}
              >
                <div className="flex-1">
                  <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    {product?.title || "Untitled Item"}
                  </h1>

                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm mr-2">
                      {product?.userId?.username?.charAt(0).toUpperCase() ||
                        "U"}
                    </div>
                    <span className="text-gray-600">
                      Posted by{" "}
                      <span className="font-semibold">
                        @{product?.userId?.username || "unknown"}
                      </span>
                    </span>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-start">
                      <FileText
                        className="mr-3 text-indigo-600 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Description
                        </h3>
                        <motion.div
                          className={`relative overflow-hidden ${
                            isDescriptionExpanded ? "" : "max-h-24"
                          }`}
                          layout
                        >
                          <p className="text-gray-700 leading-relaxed">
                            {product?.description || "No description provided"}
                          </p>
                          {!isDescriptionExpanded &&
                            product?.description?.length > 100 && (
                              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
                            )}
                        </motion.div>

                        {product?.description?.length > 100 && (
                          <motion.button
                            onClick={() =>
                              setIsDescriptionExpanded(!isDescriptionExpanded)
                            }
                            className="mt-2 text-indigo-600 text-sm font-medium flex items-center hover:text-indigo-800 focus:outline-none transition-colors"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Info className="mr-1" size={16} />
                            {isDescriptionExpanded ? "Show Less" : "Read More"}
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-indigo-100">
                  <div className="flex text-xs text-gray-500 mb-4">
                    <span>
                      Posted on {formatDate(product?.createdAt || new Date())}
                    </span>
                  </div>

                  <div className="flex space-x-3">
                    <motion.button
                      className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center cursor-pointer hover:bg-indigo-700"
                      whileHover={{ scale: 1.02, backgroundColor: "#4338ca" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(`/claim-product/${product?._id}`)}
                    >
                      <MessageSquare className="mr-2" size={18} />
                      Claim It
                    </motion.button>

                    <motion.button
                      className="w-12 h-12 bg-purple-100 rounded-xl text-purple-700 flex items-center justify-center"
                      whileHover={{ scale: 1.05, backgroundColor: "#f3e8ff" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 size={20} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
