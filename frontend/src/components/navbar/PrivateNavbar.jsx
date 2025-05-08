import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { SiMoneygram } from "react-icons/si";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";

export default function PrivateNavbar() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setUser(null);
  };

  const navigation = [
    { name: "Home", to: "/" },
    { name: "Lost Report", to: "/lost-reports/post" },
    { name: "Found Report", to: "/found-reports/submit" },
    { name: "Claim Item", to: "/claim-item" },
    { name: "Lost Reports", to: "/lost-reports" },
    { name: "Found Reports", to: "/found-reports" },
  ];

  return (
    <Disclosure
      as="nav"
      className="bg-white border-b-2 border-gray-400 z-50 backdrop-blur-lg bg-opacity-80"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-15">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center justify-between w-full">
                <Link to="/" className="flex items-center gap-2 ml-2 md:ml-0">
                  <SiMoneygram className="h-8 w-auto text-red-500" />
                  <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                    RecoverIT
                  </span>
                </Link>
                <div className="flex items-center justify-end md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-full p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>

              <div className="hidden md:flex items-center justify-center gap-2">
                {navigation.map((item) => (
                  <Link key={item.name} to={item.to}>
                    <button className="h-12 text-black text-xs hover:bg-red-500 hover:text-white transition-all duration-200 px-12 py-1 text-center hover:cursor-pointer">
                      {item.name}
                    </button>
                  </Link>
                ))}

                <button
                  onClick={logoutHandler}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-500 text-white hover:bg-red-600 font-medium transition-all duration-200 shadow-sm"
                >
                  <IoLogOutOutline className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navigation.map((item) => (
                <Link key={item.name} to={item.to}>
                  <Disclosure.Button
                    as="div"
                    className="block px-4 py-3 rounded-lg text-gray-600 hover:text-green-500 hover:bg-gray-50 font-medium transition-all duration-200"
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 px-4 py-4">
              <Disclosure.Button
                as="button"
                onClick={logoutHandler}
                className="w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-all duration-200 text-left"
              >
                Sign out
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
