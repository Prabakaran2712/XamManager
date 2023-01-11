import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <div className="display-3">Page not found</div>
      <div className="lead mt-3">
        Go to the <Link to="/">Homepage</Link>
      </div>
    </div>
  );
};
export default NotFound;
