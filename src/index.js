import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Footer from "./views/footer";
import Gallery from "./routes/gallery";
import Landing from "./routes/landing";
import Portfolio from "./routes/portfolio";
import ErrorPage from "./routes/error-page";

const router = createHashRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/portfolio",
    element: <Portfolio />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/portfolio/gallery/:customerId",
    element: <Gallery />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="flex flex-col h-[100vh]">
      <div className="flex-1 overflow-auto bg-[#18191A]">
        <RouterProvider router={router} />
      </div>
      <Footer className="flex-[0 0 auto]" />
    </div>
  </React.StrictMode>
);
