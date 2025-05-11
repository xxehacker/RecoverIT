import { LuUsers, LuSearch } from "react-icons/lu";
import { FaHome } from "react-icons/fa";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return regex.test(password);
};

export const reviews = [
  {
    name: "Riya Das",
    username: "@riya_das",
    email: "riya.das@gmail.com",
    body: "The learning environment here is fantastic. The practical exposure we get is unmatched!",
    img: "https://avatar.vercel.sh/riya",
  },
  {
    name: "Arup Kalita",
    username: "@arupkalita",
    email: "arup.kalita@gmail.com",
    body: "Professors are really helpful and the infrastructure is modern. I enjoy every class.",
    img: "https://avatar.vercel.sh/arup",
  },
  {
    name: "Sneha Roy",
    username: "@sneha_roy",
    email: "sneha.roy@gmail.com",
    body: "I love the campus and the peer learning culture. Projects and internships are well-supported.",
    img: "https://avatar.vercel.sh/sneha",
  },
  {
    name: "Neel Deka",
    username: "@neeldeka",
    email: "neel.deka@gmail.com",
    body: "Great exposure to the tech world and excellent guidance from faculty members!",
    img: "https://avatar.vercel.sh/neel",
  },
  {
    name: "Pooja Nath",
    username: "@pooja_nath",
    email: "pooja.nath@gmail.com",
    body: "Amazing labs, top-notch events, and a lot of fun during fest time!",
    img: "https://avatar.vercel.sh/pooja",
  },
  {
    name: "Rahul Boro",
    username: "@rahul_boro",
    email: "rahul.boro@gmail.com",
    body: "The hands-on projects and hackathons really boosted my confidence as a developer.",
    img: "https://avatar.vercel.sh/rahul",
  },
];

export const SIDE_MENU_ITEMS = [
  {
    label: "Dashboard",
    icon: FaHome,
    path: "/admin/dashboard",
  },
  {
    label: "Users",
    icon: LuUsers,
    path: "/admin/users",
  },
  {
    label: "Lost Items",
    icon: LuSearch,
    path: "/admin/lost-items",
  },
  {
    label: "Found Items",
    icon: LuSearch,
    path: "/admin/found-items",
  },
  {
    label: "Claim Items",
    icon: LuSearch,
    path: "/admin/claim-items",
  },
];

export const SIDE_MENU_USER_DATA = [
  {
    label: "Dashboard",
    icon: FaHome,
    path: "/user/dashboard",
  },
  {
    label: "Lost Items",
    icon: LuSearch,
    path: "/user/lost-items",
  },
  {
    label: "Found Items",
    icon: LuSearch,
    path: "/user/found-items",
  },
  {
    label: "Claim Items",
    icon: LuSearch,
    path: "/user/claim-items",
  },
];
