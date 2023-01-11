import { useEffect } from "react";
import { useState } from "react";
import { Outlet, NavLink, ScrollRestoration } from "react-router-dom";

const RootLayout = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    if (user) {
      setUserLoggedIn(true);
      if (user.userType === "staff") {
        setUserType("staff");
      } else {
        setUserType("student");
      }
    } else {
      setUserLoggedIn(false);
    }
  }, []);
  return (
    <div>
      <ScrollRestoration />
      <div className="flex-body">
        <div>
          <header></header>
        </div>
        <div>
          <main className="my-3 py-3">
            <Outlet />
          </main>
        </div>
        <div>
          <footer></footer>
        </div>
      </div>
    </div>
  );
};
export default RootLayout;
