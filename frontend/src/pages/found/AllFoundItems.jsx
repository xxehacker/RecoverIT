import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import AXIOS_INSTANCE from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../utils/apiPath";
import "../../styles/style.css";

const AllFoundItems = () => {
  const [foundReports, setFoundReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(foundReports.length / 8) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  console.log(foundReports.length);

  useEffect(() => {
    const fetchFoundReports = async () => {
      try {
        const response = await AXIOS_INSTANCE.get(
          API_ENDPOINTS.FOUND.GETALL_FOUND_REPORT
        );
        setFoundReports(response.data?.foundItems);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchFoundReports();
  }, []);

  return (
    <div className="p-4 rounded-lg min-h-screen w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-15">
      <h1 className="text-2xl font-bold text-center md:text-left">
        All Found Items
      </h1>
      <div className="mt-4 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {foundReports.slice(page * 8 - 8, page * 8).map((item) => (
          <Link to={`/found-reports/${item._id}`} key={item._id}>
            <Card
              title={item?.title}
              description={item?.description}
              image={item?.images[0]}
              owner={"Unknown" || item?.userId?.name}
              date={new Date(item?.foundDate).toLocaleDateString()}
              location={item?.location}
              borderColor="border-green-500"
            />
          </Link>
        ))}
      </div>
      <div className="mt-5">
        {foundReports.length > 0 && (
          <div className="pagination">
            <span
              onClick={() => selectPageHandler(page - 1)}
              className={page > 1 ? "" : "pagination__disable"}
            >
              ◀
            </span>

            {[...Array(Math.ceil(foundReports.length / 8))].map((_, i) => (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            ))}

            <span
              onClick={() => selectPageHandler(page + 1)}
              className={
                page < Math.ceil(foundReports.length / 8)
                  ? ""
                  : "pagination__disable"
              }
            >
              ▶
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFoundItems;
