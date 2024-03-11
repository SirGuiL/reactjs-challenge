import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { History } from "./pages/History";

export const router = createBrowserRouter([
  {
    path: "/:search",
    element: <Home />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "",
    element: <Home />,
  },
]);
