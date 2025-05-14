import ManageItemCard from "@/components/dashboard/ManageItemCard";
import React, { useState, useEffect } from "react";
import AXIOS_INSTANCE from "@/utils/axiosInstance";
import { API_ENDPOINTS } from "@/utils/apiPath";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { toast } from "react-toastify";
import ManageClaimCard from "@/components/dashboard/ManageClaimCard";

const ManageClaims = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onStatusChange = async (id, status) => {
    try {
      const response = await AXIOS_INSTANCE.put(
        API_ENDPOINTS.ADMIN.UPDATE_CLAIM,
        { id, status }
      );
      if (response.status === 200) {
        console.log(response.data?.claim);
        toast.success(response.data?.message || "Claim status updated");
        setClaims((prev) =>
          prev.map((item) => (item._id === id ? response.data?.claim : item))
        ); // update the lost item in the state
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message || "Failed to update claim");
    }
  };

  useEffect(() => {
    const fetchClaims = async () => {
      const response = await AXIOS_INSTANCE.get(
        API_ENDPOINTS.ADMIN.GETALL_CLAIM_ITEMS
      );
      console.log(response.data?.claims);
      if (response.status === 200) {
        setClaims(response.data?.claims);
        setLoading(false);
      } else {
        setError(response.data?.message);
        setLoading(false);
      }
    };
    fetchClaims();
  }, []);

  return (
    <DashboardLayout activeMenu="Claim Items">
      <main className="container mx-auto py-8">
        <h1 className="mb-6 text-2xl font-bold">Claims</h1>
        <div className="space-y-4">
          {claims.map((item) => (
            <ManageClaimCard
              type={"Claim"}
              key={item._id}
              item={item}
              onStatusChange={onStatusChange}
              onDelete={() => {}}
            />
          ))}
          {claims.length === 0 && (
            <div className="rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">No claims found</p>
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default ManageClaims;
