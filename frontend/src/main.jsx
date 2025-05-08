import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContextProvider from "./context/userContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
