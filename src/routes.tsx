import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home";
import Error from "./pages/error";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      errorElement: <Error/>,
    },
    {
        path: "/error",
        element: <Error/>,
        errorElement: <Error/>,
      },
  ]);