import React from "react";

function ImageInput({ type, placeholder, label, onChange, multiple }) {
  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box">
        <input
          type={type}
          className="w-full bg-transparent outline-none"
          placeholder={placeholder}
          onChange={onChange}
          accept="image/png, image/jpeg, image/jpg"
          multiple={multiple}
        />
      </div>
    </div>
  );
}

export default ImageInput;
