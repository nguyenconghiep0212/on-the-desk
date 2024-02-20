import React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
  Outlet,
 } from "react-router-dom";
import "./css/index.scss";
import { CookiesProvider } from "react-cookie";

// COMPONENT
import Gallery from "./routes/gallery.tsx";
import Landing from "./routes/landing.tsx";
import Portfolio from "./routes/portfolio.tsx";
import ErrorPage from "./routes/error-page.tsx";
import Login from "./routes/login.tsx";
import Admin from "./routes/admin.tsx";
import Middleware from "./routes/middleware.tsx";
import AddCard from "./routes/add-card.tsx";
import AddGallery from "./routes/add-gallery.tsx";
import Profile from "./routes/profile.tsx";
import PaymentCard from "./routes/payment-card.tsx";
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

    // PUBLIC PAGE
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: <Landing />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/addCard",
      element: <AddCard />,
      errorElement: <ErrorPage />,
    },

    // USER PAGE
    {
      path: "/:userShortcut",
      element: <Portfolio />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:userShortcut/profile",
      element: <Profile />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:userShortcut/addCard",
      element: <AddCard />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:userShortcut/paymentCard",
      element: <PaymentCard />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:userShortcut/:customerShortcut",
      element: <Gallery />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:userShortcut/addGallery",
      element: <AddGallery />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:userShortcut/addGallery/:customerShortcut",
      element: <AddGallery />,
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
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <RecoilRoot>
        <div className="flex h-[100vh] flex-col">
          <div className="h-[inherit] flex-1 overflow-auto bg-[#18191A] ">
            <RouterProvider
              router={createHashRouter(RouterBuilder())}
            />
          </div>
        </div>
      </RecoilRoot>
    </CookiesProvider>

    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>,
);
