import React from "react";
import { UserContext } from "../../context/userContext";
import SideMenu from "../SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = React.useContext(UserContext);
  return (
    <div className="">
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5 text-black">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
