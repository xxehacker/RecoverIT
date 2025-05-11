import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AXIOS_INSTANCE from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../utils/apiPath";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const getDashboardData = async () => {
    try {
      const response = await AXIOS_INSTANCE.get(
        API_ENDPOINTS.ADMIN.GET_ADMIN_DASHBOARD_DATA
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Error fetching dashboard data", error);
      setError(error);
    }
  };

  React.useEffect(() => {
    getDashboardData();
    return () => {}; // cleanup
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl">
              Good morning: {user?.username}
            </h2>
            <p className="text-xm mdLtext-[13px] text-gray-400 mt-1.5">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <div className="">
            <div className="card">
              <div className="flex items-center justify-between">
                <h5 className="font-medium text-lg">Total Users</h5>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {dashboardData?.totalUsers || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="card">
              <div className="flex items-center justify-between">
                <h5 className="font-medium text-lg">Total Claimed Items</h5>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {dashboardData?.totalUsers || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="card">
              <div className="flex items-center justify-between">
                <h5 className="font-medium text-lg">Total Lost Items</h5>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {dashboardData?.totalUsers || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="card">
              <div className="flex items-center justify-between">
                <h5 className="font-medium text-lg">Total Found Items</h5>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {dashboardData?.totalUsers || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
