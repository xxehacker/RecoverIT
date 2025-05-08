import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { SiBrandfolder, SiMoneygram , SiRecoil } from "react-icons/si";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import ListItem from "../NavListItems";
import { IoLogOutOutline } from "react-icons/io5";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { toast } from "react-toastify";

export default function PublicNavbar() {
  const { user, setUser, loading } = useContext(UserContext);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("User Logout Successfully");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="bg-black text-white h-screen w-full flex justify-center items-center">
        loading ...
      </div>
    );
  }

  const components = [
    {
      title: "Report Lost Item",
      href: "/lost-reports/post",
      description:
        "Easily report a lost item by providing details like name, location, and description so others can help you find it.",
    },
    {
      title: "All Found Items",
      href: "/found-reports",
      description:
        "Browse through a list of items that have been found and submitted by other users. You might find what you lost!",
    },
    {
      title: "Submit Found Item",
      href: "/found-reports/submit",
      description:
        "Found something? Help others by submitting a report with item details and where it was found.",
    },
    {
      title: "All Lost Reports",
      href: "/lost-reports",
      description:
        "Use your unique tracking code to check the status of your lost or found item report anytime.",
    },
    {
      title: "Claim Item",
      href: "/claim-product",
      description:
        "Claim an item by providing the necessary details and proof of ownership.",
    },
  ];

  return (
    <Disclosure as="nav" className="bg-white/95 border-b border-gray-400">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-15">
            <div className="flex h-20 justify-between items-center">
              <div className="flex items-center justify-between w-full">
                <Link to="/" className="flex items-center gap-2">
                  <SiRecoil className="h-8 w-auto text-green-500" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent hover:text-red-700 duration-150">
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

              <div className="hidden md:flex items-center gap-6">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  Home
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  Home page of the website
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                          <ListItem href="/contact" title="Contact Us">
                            Need help? Get in touch with our support team for
                            assistance with reports, tracking, or general
                            inquiries.
                          </ListItem>
                          <ListItem href="/about" title="About Us">
                            Learn more about our platform and the team behind
                            it.
                          </ListItem>
                          <ListItem href="/faqs" title="FAQs">
                            Find answers to common questions about how to use
                            our platform effectively and safely.
                          </ListItem>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[530px] ">
                          {components.map((component) => (
                            <ListItem
                              key={component.title}
                              title={component.title}
                              href={component.href}
                            >
                              {component.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Other
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-3">
                  {user ? (
                    <div className="flex items-center gap-3">
                      <Link className="cursor-point">
                        <button
                          onClick={logoutHandler}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-500 text-white hover:bg-red-600 font-medium transition-all duration-200 shadow-sm cursor-point"
                        >
                          <IoLogOutOutline className="h-4 w-4" />
                          Logout
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 px-6 w-[8.2rem] py-2.5 rounded-full text-gray-700 hover:bg-gray-50 font-medium transition-all duration-200 border-2 border-amber-500"
                      >
                        <FaRegUser className="h-4 w-4" />
                        Sign Up
                      </Link>
                      <Link
                        to="/login"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-green-500 text-white hover:bg-green-600 font-medium transition-all duration-200 shadow-sm shadow-green-100"
                      >
                        <RiLoginCircleLine className="h-4 w-4" />
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-4 pb-5 pt-2">
              {user ? (
                <>
                  {components.map((item, i) => (
                    <Link
                      key={i}
                      to={item.href}
                      className="block px-4 py-3 rounded-lg text-gray-600 hover:text-green-500 hover:bg-gray-50 font-medium transition-all duration-200"
                    >
                      {item.title}
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="block px-4 py-3 rounded-lg text-gray-600 hover:text-green-500 hover:bg-gray-50 font-medium transition-all duration-200"
                  >
                    Home
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-3 rounded-lg text-gray-600 hover:text-green-500 hover:bg-gray-50 font-medium transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-3 rounded-lg text-gray-600 hover:text-green-500 hover:bg-gray-50 font-medium transition-all duration-200"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
