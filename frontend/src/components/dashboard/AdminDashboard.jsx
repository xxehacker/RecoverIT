import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AXIOS_INSTANCE from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../utils/apiPath";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

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
        console.log(response.data);
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
        <div className="">
          <div className="bg-white/50 max-w-7xl  w-full px-6">
            <h2 className="text-xl md:text-2xl font-bold">
              Good morning: {user?.username}
            </h2>
            <p className="text-xm mdLtext-[13px] text-gray-600 mt-1.5">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <Dashboard data={dashboardData} />
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
