import { useContext, useEffect } from "react";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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

function App() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = React.useState(false);

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
