import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { SIDE_MENU_ITEMS, SIDE_MENU_USER_DATA } from "../utils/helper";

const SideMenu = ({ activeMenu }) => {
  const { user, setUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
    } else {
      navigate(route);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(isAdmin ? SIDE_MENU_ITEMS : SIDE_MENU_USER_DATA);
    }
  }, [user, isAdmin]);

  return (
    <aside className="w-64 h-[calc(100vh-61px)]  border-r border-gray-200/50 sticky top-[61px] z-20 lg:flex flex-col justify-between hidden bg-slate-900 text-white p-2">
      <div>
        {/* Profile Section */}
        <div className="flex flex-col justify-center items-center mb-4 pt-5">
          <h5 className="text-white text-2xl font-semibold leading-5 mt-3">
            {String(user?.username).toUpperCase() || ""}
          </h5>
          <p className="text-sm mt-1">{user?.email || ""}</p>
        </div>

        {/* Admin Label */}
        {isAdmin && (
          <div className="w-full flex items-center bg-green-400 gap-4 text-[15px] py-3 px-6 mb-1 transition-colors rounded-md">
            <h2 className="text-lg font-semibol">Admin Dashboard</h2>
          </div>
        )}

        {/* Side Menu Items */}
        <nav className="mt-5">
          {sideMenuData.map((item, index) => (
            <button
              key={index}
              onClick={() => handleClick(item.path)}
              className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 mb-1 transition-colors rounded-md ${
                activeMenu === item.label
                  ? "text-white bg-gradient-to-r from-blue-50/40 to-blue-100/40"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="text-xl" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default SideMenu;
