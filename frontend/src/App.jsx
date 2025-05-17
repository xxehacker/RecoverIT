import { useContext, useEffect } from "react";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "./context/userContext";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import PublicNavbar from "./components/navbar/PublicNavbar";
import AllLostPage from "./pages/lost/AllLostPage";
import AllFoundItems from "./pages/found/AllFoundItems";
import ReportLostItem from "./pages/lost/ReportLostItem";
import LostReport from "./pages/lost/LostReport";
import AuthChecker from "./components/authCheck/AuthChecker";
import SubmitFound from "./pages/found/SubmitFound";
import ErrorPage from "./pages/ErrorPage";
import FoundItem from "./pages/found/FoundItem";
import ClaimPage from "./pages/claim/ClaimPage";
import DashboardAdminPage from "./pages/dashboard/admin/DashboardAdminPage";
import { useNavigate } from "react-router-dom";
import ManageUsers from "./pages/dashboard/admin/ManageUsers";
import ManageLosts from "./pages/dashboard/admin/ManageLosts";
import ManageFounds from "./pages/dashboard/admin/ManageFounds";
import ManageClaims from "./pages/dashboard/admin/ManageClaims";
import ContactUs from "./pages/ContactPage";
import AboutUs from "./pages/AboutPage";

function App() {
  const { user, loading, setLoading } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white">
          <span className="sr-only text-gray-900 dark:text-white">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  const AdminRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== "admin")
      return (
        <div className="flex flex-col justify-center items-center h-[90vh]">
          <h1 className="text-4xl font-bold text-red-500">
            You are not authorized to access this page
          </h1>
          <button
            className="bg-green-500 text-semibold text-white px-4 py-4 rounded-md mt-4 hover:bg-green-600 cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            Go to Home
          </button>
        </div>
      );
    return children;
  };

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        {<PublicNavbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              user ? (
                <>
                  <Navigate to="/" replace />
                </>
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/signup"
            element={
              user ? (
                <>
                  <Navigate to="/" replace />
                </>
              ) : (
                <Signup />
              )
            }
          />

          <Route
            path="/found-reports/submit"
            element={
              <AuthChecker>
                <SubmitFound />
              </AuthChecker>
            }
          />
          <Route path="/lost-reports" element={<AllLostPage />} />
          <Route path="/found-reports" element={<AllFoundItems />} />
          <Route
            path="/lost-reports/post"
            element={
              <AuthChecker>
                <ReportLostItem />
              </AuthChecker>
            }
          />
          <Route
            path="/lost-reports/:id"
            element={
              <AuthChecker>
                <LostReport />
              </AuthChecker>
            }
          />
          <Route
            path="/found-reports/:id"
            element={
              <AuthChecker>
                <FoundItem />
              </AuthChecker>
            }
          />
          <Route
            path="/claim-product/:id"
            element={
              <AuthChecker>
                <ClaimPage />
              </AuthChecker>
            }
          />
          {/* admin protected routes */}

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <DashboardAdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/lost-items"
            element={
              <AdminRoute>
                <ManageLosts />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/found-items"
            element={
              <AdminRoute>
                <ManageFounds />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/claim-items"
            element={
              <AdminRoute>
                <ManageClaims />
              </AdminRoute>
            }
          />
          <Route path="about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="*"
            element={
              <>
                <ErrorPage />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
