import { Outlet, NavLink, ScrollRestoration } from "react-router-dom";

const RootLayout = () => {
  return (
    <div style={{ height: "100%" }}>
      <ScrollRestoration />

      <Outlet />
    </div>
  );
};
export default RootLayout;
