import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AXIOS_INSTANCE from "@/utils/axiosInstance";
import { API_ENDPOINTS } from "@/utils/apiPath";
import { toast } from "react-toastify";
import ProductInfo from "@/components/ProductInfo";
import { AlertCircle } from "lucide-react";

const LostReport = () => {
  const { id } = useParams();
  const [lostReport, setLostReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchLostReport = async () => {
      try {
        const response = await AXIOS_INSTANCE.get(
          API_ENDPOINTS.LOST.GET_LOST_REPORT(id)
        );
        if (response.data?.lostItem) {
          setLostReport(response.data?.lostItem);
          toast.success("Lost report fetched successfully");
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
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-white to-slate-900 flex items-center justify-center p-4">
      <div className="w-[90vw] max-w-7xl bg-black text-white rounded-3xl shadow-xl overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500 animate-pulse">
            Loading lost item report...
          </div>
        ) : error ? (
          <div className="p-10 text-center text-red-600">
            <AlertCircle className="inline w-6 h-6 mr-2" />
            {error.message || "Something went wrong."}
          </div>
        ) : (
          lostReport && <ProductInfo item={lostReport} />
        )}
      </div>
    </div>
  );
};

export default LostReport;
