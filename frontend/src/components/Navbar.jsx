import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const location = useLocation();

  return (
    <div className="navbar">
      <Link to="/">
        <h1
          style={{
            fontSize: "25px",
            fontWeight: 700,
            color: location.pathname === "/" ? "white" : "black",
            textShadow:
              location.pathname === "/"
                ? "0px 0px 3px black"
                : "0px 0px 3px white",
          }}>
          Book Store
        </h1>
      </Link>
      <div className="nav_btn">
        {localStorage.getItem("token") ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <div>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
