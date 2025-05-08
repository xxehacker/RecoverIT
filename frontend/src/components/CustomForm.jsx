import Input from "./inputs/Input";
import ImageInput from "./inputs/ImageInput";
import TextareaWithText from "./inputs/Textarea";

const CustomForm = ({
  handleSubmit,
  title,
  setTitle,
  location,
  setLocation,
  date,
  setDate,
  description,
  setDescription,
  error,
  loading,
  setImages,
  type,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Lenovo Legion i5"
          label="Product Name"
        />
        <ImageInput
          type="file"
          onChange={(e) => setImages(e.target.files)}
          placeholder="Upload Image"
          label="Upload Image To Identify"
          multiple={true}
        />

        <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          label="Location"
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Pick a date"
          label={type === "Found" ? "Date Found" : "Date Lost"}
        />
      </div>

      <div className="mb-4">
        <TextareaWithText
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          label="Description"
        />
      </div>

      {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
      <button className="btn-primary" type="submit" disabled={loading}>
        {loading ? "Reporting..." : "Report"}
      </button>
    </form>
  );
};

export default CustomForm;
