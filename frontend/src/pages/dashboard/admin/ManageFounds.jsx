import ManageItemCard from "@/components/dashboard/ManageItemCard";
import React, { useState, useEffect } from "react";
import AXIOS_INSTANCE from "@/utils/axiosInstance";
import { API_ENDPOINTS } from "@/utils/apiPath";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { toast } from "react-toastify";

const ManageFounds = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onStatusChange = async (id, status) => {
    try {
      const response = await AXIOS_INSTANCE.put(
        API_ENDPOINTS.ADMIN.UPDATE_FOUND_ITEM,
        { id, status }
      );
      if (response.status === 200) {
        console.log(response.data?.foundItem);
        toast.success(response.data?.message || "Lost item status updated");
        setFoundItems((prev) =>
          prev.map((item) =>
            item._id === id ? response.data?.foundItem : item
          )
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message || "Failed to update lost item");
    }
  };

    const handleDelete = async (id) => {
      setLoading(true);
      setError(null);
      try {
        const response = await AXIOS_INSTANCE.delete(
          API_ENDPOINTS.ADMIN.DELETE_FOUND_ITEM(id)
        );
        if (response.status === 200) {
          toast.success(
            response.data.message || "Found Item has been deleted successfully"
          );
        }
      } catch (error) {
        setError(error.response.data.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    const fetchFoundItems = async () => {
      const response = await AXIOS_INSTANCE.get(
        API_ENDPOINTS.ADMIN.GETALL_FOUND_ITEMS
      );
      if (response.status === 200) {
        setFoundItems(response.data?.foundItems);
        setLoading(false);
      } else {
        setError(response.data?.message);
        setLoading(false);
      }
    };
    fetchFoundItems();
  }, []);
  console.log(foundItems);

  return (
    <DashboardLayout activeMenu="Found Items">
      <main className="container mx-auto py-8">
        <h1 className="mb-6 text-2xl font-bold">Found Items</h1>
        <div className="space-y-4">
          {foundItems.map((item) => (
            <ManageItemCard
              type={"Found"}
              key={item._id}
              item={item}
              onStatusChange={onStatusChange}
              onDelete={handleDelete}
            />
          ))}
          {foundItems.length === 0 && (
            <div className="rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">No lost items found</p>
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default ManageFounds;
