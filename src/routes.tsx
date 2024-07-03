import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/home";
import Error from "./pages/error";
import Dataset from "./pages/dataset";
import HomeStep2 from "./components/createDataset/step2/HomeStep2";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/error",
    element: <Error />,
    errorElement: <Error />,
  },
  {
    path: "/dataset",
    element: <Dataset />,
    errorElement: <Error />,
  },
  {
    path: "/datasets/screen2",
    element: <HomeStep2 />,
    errorElement: <Error />,
  },
]);