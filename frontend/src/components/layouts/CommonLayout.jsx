import React from "react";
import bgImage from "../../assets/report2.svg";

function CommonLayout({ children, title }) {
  return (
    <div
      className={`flex ${
        title === "found"
          ? "bg-gradient-to-l from-gray-500/40 via-slate-300 to-slate-950"
          : "bg-gradient-to-r from-gray-500/40 via-slate-300 to-slate-950"
      }`}
    >
      {title === "found" ? (
        <>
          <div className="flex flex-row max-w-7xl mx-auto ">
            <div
              className={`hidden md:flex w-[35vw] items-center min-h-screen  justify-center bg-slate-950 
        overflow-hidden p-8 `}
            >
              <img
                src={bgImage}
                alt="BG_IMAGE"
                className="w-64 lg:w-[90%] h-full object-contain filter invert brightness-100"
              />
            </div>
            <div className="w-full h-[89vh] md:w-[80vw] px-12 pt-8 pb-12">
              {children}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row max-w-7xl mx-auto">
            <div className="w-full h-[89vh] md:w-[80vw] px-12 pt-8 pb-12">
              {children}
            </div>
            <div
              className={`hidden md:flex w-[35vw] items-center min-h-screen  justify-center bg-slate-950 
        overflow-hidden p-8 `}
            >
              <img
                src={bgImage}
                alt="BG_IMAGE"
                className="w-64 lg:w-[90%] h-full object-contain filter invert brightness-100"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CommonLayout;
