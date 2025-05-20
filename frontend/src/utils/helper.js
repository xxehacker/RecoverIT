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
    body: "RecoverIT helped me find my lost USB drive within hours. The interface is simple and very effective!",
    img: "https://avatar.vercel.sh/riya",
  },
  {
    name: "Arup Kalita",
    username: "@arupkalita",
    email: "arup.kalita@gmail.com",
    body: "I posted a lost headphone, and someone returned it through RecoverIT the next day. Amazing platform!",
    img: "https://avatar.vercel.sh/arup",
  },
  {
    name: "Sneha Roy",
    username: "@sneha_roy",
    email: "sneha.roy@gmail.com",
    body: "It’s so easy to report and track found items now. RecoverIT made the whole process efficient and secure.",
    img: "https://avatar.vercel.sh/sneha",
  },
  {
    name: "Neel Deka",
    username: "@neeldeka",
    email: "neel.deka@gmail.com",
    body: "Finally, a proper system to handle lost belongings. The notifications and updates are super helpful!",
    img: "https://avatar.vercel.sh/neel",
  },
  {
    name: "Pooja Nath",
    username: "@pooja_nath",
    email: "pooja.nath@gmail.com",
    body: "I found someone’s ID card and posted it here. They contacted me within an hour. So convenient!",
    img: "https://avatar.vercel.sh/pooja",
  },
  {
    name: "Rahul Boro",
    username: "@rahul_boro",
    email: "rahul.boro@gmail.com",
    body: "Great initiative! The admin panel ensures transparency, and the user interface is really clean.",
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

export const faqs = [
  {
    question: "What is the Lost and Found system?",
    answer:
      "The Lost and Found system is a platform where users can report lost items or submit found items to help reunite them with their rightful owners.",
  },
  {
    question: "How do I report a lost item?",
    answer:
      "To report a lost item, go to the 'Report Lost Item' section, fill out the form with item details, location, date, and your contact info, and submit it.",
  },
  {
    question: "How do I report a found item?",
    answer:
      "To report a found item, go to the 'Report Found Item' section and provide a detailed description, where and when you found it, and your contact details.",
  },
  {
    question: "Is registration required to report an item?",
    answer:
      "In most cases, no registration is required. However, registered users may have access to more features like editing or deleting reports.",
  },
  {
    question: "How can I search for a lost item?",
    answer:
      "Use the search feature to filter through reported items using keywords, categories, location, or date to find matches.",
  },
  {
    question: "How long are items listed on the platform?",
    answer:
      "Items remain listed for 30 to 90 days depending on the platform's policy, after which they may be archived.",
  },
  {
    question: "How do I contact the person who reported a found item?",
    answer:
      "Click on the found item listing to view the contact details provided by the person who submitted the report.",
  },
  {
    question: "What happens after I report a lost or found item?",
    answer:
      "Your report is added to the database and made searchable to others. Admins may review it before it's publicly visible.",
  },
  {
    question: "Can I edit or delete my submission?",
    answer:
      "Yes, if you registered or received a tracking code, you can use it to edit or delete your submission.",
  },
  {
    question: "What types of items can be reported?",
    answer:
      "You can report items like electronics, accessories, wallets, ID cards, keys, books, clothing, and more.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Yes, your personal information is kept confidential and only shared if necessary for item recovery.",
  },
  {
    question: "Can I upload a photo of the item?",
    answer:
      "Yes, uploading a clear photo helps others identify the item easily and increases the chance of it being found or returned.",
  },
  {
    question: "What should I do if I found a suspicious or dangerous item?",
    answer:
      "Do not handle the item. Contact campus or local authorities immediately for safe handling.",
  },
  {
    question: "Can I report an item found outside the campus/location?",
    answer:
      "Yes, as long as the system allows reports from your area, you can submit found items from any location.",
  },
  {
    question: "How can I track the status of my lost item report?",
    answer:
      "Use the unique tracking ID provided after submission to check the current status or any updates related to your report.",
  },
  {
    question: "What if someone falsely claims an item?",
    answer:
      "Users may be asked to provide identifying details or proof of ownership to prevent false claims. Admins monitor submissions to maintain trust.",
  },
];
