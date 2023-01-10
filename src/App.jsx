import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";

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
