import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import "./css/index.scss";
import { CookiesProvider } from "react-cookie";

// COMPONENT
import Gallery from "./routes/gallery";
import Landing from "./routes/landing";
import Portfolio from "./routes/portfolio";
import ErrorPage from "./routes/error-page";
import Login from "./routes/login";
import Admin from "./routes/admin";
import Middleware from "./routes/middleware";
import AddCard from './routes/add-card'
import { Helmet } from "react-helmet";
// STORE
import { RecoilRoot } from "recoil";

// AUTH
import { GoogleOAuthProvider } from "@react-oauth/google";
const AppLayout = () => (
  <Middleware>
    <Outlet />
  </Middleware>
);
const RouterBuilder = () => {
  const generalRoutes = [
    {
      path: "/admin",
      element: <Admin />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/huong-dan",
      element: <Landing />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: <Landing />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:userId",
      element: <Portfolio />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:userId/addCard",
      element: <AddCard />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:userId/:customerId",
      element: <Gallery />,
      errorElement: <ErrorPage />,
    },
  ];
  const routes = [
    {
      element: <AppLayout />,
      children: [...generalRoutes],
    },
  ];
  return routes;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    {/* <React.StrictMode> */}
    {/* <Helmet>
      <meta charSet="utf-8" />
      <title>On The Desk</title>
    </Helmet> */}
    <CookiesProvider>
      <RecoilRoot>
        <div className="flex flex-col h-[100vh]">
          <div className="flex-1 overflow-auto h-[inherit] bg-[#18191A] ">
            <RouterProvider router={createBrowserRouter(RouterBuilder())} />
          </div>
        </div>
      </RecoilRoot>
    </CookiesProvider>

    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
);
