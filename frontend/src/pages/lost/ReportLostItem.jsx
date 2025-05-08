import React from "react";
import CommonLayout from "@/components/layouts/CommonLayout";
import AXIOS_INSTANCE from "@/utils/axiosInstance";
import { API_ENDPOINTS } from "@/utils/apiPath";
import { toast } from "react-toastify";
import CustomForm from "@/components/CustomForm";

const ReportLostItem = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const [dateLost, setDateLost] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleLostReport = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("location", location);
      data.append("dateLost", dateLost);
      [...images].forEach((file) => {
        data.append("images", file);
      });

      const response = await AXIOS_INSTANCE.post(
        API_ENDPOINTS.LOST.REPORT_LOST,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.lostItem) {
        toast.success(response.data?.message);
        setTitle("");
        setDescription("");
        setLocation("");
        setDateLost("");
        setImages([]);
      }
    } catch (err) {
      console.error("API error:", err);
      toast.error(err?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CommonLayout title="lost">
        <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
          <h3 className="text-4xl font-semibold text-black ">
            Report Lost Item
          </h3>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Report lost item by entering your details below ...
          </p>

          <CustomForm
            handleSubmit={handleLostReport}
            title={title}
            setTitle={setTitle}
            location={location}
            setLocation={setLocation}
            dateLost={dateLost}
            setDateLost={setDateLost}
            description={description}
            setDescription={setDescription}
            error={error}
            loading={loading}
            setImages={setImages}
          />
        </div>
      </CommonLayout>
    </>
  );
};

export default ReportLostItem;
