import React from "react";
import LoginImage from "../../assets/login.svg";
import RegisterImage from "../../assets/signup.svg";

function AuthLayout({ children }) {
  let bgImage = LoginImage;
  if (window.location.pathname === "/signup") {
    bgImage = RegisterImage;
  }

  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw]  px-12 pt-8 pb-12">
        {children}
      </div>

      <div
        className="hidden md:flex w-[40vw] items-center justify-center bg-slate-950
        bg-[url('')] bg-cover bg-no-repeat bg-center
     overflow-hidden p-8 "
      >
        <img
          src={bgImage}
          alt="BG_IMAGE"
          className="w-64 lg:w-[70%] h-full object-contain filter invert brightness-100"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
