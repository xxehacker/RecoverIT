import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import AXIOS_INSTANCE from "@/utils/axiosInstance";
import { API_ENDPOINTS } from "@/utils/apiPath";

const AllLostPage = () => {
  const [lostReports, setLostReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(lostReports);

  useEffect(() => {
    const fetchLostReports = async () => {
      try {
        const response = await AXIOS_INSTANCE.get(
          API_ENDPOINTS.LOST.GETALL_LOST
        );
        setLostReports(response.data?.lostItems);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchLostReports();
  }, []);

  return (
    <div className="p-4 rounded-lg min-h-screen w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-15">
      <h1 className="text-2xl font-bold text-center md:text-left">
        All Lost Reports
      </h1>
      {lostReports.length === 0 && (
        <div className="rounded-lg mt-10 border p-8 text-center h-[50vh] w-full flex justify-center items-center">
          <p className="text-muted-foreground">No Lost Reports</p>
        </div>
      )}
      <div className="mt-4 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {lostReports.map((report) => (
          <Link to={`/lost-reports/${report?._id}`} key={report?._id}>
            <Card
              title={report?.title}
              description={report?.description}
              image={report?.images[0]}
              owner={report?.userId?.username || "Unknown"}
              date={new Date(report?.createdAt).toLocaleDateString()}
              location={report?.location}
              status={report?.status}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllLostPage;
