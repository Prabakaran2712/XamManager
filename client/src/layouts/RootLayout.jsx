import { Outlet, NavLink, ScrollRestoration } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <ScrollRestoration />
      <div className="flex-body">
        <div>
          <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                  xAM
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink className="nav-link" aria-current="page" to="/">
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/profile"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/message/send"
                      >
                        New Announcement
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Login
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/auth/login/staff"
                          >
                            Staff
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/auth/login/student"
                          >
                            Student
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="/auth/logout">
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </header>
        </div>
        <div>
          <main className="my-3 py-3">
            <Outlet />
          </main>
        </div>
        <div>
          <footer>
            <div className="container">
              <div className="text-light row py-5">
                <div className="col-6">
                  <div className="ms-3 display-4">InforMIT</div>
                  <div className="ms-3 lead">
                    MIT's own information exchange portal
                  </div>
                </div>
                <div className="col-6">
                  <div className="me-3 text-end">
                    <p className="fs-5">Madras Institute of Technology</p>
                    <p className="fs-6">Chromepet, Chennai - 44</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default RootLayout;
