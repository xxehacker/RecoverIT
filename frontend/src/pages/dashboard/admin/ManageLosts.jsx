import ManageItemCard from "@/components/dashboard/ManageItemCard";
import React, { useState, useEffect } from "react";
import AXIOS_INSTANCE from "@/utils/axiosInstance";
import { API_ENDPOINTS } from "@/utils/apiPath";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { toast } from "react-toastify";

const ManageLosts = () => {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onStatusChange = async (id, status) => {
    try {
      const response = await AXIOS_INSTANCE.put(
        API_ENDPOINTS.ADMIN.UPDATE_LOST_ITEM,
        { id, status }
      );
      if (response.status === 200) {
        console.log(response.data?.lostItem);
        toast.success(response.data?.message || "Lost item status updated");
        setLostItems((prev) =>
          prev.map((item) => (item._id === id ? response.data?.lostItem : item))
        ); // update the lost item in the state
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
          API_ENDPOINTS.ADMIN.DELETE_LOST_ITEM(id)
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
    const fetchLostItems = async () => {
      const response = await AXIOS_INSTANCE.get(
        API_ENDPOINTS.ADMIN.GETALL_LOST_ITEMS
      );
      if (response.status === 200) {
        setLostItems(response.data?.lostItems);
        setLoading(false);
      } else {
        setError(response.data?.message);
        setLoading(false);
      }
    };
    fetchLostItems();
  }, []);

  return (
    <DashboardLayout activeMenu="Lost Items">
      <main className="container mx-auto py-8">
        <h1 className="mb-6 text-2xl font-bold">Lost Items</h1>
        <div className="space-y-4">
          {lostItems.map((item) => (
            <ManageItemCard
              type={"Lost"}
              key={item._id}
              item={item}
              onStatusChange={onStatusChange}
              onDelete={handleDelete}
            />
          ))}
          {lostItems.length === 0 && (
            <div className="rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">No lost items found</p>
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default ManageLosts;
