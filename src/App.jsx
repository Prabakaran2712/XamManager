import "./App.css";
import axios from "axios";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import RootLayout from "./layouts/RootLayout";
import NotFound from "./pages/NotFound/NotFound";
function App() {
  if (window.location.href.indexOf("localhost") !== -1)
    axios.defaults.baseURL = `http://localhost:5000`;
  else axios.defaults.baseURL = "/";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
      errorElement: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
