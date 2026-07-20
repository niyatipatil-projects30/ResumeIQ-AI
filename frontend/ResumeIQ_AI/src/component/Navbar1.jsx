import { Link } from "react-router-dom";
import "../styles/Navbar1.css";

 export function Navbar1() {
  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/">
          ResumeIQ AI
        </Link>
      </div>

      <div className="nav-buttons">

        <Link to="/login">
          <button className="login-btn">
            Login
          </button>
        </Link>

        <Link to="/signup">
          <button className="signup-btn">
            Sign Up
          </button>
        </Link>

      </div>

    </nav>
  );
}

export default Navbar1;