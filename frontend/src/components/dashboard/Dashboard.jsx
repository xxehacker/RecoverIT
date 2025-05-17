import { useEffect, useState } from "react";
import {
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  Package,
  MapPin,
  CalendarDays,
} from "lucide-react";
import { Link } from "react-router-dom";
import LineChart from "../charts/LineChart";
import AXIOS_INSTANCE from "@/utils/axiosInstance";
import { API_ENDPOINTS } from "@/utils/apiPath";

export default function Dashboard({ data }) {
  const [LineChartData, setLineChartData] = useState(false);
  const [chartData, setChartData] = useState({});

  const counts = {
    lostItems: data?.counts?.lostItems,
    foundItems: data?.counts?.foundItems,
    claimItems: data?.counts?.claimItems,
    totalUsers: data?.counts?.totalUsers,
  };

  const lostItemsStatus = {
    pending: data?.lostItemsStatus?.pending,
    approved: data?.lostItemsStatus?.approved,
    rejected: data?.lostItemsStatus?.rejected,
  };

  const foundItemsStatus = {
    pending: data?.foundItemsStatus?.pending,
    approved: data?.foundItemsStatus?.approved,
    rejected: data?.foundItemsStatus?.rejected,
    claimed: data?.foundItemsStatus?.claimed,
  };

  const claimItemsStatus = {
    pending: data?.claimItems?.pending,
    approved: data?.claimItems?.approved,
    rejected: data?.claimItems?.rejected,
    inReview: data?.claimItems?.inReview,
  };

  // Status distribution data for charts
  const statusData = [
    {
      name: "Lost Items",
      pending: data?.lostItems?.pending,
      approved: data?.lostItems?.approved,
      rejected: data?.lostItems?.rejected,
    },
    {
      name: "Found Items",
      pending: data?.foundItems?.pending,
      approved: data?.foundItems?.approved,
      rejected: data?.foundItems?.rejected,
    },
    {
      name: "Claims",
      pending: data?.claimItems?.pending,
      approved: data?.claimItems?.approved,
      rejected: data?.claimItems?.rejected,
    },
  ];

  // Monthly data for line chart
  const monthlyData = [
    { month: "Jan", lost: 2, found: 1, claims: 0 },
    { month: "Feb", lost: 3, found: 2, claims: 1 },
    { month: "Mar", lost: 5, found: 2, claims: 2 },
    { month: "Apr", lost: 4, found: 3, claims: 3 },
    { month: "May", lost: 3, found: 1, claims: 1 },
  ];
  // console.log(data);

  const fetchChartData = async () => {
    try {
      const response = await AXIOS_INSTANCE.get(
        API_ENDPOINTS.VISIT.GET_VISITOR_COUNTS
      );
      setChartData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div className="bg-white/50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-500 ">
              Track and manage lost, found and claimed items
            </p>
            {/* <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 flex items-center shadow-sm hover:bg-gray-50">
                <Search className="w-4 h-4 mr-2" />
                Search
              </button>
              <button className="px-4 py-2 bg-indigo-600 rounded-md text-sm text-white flex items-center shadow-sm hover:bg-indigo-700">
                Export
              </button>
            </div> */}
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/admin/lost-items">
            <div className="bg-gradient-to-bl from-red-100 via-red-200 to-red-400 shadow-2xl shadow-slate-500/30 rounded-lg p-6 border border-red-100 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
                <span className="text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {counts.lostItems}
              </div>
              <div className="text-sm text-gray-600">Total Lost Items</div>
              <div className="mt-2 text-xs text-gray-500">
                {lostItemsStatus.pending} pending approval
              </div>
            </div>
          </Link>

          <Link to="/admin/found-items">
            <div className="bg-gradient-to-tl shadow-2xl shadow-slate-500/30 from-green-100 via-green-200 to-green-400 rounded-lg p-6 border border-green-100 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {counts.foundItems}
              </div>
              <div className="text-sm text-gray-600">Total Found Items</div>
              <div className="mt-2 text-xs text-gray-500">
                {foundItemsStatus.pending} pending approval
              </div>
            </div>
          </Link>

          <Link to="/admin/claim-items">
            <div className="bg-gradient-to-br shadow-2xl shadow-slate-500/30 from-purple-100 via-purple-200 to-purple-400 rounded-lg p-6 border border-purple-100 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Package className="h-6 w-6 text-purple-500" />
                </div>
                <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {counts.claimItems}
              </div>
              <div className="text-sm text-gray-600">Total Claim Items</div>
              <div className="mt-2 text-xs text-gray-500">
                {claimItemsStatus.pending} pending approval
              </div>
            </div>
          </Link>

          <Link to="/admin/users">
            <div className="bg-gradient-to-tr shadow-2xl shadow-slate-500/30 from-blue-100 via-blue-200 to-blue-400 rounded-lg p-6 border border-blue-100 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {counts.totalUsers}
              </div>
              <div className="text-sm text-gray-600">Total Users</div>
              <div className="mt-2 text-xs text-gray-500">All time</div>
            </div>
          </Link>
        </div>

        {/* Status Distribution Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-6">
              Item Status Distribution
            </h2>
            <div className="flex flex-col space-y-6">
              {statusData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {item.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      Total: {item.pending + item.approved + item.rejected}
                    </span>
                  </div>
                  <div className="flex h-4 mb-1 rounded-full overflow-hidden">
                    {item.pending > 0 && (
                      <div
                        className="bg-yellow-400"
                        style={{
                          width: `${
                            (item.pending /
                              (item.pending + item.approved + item.rejected ||
                                1)) *
                            100
                          }%`,
                        }}
                      ></div>
                    )}
                    {item.approved > 0 && (
                      <div
                        className="bg-green-500"
                        style={{
                          width: `${
                            (item.approved /
                              (item.pending + item.approved + item.rejected ||
                                1)) *
                            100
                          }%`,
                        }}
                      ></div>
                    )}
                    {item.rejected > 0 && (
                      <div
                        className="bg-red-500"
                        style={{
                          width: `${
                            (item.rejected /
                              (item.pending + item.approved + item.rejected ||
                                1)) *
                            100
                          }%`,
                        }}
                      ></div>
                    )}
                  </div>
                  <div className="flex text-xs">
                    <div className="flex items-center mr-4">
                      <div className="w-3 h-3 bg-yellow-400 mr-1 rounded-full"></div>
                      <span>Pending ({item.pending})</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <div className="w-3 h-3 bg-green-500 mr-1 rounded-full"></div>
                      <span>Approved ({item.approved})</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 mr-1 rounded-full"></div>
                      <span>Rejected ({item.rejected})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trend Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-6">
              Item Trend (Last 5 Months)
            </h2>
            <div className="h-64 w-full">
              <div className="relative h-full">
                {/* Y-axis labels */}
                <div className="absolute left-0 h-full flex flex-col justify-between text-xs text-gray-500">
                  <span>5</span>
                  <span>4</span>
                  <span>3</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0</span>
                </div>

                {/* Chart area */}
                <div className="ml-6 h-full flex">
                  {/* SVG Chart */}
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 300 200"
                    preserveAspectRatio="none"
                  >
                    {/* Grid lines */}
                    <g className="grid">
                      {[0, 40, 80, 120, 160, 200].map((y, i) => (
                        <line
                          key={i}
                          x1="0"
                          y1={y}
                          x2="300"
                          y2={y}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                      ))}
                    </g>

                    {/* Lost Items Line */}
                    <polyline
                      points="0,160 60,120 120,80 180,100 240,120"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                    />

                    {/* Found Items Line */}
                    <polyline
                      points="0,180 60,160 120,160 180,120 240,180"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                    />

                    {/* Claims Line */}
                    <polyline
                      points="0,200 60,180 120,160 180,120 240,180"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* X-axis labels */}
                <div className="ml-6 flex justify-between text-xs text-gray-500 mt-2">
                  {monthlyData.map((data, index) => (
                    <span key={index}>{data.month}</span>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 mr-2 rounded-full"></div>
                  <span className="text-sm">Lost</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 mr-2 rounded-full"></div>
                  <span className="text-sm">Found</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 mr-2 rounded-full"></div>
                  <span className="text-sm">Claims</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {chartData ? (
          <div className="mb-4">
            <LineChart data={chartData} />
          </div>
        ) : null}

        {/* Most Recent Item */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-6">Most Recent Claim</h2>
          {data?.recentClaimItems.length > 0 ? (
            data.recentClaimItems.map((item) => (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between mb-3">
                  <h3 className="text-md font-medium">
                    {item?.title || "Not provided yet"}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Clock className="w-3 h-3 mr-1" />
                    {String(item?.status).at(0).toLocaleUpperCase() +
                      String(item?.status).slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {item?.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    Meetup Preference: {String(item?.meetupPreference)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarDays className="w-4 h-4 mr-1" />
                    Claim Date: {new Date(item?.claimDate).toDateString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="border border-gray-200 rounded-lg p-4">
              {" "}
              <div className="flex justify-between mb-3">
                <h1>No claims</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
