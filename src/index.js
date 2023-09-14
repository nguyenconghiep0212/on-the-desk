import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Footer from "./views/footer";
import Portfolio from "./routes/portfolio";
import ErrorPage from "./routes/error-page";

const router = createBrowserRouter(
  [
    {
      path: "/portfolio",
      element: <Portfolio />,
      errorElement: <ErrorPage />,
    },
  ],
  {
    basename: "/on-the-desk",
  }
);

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
