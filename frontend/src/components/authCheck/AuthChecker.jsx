import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function AuthChecker({ children }) {
  const user = localStorage.getItem("token");

  if (user) {
    return children;
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        {toast.error("You must be logged in to access this page")}
        <Navigate to="/login" replace />;
      </div>
    );
  }
}

export default AuthChecker;
