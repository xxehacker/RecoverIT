import React, { createContext, useState, useEffect } from "react";
import { API_ENDPOINTS } from "../utils/apiPath";
import AXIOS_INSTANCE from "../utils/axiosInstance";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) return;

    if (!localStorage.getItem("token")) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await AXIOS_INSTANCE.get(
          API_ENDPOINTS.AUTH.GET_PROFILE
        );
        setUser(response.data?.user);
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          localStorage.removeItem("token");
          setUser(null);
        }
        console.log("User not found", error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();  
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
