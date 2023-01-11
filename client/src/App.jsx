import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import NotFound from "./pages/NotFound/NotFound";
import axios from "axios";
import VerifyStaff from "./pages/auth/staff/VerifyStaff";
import StaffSignup from "./pages/auth/staff/StaffSignup";
import Logout from "./pages/auth/Logout";
import Home from "./pages/Home/Home";
import HallTicket from "./components/dashboard/HallTicket/HallTicket";
import StudentDashboard from "./pages/Dashboard/StudentDashboard/StudentDashboard";
import StudentSignup from "./pages/auth/student/StudentSignup";
import VerifyStudent from "./pages/auth/student/VerifyStudent";
import StudentLogin from "./pages/auth/student/StudentLogin";
import StaffLogin from "./pages/auth/staff/StaffLogin";
import StaffDashboard from "./pages/Dashboard/StaffDashboard/StaffDashboard";
import ChooseCourses from "./pages/auth/staff/ChooseCourses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/test",
        element: <HallTicket />,
      },
      {
        path: "dashboard/",
        children: [
          {
            path: "student/",
            element: <StudentDashboard />,
          },
          {
            path: "staff/",
            element: <StaffDashboard />,
          },
        ],
      },
      {
        path: "choose-courses/",
        element: <ChooseCourses />,
      },
      {
        path: "auth/",
        children: [
          {
            path: "signup/",
            children: [
              {
                path: "staff/",
                element: <StaffSignup />,
              },
              {
                path: "student",
                element: <StudentSignup />,
              },
            ],
          },
          {
            path: "login/staff",
            element: <StaffLogin />,
          },
          {
            path: "login/student",
            element: <StudentLogin />,
          },
          {
            path: "verify/staff/",
            element: <VerifyStaff />,
          },
          {
            path: "verify/student/",
            element: <VerifyStudent />,
          },
          {
            path: "logout/",
            element: <Logout />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);
function App() {
  if (window.location.href.indexOf("localhost") !== -1)
    axios.defaults.baseURL = `http://localhost:4000`;
  else axios.defaults.baseURL = "/";
  return <RouterProvider router={router} />;
}

export default App;
